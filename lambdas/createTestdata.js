import * as dynamoDbLib from '../libs/dynamodb-lib'
import { success, failure } from '../libs/response-lib'
import uuid from 'uuid'

// TODO: Remove console.log statements
export async function main(event, context) {
  let data
  typeof event.body === 'string'
    ? (data = JSON.parse(event.body))
    : (data = event.body)

  await Promise.all(
    data.Items.map(async item => {
      const params = {
        TableName: data.TableName,
        Item: {
          Team: item.Item.Team,
          BlockUuid: `${item.Item.Block}_` + uuid.v1(),
          Team: item.Item.Team,
          Block: item.Item.Block,
          BlockDescription: item.Item.BlockDescription,
          ItemHeader: item.Item.ItemHeader,
          ItemText: item.Item.ItemText,
          CreatedBy: event.requestContext.identity.cognitoIdentityId,
          CreatedAt: Date.now(),
          LastUpdatedBy: event.requestContext.identity.cognitoIdentityId,
        },
      }
      try {
        console.log('TRY')
        await dynamoDbLib.call('put', params)
        console.log(
          `Created Item:
          Block: ${params.Item.Block}
          Team: ${params.Item.Team}
          ItemText: ${params.Item.ItemText}
          `
        ) // DOES FIRE! ASYNC/AWAIT PROBLEM?
        return success(params.Item)
      } catch (e) {
        console.log('CATCH')
        console.log(e)
        return failure({ status: false })
      }
    })
  )
}
