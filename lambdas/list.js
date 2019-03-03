import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'

export async function main(event, context) {
  const params = {
    TableName: 'BusinessModelCanvas',
    KeyConditionExpression: 'Team = :Team',
    ExpressionAttributeValues: {
      ':Team': event.queryStringParameters.Team,
    },
  }

  try {
    const result = await dynamoDbLib.call('query', params)
    return success(result.Items)
  } catch (e) {
    console.log(e)
    return failure({ status: false })
  }
}
