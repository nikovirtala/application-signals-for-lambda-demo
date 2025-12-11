import { AwsCdkTypeScriptAppProject } from "@nikovirtala/projen-constructs";

const project = new AwsCdkTypeScriptAppProject({
    cdkVersion: "2.232.1",
    defaultReleaseBranch: "main",
    deps: ["@types/aws-lambda"],
    devDeps: ["@nikovirtala/projen-constructs"],
    name: "application-signals-for-lambda-demo",
});

project.synth();
