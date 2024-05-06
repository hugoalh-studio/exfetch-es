# Security Policy

## Supported Versions

> ```mermaid
> ---
> title: Versions Status Flow
> ---
> flowchart LR
>   Unstable("Unstable")
>   Pre("Pre Release")
>   Release("Release")
>   LTS("Long Term Support")
>   Maintenance("Maintenance")
>   EOL("End Of Life")
>   Unstable --> Pre --> Release
>   subgraph Supported
>     Release -- Major = 0 --> Maintenance
>     Release -- Major > 0 --> LTS --> Maintenance
>   end
>   Maintenance --> EOL
> ```

| **Versions** | **Release Date** | **Long Term Support Date** | **End Of Life Date** |
|:-:|:-:|:-:|:-:|
| v0.5.X | 2024-04-16 | *N/A* | *Unknown* |
| v0.4.X (For Non-NPM) | 2024-03-25 | *N/A* | 2024-10-16 |
| v0.3.X (For NPM Only) | 2024-01-14 | *N/A* | 2024-10-16 |
| v0.3.X (For Non-NPM) | 2023-11-16 | *N/A* | 2024-10-16 |
| v0.2.X (For NPM Only) | 2023-11-16 | *N/A* | 2024-03-15 |

> **ℹ️ Note**
>
> - The date format is according to the specification ISO 8601.
> - Values in italic format are subject to change.
> - Versions which not in the list are also end of life.

## Report Vulnerabilities

You can report security vulnerabilities by [create security vulnerability report](https://github.com/hugoalh/hugoalh/blob/main/universal-guide/contributing.md#create-a-security-vulnerability-report).
