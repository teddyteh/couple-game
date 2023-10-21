import { Advice } from "@/types/advice";

const isAdvice = (payload: any): payload is Advice =>
  payload.shortSummary && payload.suggestions;

export const fetchAdvice = async (
  payload: {
    answers: {
      player1Answer: string;
      player2Answer: string;
    }[];
  },
  retries = 2,
  retryDelay = 500
) => {
  let attempts = 0;

  const delay = (ms: number) =>
    new Promise((resolve) => setTimeout(resolve, ms));

  while (attempts < retries) {
    try {
      console.info("payload", payload);

      const response = await fetch(
        "https://zr3k3wtzb0.execute-api.us-east-1.amazonaws.com",
        {
          method: "POST",
          body: JSON.stringify(payload),
          mode: "cors",
          cache: "no-store",
        }
      );

      const advice = <Advice>await response.json();
      console.info("advice", advice);
      if (!isAdvice(advice)) {
        throw new Error("Not quite an advice...");
      }

      return advice;
    } catch (error) {
      attempts++;
      console.error(`Error getting advice (attempt ${attempts}):`, error);
      if (attempts < retries) {
        await delay(retryDelay);
      }
    }
  }

  return null;
};
