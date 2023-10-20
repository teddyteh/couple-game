import { GameContextType } from "@/hooks/context";

export const AdviceComponent = ({
  advice,
}: {
  advice: GameContextType["advice"];
}) => {
  return <p>{advice}</p>;
};
