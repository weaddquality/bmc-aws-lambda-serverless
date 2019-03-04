import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'
import uuid from 'uuid'

export async function main(event, context) {
  let data
  typeof event.body === 'string'
    ? (data = JSON.parse(event.body))
    : (data = event.body)

  const params = {
    TableName: data.TableName,
    Item: {
      Team: data.Item.Team,
      BlockUuid: `${data.Item.Block}_` + uuid.v1(),
      Block: data.Item.Block,
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
