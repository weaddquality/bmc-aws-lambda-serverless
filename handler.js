export const lambda = async (event, context) => {
  return {
    statusCode: 200,
    body: JSON.stringify({
      message: `${(await message({ time: 1, copy: 'Your AWS Lambda function executed successfully!'}))}`,
    }),
  };
};

const message = ({ time, ...rest }) => new Promise((resolve, reject) =>
  setTimeout(() => {
    resolve(`${rest.copy} (with a delay)`);
  }, time * 1000)
);
