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
      'Key Partners',
      'Key Activities',
      'Key Resources',
      'Value Propositions',
      'Customer Relationships',
      'Channels',
      'Customer Segments',
      'Cost Structures',
      'Revenue Streams',
    ]
    const customResponse = {
      team: event.queryStringParameters.Team,
      blocks: blockNames.map(blockName => {
        const blockItems = result.Items.filter(
          blockItem => blockItem.Block === blockName
        )

        if (blockItems.length === 0) {
          return {
            block: blockName,
            blockUuid: '',
            blockDescription: '',
            items: [],
          }
        }

        const filteredBlockItems = blockItems.map(
          ({ ItemHeader, ItemText }) => ({
            ItemHeader: ItemHeader,
            ItemText: ItemText,
          })
        )

        return {
          block: blockName,
          blockDescription: blockItems[0].BlockDescription,
          items: filteredBlockItems,
        }
      }),
    }
    return success(customResponse)
  } catch (e) {
    console.log(e)
    return failure({ status: false })
  }
}
