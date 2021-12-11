import { CfnOutput, Stage, StageProps } from "aws-cdk-lib";
import { Construct } from "constructs";
import { WorkshopStack } from "./workshop-stack";

export class WorkshopPipelineStage extends Stage {
  public readonly hcViewerUrl: CfnOutput;
  public readonly hcEndpoint: CfnOutput;

  constructor(scope: Construct, id: string, props?: StageProps) {
    super(scope, id, props);

    const workshopStack = new WorkshopStack(this, "WebService");

    this.hcEndpoint = workshopStack.hcEndpoint;
    this.hcViewerUrl = workshopStack.hcViewerUrl;
  }
}
