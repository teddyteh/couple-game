import "dotenv/config";
import { DynamoDB, S3 } from "aws-sdk";

const dynamoDB = new DynamoDB.DocumentClient();
const s3 = new S3();

const tableName = process.env.AWS_DYNAMODB_TABLE_NAME!;
const bucketName = process.env.AWS_S3_QUESTIONS_BUCKET_NAME!;

export const handler = async (event: any): Promise<any> => {
  try {
    const data = await dynamoDB.scan({ TableName: tableName }).promise();
    if (!data?.Items) {
      console.warn("No data found in DynamoDB");
      return;
    }

    const item = data.Items[Math.floor(Math.random() * data.Items.length)];

    const Key = `randomItem_${Date.now()}.json`;

    await s3
      .putObject({
        Bucket: bucketName,
        Key,
        Body: JSON.stringify(item),
        ContentType: "application/json",
      })
      .promise();

    return {
      statusCode: 200,
      body: JSON.stringify({ Key }),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: "Internal Server Error",
    };
  }
};

// Local testing
// handler({});
