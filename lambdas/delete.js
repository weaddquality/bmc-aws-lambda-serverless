import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'

export async function main(event, context) {
  const params = {
    TableName: 'BusinessModelCanvas',
    Key: {
      Team: event.queryStringParameters.Team,
      BlockUuid: event.queryStringParameters.BlockUuid,
    },
  }

  try {
    await dynamoDbLib.call('delete', params)
    return success({ status: true })
  } catch (e) {
    console.log(e)
    return failure({ status: false })
  }
}
