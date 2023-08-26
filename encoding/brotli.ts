import { compress, decompress } from "https://deno.land/x/brotli@0.1.7/mod.ts";
/**
 * Brotli decode options.
 */
export interface BrotliDecodeOptions {
	/**
	 * Read buffer size.
	 * @default 4096
	 */
	bufferSize?: Parameters<typeof decompress>[1];
}
/**
 * Brotli encode options.
 */
export interface BrotliEncodeOptions {
	/**
	 * Read buffer size.
	 * @default 4096
	 */
	bufferSize?: Parameters<typeof compress>[1];
	/**
	 * Base 2 logarithm of the sliding window size.
	 * @default 22
	 */
	lgwin?: Parameters<typeof compress>[3];
	/**
	 * Controls the compression-speed vs compression-density tradeoff. The higher the quality, the slower the compression.
	 * @default 6
	 */
	quality?: Parameters<typeof compress>[2];
}
/**
 * Brotli: A data compression algorithm.
 */
export class Brotli {
	/**
	 * Decode with Brotli data compression algorithm.
	 * @param {Uint8Array} input Input.
	 * @param {BrotliDecodeOptions} [options={}] Options.
	 * @returns {Uint8Array} A decoded input.
	 */
	static decode(input: Uint8Array, options: BrotliDecodeOptions = {}): Uint8Array {
		return decompress(input, options.bufferSize);
	}
	/**
	 * Decode to string with Brotli data compression algorithm.
	 * @param {Uint8Array} input Input.
	 * @param {BrotliDecodeOptions} [options={}] Options.
	 * @returns {string} A decoded input.
	 */
	static decodeToString(input: Uint8Array, options: BrotliDecodeOptions = {}): string {
		return new TextDecoder().decode(decompress(input, options.bufferSize));
	}
	/**
	 * Encode with Brotli data compression algorithm.
	 * @param {string | Uint8Array} input Input.
	 * @param {BrotliEncodeOptions} [options={}] Options.
	 * @returns {Uint8Array} An encoded input.
	 */
	static encode(input: string | Uint8Array, options: BrotliEncodeOptions = {}): Uint8Array {
		return compress((typeof input === "string") ? new TextEncoder().encode(input) : input, options.bufferSize, options.quality, options.lgwin);
	}
	static slug = "br";
	/** @alias encode */static compress = this.encode;
	/** @alias decode */static decompress = this.decode;
	/** @alias decodeToString */static decompressToString = this.decodeToString;
}
export default Brotli;
