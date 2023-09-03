import { delay } from "https://deno.land/std@0.201.0/async/delay.ts";
import { randomInt } from "node:crypto";
import { EventEmitter } from "node:events";
import { HTTPHeaderLink } from "./header/link.ts";
/**
 * exFetch HTTP status codes that retryable.
 */
export const httpStatusCodesRetryable: readonly number[] = Object.freeze([
	408,
	429,
	500,
	502,
	503,
	504,
	506,
	507,
	508
]);
/**
 * exFetch default user agent.
 */
export const userAgentDefault = `Deno/${Deno.version.deno}-${Deno.build.target} exFetch/0.2.0`;
/**
 * exFetch event name.
 */
export type ExFetchEventName = "retry";
/**
 * exFetch event "Retry" parameters.
 */
export interface ExFetchEventOnRetryParameters {
	/**
	 * Current attempt, begin from `1`.
	 */
	attemptCurrent: number;
	/**
	 * Maximum amount of attempts.
	 */
	attempts: number;
	/**
	 * Will retry again after this amount of time, by milliseconds.
	 */
	retryAfter: number;
	/**
	 * Current response status code.
	 */
	statusCode: Response["status"];
	/**
	 * Current response status text.
	 */
	statusText: Response["statusText"];
}
/**
 * exFetch event options.
 */
export interface ExFetchEventOptions {
	retry?: (param: ExFetchEventOnRetryParameters) => void;
}
/**
 * @access private
 */
interface ExFetchIntervalStatus {
	/**
	 * Whether to increment minimum interval time per attempt/retry interval (always disable for other types of interval).
	 * @default true
	 */
	increment: boolean;
	/**
	 * Maximum time per interval, by milliseconds.
	 * @default 60000 // 60 seconds / 1 minute
	 */
	maximum: number;
	/**
	 * Minimum time per interval, by milliseconds.
	 * @default 1000 // 1 second
	 */
	minimum: number;
}
/**
 * exFetch interval options.
 */
export interface ExFetchIntervalOptions extends Partial<ExFetchIntervalStatus> {
	/** @alias maximum */max?: this["maximum"];
	/** @alias minimum */min?: this["minimum"];
}
/**
 * @access private
 */
interface ExFetchPaginateStatus {
	/**
	 * Maximum amount of pages to fetch.
	 * @default Infinity // Unlimited
	 */
	amount: number;
	/**
	 * Custom function for correctly link up to the next page, useful for the endpoints which not correctly return an absolute or relative URL.
	 * @param {URL} currentURL URL of the current page.
	 * @param {HTTPHeaderLink} currentHeaderLink Header link of the current page.
	 * @returns {URL} URL of the next page.
	 */
	linkUpNextPage?: (currentURL: URL, currentHeaderLink: HTTPHeaderLink) => URL;
	/**
	 * Amount of time to interval/pause between pages resource request, by milliseconds.
	 * @default {}
	 */
	interval: ExFetchIntervalStatus;
	/**
	 * Whether to throw an error when the latest page response provide an invalid HTTP header `Link`.
	 * @default true
	 */
	throwOnInvalidHeaderLink: boolean;
}
/**
 * exFetch paginate options.
 */
export interface ExFetchPaginateOptions extends Partial<Omit<ExFetchPaginateStatus, "interval">> {
	/**
	 * Amount of time to interval/pause between pages resource request, by milliseconds.
	 * @default 0
	 */
	interval?: number | Omit<ExFetchIntervalOptions, "increment">;
	/** @alias amount */count?: this["amount"];
	/** @alias amount */limit?: this["amount"];
	/** @alias interval */pause?: this["interval"];
}
/**
 * @access private
 */
interface ExFetchRetryStatus {
	/**
	 * Maximum amount of attempts until failure.
	 * @default 4
	 */
	attempts: number;
	/**
	 * Amount of time to delay/interval/pause between attempts, by milliseconds. This only apply when the endpoint have not provide any retry information in the response.
	 * @default {}
	 */
	interval: ExFetchIntervalStatus;
}
/**
 * exFetch retry options.
 */
export interface ExFetchRetryOptions extends Partial<Omit<ExFetchRetryStatus, "interval">> {
	/**
	 * Amount of time to delay/interval/pause between attempts, by milliseconds. This only apply when the endpoint have not provide any retry information in the response.
	 * @default {}
	 */
	interval?: number | ExFetchIntervalOptions;
	/** @alias attempts */attemptsMax?: this["attempts"];
	/** @alias attempts */attemptsMaximum?: this["attempts"];
	/** @alias attempts */maxAttempts?: this["attempts"];
	/** @alias attempts */maximumAttempts?: this["attempts"];
	/** @alias interval */delay?: this["interval"];
	/** @alias interval */pause?: this["interval"];
}
/**
 * exFetch options.
 */
export interface ExFetchOptions {
	/**
	 * [EXPERIMENTAL] Whether to cache suitable `Request`-`Response`s.
	 * 
	 * - `false`: Disable cache.
	 * - `true`: Enable cache, manage automatically.
	 * - `<string>`: Enable cache, manage automatically, with custom name.
	 * - `<Cache>`: Enable cache, manage manually.
	 * @default false
	 */
	cache?: boolean | string | Cache;
	/**
	 * Catch up events:
	 * 
	 * - `"retry"`
	 * @default undefined
	 */
	event?: EventEmitter | ExFetchEventOptions;
	/**
	 * Custom HTTP status codes that retryable.
	 * 
	 * WARNING: This will override the default when defined; To add and/or delete some of the HTTP status codes, use methods `addHTTPStatusCodesRetryable` and/or `deleteHTTPStatusCodesRetryable` instead.
	 * @default undefined
	 */
	httpStatusCodesRetryable?: number[] | Set<number>;
	/**
	 * Paginate options.
	 * @default {}
	 */
	paginate?: ExFetchPaginateOptions;
	/**
	 * Retry options.
	 * @default {}
	 */
	retry?: ExFetchRetryOptions;
	/**
	 * Timeout of the request (include retries), by milliseconds. This only apply when have not provide `AbortSignal` in the request.
	 * @default Infinity // (Disable)
	 */
	timeout?: number;
	/**
	 * Custom HTTP header `User-Agent`.
	 * @default `Deno/${Deno.version.deno}-${Deno.build.target} exFetch/${ExFetch.version}`.
	 */
	userAgent?: string;
}
/**
 * @access private
 * @param {ExFetchIntervalOptions} input
 * @param {string} inputArgumentPrefix
 * @param {ExFetchIntervalStatus} original
 * @returns {ExFetchIntervalStatus}
 */
function resolveIntervalOptions(input: ExFetchIntervalOptions, inputArgumentPrefix: string, original: ExFetchIntervalStatus): ExFetchIntervalStatus {
	input.maximum ??= input.max;
	input.minimum ??= input.min;
	const optionsResolve: ExFetchIntervalStatus = {
		...original,
		increment: input.increment ?? original.increment
	};
	if (typeof input.maximum !== "undefined") {
		if (!(Number.isSafeInteger(input.maximum) && input.maximum >= 0)) {
			throw new RangeError(`Argument \`${inputArgumentPrefix}.maximum\` is not a number which is integer, positive, and safe!`);
		}
		optionsResolve.maximum = input.maximum;
	}
	if (typeof input.minimum !== "undefined") {
		if (!(Number.isSafeInteger(input.minimum) && input.minimum >= 0)) {
			throw new RangeError(`Argument \`${inputArgumentPrefix}.minimum\` is not a number which is integer, positive, and safe!`);
		}
		optionsResolve.minimum = input.minimum;
	}
	if (optionsResolve.maximum < optionsResolve.minimum) {
		throw new RangeError(`Argument \`${inputArgumentPrefix}.minimum\` is large than argument \`${inputArgumentPrefix}.maximum\`!`);
	}
	return optionsResolve;
}
/**
 * @access private
 * @param {ExFetchPaginateOptions} input
 * @param {string} inputArgumentPrefix
 * @param {ExFetchPaginateStatus} original
 * @returns {ExFetchPaginateStatus}
 */
function resolvePaginateOptions(input: ExFetchPaginateOptions, inputArgumentPrefix: string, original: ExFetchPaginateStatus): ExFetchPaginateStatus {
	input.amount ??= input.count ?? input.limit;
	input.interval ??= input.pause;
	const optionsResolve: ExFetchPaginateStatus = {
		...original,
		linkUpNextPage: input.linkUpNextPage ?? original.linkUpNextPage,
		throwOnInvalidHeaderLink: input.throwOnInvalidHeaderLink ?? original.throwOnInvalidHeaderLink
	};
	if (typeof input.amount !== "undefined") {
		if (input.amount !== Infinity && !(Number.isSafeInteger(input.amount) && input.amount > 0)) {
			throw new RangeError(`Argument \`${inputArgumentPrefix}.amount\` is not \`Infinity\`, or a number which is integer, safe, and > 0!`);
		}
		optionsResolve.amount = input.amount;
	}
	if (typeof input.interval === "number") {
		optionsResolve.interval = resolveIntervalOptions({
			maximum: input.interval,
			minimum: input.interval
		}, `${inputArgumentPrefix}.interval`, optionsResolve.interval);
	} else if (typeof input.interval !== "undefined") {
		optionsResolve.interval = resolveIntervalOptions({ ...input.interval, increment: false }, `${inputArgumentPrefix}.interval`, optionsResolve.interval);
	}
	return optionsResolve;
}
/**
 * @access private
 */
interface ExFetchIntervalResolveTimeParameters extends ExFetchIntervalStatus {
	attemptCurrent: number;
	attempts: number;
}
/**
 * Resolve interval time.
 * @access private
 * @param {ExFetchIntervalResolveTimeParameters} param
 * @returns {number} Interval time.
 */
function resolveIntervalTime({ attemptCurrent, attempts, increment, maximum, minimum }: ExFetchIntervalResolveTimeParameters): number {
	if (maximum === minimum) {
		return maximum;
	}
	if (increment) {
		const incrementMinimum: number = minimum + ((maximum - minimum) * attemptCurrent / attempts);
		return randomInt(incrementMinimum, maximum);
	}
	return randomInt(minimum, maximum);
}
/**
 * Extend `fetch`.
 */
export class ExFetch {
	#cacheNode?: Cache;
	#cacheNodePayload: Promise<Cache> | undefined = undefined;
	#event: EventEmitter;
	#httpStatusCodesRetryable: Set<number>;
	#paginate: ExFetchPaginateStatus = {
		amount: Infinity,
		interval: {
			increment: false,
			maximum: 0,
			minimum: 0
		},
		throwOnInvalidHeaderLink: true
	};
	#retry: ExFetchRetryStatus = {
		attempts: 4,
		interval: {
			increment: true,
			maximum: 60000,
			minimum: 1000
		}
	};
	#timeout = Infinity;
	#userAgent = userAgentDefault;
	/**
	 * Create a new extend `fetch` instance.
	 * @param {ExFetchOptions} [options={}] Options.
	 */
	constructor(options: ExFetchOptions = {}) {
		options.retry ??= {};
		options.retry.attempts ??= options.retry.attemptsMaximum ?? options.retry.attemptsMax ?? options.retry.maximumAttempts ?? options.retry.maxAttempts;
		options.retry.interval ??= options.retry.delay ?? options.retry.pause;
		if (typeof options.cache === "boolean") {
			if (options.cache) {
				this.#cacheNodePayload = caches.open("exFetch");
			}
		} else if (options.cache instanceof Cache) {
			this.#cacheNode = options.cache;
		} else if (typeof options.cache !== "undefined") {
			this.#cacheNodePayload = caches.open(options.cache);
		}
		if (options.event instanceof EventEmitter) {
			this.#event = options.event;
		} else {
			this.#event = new EventEmitter();
			if (typeof options.event !== "undefined") {
				if (typeof options.event.retry !== "undefined") {
					this.#event.on("retry", options.event.retry);
				}
			}
		}
		this.#httpStatusCodesRetryable = new Set<number>((typeof options.httpStatusCodesRetryable === "undefined") ? httpStatusCodesRetryable : options.httpStatusCodesRetryable);
		this.#paginate = resolvePaginateOptions(options.paginate ?? {}, "options.paginate", this.#paginate);
		if (typeof options.retry.attempts !== "undefined") {
			if (!(Number.isSafeInteger(options.retry.attempts) && options.retry.attempts >= 0)) {
				throw new RangeError(`Argument \`options.retry.attempts\` is not a number which is integer, positive, and safe!`);
			}
			this.#retry.attempts = options.retry.attempts;
		}
		if (typeof options.timeout !== "undefined") {
			if (options.timeout !== Infinity && !(Number.isSafeInteger(options.timeout) && options.timeout > 0)) {
				throw new RangeError(`Argument \`options.timeout\` is not a number which is integer, positive, safe, and > 0!`);
			}
			this.#timeout = options.timeout;
		}
		if (typeof options.userAgent !== "undefined") {
			this.#userAgent = options.userAgent;
		}
	}
	/**
	 * Correctly load cache node.
	 * @access private
	 * @returns {Promise<void>}
	 */
	async #cacheLoad(): Promise<void> {
		if (typeof this.#cacheNodePayload !== "undefined") {
			this.#cacheNode = await this.#cacheNodePayload;
			this.#cacheNodePayload = undefined;
		}
	}
	/**
	 * Add HTTP status codes that retryable.
	 * @param {number} value Value.
	 * @returns {this}
	 */
	addHTTPStatusCodesRetryable(value: number): this;
	/**
	 * Add HTTP status codes that retryable.
	 * @param {number[]} values Values.
	 * @returns {this}
	 */
	addHTTPStatusCodesRetryable(values: number[]): this;
	/**
	 * Add HTTP status codes that retryable.
	 * @param {...number} values Values.
	 * @returns {this}
	 */
	addHTTPStatusCodesRetryable(...values: number[]): this;
	addHTTPStatusCodesRetryable(...values: number[] | number[][]): this {
		for (const value of values.flat(Infinity) as number[]) {
			this.#httpStatusCodesRetryable.add(value);
		}
		return this;
	}
	/**
	 * Delete HTTP status codes that not retryable.
	 * @param {number} value Value.
	 * @returns {this}
	 */
	deleteHTTPStatusCodesRetryable(value: number): this;
	/**
	 * Delete HTTP status codes that not retryable.
	 * @param {number[]} values Values.
	 * @returns {this}
	 */
	deleteHTTPStatusCodesRetryable(values: number[]): this;
	/**
	 * Delete HTTP status codes that not retryable.
	 * @param {...number} values Values.
	 * @returns {this}
	 */
	deleteHTTPStatusCodesRetryable(...values: number[]): this;
	deleteHTTPStatusCodesRetryable(...values: number[] | number[][]): this {
		for (const value of values.flat(Infinity) as number[]) {
			this.#httpStatusCodesRetryable.delete(value);
		}
		return this;
	}
	/**
	 * Fetch a resource from the network with extend features.
	 * @param {Exclude<Parameters<typeof fetch>[0], Request>} input URL of the resource.
	 * @param {Parameters<typeof fetch>[1]} [init] Custom setting that apply to the request.
	 * @returns {Promise<Response>} Response.
	 */
	async fetch(input: Exclude<Parameters<typeof fetch>[0], Request>, init?: Parameters<typeof fetch>[1]): Promise<Response> {
		let initResolve: ExFetchDefaultInit = this.#mergeDefaultInit(init);
		let attempt = 0;
		let response: Response;
		do {
			response = await fetch(input, initResolve);
			if (
				response.ok ||
				attempt >= this.#retry.attempts
			) {
				break;
			}
			let retryable: boolean = statusCodeRetryable.has(response.status);
			if (typeof this.#retry.condition === "function") {
				if (!this.#retry.condition(response.status, retryable)) {
					break;
				}
			} else {
				if (!retryable) {
					break;
				}
			}
			let delayTime: number;
			let headerRetryAfterValue: string | null = response.headers.get("Retry-After");
			if (typeof headerRetryAfterValue === "string") {
				if (/^[A-Z][a-z][a-z], \d\d [A-Z][a-z][a-z] \d\d\d\d \d\d:\d\d:\d\d GMT$/u.test(headerRetryAfterValue)) {
					try {
						delayTime ??= Date.parse(headerRetryAfterValue) - Date.now();
					} catch { }
				} else {
					try {
						delayTime ??= Number(headerRetryAfterValue) * 1000;
					} catch { }
				}
			}
			delayTime ??= exponentialBackoffWithJitter({
				attempt: this.#retry.attempts,
				base: this.#retry.delayMinimum,
				cap: this.#retry.delayMaximum,
				jitter: this.#retry.jitter,
				multiplier: this.#retry.backoffMultiplier
			});
			delayTime = Math.max(1000, delayTime);
			let eventRetryPayload: ExFetchEventOnRetryPayload = {
				attemptCurrent: attempt + 1,
				attempts: this.#retry.attempts,
				retryAfter: delayTime,
				statusCode: response.status,
				statusText: response.statusText
			};
			this.#event?.emit("retry", eventRetryPayload);
			await delay(delayTime, { signal: initResolve.signal });
			attempt += 1;
		} while (attempt <= this.#retry.attempts);
		return response;
	}
	/**
	 * Fetch paginate resources from the network with retry attempts; Not support GraphQL.
	 * @param {Exclude<Parameters<typeof fetch>[0], Request>} input URL of the first page of the resources.
	 * @param {Parameters<typeof fetch>[1]} init Custom setting that apply to each request.
	 * @param {ExFetchPaginateOptions} [optionsOverride={}] Options.
	 * @returns {Promise<Response[]>} Responses.
	 */
	async fetchPaginate(input: Exclude<Parameters<typeof fetch>[0], Request>, init?: Parameters<typeof fetch>[1], optionsOverride: ExFetchPaginateOptions = {}): Promise<Response[]> {
		checkPaginateOptions(optionsOverride, "optionsOverride");
		let initResolve: ExFetchDefaultInit = this.#mergeDefaultInit(init);
		let optionsResolve: ExFetchPaginateOptionsBase = { ...this.#paginate, ...optionsOverride };
		let responses: Response[] = [];
		for (let page = 1, uri: URL | undefined = new URL(input); page <= optionsResolve.count && uri instanceof URL; page += 1) {
			if (page > 1 && optionsResolve.pause > 0) {
				await delay(optionsResolve.pause, { signal: initResolve.signal });
			}
			let uriLookUp: URL = uri;
			uri = undefined;
			let response: Response = await this.fetch(uriLookUp, initResolve);
			responses.push(response);
			if (response.ok) {
				try {
					let responseHeaderLink: HTTPHeaderLink = HTTPHeaderLink.parse(response);
					if (typeof optionsResolve.linkUpNextPage === "function") {
						uri = optionsResolve.linkUpNextPage(uriLookUp, responseHeaderLink);
					} else {
						uri = new URL(responseHeaderLink.getByRel("next")[0][0], uriLookUp);
					}
				} catch (error) {
					if (optionsResolve.throwOnInvalidHeaderLink) {
						throw new SyntaxError(`[${uriLookUp.toString()}] ${error?.message ?? error}`);
					}
				}
			}
		}
		return responses;
	}
	/**
	 * Fetch a resource from the network with retry attempts.
	 * @param {Exclude<Parameters<typeof fetch>[0], Request>} input URL of the resource.
	 * @param {Parameters<typeof fetch>[1]} init Custom setting that apply to the request.
	 * @param {ExFetchOptions} [options={}] Options.
	 * @returns {Promise<Response>} Response.
	 */
	static fetch(input: Exclude<Parameters<typeof fetch>[0], Request>, init?: Parameters<typeof fetch>[1], options: ExFetchOptions = {}): Promise<Response> {
		return new this(options).fetch(input, init);
	}
	/**
	 * Fetch paginate resources from the network with retry attempts; Not support GraphQL.
	 * @param {Exclude<Parameters<typeof fetch>[0], Request>} input URL of the first page of the resources.
	 * @param {Parameters<typeof fetch>[1]} init Custom setting that apply to each request.
	 * @param {ExFetchOptions} [options={}] Options.
	 * @returns {Promise<Response[]>} Responses.
	 */
	static fetchPaginate(input: Exclude<Parameters<typeof fetch>[0], Request>, init?: Parameters<typeof fetch>[1], options: ExFetchOptions = {}): Promise<Response[]> {
		return new this(options).fetchPaginate(input, init);
	}
}
export default ExFetch;
/**
 * Fetch a resource from the network with retry attempts.
 * @param {Exclude<Parameters<typeof fetch>[0], Request>} input URL of the resource.
 * @param {Parameters<typeof fetch>[1]} init Custom setting that apply to the request.
 * @param {ExFetchOptions} [options={}] Options.
 * @returns {Promise<Response>} Response.
 */
export function exFetch(input: Exclude<Parameters<typeof fetch>[0], Request>, init?: Parameters<typeof fetch>[1], options: ExFetchOptions = {}): Promise<Response> {
	return new ExFetch(options).fetch(input, init);
}
/**
 * Fetch paginate resources from the network with retry attempts; Not support GraphQL.
 * @param {Exclude<Parameters<typeof fetch>[0], Request>} input URL of the first page of the resources.
 * @param {Parameters<typeof fetch>[1]} init Custom setting that apply to each request.
 * @param {ExFetchOptions} [options={}] Options.
 * @returns {Promise<Response[]>} Responses.
 */
export function exFetchPaginate(input: Exclude<Parameters<typeof fetch>[0], Request>, init?: Parameters<typeof fetch>[1], options: ExFetchOptions = {}): Promise<Response[]> {
	return new ExFetch(options).fetchPaginate(input, init);
}
