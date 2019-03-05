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

        // In case of no items in the block:
        // Return the block with only block name keep the rest empty.
        if (blockItems.length === 0) {
          return {
            block: blockName,
            blockDescription: '',
            items: [],
          }
        }

        // Only keep ItemHeader and ItemText on each item.
        const filteredBlockItems = blockItems.map(
          ({ ItemHeader, ItemText }) => ({
            itemHeader: ItemHeader,
            ItemText: ItemText,
          })
        )

        // A bit dirty way to access the BlockDescription.
        // Not sure what other alternatives we have here..
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
