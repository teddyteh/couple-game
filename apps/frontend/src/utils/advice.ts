export const getAdviceFromUrl = async (payload: {
  answers: {
    player1Answer: string;
    player2Answer: string;
  }[];
}) => {
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
    const { advice } = <{ advice: string }>await response.json();
    console.info("advice", advice);
    return advice;
  } catch (error) {
    console.error("Error getting advice:", error);
    return null;
  }
};
