# exFetch (ES)

[**⚖️** MIT](./LICENSE.md)

[![Deno Land: exfetch](https://img.shields.io/badge/dynamic/json?label=exfetch&labelColor=000000&logo=deno&logoColor=ffffff&style=flat&url=https%3A%2F%2Fapiland.deno.dev%2Fv2%2Fmodules%2Fexfetch&query=%24.latest_version "Deno Land: exfetch")](https://deno.land/x/exfetch)
[![GitHub: hugoalh-studio/exfetch-es](https://img.shields.io/github/v/release/hugoalh-studio/exfetch-es?label=hugoalh-studio/exfetch-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh-studio/exfetch-es")](https://github.com/hugoalh-studio/exfetch-es)
[![JSR: @hugoalh/exfetch](https://img.shields.io/jsr/v/@hugoalh/exfetch?label=JSR%20@hugoalh/exfetch&labelColor=F7DF1E&logoColor=000000&style=flat "JSR: @hugoalh/exfetch")](https://jsr.io/@hugoalh/exfetch)
[![NPM: @hugoalh/exfetch](https://img.shields.io/npm/v/@hugoalh/exfetch?label=@hugoalh/exfetch&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/exfetch")](https://www.npmjs.com/package/@hugoalh/exfetch)

An ES (JavaScript & TypeScript) module to extend `fetch`.

## 🌟 Features

- Ability to cache suitable `Request`-`Response`s to reduce network usage and response time.
- Automatically retry on failure requests, preferentially obey the response header `Retry-After`.
- Redirect fine control.
- Simplify URL paginate requests.

## 🔰 Begin

### 🎯 Targets

|  | **Registry - JSR** | **Registry - NPM** | **Remote Import** |
|:--|:--|:--|:--|
| **[Bun](https://bun.sh/)** >= v1.1.0 | [✔️ `node_modules`](https://jsr.io/docs/npm-compatibility) | [✔️ Specifier `npm:`](https://bun.sh/docs/runtime/autoimport) | ❌ |
| **[Cloudflare Workers](https://workers.cloudflare.com/)** | [✔️ `node_modules`](https://jsr.io/docs/with/cloudflare-workers) | [✔️ `node_modules`](https://docs.npmjs.com/using-npm-packages-in-your-projects) | ❌ |
| **[Deno](https://deno.land/)** >= v1.42.0 | [✔️ Specifier `jsr:`](https://jsr.io/docs/with/deno) | [✔️ Specifier `npm:`](https://docs.deno.com/runtime/manual/node/npm_specifiers) | [✔️](https://docs.deno.com/runtime/manual/basics/modules/#remote-import) |
| **[NodeJS](https://nodejs.org/)** >= v18.12.0 | [✔️ `node_modules`](https://jsr.io/docs/with/node) | [✔️ `node_modules`](https://docs.npmjs.com/using-npm-packages-in-your-projects) | ❌ |

> **ℹ️ Note**
>
> It is possible to use this module in other methods/ways which not listed in here, however it is not officially supported.

### #️⃣ Registries Identifier

- **JSR:**
  ```
  @hugoalh/exfetch
  ```
- **NPM:**
  ```
  @hugoalh/exfetch
  ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to use this module with tag for immutability.

### #️⃣ Remote Import Paths

- **GitHub Raw:** (Require Tag)
  ```
  https://raw.githubusercontent.com/hugoalh-studio/exfetch-es/${Tag}/mod.ts
  ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module with the main path `mod.ts`, it is also able to import part of the module with sub path if available, but do not import if:
>
>   - it's file path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
>   - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
>   - it's symbol has an underscore prefix (e.g.: `export function _baz() {}`).
>
>   These elements are not considered part of the public API, thus no stability is guaranteed for them.
> - Although there have 3rd party services which provide enhanced, equal, or similar methods/ways to remote import the module, beware these services maybe inject unrelated elements and thus affect the security.

### 🛡️ Permissions

| **Target** | **Type** | **Coverage** |
|:--|:--|:--|
| Deno | Network (`allow-net`) | Resource |

## 🧩 APIs

- ```ts
  class ExFetch {
    constructor(options: ExFetchOptions = {}): ExFetch;
    addHTTPStatusCodeRetryable(value: number): this;
    addHTTPStatusCodeRetryable(values: number[]): this;
    addHTTPStatusCodeRetryable(...values: number[]): this;
    deleteHTTPStatusCodeRetryable(value: number): this;
    deleteHTTPStatusCodeRetryable(values: number[]): this;
    deleteHTTPStatusCodeRetryable(...values: number[]): this;
    fetch(input: string | URL, init?: RequestInit): Promise<Response>;
    fetchPaginate(input: string | URL, init?: RequestInit, optionsOverride: ExFetchPaginateOptions = {}): Promise<Response[]>;
    static fetch(input: string | URL, init?: RequestInit, options: ExFetchOptions = {}): Promise<Response>;
    static fetchPaginate(input: string | URL, init?: RequestInit, options: ExFetchOptions = {}): Promise<Response[]>;
  }
  ```
- ```ts
  const userAgentDefault: string;
  ```
- ```ts
  function exFetch(input: string | URL, init?: RequestInit, options: ExFetchOptions = {}): Promise<Response>;
  ```
- ```ts
  function exFetchPaginate(input: string | URL, init?: RequestInit, options: ExFetchOptions = {}): Promise<Response[]>;
  ```
- ```ts
  interface ExFetchDelayOptions {
    /**
     * Maximum time per delay, by milliseconds.
     */
    maximum?: number;
    /**
     * Minimum time per delay, by milliseconds.
     */
    minimum?: number;
  }
  ```
- ```ts
  interface ExFetchEventCommonPayload {
    /**
     * Status code of the current response.
     */
    statusCode: Response["status"];
    /**
     * Status text of the current response.
     */
    statusText: Response["statusText"];
  }
  ```
- ```ts
  interface ExFetchEventPaginatePayload {
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
  ```
- ```ts
  interface ExFetchEventRedirectPayload extends ExFetchEventCommonPayload {
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
  ```
- ```ts
  interface ExFetchEventRetryPayload extends ExFetchEventCommonPayload {
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
  ```
- ```ts
  interface ExFetchOptions {
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
  ```
- ```ts
  interface ExFetchPaginateLinkUpPayload {
    /**
     * Header link of the current page.
     */
    currentHeaderLink: HTTPHeaderLink;
    /**
     * URL of the current page.
     */
    currentURL: URL;
  }
  ```
- ```ts
  interface ExFetchPaginateOptions {
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
  ```
- ```ts
  interface ExFetchRedirectOptions {
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
  ```
- ```ts
  interface ExFetchRetryOptions {
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
  ```

> **ℹ️ Note**
>
> For the prettier documentation, can visit via:
>
> - [Deno CLI `deno doc`](https://deno.land/manual/tools/documentation_generator)
> - [Deno Land](https://deno.land/x/exfetch)
> - [JSR](https://jsr.io/@hugoalh/exfetch)

## ✍️ Examples

- ```ts
  const responses: Response[] = await exFetchPaginate("https://api.github.com/repos/microsoft/vscode/labels?per_page=100");

  responses.map((response: Response) => {
    return response.ok;
  }).includes(false);
  //=> false (`false` when no broken page, otherwise `true`)

  const result = [];
  for (const response of responses) {
    result.push(...(await response.json()));
  }
  result;
  /*=>
  [
    {
      "id": 2339554941,
      "node_id": "MDU6TGFiZWwyMzM5NTU0OTQx",
      "url": "https://api.github.com/repos/microsoft/vscode/labels/:apple:%20si",
      "name": ":apple: si",
      "color": "e99695",
      "default": false,
      "description": "Issues related to apple silicon"
    },
    {
      "id": 421131022,
      "node_id": "MDU6TGFiZWw0MjExMzEwMjI=",
      "url": "https://api.github.com/repos/microsoft/vscode/labels/*as-designed",
      "name": "*as-designed",
      "color": "E2A1C2",
      "default": false,
      "description": "Described behavior is as designed"
    },
    {
      "id": 409283388,
      "node_id": "MDU6TGFiZWw0MDkyODMzODg=",
      "url": "https://api.github.com/repos/microsoft/vscode/labels/*caused-by-extension",
      "name": "*caused-by-extension",
      "color": "E2A1C2",
      "default": false,
      "description": "Issue identified to be caused by an extension"
    },
    {
      "id": 766755777,
      "node_id": "MDU6TGFiZWw3NjY3NTU3Nzc=",
      "url": "https://api.github.com/repos/microsoft/vscode/labels/*dev-question",
      "name": "*dev-question",
      "color": "E2A1C2",
      "default": false,
      "description": "VS Code Extension Development Question"
    },
    {
      "id": 366106217,
      "node_id": "MDU6TGFiZWwzNjYxMDYyMTc=",
      "url": "https://api.github.com/repos/microsoft/vscode/labels/*duplicate",
      "name": "*duplicate",
      "color": "E2A1C2",
      "default": false,
      "description": "Issue identified as a duplicate of another issue(s)"
    },
    ... +467
  ]
  */
  ```
