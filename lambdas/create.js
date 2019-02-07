import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
  const data = JSON.parse(event.body);
  const params = {
    TableName: data.TableName,
    Item: {
      CanvasBlock: `${data.Item.CanvasId}-${data.Item.BlockName}`,
      ItemId: data.Item.ItemId,
      CanvasId: data.Item.CanvasId,
      BlockName: data.Item.BlockName,
      Content: data.Item.Content,
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