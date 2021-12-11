import * as cdk from "aws-cdk-lib";
import {
  CodeBuildStep,
  CodePipeline,
  CodePipelineSource,
  ShellStep,
} from "aws-cdk-lib/pipelines";
import { Construct } from "constructs";
import { WorkshopPipelineStage } from "./pipeline-stage";

export class WorkshopPipelineStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props?: cdk.StackProps) {
    super(scope, id, props);

    const pipeline = new CodePipeline(this, "Pipeline", {
      pipelineName: "WorkshopPipeline",
      synth: new ShellStep("SynthStep", {
        input: CodePipelineSource.gitHub("fflucas/poc-aws-cdk", "main"),
        commands: ["cd workshop", "npm ci", "npm run build", "npx cdk synth"],
        primaryOutputDirectory: "workshop/cdk.out",
      }),
    });

    const deploy = new WorkshopPipelineStage(this, "Deploy", {
      env: { account: "858319683849", region: "sa-east-1" },
    });
    const deployStage = pipeline.addStage(deploy);

    deployStage.addPost(
      new CodeBuildStep("TestViewerEndpoint", {
        projectName: "TestViewerEndpoint",
        envFromCfnOutputs: {
          ENDPOINT_URL: deploy.hcViewerUrl,
        },
        commands: ["curl -Ssf $ENDPOINT_URL"],
      }),

      new CodeBuildStep("TestAPIGatewayEndpoint", {
        projectName: "TestAPIGatewayEndpoint",
        envFromCfnOutputs: {
          ENDPOINT_URL: deploy.hcEndpoint,
        },
        commands: [
          "curl -Ssf $ENDPOINT_URL",
          "curl -Ssf $ENDPOINT_URL/hello",
          "curl -Ssf $ENDPOINT_URL/test",
        ],
      })
    );
  }
}
