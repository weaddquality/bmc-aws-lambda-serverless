import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'
import util from 'util'

export async function main(event, context) {
  const params = {
    TableName: 'BusinessModelCanvas',
    KeyConditionExpression: 'Team = :Team',
    ExpressionAttributeValues: {
      ':Team': event.queryStringParameters.Team,
    },
  }
  const temp = [
    {
      LastUpdatedBy: 'stefan.franzen@addq.se',
      Block: 'Channels',
      CreatedBy: 'stefan.franzen@addq.se',
      Team: 'Team Continuous',
      BlockDescription: 'How do we reach our customer segments',
      BlockUuid: 'Channels_af37ecd0-3ec8-11e9-94a7-139baa9ad8b3',
      ItemHeader: 'LinkedIn',
      CreatedAt: 1551736726557,
      ItemText:
        'LinkedIn is our main place since people we can recruit as well as people who buy from us, is present in this channel',
    },
    {
      LastUpdatedBy: 'stefan.franzen@addq.se',
      Block: 'Channels',
      CreatedBy: 'stefan.franzen@addq.se',
      Team: 'Team Continuous',
      BlockDescription: 'How do we reach our customer segments',
      BlockUuid: 'Channels_eb3d9ee0-3ece-11e9-98f6-49c93e138047',
      ItemHeader: 'LinkedIn',
      CreatedAt: 1551739404238,
      ItemText:
        'LinkedIn is our main place since people we can recruit as well as people who buy from us, is present in this channel',
    },
    {
      LastUpdatedBy: 'stefan.franzen@addq.se',
      Block: 'Cost Structures',
      CreatedBy: 'stefan.franzen@addq.se',
      Team: 'Team Continuous',
      BlockDescription:
        'What are the important costs inherent in our business model',
      BlockUuid: 'Cost Structures_af38b020-3ec8-11e9-94a7-139baa9ad8b3',
      ItemHeader: 'This costs a lot of stuff',
      CreatedAt: 1551736726562,
      ItemText: 'Here I describe that cost in detail, for instance XYZ',
    },
    {
      LastUpdatedBy: 'stefan.franzen@addq.se',
      Block: 'Cost Structures',
      CreatedBy: 'stefan.franzen@addq.se',
      Team: 'Team Continuous',
      BlockDescription:
        'What are the important costs inherent in our business model',
      BlockUuid: 'Cost Structures_eb3dc5f1-3ece-11e9-98f6-49c93e138047',
      ItemHeader: 'This costs a lot of stuff',
      CreatedAt: 1551739404239,
      ItemText: 'Here I describe that cost in detail, for instance XYZ',
    },
    {
      LastUpdatedBy: 'stefan.franzen@addq.se',
      Block: 'Customer Relationships',
      CreatedBy: 'stefan.franzen@addq.se',
      Team: 'Team Continuous',
      BlockDescription:
        'What type of relationships do our customer segments expect',
      BlockUuid: 'Customer Relationships_af37c5c0-3ec8-11e9-94a7-139baa9ad8b3',
      ItemHeader: 'Our customers demand',
      CreatedAt: 1551736726556,
      ItemText:
        "That we're always available for consultations, at choice of time and XYZ",
    },
    {
      LastUpdatedBy: 'stefan.franzen@addq.se',
      Block: 'Customer Relationships',
      CreatedBy: 'stefan.franzen@addq.se',
      Team: 'Team Continuous',
      BlockDescription:
        'What type of relationships do our customer segments expect',
      BlockUuid: 'Customer Relationships_eb3d77d0-3ece-11e9-98f6-49c93e138047',
      ItemHeader: 'Our customers demand',
      CreatedAt: 1551739404237,
      ItemText:
        "That we're always available for consultations, at choice of time and XYZ",
    },
    {
      LastUpdatedBy: 'stefan.franzen@addq.se',
      Block: 'Customer Segments',
      CreatedBy: 'stefan.franzen@addq.se',
      Team: 'Team Continuous',
      BlockDescription: 'Who are we creating value for',
      BlockUuid: 'Customer Segments_af383af0-3ec8-11e9-94a7-139baa9ad8b3',
      ItemHeader: 'Mature customers',
      CreatedAt: 1551736726559,
      ItemText: 'Customers who has bought consultants before and XYZ',
    },
    {
      LastUpdatedBy: 'stefan.franzen@addq.se',
      Block: 'Customer Segments',
      CreatedBy: 'stefan.franzen@addq.se',
      Team: 'Team Continuous',
      BlockDescription: 'Who are we creating value for',
      BlockUuid: 'Customer Segments_eb3dc5f0-3ece-11e9-98f6-49c93e138047',
      ItemHeader: 'Mature customers',
      CreatedAt: 1551739404239,
      ItemText: 'Customers who has bought consultants before and XYZ',
    },
    {
      LastUpdatedBy: 'stefan.franzen@addq.se',
      Block: 'Key Activities',
      CreatedBy: 'stefan.franzen@addq.se',
      Team: 'Team Continuous',
      BlockDescription: 'What key activities do our value propositions require',
      BlockUuid: 'Key Activities_af372980-3ec8-11e9-94a7-139baa9ad8b3',
      ItemHeader: 'Do this',
      CreatedAt: 1551736726552,
      ItemText: 'So that we can achieve X',
    },
    {
      LastUpdatedBy: 'stefan.franzen@addq.se',
      Block: 'Key Activities',
      CreatedBy: 'stefan.franzen@addq.se',
      Team: 'Team Continuous',
      BlockDescription: 'What key activities do our value propositions require',
      BlockUuid: 'Key Activities_eb3cb480-3ece-11e9-98f6-49c93e138047',
      ItemHeader: 'Do this',
      CreatedAt: 1551739404232,
      ItemText: 'So that we can achieve X',
    },
    {
      LastUpdatedBy: 'stefan.franzen@addq.se',
      Block: 'Key Resources',
      CreatedBy: 'stefan.franzen@addq.se',
      Team: 'Team Continuous',
      BlockDescription: 'What key resources do our value propositions require',
      BlockUuid: 'Key Resources_af3777a0-3ec8-11e9-94a7-139baa9ad8b3',
      ItemHeader: 'Resource Z',
      CreatedAt: 1551736726554,
      ItemText: 'With resource Z we could do words words words',
    },
    {
      LastUpdatedBy: 'stefan.franzen@addq.se',
      Block: 'Key Resources',
      CreatedBy: 'stefan.franzen@addq.se',
      Team: 'Team Continuous',
      BlockDescription: 'What key resources do our value propositions require',
      BlockUuid: 'Key Resources_eb3d02a0-3ece-11e9-98f6-49c93e138047',
      ItemHeader: 'Resource Z',
      CreatedAt: 1551739404234,
      ItemText: 'With resource Z we could do words words words',
    },
    {
      LastUpdatedBy: 'stefan.franzen@addq.se',
      Block: 'Revenue Streams',
      CreatedBy: 'stefan.franzen@addq.se',
      Team: 'Team Continuous',
      BlockDescription: 'What value are our customers willing to pay for',
      BlockUuid: 'Revenue Streams_af38d730-3ec8-11e9-94a7-139baa9ad8b3',
      ItemHeader: 'Consultancy',
      CreatedAt: 1551736726563,
      ItemText: 'We collect our income by consulting',
    },
    {
      LastUpdatedBy: 'stefan.franzen@addq.se',
      Block: 'Revenue Streams',
      CreatedBy: 'stefan.franzen@addq.se',
      Team: 'Team Continuous',
      BlockDescription: 'What value are our customers willing to pay for',
      BlockUuid: 'Revenue Streams_eb3ded00-3ece-11e9-98f6-49c93e138047',
      ItemHeader: 'Consultancy',
      CreatedAt: 1551739404240,
      ItemText: 'We collect our income by consulting',
    },
    {
      LastUpdatedBy: 'stefan.franzen@addq.se',
      Block: 'Value Propositions',
      CreatedBy: 'stefan.franzen@addq.se',
      Team: 'Team Continuous',
      BlockDescription: 'What value do we deliver to the customer',
      BlockUuid: 'Value Propositions_af379eb0-3ec8-11e9-94a7-139baa9ad8b3',
      ItemHeader: 'Our biggest value',
      CreatedAt: 1551736726555,
      ItemText:
        'Is that we continuously evolve, adapt and empower developers in their challenges with X',
    },
    {
      LastUpdatedBy: 'stefan.franzen@addq.se',
      Block: 'Value Propositions',
      CreatedBy: 'stefan.franzen@addq.se',
      Team: 'Team Continuous',
      BlockDescription: 'What value do we deliver to the customer',
      BlockUuid: 'Value Propositions_eb3d50c0-3ece-11e9-98f6-49c93e138047',
      ItemHeader: 'Our biggest value',
      CreatedAt: 1551739404236,
      ItemText:
        'Is that we continuously evolve, adapt and empower developers in their challenges with X',
    },
  ]

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
        const blockItems = temp.filter(
          blockItem => blockItem.Block === blockName
        )

        // No items in the block?
        // Return the block with only block name keep the rest empty.
        if (blockItems.length === 0) {
          return {
            block: blockName,
            blockDescription: '',
            items: [],
          }
        }

        // Only keep ItemHeader and ItemText on each itemn
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
