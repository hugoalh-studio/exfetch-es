import { randomInt } from "node:crypto";
import { HTTPHeaderLink, type HTTPHeaderLinkEntry } from "https://raw.githubusercontent.com/hugoalh-studio/http-header-link-es/v1.0.2/mod.ts";
import { HTTPHeaderRetryAfter } from "https://raw.githubusercontent.com/hugoalh-studio/http-header-retry-after-es/v1.0.1/mod.ts";
import { slug } from "./_slug.ts";
const httpStatusCodesRedirectable: Set<number> = new Set<number>([
	301,
	302,
	303,
	307,
	308
]);
const httpStatusCodesRetryable: Set<number> = new Set<number>([
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
export const userAgentDefault: string = `${slug} exFetch/0.5.1`;
/**
 * exFetch delay options.
 */
export interface ExFetchDelayOptions {
	/**
	 * Maximum time per delay, by milliseconds.
	 */
	maximum?: number;
	/**
	 * Minimum time per delay, by milliseconds.
	 */
	minimum?: number;
	/**
	 * Maximum time per delay, by milliseconds. Alias of {@linkcode maximum}.
	 */
	max?: this["maximum"];
	/**
	 * Minimum time per delay, by milliseconds. Alias of {@linkcode minimum}.
	 */
	min?: this["minimum"];
}
type ExFetchDelayOptionsInternal = Required<Omit<ExFetchDelayOptions, "max" | "min">>;
/**
 * exFetch event common payload.
 */
export interface ExFetchEventCommonPayload {
	/**
	 * Status code of the current response.
	 */
	statusCode: Response["status"];
	/**
	 * Status text of the current response.
	 */
	statusText: Response["statusText"];
}
/**
 * exFetch paginate event payload.
 */
export interface ExFetchEventPaginatePayload {
	/**
	 * Current count of the paginates, begin from `1`.
	 */
	countCurrent: number;
	/**
	 * Maximum number of the paginates allowed.
	 */
	countMaximum: number;
	/**
	 * Will paginate to the next page after this amount of time, by milliseconds.
	 */
	paginateAfter: number;
	/**
	 * Will paginate to this URL.
	 */
	paginateURL: URL;
}
/**
 * exFetch redirect event payload.
 */
export interface ExFetchEventRedirectPayload extends ExFetchEventCommonPayload {
	/**
	 * Current count of the redirects, begin from `1`.
	 */
	countCurrent: number;
	/**
	 * Maximum number of the redirects allowed.
	 */
	countMaximum: number;
	/**
	 * Will redirect after this amount of time, by milliseconds.
	 */
	redirectAfter: number;
	/**
	 * Will redirect to this URL.
	 */
	redirectURL: URL;
}
/**
 * exFetch retry event payload.
 */
export interface ExFetchEventRetryPayload extends ExFetchEventCommonPayload {
	/**
	 * Current count of the retries, begin from `1`.
	 */
	countCurrent: number;
	/**
	 * Maximum number of the retries allowed.
	 */
	countMaximum: number;
	/**
	 * Will retry after this amount of time, by milliseconds.
	 */
	retryAfter: number;
	/**
	 * Will retry this URL.
	 */
	retryURL: URL;
}
/**
 * exFetch paginate link up payload.
 */
export interface ExFetchPaginateLinkUpPayload {
	/**
	 * Header link of the current page.
	 */
	currentHeaderLink: HTTPHeaderLink;
	/**
	 * URL of the current page.
	 */
	currentURL: URL;
}
/**
 * exFetch paginate options.
 */
export interface ExFetchPaginateOptions {
	/**
	 * Amount of time to delay between the paginates, by milliseconds.
	 * @default 0
	 */
	delay?: number | ExFetchDelayOptions;
	/**
	 * Custom function for correctly link up to the next page, useful for the endpoints which not correctly return an absolute or relative URL.
	 * @param {ExFetchPaginateLinkUpPayload} param Link up payload of the paginate.
	 * @returns {URL | null | undefined} URL of the next page.
	 */
	linkUpNextPage?(param: ExFetchPaginateLinkUpPayload): URL | null | undefined;
	/**
	 * Maximum amount of paginates to allow.
	 * @default Infinity // Unlimited
	 */
	maximum?: number;
	/**
	 * Event listener for the paginates.
	 * @param {ExFetchEventPaginatePayload} param Event payload of the paginate.
	 * @returns {void}
	 */
	onEvent?(param: ExFetchEventPaginatePayload): void;
	/**
	 * Whether to throw an error when the latest page response provide an invalid HTTP header `Link`.
	 * @default true
	 */
	throwOnInvalidHeaderLink?: boolean;
}
interface ExFetchPaginateOptionsInternal extends Required<Omit<ExFetchPaginateOptions, "delay" | "onEvent">>, Pick<ExFetchPaginateOptions, "onEvent"> {
	/**
	 * Amount of time to delay between the paginates, by milliseconds.
	 */
	delay: ExFetchDelayOptionsInternal;
}
/**
 * exFetch redirect options.
 */
export interface ExFetchRedirectOptions {
	/**
	 * Amount of time to delay between the redirects, by milliseconds.
	 * @default 0
	 */
	delay?: number | ExFetchDelayOptions;
	/**
	 * Maximum amount of redirects to allow.
	 * @default Infinity
	 */
	maximum?: number;
	/**
	 * Event listener for the redirects.
	 * @param {ExFetchEventRedirectPayload} param Event payload of the redirect.
	 * @returns {void}
	 */
	onEvent?(param: ExFetchEventRedirectPayload): void;
}
interface ExFetchRedirectOptionsInternal extends Required<Omit<ExFetchRedirectOptions, "delay" | "onEvent">>, Pick<ExFetchRedirectOptions, "onEvent"> {
	/**
	 * Amount of time to delay between the redirects, by milliseconds.
	 */
	delay: ExFetchDelayOptionsInternal;
}
/**
 * exFetch retry options.
 */
export interface ExFetchRetryOptions {
	/**
	 * Amount of time to delay between the attempts, by milliseconds. This only apply when the endpoint have not provide any retry information in the response.
	 * @default
	 * {
	 *   maximum: 60000,
	 *   minimum: 1000
	 * }
	 */
	delay?: number | ExFetchDelayOptions;
	/**
	 * Maximum amount of attempts to allow.
	 * @default 4
	 */
	maximum?: number;
	/**
	 * Event listener for the retries.
	 * @param {ExFetchEventRetryPayload} param Event payload of the retry.
	 * @returns {void}
	 */
	onEvent?(param: ExFetchEventRetryPayload): void;
}
interface ExFetchRetryOptionsInternal extends Required<Omit<ExFetchRetryOptions, "delay" | "onEvent">>, Pick<ExFetchRetryOptions, "onEvent"> {
	/**
	 * Amount of time to delay between the attempts, by milliseconds. This only apply when the endpoint have not provide any retry information in the response.
	 */
	delay: ExFetchDelayOptionsInternal;
}
/**
 * exFetch options.
 */
export interface ExFetchOptions {
	/**
	 * **\[🧪 EXPERIMENTAL\]** Whether to cache suitable `Request`-`Response`s.
	 * 
	 * - `false`: Disable cache.
	 * - `true`: Enable cache with default name, manage automatically.
	 * - `<string>`: Enable cache with custom name, manage automatically.
	 * - `<Cache>`: Enable cache, manage manually.
	 * @default false
	 */
	cacheStorage?: boolean | string | Cache;
	/**
	 * Custom HTTP status codes that retryable.
	 * 
	 * > **⚠️ Warning**
	 * >
	 * > This will override the default when defined; To add and/or delete some of the HTTP status codes, use methods {@linkcode ExFetch.addHTTPStatusCodeRetryable} and/or {@linkcode ExFetch.deleteHTTPStatusCodeRetryable} instead.
	 * @default undefined
	 */
	httpStatusCodesRetryable?: number[] | Set<number>;
	/**
	 * Paginate options.
	 */
	paginate?: ExFetchPaginateOptions;
	/**
	 * Redirect options. This only apply when define property `redirect` as `"follow"` in the request, and define property `maximum` in this option.
	 */
	redirect?: ExFetchRedirectOptions;
	/**
	 * Retry options.
	 */
	retry?: ExFetchRetryOptions;
	/**
	 * Timeout of the request (include the redirects and the retries), by milliseconds. This only apply when have not define property `signal` in the request.
	 * @default Infinity // Disable
	 */
	timeout?: number;
	/**
	 * Custom user agent. This only apply when have not define HTTP header `User-Agent` in the request.
	 * @default `${RuntimeSlug} exFetch/${ExFetchVersion}`.
	 */
	userAgent?: string;
}
/**
 * Resolve delay options.
 * @access private
 * @param {string} parameterName Name of the parameter.
 * @param {number | ExFetchDelayOptions} input
 * @param {ExFetchDelayOptionsInternal} original
 * @returns {ExFetchDelayOptionsInternal}
 */
function resolveDelayOptions(parameterName: string, input: number | ExFetchDelayOptions, original: ExFetchDelayOptionsInternal): ExFetchDelayOptionsInternal {
	if (typeof input === "number") {
		if (!(Number.isSafeInteger(input) && input >= 0)) {
			throw new RangeError(`\`${input}\` (parameter \`${parameterName}\`) is not a number which is integer, positive, and safe!`);
		}
		return {
			maximum: input,
			minimum: input
		};
	}
	input.maximum ??= input.max;
	input.minimum ??= input.min;
	const optionsResolve: ExFetchDelayOptionsInternal = { ...original };
	if (typeof input.maximum !== "undefined") {
		if (!(Number.isSafeInteger(input.maximum) && input.maximum >= 0)) {
			throw new RangeError(`\`${input.maximum}\` (parameter \`${parameterName}.maximum\`) is not a number which is integer, positive, and safe!`);
		}
		optionsResolve.maximum = input.maximum;
	}
	if (typeof input.minimum !== "undefined") {
		if (!(Number.isSafeInteger(input.minimum) && input.minimum >= 0)) {
			throw new RangeError(`\`${input.minimum}\` (parameter \`${parameterName}.minimum\`) is not a number which is integer, positive, and safe!`);
		}
		optionsResolve.minimum = input.minimum;
	}
	if (optionsResolve.minimum > optionsResolve.maximum) {
		throw new RangeError(`\`${optionsResolve.minimum}\` (parameter \`${parameterName}.minimum\`) is large than \`${optionsResolve.maximum}\` (parameter \`${parameterName}.maximum\`)!`);
	}
	return optionsResolve;
}
/**
 * Resolve delay time.
 * @access private
 * @param {ExFetchDelayOptionsInternal} param
 * @returns {number} Delay time.
 */
function resolveDelayTime({ maximum, minimum }: ExFetchDelayOptionsInternal): number {
	if (maximum === minimum) {
		return maximum;
	}
	return randomInt(minimum, maximum + 1);
}
/**
 * Start a `Promise` based delay with `AbortSignal`.
 * @access private
 * @param {number} value Time of the delay, by milliseconds. `0` means execute "immediately", or more accurately, the next event cycle.
 * @param {AbortSignal} [signal] A signal object that allow to communicate with a DOM request and abort it if required via an `AbortController` object.
 * @returns {Promise<void>}
 */
function setDelay(value: number, signal?: AbortSignal): Promise<void> {
	if (value <= 0) {
		return Promise.resolve();
	}
	if (signal?.aborted) {
		return Promise.reject(signal.reason);
	}
	return new Promise((resolve, reject): void => {
		function abort(): void {
			clearTimeout(id);
			reject(signal?.reason);
		}
		function done(): void {
			signal?.removeEventListener("abort", abort);
			resolve();
		}
		const id: number = setTimeout(done, value);
		signal?.addEventListener("abort", abort, { once: true });
	});
}
/**
 * Extend `fetch`.
 * 
 * > **🛡️ Permissions**
 * >
 * > | **Target** | **Type** | **Coverage** |
 * > |:--|:--|:--|
 * > | Deno | Network (`allow-net`) | Resource |
 */
export class ExFetch {
	#cacheStorage?: Cache;
	#cacheStorageDefer?: Promise<Cache>;
	#httpStatusCodesRetryable: Set<number>;
	#paginate: ExFetchPaginateOptionsInternal = {
		delay: {
			maximum: 0,
			minimum: 0
		},
		linkUpNextPage: ({ currentHeaderLink, currentURL }: ExFetchPaginateLinkUpPayload): URL | null | undefined => {
			const currentHeaderLinkEntryNextPage: HTTPHeaderLinkEntry[] = currentHeaderLink.getByRel("next");
			if (currentHeaderLinkEntryNextPage.length > 0) {
				return new URL(currentHeaderLinkEntryNextPage[0][0], currentURL);
			}
			return;
		},
		maximum: Infinity,
		onEvent: undefined,
		throwOnInvalidHeaderLink: true
	};
	#redirect: ExFetchRedirectOptionsInternal = {
		delay: {
			maximum: 0,
			minimum: 0
		},
		maximum: Infinity,
		onEvent: undefined
	};
	#retry: ExFetchRetryOptionsInternal = {
		delay: {
			maximum: 60000,
			minimum: 1000
		},
		maximum: 4,
		onEvent: undefined
	};
	#timeout = Infinity;
	#userAgent: string;
	/**
	 * @access private
	 * @param {string} parameterName Name of the parameter.
	 * @param {ExFetchPaginateOptions} input
	 * @returns {ExFetchPaginateOptionsInternal}
	 */
	#resolvePaginateOptions(parameterName: string, input: ExFetchPaginateOptions): ExFetchPaginateOptionsInternal {
		const optionsResolve: ExFetchPaginateOptionsInternal = { ...this.#paginate };
		if (typeof input.delay !== "undefined") {
			optionsResolve.delay = resolveDelayOptions(`${parameterName}.delay`, input.delay, this.#paginate.delay);
		}
		if (typeof input.linkUpNextPage !== "undefined") {
			optionsResolve.linkUpNextPage = input.linkUpNextPage;
		}
		if (typeof input.maximum !== "undefined") {
			if (input.maximum !== Infinity && !(Number.isSafeInteger(input.maximum) && input.maximum > 0)) {
				throw new RangeError(`\`${input.maximum}\` (parameter \`${parameterName}.maximum\`) is not \`Infinity\`, or a number which is integer, safe, and > 0!`);
			}
			optionsResolve.maximum = input.maximum;
		}
		if (typeof input.onEvent !== "undefined") {
			optionsResolve.onEvent = input.onEvent;
		}
		if (typeof input.throwOnInvalidHeaderLink !== "undefined") {
			optionsResolve.throwOnInvalidHeaderLink = input.throwOnInvalidHeaderLink;
		}
		return optionsResolve;
	}
	/**
	 * Create a new extend `fetch` instance.
	 * 
	 * > **🛡️ Permissions**
	 * >
	 * > | **Target** | **Type** | **Coverage** |
	 * > |:--|:--|:--|
	 * > | Deno | Network (`allow-net`) | Resource |
	 * @param {ExFetchOptions} [options={}] Options.
	 */
	constructor(options: ExFetchOptions = {}) {
		if (typeof globalThis.Cache !== "undefined") {
			if (options.cacheStorage instanceof globalThis.Cache) {
				this.#cacheStorage = options.cacheStorage;
			} else if (typeof options.cacheStorage === "boolean") {
				if (options.cacheStorage) {
					this.#cacheStorageDefer = globalThis.caches.open("exFetch");
				}
			} else if (typeof options.cacheStorage !== "undefined") {
				this.#cacheStorageDefer = globalThis.caches.open(options.cacheStorage);
			}
		}
		this.#httpStatusCodesRetryable = new Set<number>(options.httpStatusCodesRetryable ?? httpStatusCodesRetryable);
		this.#paginate = this.#resolvePaginateOptions("options.paginate", options.paginate ?? {});
		if (typeof options.redirect?.delay !== "undefined") {
			this.#redirect.delay = resolveDelayOptions("options.redirect.delay", options.redirect.delay, this.#redirect.delay);
		}
		if (typeof options.redirect?.maximum !== "undefined") {
			if (!(Number.isSafeInteger(options.redirect.maximum) && options.redirect.maximum >= 0)) {
				throw new RangeError(`\`${options.redirect.maximum}\` (parameter \`options.redirect.maximum\`) is not a number which is integer, positive, and safe!`);
			}
			this.#redirect.maximum = options.redirect.maximum;
		}
		this.#redirect.onEvent = options.redirect?.onEvent;
		if (typeof options.retry?.delay !== "undefined") {
			this.#retry.delay = resolveDelayOptions("options.retry.delay", options.retry.delay, this.#retry.delay);
		}
		if (typeof options.retry?.maximum !== "undefined") {
			if (!(Number.isSafeInteger(options.retry.maximum) && options.retry.maximum >= 0)) {
				throw new RangeError(`\`${options.retry.maximum}\` (parameter \`options.retry.maximum\`) is not a number which is integer, positive, and safe!`);
			}
			this.#retry.maximum = options.retry.maximum;
		}
		this.#retry.onEvent = options.retry?.onEvent;
		if (typeof options.timeout !== "undefined") {
			if (options.timeout !== Infinity && !(Number.isSafeInteger(options.timeout) && options.timeout > 0)) {
				throw new RangeError(`\`${options.timeout}\` (parameter \`options.timeout\`) is not \`Infinity\`, or a number which is integer, positive, safe, and > 0!`);
			}
			this.#timeout = options.timeout;
		}
		this.#userAgent = options.userAgent ?? userAgentDefault;
	}
	/**
	 * Correctly load cache storage.
	 * @access private
	 * @returns {Promise<void>}
	 */
	async #cacheStorageLoad(): Promise<void> {
		if (typeof this.#cacheStorageDefer !== "undefined") {
			this.#cacheStorage = await this.#cacheStorageDefer;
			this.#cacheStorageDefer = undefined;
		}
	}
	/**
	 * Add HTTP status code that retryable.
	 * @param {number} value Value.
	 * @returns {this}
	 */
	addHTTPStatusCodeRetryable(value: number): this;
	/**
	 * Add HTTP status code that retryable.
	 * @param {number[]} values Values.
	 * @returns {this}
	 */
	addHTTPStatusCodeRetryable(values: number[]): this;
	/**
	 * Add HTTP status code that retryable.
	 * @param {...number} values Values.
	 * @returns {this}
	 */
	addHTTPStatusCodeRetryable(...values: number[]): this;
	addHTTPStatusCodeRetryable(...values: number[] | [number[]]): this {
		for (const value of values.flat()) {
			this.#httpStatusCodesRetryable.add(value);
		}
		return this;
	}
	/**
	 * Delete HTTP status code that not retryable.
	 * @param {number} value Value.
	 * @returns {this}
	 */
	deleteHTTPStatusCodeRetryable(value: number): this;
	/**
	 * Delete HTTP status code that not retryable.
	 * @param {number[]} values Values.
	 * @returns {this}
	 */
	deleteHTTPStatusCodeRetryable(values: number[]): this;
	/**
	 * Delete HTTP status code that not retryable.
	 * @param {...number} values Values.
	 * @returns {this}
	 */
	deleteHTTPStatusCodeRetryable(...values: number[]): this;
	deleteHTTPStatusCodeRetryable(...values: number[] | [number[]]): this {
		for (const value of values.flat()) {
			this.#httpStatusCodesRetryable.delete(value);
		}
		return this;
	}
	/**
	 * Fetch a resource from the network with extend features.
	 * 
	 * > **🛡️ Permissions**
	 * >
	 * > | **Target** | **Type** | **Coverage** |
	 * > |:--|:--|:--|
	 * > | Deno | Network (`allow-net`) | Resource |
	 * @param {string | URL} input URL of the resource.
	 * @param {RequestInit} [init] Custom setting that apply to the request.
	 * @returns {Promise<Response>} Response.
	 */
	async fetch(input: string | URL, init?: RequestInit): Promise<Response> {
		if (new URL(input).protocol === "file:") {
			return fetch(input, init);
		}
		const requestCacheOption: RequestCache | undefined = init?.cache;
		const requestCacheControl: boolean = new URL(input).protocol === "https:" && requestCacheOption !== "no-store" && (
			typeof init === "undefined" ||
			typeof init.method === "undefined" ||
			init.method.toUpperCase() === "GET"
		);
		const requestFuzzy: Request = new Request(input, {
			...init,
			cache: undefined,
			credentials: undefined,
			keepalive: undefined,
			method: init?.method?.toUpperCase(),
			mode: undefined,
			redirect: undefined,
			signal: undefined,
			window: undefined
		});
		let responseCached: Response | undefined = undefined;
		if (requestCacheControl && requestCacheOption !== "reload") {
			await this.#cacheStorageLoad();
			responseCached = await this.#cacheStorage?.match(requestFuzzy).catch();
		}
		if (requestCacheOption === "force-cache" && typeof responseCached !== "undefined") {
			return responseCached;
		}
		const responseCachedETag: string | undefined = responseCached?.headers.get("ETag") ?? undefined;
		const responseCachedLastModified: string | undefined = responseCached?.headers.get("Last-Modified") ?? undefined;
		let responseCachedIsValid = false;
		const requestHeaders: Headers = new Headers(init?.headers);
		if (!requestHeaders.has("If-Match") && !requestHeaders.has("If-None-Match") && !requestHeaders.has("If-Range") && typeof responseCachedETag !== "undefined") {
			responseCachedIsValid = true;
			requestHeaders.set("If-None-Match", responseCachedETag);
		}
		if (!requestHeaders.has("If-Modified-Since") && !requestHeaders.has("If-Unmodified-Since") && !requestHeaders.has("If-Range") && typeof responseCachedLastModified !== "undefined") {
			responseCachedIsValid = true;
			requestHeaders.set("If-Modified-Since", responseCachedLastModified!);
		}
		if (!requestHeaders.has("User-Agent") && this.#userAgent.length > 0) {
			requestHeaders.set("User-Agent", this.#userAgent);
		}
		const requestRedirectControl: boolean = this.#redirect.maximum !== Infinity && (
			typeof init === "undefined" ||
			typeof init.redirect === "undefined" ||
			init.redirect === "follow"
		);
		const requestSignal: AbortSignal | undefined = init?.signal ?? ((this.#timeout === Infinity) ? undefined : AbortSignal.timeout(this.#timeout));
		let requestFetchInput: string | URL = input;
		const requestFetchInit: RequestInit = {
			...init,
			headers: requestHeaders,
			redirect: requestRedirectControl ? "manual" : init?.redirect,
			signal: requestSignal
		};
		let redirects = 0;
		let retries = 0;
		let response: Response;
		do {
			response = await fetch(requestFetchInput, requestFetchInit);
			if (response.status === 304) {
				if (typeof responseCached !== "undefined" && responseCachedIsValid) {
					return responseCached;
				}
				break;
			}
			if (requestRedirectControl && httpStatusCodesRedirectable.has(response.status)) {
				if (redirects >= this.#redirect.maximum) {
					break;
				}
				const redirectURL: string | null = response.headers.get("Location");
				if (redirectURL === null) {
					break;
				}
				redirects += 1;
				try {
					requestFetchInput = new URL(redirectURL, input);
				} catch {
					break;
				}
				const delayTime: number = resolveDelayTime(this.#redirect.delay);
				if (typeof this.#redirect.onEvent !== "undefined") {
					void this.#redirect.onEvent({
						countCurrent: redirects,
						countMaximum: this.#redirect.maximum,
						redirectAfter: delayTime,
						redirectURL: new URL(requestFetchInput),
						statusCode: response.status,
						statusText: response.statusText
					});
				}
				await setDelay(delayTime, requestSignal);
				continue;
			}
			if (
				response.ok ||
				retries >= this.#retry.maximum ||
				!this.#httpStatusCodesRetryable.has(response.status)
			) {
				break;
			}
			retries += 1;
			let delayTime: number;
			try {
				delayTime = new HTTPHeaderRetryAfter(response).getRemainTimeMilliseconds();
			} catch {
				delayTime = resolveDelayTime(this.#retry.delay);
			}
			if (typeof this.#retry.onEvent !== "undefined") {
				void this.#retry.onEvent({
					countCurrent: retries,
					countMaximum: this.#retry.maximum,
					retryAfter: delayTime,
					retryURL: new URL(requestFetchInput),
					statusCode: response.status,
					statusText: response.statusText
				});
			}
			await setDelay(delayTime, requestSignal);
		} while (retries <= this.#retry.maximum);
		if (requestCacheControl && response.ok && (
			response.headers.has("ETag") ||
			response.headers.has("Last-Modified")
		)) {
			await this.#cacheStorageLoad();
			this.#cacheStorage?.put(requestFuzzy, response).catch();
		}
		return response;
	}
	/**
	 * Fetch paginate resources from the network.
	 * 
	 * > **⚠️ Important**
	 * >
	 * > Support URL paginate only.
	 * 
	 * > **🛡️ Permissions**
	 * >
	 * > | **Target** | **Type** | **Coverage** |
	 * > |:--|:--|:--|
	 * > | Deno | Network (`allow-net`) | Resource |
	 * @param {string | URL} input URL of the first page of the resources.
	 * @param {RequestInit} init Custom setting that apply to each request.
	 * @param {ExFetchPaginateOptions} [optionsOverride={}] Options.
	 * @returns {Promise<Response[]>} Responses.
	 */
	async fetchPaginate(input: string | URL, init?: RequestInit, optionsOverride: ExFetchPaginateOptions = {}): Promise<Response[]> {
		const options: ExFetchPaginateOptionsInternal = this.#resolvePaginateOptions("optionsOverride", optionsOverride);
		const responses: Response[] = [];
		for (let page = 1, uri: URL | null | undefined = new URL(input); page <= options.maximum && typeof uri !== "undefined" && uri !== null; page += 1) {
			if (page > 1) {
				const delayTime: number = resolveDelayTime(options.delay);
				if (typeof options.onEvent !== "undefined") {
					void options.onEvent({
						countCurrent: page,
						countMaximum: options.maximum,
						paginateAfter: delayTime,
						paginateURL: new URL(uri)
					});
				}
				await setDelay(delayTime, init?.signal ?? undefined);
			}
			const uriLookUp: URL = uri;
			uri = undefined;
			const response: Response = await this.fetch(uriLookUp, init);
			responses.push(response);
			if (response.ok) {
				let responseHeaderLink: HTTPHeaderLink;
				try {
					responseHeaderLink = HTTPHeaderLink.parse(response);
				} catch (error) {
					if (options.throwOnInvalidHeaderLink) {
						throw new SyntaxError(`[${uriLookUp.toString()}] ${error?.message ?? error}`);
					}
				}
				if (typeof responseHeaderLink! !== "undefined") {
					uri = options.linkUpNextPage({
						currentHeaderLink: responseHeaderLink,
						currentURL: uriLookUp
					});
				}
			}
		}
		return responses;
	}
	/**
	 * Fetch a resource from the network.
	 * 
	 * > **🛡️ Permissions**
	 * >
	 * > | **Target** | **Type** | **Coverage** |
	 * > |:--|:--|:--|
	 * > | Deno | Network (`allow-net`) | Resource |
	 * @param {string | URL} input URL of the resource.
	 * @param {RequestInit} init Custom setting that apply to the request.
	 * @param {ExFetchOptions} [options={}] Options.
	 * @returns {Promise<Response>} Response.
	 */
	static fetch(input: string | URL, init?: RequestInit, options: ExFetchOptions = {}): Promise<Response> {
		return new this(options).fetch(input, init);
	}
	/**
	 * Fetch paginate resources from the network.
	 * 
	 * > **⚠️ Important**
	 * >
	 * > Support URL paginate only.
	 * 
	 * > **🛡️ Permissions**
	 * >
	 * > | **Target** | **Type** | **Coverage** |
	 * > |:--|:--|:--|
	 * > | Deno | Network (`allow-net`) | Resource |
	 * @param {string | URL} input URL of the first page of the resources.
	 * @param {RequestInit} init Custom setting that apply to each request.
	 * @param {ExFetchOptions} [options={}] Options.
	 * @returns {Promise<Response[]>} Responses.
	 */
	static fetchPaginate(input: string | URL, init?: RequestInit, options: ExFetchOptions = {}): Promise<Response[]> {
		return new this(options).fetchPaginate(input, init);
	}
}
export default ExFetch;
/**
 * Fetch a resource from the network.
 * 
 * > **🛡️ Permissions**
 * >
 * > | **Target** | **Type** | **Coverage** |
 * > |:--|:--|:--|
 * > | Deno | Network (`allow-net`) | Resource |
 * @param {string | URL} input URL of the resource.
 * @param {RequestInit} init Custom setting that apply to the request.
 * @param {ExFetchOptions} [options={}] Options.
 * @returns {Promise<Response>} Response.
 */
export function exFetch(input: string | URL, init?: RequestInit, options: ExFetchOptions = {}): Promise<Response> {
	return new ExFetch(options).fetch(input, init);
}
/**
 * Fetch paginate resources from the network.
 * 
 * > **⚠️ Important**
 * >
 * > Support URL paginate only.
 * 
 * > **🛡️ Permissions**
 * >
 * > | **Target** | **Type** | **Coverage** |
 * > |:--|:--|:--|
 * > | Deno | Network (`allow-net`) | Resource |
 * @param {string | URL} input URL of the first page of the resources.
 * @param {RequestInit} init Custom setting that apply to each request.
 * @param {ExFetchOptions} [options={}] Options.
 * @returns {Promise<Response[]>} Responses.
 */
export function exFetchPaginate(input: string | URL, init?: RequestInit, options: ExFetchOptions = {}): Promise<Response[]> {
	return new ExFetch(options).fetchPaginate(input, init);
}
