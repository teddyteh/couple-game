import "dotenv/config";
import { DynamoDB, S3 } from "aws-sdk";

const dynamoDB = new DynamoDB.DocumentClient();
const s3 = new S3();

const tableName = process.env.AWS_DYNAMODB_TABLE_NAME!;
const bucketName = process.env.AWS_S3_QUESTIONS_BUCKET_NAME!;

export const handler = async (event: any): Promise<any> => {
  try {
    const { Items } = await dynamoDB.scan({ TableName: tableName }).promise();
    if (!Items || Items.length === 0) {
      console.warn("No data found in DynamoDB");
      return;
    }

    // Group items by category
    const itemsByCategory = Items.reduce((acc: any, item: any) => {
      const { category } = item;
      acc[category] = acc[category] || [];
      acc[category].push(item);
      return acc;
    }, {});

    console.info("Categories", Object.keys(itemsByCategory));

    // Process each category and upload to S3
    for (const category in itemsByCategory) {
      const Key = `${category}.json`;

      await s3
        .putObject({
          Bucket: bucketName,
          Key,
          Body: JSON.stringify(itemsByCategory[category]),
          ContentType: "application/json",
        })
        .promise();
    }

    return {
      statusCode: 200,
      body: JSON.stringify({ message: "Items processed successfully" }),
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
