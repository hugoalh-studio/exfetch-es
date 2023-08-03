/**
 * @access private
 */
interface ExponentialBackoffWithJitterOptions {
	attempt: number;
	base: number;
	cap: number;
	jitter: number;
	multiplier: number;
}
/**
 * Exponential backoff with jitter. Port from "[Deno - Standard Library - Async - Retry](https://deno.land/std@0.196.0/async/retry.ts?s=_exponentialBackoffWithJitter)".
 * @param {ExponentialBackoffWithJitterOptions} options
 * @returns {number}
 */
export function exponentialBackoffWithJitter(options: ExponentialBackoffWithJitterOptions): number {
	return Math.ceil((1 - options.jitter * Math.random()) * Math.min(options.cap, options.base * options.multiplier ** options.attempt));
}
