import uuid from "uuid";
import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const canvasId = 'Team-Continuous'
  const blockName = 'key-partners'
  const params = {
    TableName: "BusinessModelCanvas",
    Item: {
      CanvasBlock: `${canvasId}-${blockName}`,
      ItemId: uuid.v1(),
      CanvasId: canvasId,
      BlockName: blockName,
      Content: data.content,
      CreatedBy: event.requestContext.identity.cognitoIdentityId,
      CreatedAt: Date.now(),
      LastUpdatedBy: event.requestContext.identity.cognitoIdentityId
    }
  };

  try {
    await dynamoDbLib.call("put", params);
    return success(params.Item);
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}
