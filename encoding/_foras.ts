import { deflate, Foras, gunzip, gzip, inflate, unzlib, zlib } from "https://deno.land/x/denoflate@2.0.8/src/deno/mod.ts";
let isForasInit = false;
function loadForas(): void {
	if (!isForasInit) {
		Foras.initSyncBundledOnce();
		isForasInit = true;
	}
}
/**
 * Deflate encode options.
 */
export interface DeflateEncodeOptions {
	compression?: Parameters<typeof deflate>[1];
}
/**
 * Deflate: A data compression algorithm.
 */
export class Deflate {
	/**
	 * Decode with Deflate data compression algorithm.
	 * @param {Uint8Array} input Input.
	 * @returns {Uint8Array} A decoded input.
	 */
	static decode(input: Uint8Array): Uint8Array {
		loadForas();
		return inflate(input);
	}
	/**
	 * Decode to string with Deflate data compression algorithm.
	 * @param {Uint8Array} input Input.
	 * @returns {string} A decoded input.
	 */
	static decodeToString(input: Uint8Array): string {
		loadForas();
		return new TextDecoder().decode(inflate(input));
	}
	/**
	 * Encode with Deflate data compression algorithm.
	 * @param {string | Uint8Array} input Input.
	 * @param {DeflateEncodeOptions} [options={}] Options.
	 * @returns {Uint8Array} An encoded input.
	 */
	static encode(input: string | Uint8Array, options: DeflateEncodeOptions = {}): Uint8Array {
		loadForas();
		return deflate((typeof input === "string") ? new TextEncoder().encode(input) : input, options.compression);
	}
	static slug = "deflate";
	/** @alias encode */static compress = this.encode;
	/** @alias decode */static decompress = this.decode;
	/** @alias decodeToString */static decompressToString = this.decodeToString;
}
/**
 * Gzip encode options.
 */
export interface GzipEncodeOptions {
	compression?: Parameters<typeof gzip>[1];
}
/**
 * Gzip: A data compression algorithm.
 */
export class Gzip {
	/**
	 * Decode with Gzip data compression algorithm.
	 * @param {Uint8Array} input Input.
	 * @returns {Uint8Array} A decoded input.
	 */
	static decode(input: Uint8Array): Uint8Array {
		loadForas();
		return gunzip(input);
	}
	/**
	 * Decode to string with Gzip data compression algorithm.
	 * @param {Uint8Array} input Input.
	 * @returns {string} A decoded input.
	 */
	static decodeToString(input: Uint8Array): string {
		loadForas();
		return new TextDecoder().decode(gunzip(input));
	}
	/**
	 * Encode with Gzip data compression algorithm.
	 * @param {string | Uint8Array} input Input.
	 * @param {GzipEncodeOptions} [options={}] Options.
	 * @returns {Uint8Array} An encoded input.
	 */
	static encode(input: string | Uint8Array, options: GzipEncodeOptions = {}): Uint8Array {
		loadForas();
		return gzip((typeof input === "string") ? new TextEncoder().encode(input) : input, options.compression);
	}
	static slug = "gzip";
	/** @alias encode */static compress = this.encode;
	/** @alias decode */static decompress = this.decode;
	/** @alias decodeToString */static decompressToString = this.decodeToString;
}
/**
 * Zlib encode options.
 * @note Non standard data compression algorithm for HTTP.
 */
export interface ZlibEncodeOptions {
	compression?: Parameters<typeof zlib>[1];
}
/**
 * Zlib: A data compression algorithm.
 * @note Non standard data compression algorithm for HTTP.
 */
export class Zlib {
	/**
	 * Decode with Zlib data compression algorithm.
	 * @param {Uint8Array} input Input.
	 * @returns {Uint8Array} A decoded input.
	 */
	static decode(input: Uint8Array): Uint8Array {
		loadForas();
		return unzlib(input);
	}
	/**
	 * Decode to string with Zlib data compression algorithm.
	 * @param {Uint8Array} input Input.
	 * @returns {string} A decoded input.
	 */
	static decodeToString(input: Uint8Array): string {
		loadForas();
		return new TextDecoder().decode(unzlib(input));
	}
	/**
	 * Encode with Zlib data compression algorithm.
	 * @param {string | Uint8Array} input Input.
	 * @param {ZlibEncodeOptions} [options={}] Options.
	 * @returns {Uint8Array} An encoded input.
	 */
	static encode(input: string | Uint8Array, options: ZlibEncodeOptions = {}): Uint8Array {
		loadForas();
		return zlib((typeof input === "string") ? new TextEncoder().encode(input) : input, options.compression);
	}
	/** @alias encode */static compress = this.encode;
	/** @alias decode */static decompress = this.decode;
	/** @alias decodeToString */static decompressToString = this.decodeToString;
}
