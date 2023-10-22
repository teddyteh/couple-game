import { Advice } from "@/types/advice";
import { retry } from "./retry";

const isAdvice = (payload: any): payload is Advice =>
  payload.shortSummary && payload.suggestions;

export const fetchAdvice = async (payload: {
  answers: {
    player1Answer: string;
    player2Answer: string;
  }[];
}): Promise<Advice | null> => {
  return retry<Advice>(
    async () => {
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
    },
    2,
    500
  );
};
