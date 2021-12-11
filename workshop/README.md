# Welcome to my CDK TypeScript project!

This project was built through the [CDK workshop](https://cdkworkshop.com/20-typescript.html).
The application exposes an API Gateway that, through the route accessed, invokes a lambda function that generates a text response. Another lambda function captures the request and increments the access count on that route by saving the values in a DynamoDB table. Finally, a [third-party TableViewer](https://www.npmjs.com/package/cdk-dynamo-table-viewer) builder exposes the data saved in the database to a URL by constructing a table sorting in descending order of hits.
This entire application is then involved in a Pipeline that self-manages each new commit in this repository thanks to the AWS CDK.

To build the pipeline successfully you need the [workshop pre-requisites](https://cdkworkshop.com/15-prerequisites.html) and a GitHub access token configured in a parameter called `github-token` stored in AWS SSM. The first run must be manual, with AWS account access configured, just run `cdk deploy`.

The `cdk.json` file tells the CDK Toolkit how to execute your app.

## Useful commands

- `npm run build` compile typescript to js
- `npm run watch` watch for changes and compile
- `npm run test` perform the jest unit tests
- `cdk deploy` deploy this stack to your default AWS account/region
- `cdk diff` compare deployed stack with current state
- `cdk synth` emits the synthesized CloudFormation template

Reference:
[Workshop AWS CDK](https://cdkworkshop.com/20-typescript.html)
[Continuous integration and delivery (CI/CD) using CDK Pipelines](https://docs.aws.amazon.com/cdk/v2/guide/cdk_pipeline.html)
[AWS CDK v2](https://docs.aws.amazon.com/cdk/api/v2/)
