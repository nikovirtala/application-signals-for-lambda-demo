import { join } from "node:path";
import { App, CfnOutput, Stack, type StackProps, aws_iam, aws_lambda, aws_lambda_nodejs } from "aws-cdk-lib";
import { OutputFormat } from "aws-cdk-lib/aws-lambda-nodejs";
import type { Construct } from "constructs";

export class MyStack extends Stack {
    constructor(scope: Construct, id: string, props: StackProps = {}) {
        super(scope, id, props);

        const f = new aws_lambda_nodejs.NodejsFunction(this, "function", {
            architecture: aws_lambda.Architecture.ARM_64,
            bundling: {
                format: OutputFormat.ESM,
                target: "esnext",
            },
            entry: join(import.meta.dirname, "/handler.ts"),
            environment: {
                AWS_LAMBDA_EXEC_WRAPPER: "/opt/otel-instrument",
            },
            layers: [
                aws_lambda.LayerVersion.fromLayerVersionArn(
                    this,
                    "signals-layer",
                    "arn:aws:lambda:eu-west-1:615299751070:layer:AWSOpenTelemetryDistroJs:5",
                ),
            ],
            loggingFormat: aws_lambda.LoggingFormat.JSON,
            runtime: aws_lambda.Runtime.NODEJS_22_X,
        });

        f.role?.addManagedPolicy(
            aws_iam.ManagedPolicy.fromAwsManagedPolicyName("CloudWatchLambdaApplicationSignalsExecutionRolePolicy"),
        );

        const url = f.addFunctionUrl({
            authType: aws_lambda.FunctionUrlAuthType.NONE,
        });

        new CfnOutput(this, "url", {
            value: url.url,
        });
    }
}

const app = new App();

new MyStack(app, "application-signals-for-lambda-demo");

app.synth();
