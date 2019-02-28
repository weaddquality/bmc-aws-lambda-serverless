import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'

export async function main(event, context) {
  console.log(event)
  const teamName = event.pathParameters.Item.TeamName
  const blockName = 'Value Propositions'
  const params = {
    TableName: 'BusinessModelCanvas',
    // 'KeyConditionExpression' defines the condition for the query
    // - 'CanvasBlock = :CanvasBlock': only return items with matching 'CanvasBlock' partition key
    // 'ExpressionAttributeValues' defines the value in the condition
    // - ':CanvasBlock': defines 'CanvasBlock' to be Identity Pool identity id of the authenticated user
    KeyConditionExpression: 'TeamNameBlockHeader = :TeamNameBlockHeader',
    ExpressionAttributeValues: {
      ':TeamNameBlockHeader': `${teamName}-${blockName}`,
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
