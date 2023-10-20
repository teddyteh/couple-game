import "dotenv/config";
import OpenAI from "openai";
import Pusher from "pusher";

const {
  PUSHER_APP_ID,
  PUSHER_KEY,
  PUSHER_SECRET,
  PUSHER_CLUSTER,
  OPENAI_API_KEY,
} = process.env;
if (
  !PUSHER_APP_ID ||
  !PUSHER_KEY ||
  !PUSHER_SECRET ||
  !PUSHER_CLUSTER ||
  !OPENAI_API_KEY
) {
  throw new Error("Missing env variables");
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

const pusher = new Pusher({
  appId: PUSHER_APP_ID,
  key: PUSHER_KEY,
  secret: PUSHER_SECRET,
  cluster: PUSHER_CLUSTER,
  useTLS: true,
});

/*
 * Invoked via the API Gateway
 */
export const handler = async (event: any): Promise<any> => {
  try {
    const { channelId, answers } = JSON.parse(event.body) as {
      channelId: string;
      answers: {
        question: string;
        player1Answer: string;
        player2Answer: string;
      }[];
    };

    const answersList = answers.map((ans) => {
      if (ans.player1Answer === ans.player2Answer) {
        return `Q:${ans.question}|A:${ans.player1Answer}`;
      } else {
        return `Q:${ans.question}|1:${ans.player1Answer}|2:${ans.player2Answer}`;
      }
    });
    const prompt = `${answersList.join(
      ","
    )}.Assess couple compatibility & suggestions.`;
    console.info("Calling OpenAI with prompt:", prompt);

    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: prompt }],
      model: "gpt-3.5-turbo",
      max_tokens: 500,
    });
    console.info("Response", response);

    const advice = response.choices[0].message.content?.trim();
    console.info("Advice", advice);
    if (!advice) {
      throw new Error("Unexpected response");
    }

    pusher.trigger(channelId, "advice", {
      advice,
    });

    return {
      statusCode: 200,
      body: { advice },
    };
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
      body: JSON.stringify("Internal Server Error"),
    };
  }
};
