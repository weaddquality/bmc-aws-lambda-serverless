import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'

export async function main(event, context) {
  let data
  typeof event.body === 'string'
    ? (data = JSON.parse(event.body))
    : (data = event.body)

  const params = {
    TableName: 'BusinessModelCanvas',
    Key: {
      Team: event.queryStringParameters.Team,
      BlockUuid: event.queryStringParameters.BlockUuid,
    },
    UpdateExpression: 'SET ItemText = :ItemText',
    ExpressionAttributeValues: {
      ':ItemText': data.ItemText || null,
    },
    ReturnValues: 'ALL_NEW',
  }

  try {
    await dynamoDbLib.call('update', params)
    return success({ status: true })
  } catch (e) {
    console.log(e)
    return failure({ status: false })
  }
}
