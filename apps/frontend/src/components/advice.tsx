import { GameContextType } from "@/hooks/context";

export const AdviceComponent = ({
  advice,
}: {
  advice: GameContextType["advice"];
}) => {
  if (!advice) {
    return null;
  }

  const { shortSummary, suggestions } = advice;

  return (
    <>
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
