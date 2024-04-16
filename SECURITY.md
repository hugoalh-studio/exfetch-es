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
>   Unstable --> Pre
>   Pre --> Release
>   subgraph Support
>     Release -- Major = 0 --> Maintenance
>     Release -- Major > 0 --> LTS
>     LTS --> Maintenance
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
> - The date format is according to ISO 8601 standard.
> - Values in italic format are subject to change.
> - Versions which not in the list are also end of life.

## Report A Vulnerability

You can report a security vulnerability by [create a security vulnerability report](https://github.com/hugoalh/hugoalh/blob/main/universal-guide/contributing.md#create-a-security-vulnerability-report).
