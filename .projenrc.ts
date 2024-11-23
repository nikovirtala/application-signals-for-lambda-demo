import { AwsCdkApp } from "@nikovirtala/projen-aws-cdk-app";
const project = new AwsCdkApp({
    cdkVersion: "2.170.0",
    defaultReleaseBranch: "main",
    deps: ["@types/aws-lambda"],
    devDeps: ["@nikovirtala/projen-aws-cdk-app"],
    name: "application-signals-for-lambda-demo",
    projenrcTs: true,
});
project.synth();
