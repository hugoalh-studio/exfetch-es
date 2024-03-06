# exFetch (TypeScript)

[**⚖️** MIT](./LICENSE.md)

**🗂️**
[![GitHub: hugoalh-studio/exfetch-ts](https://img.shields.io/badge/hugoalh--studio/exfetch--ts-181717?logo=github&logoColor=ffffff&style=flat "GitHub: hugoalh-studio/exfetch-ts")](https://github.com/hugoalh-studio/exfetch-ts)
[![Deno Land: exfetch](https://img.shields.io/badge/exfetch-000000?logo=deno&logoColor=ffffff&style=flat "Deno Land: exfetch")](https://deno.land/x/exfetch)
[![JSR: @hugoalh/exfetch](https://img.shields.io/badge/JSR-@hugoalh/exfetch-F7DF1E?labelColor=F7DF1E&logoColor=000000&style=flat "JSR: @hugoalh/exfetch")](https://jsr.io/@hugoalh/exfetch)

**🆙** ![Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/exfetch-ts?sort=semver&color=2187C0&label=&style=flat "Latest Release Version") (![Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/exfetch-ts?color=2187C0&label=&style=flat "Latest Release Date"))

A TypeScript module to extend `fetch`.

This project is inspired from:

- [Deno - Standard Library - Async](https://deno.land/std/async)
- axios ([GitHub](https://github.com/axios/axios))([NPM](https://www.npmjs.com/package/axios))
- jhermsmeier/node-http-link-header ([GitHub](https://github.com/jhermsmeier/node-http-link-header))([NPM](https://www.npmjs.com/package/http-link-header))
- node-fetch ([GitHub](https://github.com/node-fetch/node-fetch))([NPM](https://www.npmjs.com/package/node-fetch))
- octokit/plugin-paginate-rest.js ([GitHub](https://github.com/octokit/plugin-paginate-rest.js))([NPM](https://www.npmjs.com/package/@octokit/plugin-paginate-rest))
- octokit/plugin-retry.js ([GitHub](https://github.com/octokit/plugin-retry.js))([NPM](https://www.npmjs.com/package/@octokit/plugin-retry))
- sindresorhus/got ([GitHub](https://github.com/sindresorhus/got))([NPM](https://www.npmjs.com/package/got))
- sindresorhus/ky ([GitHub](https://github.com/sindresorhus/ky))([NPM](https://www.npmjs.com/package/ky))
- superagent ([GitHub](https://github.com/ladjs/superagent))([NPM](https://www.npmjs.com/package/superagent))
- thlorenz/parse-link-header ([GitHub](https://github.com/thlorenz/parse-link-header))([NPM](https://www.npmjs.com/package/parse-link-header))

## 🌟 Feature

- Ability to cache suitable `Request`-`Response`s to reduce network usage and response time.
- Automatically retry on failure requests, preferentially obey the response header `Retry-After`.
- Redirect fine control.
- Simplify URL paginate requests.

## 🎯 Target

- Bun ^ v1.0.0
- Cloudflare Workers
- Deno >= v1.35.0 / >= v1.41.1 *(Via JSR)*
  > **🛡️ Require Permission**
  >
  > - Network (`allow-net`)
  >   - *Resource*
- NodeJS >= v18.12.0

### 🔗 Other Edition

- [JavaScript](https://github.com/hugoalh-studio/exfetch-js)

## 🔰 Usage

### Via HTTPS

> **🎯 Supported Target**
>
> - Deno

1. Import at the script (`<ScriptName>.ts`):
    - Via Deno Land
      ```ts
      import ... from "https://deno.land/x/exfetch[@<Tag>]/mod.ts";
      ```
    - Via DenoPKG
      ```ts
      import ... from "https://denopkg.com/hugoalh-studio/exfetch-ts[@<Tag>]/mod.ts";
      ```
    - Via DenoPKG (Legacy)
      ```ts
      import ... from "https://denopkg.com/hugoalh-studio/exfetch-deno[@<Tag>]/mod.ts";
      ```
    - Via GitHub Raw (Require Tag)
      ```ts
      import ... from "https://raw.githubusercontent.com/hugoalh-studio/exfetch-ts/<Tag>/mod.ts";
      ```
    - Via GitHub Raw (Legacy)(Require Tag)
      ```ts
      import ... from "https://raw.githubusercontent.com/hugoalh-studio/exfetch-deno/<Tag>/mod.ts";
      ```
    - Via Pax
      ```ts
      import ... from "https://pax.deno.dev/hugoalh-studio/exfetch-ts[@<Tag>]/mod.ts";
      ```
    - Via Pax (Legacy)
      ```ts
      import ... from "https://pax.deno.dev/hugoalh-studio/exfetch-deno[@<Tag>]/mod.ts";
      ```
    > **ℹ️ Note**
    >
    > Although it is recommended to import the entire module with the main path `mod.ts`, it is also able to import part of the module with sub path if available, but do not import if:
    >
    > - it's file path has an underscore prefix (e.g.: `_foo.ts`, `_util/bar.ts`), or
    > - it is a benchmark or test file (e.g.: `foo.bench.ts`, `foo.test.ts`), or
    > - it's symbol has an underscore prefix (e.g.: `export function _baz() {}`).
    >
    > These elements are not considered part of the public API, thus no stability is guaranteed for them.

### Via JSR With Native Support

> **🎯 Supported Target**
>
> - Deno

1. Import at the script (`<ScriptName>.ts`):
    ```ts
    import ... from "jsr:@hugoalh/exfetch[@<Tag>]";
    ```
    > **ℹ️ Note**
    >
    > Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.

### Via JSR With NPM Compatibility Layer Support

> **🎯 Supported Target**
>
> - Bun
> - Cloudflare Workers
> - NodeJS

1. Install via console/shell/terminal:
    - Via Bun
      ```sh
      bunx jsr add @hugoalh/exfetch[@<Tag>]
      ```
    - Via NPM
      ```sh
      npx jsr add @hugoalh/exfetch[@<Tag>]
      ```
    - Via PNPM
      ```sh
      pnpm dlx jsr add @hugoalh/exfetch[@<Tag>]
      ```
    - Via Yarn
      ```sh
      yarn dlx jsr add @hugoalh/exfetch[@<Tag>]
      ```
2. Import at the script (`<ScriptName>.ts`):
    ```ts
    import ... from "@hugoalh/exfetch";
    ```
    > **ℹ️ Note**
    >
    > Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.

## 🧩 API (Excerpt)

> **ℹ️ Note**
>
> For the prettier documentation, can visit via:
>
> - [Deno CLI `deno doc`](https://deno.land/manual/tools/documentation_generator)
> - [JSR](https://jsr.io/@hugoalh/shuffle-array)

### Class

- `ExFetch`
- `HTTPHeaderLink`
- `HTTPHeaderRetryAfter`

### Function

- `exFetch`
- `exFetchPaginate`

## ✍️ Example

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
