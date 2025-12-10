# CloudWatch Application Signals for Lambda demo

> It seems to be based on OpenTelemetry and currently supports Python and Node.js runtimes, but does it also work with Node.js functions using ECMAScript modules (ESM)? — the documentation doesn't tell 🤔 — [Niko Virtala at Bluesky](https://bsky.app/profile/nikovirtala.io/post/3lbig3dxmhs24)

From the function logs we can see how the module is loaded — please note `.mjs` (Module JavaScript):

```
--import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("%40opentelemetry/instrumentation/hook.mjs", pathToFileURL("./"));'
```

The answer is yes — it works with Node.js functions using ES modules!

## Project Setup

This project uses [Projen](https://projen.io) for project configuration management with the `@nikovirtala/projen-constructs` template, which provides an opinionated AWS CDK TypeScript app setup with:

- **TypeScript** with ES modules support
- **Biome** for linting and formatting
- **Vitest** for testing
- **Mise** for tool version management
- **AWS CDK** for infrastructure as code

### Development Prerequisites

- Node.js >= 24.11.1 (managed via Mise if configured)
- pnpm package manager

### Available Commands

- `pnpm build` - Compile TypeScript and synthesize CDK
- `pnpm test` - Run tests with Vitest
- `pnpm deploy` - Deploy the CDK stack to AWS
- `pnpm diff` - Show differences between deployed and local stack
- `pnpm synth` - Synthesize CloudFormation template
- `pnpm projen` - Regenerate project configuration files

### Project Configuration

The project configuration is defined in `.projenrc.ts`. To modify project settings:

1. Edit `.projenrc.ts`
2. Run `pnpm projen` to regenerate configuration files
3. Never manually edit generated files (they are marked with warnings)
