import { AwsCdkApp } from "@nikovirtala/projen-aws-cdk-app";
const project = new AwsCdkApp({
    autoApproveOptions: {
        secret: "GITHUB_TOKEN",
        allowedUsernames: ["nikovirtala"],
    },
    cdkVersion: "2.201.0",
    defaultReleaseBranch: "main",
    deps: ["@types/aws-lambda"],
    depsUpgradeOptions: {
        workflowOptions: {
            labels: ["auto-approve", "auto-merge"],
        },
    },
    devDeps: ["@nikovirtala/projen-aws-cdk-app"],
    name: "application-signals-for-lambda-demo",
});
project.synth();
