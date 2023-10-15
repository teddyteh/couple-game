import "dotenv/config";
import { DynamoDB } from "aws-sdk";
import OpenAI from "openai";

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});
const dynamoDB = new DynamoDB.DocumentClient();

const defaultOpenaiPrompt = process.env.OPENAI_PROMPT; // 1 couple compatibility question with 4 selections. JSON:{question:'',options:[],category:''}
const tableName = process.env.AWS_DYNAMODB_TABLE_NAME!;

export const handler = async ({ prompt }: { prompt: string }): Promise<any> => {
  try {
    console.info("Calling OpenAI...");

    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt ?? defaultOpenaiPrompt }],
      model: "gpt-3.5-turbo",
      max_tokens: 100, // Important to limit the time the model takes to return a response
    });
    console.info("Response", response);

    const jsonInString = response.choices[0].message.content?.trim();
    console.info("jsonInString", jsonInString);
    if (!jsonInString) {
      throw new Error("Unexpected response");
    }

    const { question, options, category } = JSON.parse(jsonInString);
    if (!question || !options || !category) {
      throw new Error("No question, options or category found in the response");
    }

    // Check if the question is already in the database
    const existingItem = await dynamoDB
      .get({
        TableName: tableName,
        Key: {
          question,
        },
      })
      .promise();

    if (!existingItem.Item) {
      const parsedCategory = category.toLowerCase().replace(/\s+/g, "-");

      // If the question is not already in the database, insert it
      await dynamoDB
        .put({
          TableName: tableName,
          Item: {
            question,
            options,
            category: parsedCategory,
          },
        })
        .promise();
    }

    return {
      statusCode: 200,
      body: JSON.stringify("Success"),
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify("Internal Server Error"),
    };
  }
};

// Local testing
// handler({});
