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

    const answersList = answers.map(
      (ans) =>
        `Q: ${ans.question} | P1: ${ans.player1Answer} | P2: ${ans.player2Answer}`
    );
    const promptContent = `Couple's answers: ${answersList.join(
      ", "
    )}. Assess compatibility and suggestions.`;

    console.info("Calling OpenAI with prompt:", promptContent);

    const response = await openai.chat.completions.create({
      messages: [{ role: "user", content: promptContent }],
      model: "gpt-3.5-turbo",
      max_tokens: 100,
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
