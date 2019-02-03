import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
  const canvasId = 'Team-Continuous'
  const blockName = 'key-partners'
  const data = JSON.parse(event.body);
  const params = {
    TableName: "BusinessModelCanvas",
    Key: {
      CanvasBlock: `${canvasId}-${blockName}`,
      ItemId: event.pathParameters.itemId
    },
    // 'UpdateExpression' defines the attributes to be updated
    // 'ExpressionAttributeValues' defines the value in the update expression
    UpdateExpression: "SET Content = :Content",
    ExpressionAttributeValues: {
      ":Content": data.content || null
    },
    // 'ReturnValues' specifies if and how to return the item's attributes,
    // where ALL_NEW returns all attributes of the item after the update; you
    // can inspect 'result' below to see how it works with different settings
    ReturnValues: "ALL_NEW"
  };

  try {
    await dynamoDbLib.call("update", params);
    return success({ status: true });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}