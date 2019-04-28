import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'
import {
  KEY_PARTNERS,
  KEY_ACTIVITIES,
  KEY_RESOURCES,
  VALUE_PROPOSITIONS,
  CUSTOMER_RELATIONSHIPS,
  CHANNELS,
  CUSTOMERS_SEGMENTS,
  COST_STRUCTURES,
  REVENUE_STREAMS,
} from '../constants/constants'

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
      KEY_PARTNERS,
      KEY_ACTIVITIES,
      KEY_RESOURCES,
      VALUE_PROPOSITIONS,
      CUSTOMER_RELATIONSHIPS,
      CHANNELS,
      CUSTOMERS_SEGMENTS,
      COST_STRUCTURES,
      REVENUE_STREAMS,
    ]

    const blocksWithItems = {}

    blockNames.forEach(blockName => {
      const blockItems = result.Items.filter(
        blockItem => blockItem.Block === blockName
      )

      if (blockItems.length === 0) {
        blocksWithItems[blockName] = {
          blockDescription: '',
          items: [],
          blockInKebabCase: blockName.toLowerCase().replace(' ', '-'),
        }
        return
      }

      const filteredBlockItems = blockItems.map(
        ({ BlockUuid, ItemHeader, ItemText }) => ({
          BlockUuid: BlockUuid,
          ItemHeader: ItemHeader,
          ItemText: ItemText,
        })
      )

      blocksWithItems[blockName] = {
        blockDescription: blockItems[0].BlockDescription,
        items: filteredBlockItems,
        blockInKebabCase: blockName.toLowerCase().replace(' ', '-'),
      }
      return
    })

    const customResponse = {
      team: event.queryStringParameters.Team,
      blocks: blocksWithItems,
    }
    return success(customResponse)
  } catch (e) {
    console.log(e)
    return failure({ status: false })
  }
}
