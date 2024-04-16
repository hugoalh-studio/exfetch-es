# exFetch (ES)

[**⚖️** MIT](./LICENSE.md)

[![Deno Land: exfetch](https://img.shields.io/badge/dynamic/json?label=exfetch&labelColor=000000&logo=deno&logoColor=ffffff&style=flat&url=https%3A%2F%2Fapiland.deno.dev%2Fv2%2Fmodules%2Fexfetch&query=%24.latest_version "Deno Land: exfetch")](https://deno.land/x/exfetch)
[![GitHub: hugoalh-studio/exfetch-es](https://img.shields.io/github/v/release/hugoalh-studio/exfetch-es?label=hugoalh-studio/exfetch-es&labelColor=181717&logo=github&logoColor=ffffff&sort=semver&style=flat "GitHub: hugoalh-studio/exfetch-es")](https://github.com/hugoalh-studio/exfetch-es)
[![JSR: @hugoalh/exfetch](https://img.shields.io/jsr/v/@hugoalh/exfetch?label=JSR%20@hugoalh/exfetch&labelColor=F7DF1E&logoColor=000000&style=flat "JSR: @hugoalh/exfetch")](https://jsr.io/@hugoalh/exfetch)
[![NPM: @hugoalh/exfetch](https://img.shields.io/npm/v/@hugoalh/exfetch?label=@hugoalh/exfetch&labelColor=CB3837&logo=npm&logoColor=ffffff&style=flat "NPM: @hugoalh/exfetch")](https://www.npmjs.com/package/@hugoalh/exfetch)

An ES (JavaScript & TypeScript) module to extend `fetch`.

## 🌟 Feature

- Ability to cache suitable `Request`-`Response`s to reduce network usage and response time.
- Automatically retry on failure requests, preferentially obey the response header `Retry-After`.
- Redirect fine control.
- Simplify URL paginate requests.

## 🎯 Target

- Bun ^ v1.0.0
- Cloudflare Workers
- Deno >= v1.35.0 / >= v1.41.1 (For JSR Only)
  > **🛡️ Require Permission**
  >
  > - Network (`allow-net`)
- NodeJS >= v18.12.0

## 🔰 Usage

### Via JSR With `node_modules`

> **🎯 Supported Target**
>
> - Bun
> - Cloudflare Workers
> - NodeJS

1. Install via:
    - Bun
      ```sh
      bunx jsr add @hugoalh/exfetch[@${Tag}]
      ```
    - NPM
      ```sh
      npx jsr add @hugoalh/exfetch[@${Tag}]
      ```
    - PNPM
      ```sh
      pnpm dlx jsr add @hugoalh/exfetch[@${Tag}]
      ```
    - Yarn
      ```sh
      yarn dlx jsr add @hugoalh/exfetch[@${Tag}]
      ```
2. Import at the script:
    ```ts
    import ... from "@hugoalh/exfetch";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via JSR With Specifier

> **🎯 Supported Target**
>
> - Deno

1. Import at the script:
    ```ts
    import ... from "jsr:@hugoalh/exfetch[@${Tag}]";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via NPM With `node_modules`

> **🎯 Supported Target**
>
> - Cloudflare Workers
> - NodeJS

1. Install via:
    - NPM
      ```sh
      npm install @hugoalh/exfetch[@${Tag}]
      ```
    - PNPM
      ```sh
      pnpm add @hugoalh/exfetch[@${Tag}]
      ```
    - Yarn
      ```sh
      yarn add @hugoalh/exfetch[@${Tag}]
      ```
2. Import at the script:
    ```ts
    import ... from "@hugoalh/exfetch";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via NPM With Specifier

> **🎯 Supported Target**
>
> - Bun
> - Deno

1. Import at the script:
    ```ts
    import ... from "npm:@hugoalh/exfetch[@${Tag}]";
    ```

> **ℹ️ Note**
>
> - Although it is recommended to import the entire module, it is also able to import part of the module with sub path if available, please visit [file `jsr.jsonc`](./jsr.jsonc) property `exports` for available sub paths.
> - It is recommended to import the module with tag for immutability.

### Via Remote Import

> **🎯 Supported Target**
>
> - Deno

1. Import at the script via:
    - Deno Land
      ```ts
      import ... from "https://deno.land/x/exfetch[@${Tag}]/mod.ts";
      ```
    - GitHub Raw (Require Tag)
      ```ts
      import ... from "https://raw.githubusercontent.com/hugoalh-studio/exfetch-es/${Tag}/mod.ts";
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
> - It is recommended to import the module with tag for immutability.

## 🧩 API

> **ℹ️ Note**
>
> For the prettier documentation, can visit via:
>
> - [Deno CLI `deno doc`](https://deno.land/manual/tools/documentation_generator)
> - [Deno Land](https://deno.land/x/exfetch)
> - [JSR](https://jsr.io/@hugoalh/exfetch)

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
