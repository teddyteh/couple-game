import "dotenv/config";
import OpenAI from "openai";

const { OPENAI_API_KEY } = process.env;
if (!OPENAI_API_KEY) {
  throw new Error("Missing env variables");
}

const openai = new OpenAI({
  apiKey: OPENAI_API_KEY,
});

/*
 * Invoked via API Gateway
 */
export const handler = async ({
  body,
  max_tokens = 300,
  promptInstructions = 'Assess couple compatibility in second person & 3 suggestions.Output format:{"shortSummary":"","suggestions":["","",""]}',
}: {
  body: string;
  max_tokens: number;
  promptInstructions: string;
}): Promise<any> => {
  try {
    const { answers } = JSON.parse(body) as {
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
    const prompt = `${answersList.join(",")}.${promptInstructions}`;
    console.info("Prompt", prompt);

    console.time("OpenAI call");
    const response = await openai.completions.create({
      prompt,
      model: "gpt-3.5-turbo-instruct",
      max_tokens,
    });
    console.timeEnd("OpenAI call");

    const jsonInString = response.choices[0].text.trim();
    console.info("jsonInString", jsonInString);
    if (!jsonInString) {
      throw new Error("Unexpected response");
    }

    const parsedAdvice = JSON.parse(jsonInString);
    if (!parsedAdvice?.shortSummary || !parsedAdvice?.suggestions) {
      throw new Error("Unexpected response");
    }

    return parsedAdvice;
  } catch (error) {
    console.error(error);
    return {
      statusCode: 500,
    };
  }
};

// Local testing
// handler({
//   body: '{"channelId":"d0a83bdb-6880-42aa-b1c4-0c78e7b00c58","answers":[{"question":"Which of the following best describes your preferred method of resolving conflicts in a relationship?","player1Answer":"Open and direct communication","player2Answer":"Open and direct communication"},{"question":"Are you and your partner good at resolving conflicts?","player1Answer":"Yes, we always find a way to communicate and compromise","player2Answer":"Yes, we always find a way to communicate and compromise"},{"question":"What type of activities do you enjoy doing together?","player1Answer":"Outdoor adventures","player2Answer":"Outdoor adventures"},{"question":"Can you both communicate openly and honestly?","player1Answer":"Yes","player2Answer":"Yes"},{"question":"Are you and your partner aligned in your long-term goals and visions for the future?","player1Answer":"Yes","player2Answer":"Yes"}]}',
//   max_tokens: 300,
//   promptInstructions:
//     'Assess couple compatibility in second person & 3 suggestions.Output format:{"shortSummary":"","suggestions":["","",""]}',
// });
