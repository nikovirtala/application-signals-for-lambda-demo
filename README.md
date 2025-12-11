# CloudWatch Application Signals for Lambda demo

> It seems to be based on OpenTelemetry and currently supports Python and Node.js runtimes, but does it also work with Node.js functions using ECMAScript modules (ESM)? — the documentation doesn't tell 🤔 — [Niko Virtala at Bluesky](https://bsky.app/profile/nikovirtala.io/post/3lbig3dxmhs24)

From the function logs we can see how the module is loaded — please note `.mjs` (Module JavaScript):

```
--import 'data:text/javascript,import { register } from "node:module"; import { pathToFileURL } from "node:url"; register("%40opentelemetry/instrumentation/hook.mjs", pathToFileURL("./"));'
```

The answer is yes — it works with Node.js functions using ES modules!

### Links

- https://aws.amazon.com/blogs/aws/track-performance-of-serverless-applications-built-using-aws-lambda-with-application-signals/

- https://docs.aws.amazon.com/AmazonCloudWatch/latest/monitoring/CloudWatch-Application-Signals-Enable-Lambda.html
