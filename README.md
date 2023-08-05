# exFetch (Deno)

![License](https://img.shields.io/static/v1?label=License&message=MIT&style=flat-square "License")
[![GitHub Repository](https://img.shields.io/badge/Repository-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub Repository")](https://github.com/hugoalh-studio/exfetch-deno)
[![GitHub Stars](https://img.shields.io/github/stars/hugoalh-studio/exfetch-deno?label=Stars&logo=github&logoColor=ffffff&style=flat-square "GitHub Stars")](https://github.com/hugoalh-studio/exfetch-deno/stargazers)
[![GitHub Contributors](https://img.shields.io/github/contributors/hugoalh-studio/exfetch-deno?label=Contributors&logo=github&logoColor=ffffff&style=flat-square "GitHub Contributors")](https://github.com/hugoalh-studio/exfetch-deno/graphs/contributors)
[![GitHub Issues](https://img.shields.io/github/issues-raw/hugoalh-studio/exfetch-deno?label=Issues&logo=github&logoColor=ffffff&style=flat-square "GitHub Issues")](https://github.com/hugoalh-studio/exfetch-deno/issues)
[![GitHub Pull Requests](https://img.shields.io/github/issues-pr-raw/hugoalh-studio/exfetch-deno?label=Pull%20Requests&logo=github&logoColor=ffffff&style=flat-square "GitHub Pull Requests")](https://github.com/hugoalh-studio/exfetch-deno/pulls)
[![GitHub Discussions](https://img.shields.io/github/discussions/hugoalh-studio/exfetch-deno?label=Discussions&logo=github&logoColor=ffffff&style=flat-square "GitHub Discussions")](https://github.com/hugoalh-studio/exfetch-deno/discussions)
[![CodeFactor Grade](https://img.shields.io/codefactor/grade/github/hugoalh-studio/exfetch-deno?label=Grade&logo=codefactor&logoColor=ffffff&style=flat-square "CodeFactor Grade")](https://www.codefactor.io/repository/github/hugoalh-studio/exfetch-deno)

| **Releases** | **Latest** (![GitHub Latest Release Date](https://img.shields.io/github/release-date/hugoalh-studio/exfetch-deno?label=&style=flat-square "GitHub Latest Release Date")) | **Pre** (![GitHub Latest Pre-Release Date](https://img.shields.io/github/release-date-pre/hugoalh-studio/exfetch-deno?label=&style=flat-square "GitHub Latest Pre-Release Date")) |
|:-:|:-:|:-:|
| [![GitHub](https://img.shields.io/badge/GitHub-181717?logo=github&logoColor=ffffff&style=flat-square "GitHub")](https://github.com/hugoalh-studio/exfetch-deno/releases) ![GitHub Total Downloads](https://img.shields.io/github/downloads/hugoalh-studio/exfetch-deno/total?label=&style=flat-square "GitHub Total Downloads") | ![GitHub Latest Release Version](https://img.shields.io/github/release/hugoalh-studio/exfetch-deno?sort=semver&label=&style=flat-square "GitHub Latest Release Version") | ![GitHub Latest Pre-Release Version](https://img.shields.io/github/release/hugoalh-studio/exfetch-deno?include_prereleases&sort=semver&label=&style=flat-square "GitHub Latest Pre-Release Version") |

## 📝 Description

A Deno module to extend `fetch`.

This project is inspired from:

- [Deno - Standard Library - Async](https://deno.land/std/async)
- [jhermsmeier/node-http-link-header](https://github.com/jhermsmeier/node-http-link-header)
- [node-fetch/node-fetch](https://github.com/node-fetch/node-fetch)
- [octokit/plugin-paginate-rest.js](https://github.com/octokit/plugin-paginate-rest.js)

### 🌟 Feature

- Build in random retry delay.
- Build in retry request.
- Build in simplify paginate requests.

## 📚 Documentation (Excerpt)

For the full documentation, please visit the [GitHub Repository Wiki](https://github.com/hugoalh-studio/exfetch-deno/wiki).

### Getting Started

- Deno >= v1.35.0
  - **`allow-net` (Allow Network Addresses):** *Resources Domain*

```ts
/* Either */
import { ... } from "<URL>";// Named Import
import * as exFetch from "<URL>";// Namespace Import
import exFetch from "<URL>";// Default Import (Function `exFetch`)
```

| **Domain / Registry** | **URL** |
|:-:|:--|
| [Deno Land](https://deno.land/x/exfetch) | `https://deno.land/x/exfetch[@<Tag>]/mod.ts` |
| DenoPKG | `https://denopkg.com/hugoalh-studio/exfetch-deno[@<Tag>]/mod.ts` |
| GitHub Raw **\*** | `https://raw.githubusercontent.com/hugoalh-studio/exfetch-deno/<Tag>/mod.ts` |
| Pax | `https://pax.deno.dev/hugoalh-studio/exfetch-deno[@<Tag>]/mod.ts` |

**\*:** Must provide a tag.

### API

#### Class

- `ExFetch`

#### Function

- `exFetch`
- `exFetchPaginate`

#### Interface / Type

- `ExFetchEventName`
- `ExFetchEventOnRetryPayload`
- `ExFetchOptions`
- `ExFetchPaginateOptions`
- `ExFetchRetryOptions`

### Example

```ts
let responses: Response[] = await exFetchPaginate("https://api.github.com/repos/microsoft/vscode/labels?per_page=100");

responses.map((response: Response) => {
  return response.ok;
}).includes(false);
//=> false (`false` when no broken page, otherwise `true`)

let result = [];
for (let response in responses) {
  result = await response.json();
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
