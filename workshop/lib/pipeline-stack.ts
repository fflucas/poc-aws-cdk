import * as cdk from "aws-cdk-lib";
import {
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
        installCommands: ["npm install -g aws-cdk"],
        commands: ["cd workshop", "npm ci", "npm run build", "npx cdk synth"],
        primaryOutputDirectory: "workshop/cdk.out",
      }),
    });

    pipeline.addStage(new WorkshopPipelineStage(this, "Deploy"));
  }
}
