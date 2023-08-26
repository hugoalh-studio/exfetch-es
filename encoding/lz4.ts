import { compress, decompress } from "https://deno.land/x/lz4@v0.1.2/mod.ts";
/**
 * LZ4: A data compression algorithm.
 * @note Non standard data compression algorithm for HTTP.
 */
export class LZ4 {
	/**
	 * Decode with LZ4 data compression algorithm.
	 * @param {Uint8Array} input Input.
	 * @returns {Uint8Array} A decoded input.
	 */
	static decode(input: Uint8Array): Uint8Array {
		return decompress(input);
	}
	/**
	 * Decode to string with LZ4 data compression algorithm.
	 * @param {Uint8Array} input Input.
	 * @returns {string} A decoded input.
	 */
	static decodeToString(input: Uint8Array): string {
		return new TextDecoder().decode(decompress(input));
	}
	/**
	 * Encode with LZ4 data compression algorithm.
	 * @param {string | Uint8Array} input Input.
	 * @returns {Uint8Array} An encoded input.
	 */
	static encode(input: string | Uint8Array): Uint8Array {
		return compress((typeof input === "string") ? new TextEncoder().encode(input) : input);
	}
	/** @alias encode */static compress = this.encode;
	/** @alias decode */static decompress = this.decode;
	/** @alias decodeToString */static decompressToString = this.decodeToString;
}
export default LZ4;
