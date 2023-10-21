import { DynamoDB } from "aws-sdk";
import "dotenv/config";
import OpenAI from "openai";

const { ENV, OPENAI_API_KEY, OPENAI_PROMPT, AWS_DYNAMODB_TABLE_NAME } =
  process.env;
if (!OPENAI_API_KEY || !OPENAI_PROMPT || !AWS_DYNAMODB_TABLE_NAME) {
  throw new Error("Missing env variables");
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});
const dynamoDB = new DynamoDB.DocumentClient();

const defaultOpenaiPrompt = OPENAI_PROMPT;
const tableName = AWS_DYNAMODB_TABLE_NAME;

export const handler = async ({
  prompt = defaultOpenaiPrompt,
}: {
  prompt: string;
}): Promise<any> => {
  try {
    console.info("Prompt", prompt);

    console.time("OpenAI call");
    const response = await openai.completions.create({
      prompt,
      model: "gpt-3.5-turbo-instruct",
      max_tokens: 100,
    });
    console.timeEnd("OpenAI call");

    const jsonInString = response.choices[0].text.trim();
    console.info("jsonInString", jsonInString);

    const { question, options, category } = JSON.parse(jsonInString);
    if (!question || !options || options.length === 0 || !category) {
      throw new Error("No question, options or category found in the response");
    }

    if (ENV === "development") {
      return;
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
handler({
  prompt:
    '1 couple compatiblity question with 4 selections.Stringified output JSON:{"question":"","options":[],"category":"couple-compatiblity"}',
});
