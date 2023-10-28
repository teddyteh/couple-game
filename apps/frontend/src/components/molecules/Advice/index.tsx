import { GameContextType } from "@/contexts/game";

export const Advice = ({ advice }: { advice: GameContextType["advice"] }) => {
  if (!advice) {
    return null;
  }

  const { shortSummary, suggestions } = advice;

  return (
    <>
      <p>Advice:</p>
      <h4>{shortSummary}</h4>
      <ul>
        {suggestions.map((suggestion) => (
          <li key={suggestion}>{suggestion}</li>
        ))}
      </ul>
      <hr />
    </>
  );
};
