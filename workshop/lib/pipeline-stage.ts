import { Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { WorkshopStack } from "./workshop-stack";

export class WorkshopPipelineStage extends Stage {
  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id);

    new WorkshopStack(this, "WebService");
  }
}
