const parametersNeedLowerCaseValue: Set<string> = new Set<string>(["rel", "type"]);
/**
 * Check URI.
 * @access private
 * @param {string} uri
 * @returns {void}
 */
function checkURI(uri: string): void {
	if (/\r?\n|\s|\t/u.test(uri)) {
		throw new SyntaxError(`Whitespace characters must not exist in URI!`);
	}
}
/**
 * Cursor whitespace skipper.
 * @access private
 * @param {string} value
 * @param {number} cursor
 * @returns {number} Number of moves.
 */
function cursorWhitespaceSkipper(value: string, cursor: number): number {
	let valueAfterCursor: string = value.slice(cursor);
	return (valueAfterCursor.length - valueAfterCursor.trimStart().length);
}
export type HTTPHeaderLinkEntry = [uri: string, parameters: Record<string, string>];
/**
 * Parse and stringify as HTTP header `Link` according to RFC 8288 standard.
 */
export class HTTPHeaderLink {
	#entries: HTTPHeaderLinkEntry[] = [];
	/**
	 * @param {string | Headers | HTTPHeaderLink | HTTPHeaderLinkEntry[] | Response} [value]
	 */
	constructor(value?: string | Headers | HTTPHeaderLink | HTTPHeaderLinkEntry[] | Response) {
		if (typeof value === "string") {
			this.#parse(value);
		} else if (value instanceof Headers) {
			this.#parse(value.get("Link") ?? "");
		} else if (value instanceof HTTPHeaderLink) {
			this.#entries = [...value.#entries];
		} else if (Array.isArray(value)) {
			this.add(value);
		} else if (value instanceof Response) {
			this.#parse(value.headers.get("Link") ?? "");
		} else if (typeof value !== "undefined") {
			throw new TypeError(`Argument \`value\` must be instance of Headers, HTTPHeaderLink, or Response, or type of string or undefined!`);
		}
	}
	/**
	 * @param {string} value
	 * @returns {void}
	 */
	#parse(value: string): void {
		if (typeof value !== "string") {
			throw new TypeError(`Argument \`value\` must be type of string!`);
		}
		let valueResolve: string = value.replace(/[\uFEFF\u00A0]/gu, "");// Remove unicode characters of BOM (Byte Order Mark) and no-break space.
		for (let cursor = 0; cursor < valueResolve.length; cursor += 1) {
			cursor += cursorWhitespaceSkipper(valueResolve, cursor);
			if (valueResolve.charAt(cursor) !== "<") {
				throw new SyntaxError(`Unexpected character "${valueResolve.charAt(cursor)}" at position ${cursor}; Expect character "<"!`);
			}
			cursor += 1;
			let cursorEndURI: number = valueResolve.indexOf(">", cursor);
			if (cursorEndURI === -1) {
				throw new SyntaxError(`Missing end of URI delimiter character ">" after position ${cursor}!`);
			}
			if (cursorEndURI === cursor) {
				throw new SyntaxError(`Missing URI at position ${cursor}!`);
			}
			let uriSlice: string = valueResolve.slice(cursor, cursorEndURI);
			checkURI(uriSlice);
			let uri: HTTPHeaderLinkEntry[0] = decodeURI(uriSlice);
			let parameters: HTTPHeaderLinkEntry[1] = {};
			cursor = cursorEndURI + 1;
			cursor += cursorWhitespaceSkipper(valueResolve, cursor);
			if (
				cursor === valueResolve.length ||
				valueResolve.charAt(cursor) === ","
			) {
				this.#entries.push([uri, parameters]);
				continue;
			}
			if (valueResolve.charAt(cursor) !== ";") {
				throw new SyntaxError(`Unexpected character "${valueResolve.charAt(cursor)}" at position ${cursor}; Expect character ";"!`);
			}
			cursor += 1;
			while (cursor < valueResolve.length) {
				cursor += cursorWhitespaceSkipper(valueResolve, cursor);
				let parameterName: string | undefined = valueResolve.slice(cursor).match(/^[\w-]+\*?/u)?.[0].toLowerCase();
				if (typeof parameterName === "undefined") {
					throw new SyntaxError(`Unexpected character "${valueResolve.charAt(cursor)}" at position ${cursor}; Expect a valid parameter name!`);
				}
				cursor += parameterName.length;
				cursor += cursorWhitespaceSkipper(valueResolve, cursor);
				if (
					cursor === valueResolve.length ||
					valueResolve.charAt(cursor) === ","
				) {
					parameters[parameterName] = "";
					cursor += 1;
					break;
				}
				if (valueResolve.charAt(cursor) === ";") {
					parameters[parameterName] = "";
					cursor += 1;
					continue;
				}
				if (valueResolve.charAt(cursor) !== "=") {
					throw new SyntaxError(`Unexpected character "${valueResolve.charAt(cursor)}" at position ${cursor}; Expect character "="!`);
				}
				cursor += 1;
				cursor += cursorWhitespaceSkipper(valueResolve, cursor);
				let parameterValue = "";
				if (valueResolve.charAt(cursor) === "\"") {
					cursor += 1;
					while (cursor < valueResolve.length) {
						if (valueResolve.charAt(cursor) === "\"") {
							cursor += 1;
							break;
						}
						if (valueResolve.charAt(cursor) === "\\") {
							cursor += 1;
						}
						parameterValue += valueResolve.charAt(cursor);
						cursor += 1;
					}
				} else {
					let cursorDiffParameterValue: number = valueResolve.slice(cursor).search(/[\s;,]/u);
					if (cursorDiffParameterValue === -1) {
						parameterValue += valueResolve.slice(cursor);
						parameters[parameterName] = parameterValue;
						cursor += parameterValue.length;
						break;
					}
					parameterValue += valueResolve.slice(cursor, cursorDiffParameterValue);
					parameters[parameterName] = parameterValue;
					cursor += cursorDiffParameterValue;
					cursor += cursorWhitespaceSkipper(valueResolve, cursor);
					if (
						cursor === valueResolve.length ||
						valueResolve.charAt(cursor) === ","
					) {
						cursor += 1;
						break;
					}
					if (valueResolve.charAt(cursor) === ";") {
						cursor += 1;
						continue;
					}
					throw new SyntaxError(`Unexpected character "${valueResolve.charAt(cursor)}" at position ${cursor}; Expect character "," or ";", or end of the string!`);
				}
			}
			for (let [name, value] of Object.entries(parameters)) {
				if (parametersNeedLowerCaseValue.has(name)) {
					parameters[name] = value.toLowerCase();
				}
			}
			this.#entries.push([uri, parameters]);
		}
	}
	/**
	 * Add entries.
	 * @param {string | Headers | HTTPHeaderLink | HTTPHeaderLinkEntry[] | Response} value Entries.
	 * @returns {this}
	 */
	add(value: string | Headers | HTTPHeaderLink | HTTPHeaderLinkEntry[] | Response): this {
		if (typeof value === "string") {
			this.#parse(value);
		} else if (value instanceof Headers) {
			this.#parse(value.get("Link") ?? "");
		} else if (value instanceof HTTPHeaderLink) {
			this.#entries.push(...value.#entries);
		} else if (Array.isArray(value)) {
			for (let entry of value) {
				if (entry.length !== 2) {
					throw new SyntaxError(`Invalid entry columns!`);
				}
				let [uri, parameters] = entry;
				checkURI(uri);
				let parametersResolve: HTTPHeaderLinkEntry[1] = {};
				for (let [name, value] of Object.entries(parameters)) {
					let nameLowerCase = name.toLowerCase();
					if (!(/^[\w-]+?\*?$/u.test(nameLowerCase))) {
						throw new SyntaxError(`\`${nameLowerCase}\` is not a valid parameter name!`);
					}
					if (parametersNeedLowerCaseValue.has(nameLowerCase)) {
						parametersResolve[nameLowerCase] = value.toLowerCase();
					}
				}
				this.#entries.push([uri, parametersResolve]);
			}
		} else if (value instanceof Response) {
			this.#parse(value.headers.get("Link") ?? "");
		} else {
			throw new TypeError(`Argument \`value\` must be instance of Headers, HTTPHeaderLink, or Response, or type of string or undefined!`);
		}
		return this;
	}
	/**
	 * Return all of the entries.
	 * @returns {HTTPHeaderLinkEntry[]} Entries.
	 */
	entries(): HTTPHeaderLinkEntry[] {
		return [...this.#entries];
	}
	/**
	 * Get entries by parameter.
	 * @param {string} name Name of the parameter.
	 * @param {string} value Value of the parameter.
	 * @returns {HTTPHeaderLinkEntry[]} Entries.
	 */
	getByParameter(name: string, value: string): HTTPHeaderLinkEntry[] {
		let nameLowerCase: string = name.toLowerCase();
		if (nameLowerCase === "rel") {
			return this.getByRel(value);
		}
		return this.#entries.filter((entry: HTTPHeaderLinkEntry): boolean => {
			return (entry[1][nameLowerCase] === value);
		});
	}
	/**
	 * Get entries by parameter `rel`.
	 * @param {string} value Value of the parameter `rel`.
	 * @returns {HTTPHeaderLinkEntry[]} Entries.
	 */
	getByRel(value: string): HTTPHeaderLinkEntry[] {
		let valueLowerCase: string = value.toLowerCase();
		return this.#entries.filter((entity: HTTPHeaderLinkEntry): boolean => {
			return (entity[1].rel?.toLowerCase() === valueLowerCase);
		});
	}
	/**
	 * Whether have entries by parameter.
	 * @param {string} name Name of the parameter.
	 * @param {string} value Value of the parameter.
	 * @returns {boolean} Result.
	 */
	hasParameter(name: string, value: string): boolean {
		return (this.getByParameter(name, value).length > 0);
	}
	/**
	 * Stringify entries.
	 * @returns {string} Stringified entries.
	 */
	toString(): string {
		return this.#entries.map((entry: HTTPHeaderLinkEntry): string => {
			let [uri, parameters] = entry;
			let result = `<${encodeURI(uri)}>`;
			for (let [name, value] of Object.entries(parameters)) {
				result += `; ${name}="${value.replace(/"/g, "\\\"")}"`;
			}
			return result;
		}).join(", ");
	}
	/**
	 * Parse HTTP header `Link` according to RFC 8288 standard.
	 * @param {string | Headers | HTTPHeaderLink | Response} value
	 * @returns {HTTPHeaderLink}
	 */
	static parse(value: string | Headers | HTTPHeaderLink | Response): HTTPHeaderLink {
		if (typeof value === "undefined") {
			throw new TypeError(`Argument \`value\` must be instance of Headers, HTTPHeaderLink, or Response, or type of string!`);
		}
		return new this(value);
	}
	/**
	 * Stringify as HTTP header `Link` according to RFC 8288 standard.
	 * @param {HTTPHeaderLinkEntry[]} value
	 * @returns {string}
	 */
	static stringify(value: HTTPHeaderLinkEntry[]): string {
		if (!Array.isArray(value)) {
			throw new TypeError(`Argument \`value\` must be instance of HTTPHeaderLinkEntry[]!`);
		}
		return new this(value).toString();
	}
}
export default HTTPHeaderLink;
