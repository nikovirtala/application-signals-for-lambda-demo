import { AwsCdkTypeScriptAppProject } from "@nikovirtala/projen-constructs";

const project = new AwsCdkTypeScriptAppProject({
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
    devDeps: ["@nikovirtala/projen-constructs"],
    homebrew: false,
    name: "application-signals-for-lambda-demo",
});
project.synth();
