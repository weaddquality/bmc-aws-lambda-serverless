# bmc-aws-lambda-serverless

The AWS Lambda serverless functions serving the frontend. Setup with AWS API
Gateway and AWS DynamoDB.

The backend for https://github.com/stefanfranzen/business-model-canvas

## Installation

```
npm install
```

## Deploy

### All lambdas

```
serverless deploy
```

### One specific lambda

```
serverless deploy --function <lambda name>
```

## Testing

### Unit tests

```
npm test
```

### Local lambda with deployed DynamoDB

```
serverless invoke local --function create --path mocks/create-event.json
```

```
{
  "body": "{\"content\":\"hello world\",\"attachment\":\"hello.jpg\"}",
  "requestContext": {
    "identity": {
      "cognitoIdentityId": "<your user>"
    }
  }
}
```

### The deployed backend in AWS of API Gateway, AWS Lambda's and DynamoDB

```
npx aws-api-gateway-cli-test \
--username='<YOUR_USERS_EMAIL>' \
--password='<YOUR_USERS_PASSWORD>' \
--user-pool-id='<YOUR_COGNITO_USER_POOL_ID>' \
--app-client-id='<YOUR_COGNITO_APP_CLIENT_ID>' \
--cognito-region='<YOUR_COGNITO_REGION>' \
--identity-pool-id='<YOUR_IDENTITY_POOL_ID>' \
--invoke-url='<YOUR_API_GATEWAY_URL>' \
--api-gateway-region='<YOUR_API_GATEWAY_REGION>' \
--path-template='/notes' \
--method='POST' \
--body='{"content":"hello world","attachment":"hello.jpg"}'
```
