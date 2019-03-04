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

    const blockNames = [
      'key-partners',
      'key-activities',
      'key-resources',
      'value-propositions',
      'customer-relationships',
      'channels',
      'customer-segments',
      'cost-structures',
      'revenue-streams',
    ]
    const customResponse = {
      team: event.queryStringParameters.Team,
      blocks: blockNames.map(blockName => {
        const blockItems = result.Items.filter(
          blockItem =>
            blockItem.Block.toLowerCase().replace(' ', '-') === blockName
        )
        return { block: blockName, items: blockItems }
      }),
    }
    return success(customResponse)
  } catch (e) {
    console.log(e)
    return failure({ status: false })
  }
}
