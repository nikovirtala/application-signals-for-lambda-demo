import { App } from "aws-cdk-lib";
import { Match, Template } from "aws-cdk-lib/assertions";
import { beforeAll, describe, test } from "vitest";

describe("MyStack", () => {
    let template: Template;

    beforeAll(async () => {
        /* Skip bundling: the tests check the resources, not the asset hash of the bundle, which
         * changes with every change to the handler or its dependencies. src/main.ts synthesizes the
         * app when it's imported, so the context has to be in place before the import, which is why
         * it goes through CDK_CONTEXT_JSON (read by every App). */
        process.env.CDK_CONTEXT_JSON = JSON.stringify({ "aws:cdk:bundling-stacks": [] });
        const { MyStack } = await import("../src/main");

        template = Template.fromStack(new MyStack(new App(), "test"));
    });

    test("creates an arm64 Node.js function instrumented with the ADOT layer", () => {
        template.resourceCountIs("AWS::Lambda::Function", 1);
        template.hasResourceProperties("AWS::Lambda::Function", {
            Architectures: ["arm64"],
            Runtime: "nodejs22.x",
            Environment: {
                Variables: {
                    AWS_LAMBDA_EXEC_WRAPPER: "/opt/otel-instrument",
                },
            },
            Layers: [Match.stringLikeRegexp(":layer:AWSOpenTelemetryDistroJs:")],
            LoggingConfig: { LogFormat: "JSON" },
        });
    });

    test("attaches the Application Signals execution policy to the function role", () => {
        template.hasResourceProperties("AWS::IAM::Role", {
            ManagedPolicyArns: Match.arrayWith([
                {
                    "Fn::Join": [
                        "",
                        [
                            "arn:",
                            { Ref: "AWS::Partition" },
                            ":iam::aws:policy/CloudWatchLambdaApplicationSignalsExecutionRolePolicy",
                        ],
                    ],
                },
            ]),
        });
    });

    test("exposes the function through a public function URL", () => {
        template.hasResourceProperties("AWS::Lambda::Url", { AuthType: "NONE" });
        template.hasOutput("url", {});
    });
});
