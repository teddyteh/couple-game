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

interface PlayerAnswers {
  [question: string]: string;
}

export const handler = async ({
  channelId,
  player1Answers,
  player2Answers,
}: {
  channelId: string;
  player1Answers: PlayerAnswers;
  player2Answers: PlayerAnswers;
}): Promise<any> => {
  try {
    console.info("Constructing OpenAI prompt...");

    let answersList = [];
    for (const question in player1Answers) {
      answersList.push(
        `Q: ${question} | P1: ${player1Answers[question]} | P2: ${player2Answers[question]}`
      );
    }
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

    const compatibilityAdvice = response.choices[0].message.content?.trim();
    console.info("Compatibility Advice", compatibilityAdvice);
    if (!compatibilityAdvice) {
      throw new Error("Unexpected response");
    }

    pusher.trigger(channelId, "compatibility-result", {
      message: compatibilityAdvice,
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
