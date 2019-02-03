import * as dynamoDbLib from "../libs/dynamodb-lib";
import { success, failure } from "../libs/response-lib";

export async function main(event, context) {
  const canvasId = 'Team-Continuous'
  const blockName = 'key-activities'
  const params = {
    TableName: "BusinessModelCanvas",
    // 'Key' defines the partition key and sort key of the item to be removed
    // - 'userId': Identity Pool identity id of the authenticated user
    // - 'noteId': path parameter
    Key: {
      CanvasBlock: `${canvasId}-${blockName}`,
      ItemId: event.pathParameters.itemId
    }
  };

  try {
    const result = await dynamoDbLib.call("delete", params);
    return success({ status: true });
  } catch (e) {
    console.log(e);
    return failure({ status: false });
  }
}