import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'
import uuid from 'uuid'

export async function main(event, context) {
  const data = JSON.parse(event.body)
  const params = {
    TableName: data.TableName,
    Item: {
      TeamNameBlockHeader: `${data.Item.TeamName}-${data.Item.BlockHeader}`,
      ItemId: uuid.v1(),
      TeamName: data.Item.TeamName,
      BlockHeader: data.Item.BlockHeader,
      BlockDescription: data.Item.BlockDescripton,
      ItemHeader: data.Item.ItemHeader,
      ItemText: data.Item.ItemText,
      CreatedBy: event.requestContext.identity.cognitoIdentityId,
      CreatedAt: Date.now(),
      LastUpdatedBy: event.requestContext.identity.cognitoIdentityId,
    },
  }

  try {
    await dynamoDbLib.call('put', params)
    return success(params.Item)
  } catch (e) {
    console.log(e)
    return failure({ status: false })
  }
}
