import { NextRouter, useRouter } from "next/router";
import Peer, { DataConnection } from "peerjs";
import { createContext, useState } from "react";

export interface GameContextType {
  gameId: string | null;
  setGameId: React.Dispatch<React.SetStateAction<string | null>>;
  peer: Peer | null;
  setPeer: React.Dispatch<React.SetStateAction<Peer | null>>;
  conn: DataConnection | null;
  setConn: React.Dispatch<React.SetStateAction<DataConnection | null>>;
  isGameStarted: boolean;
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  questions: Array<{ question: string; options: string[] }>;
  setQuestions: React.Dispatch<
    React.SetStateAction<Array<{ question: string; options: string[] }>>
  >;
  currentQuestionIndex: number;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  selectedOption: string | null;
  setSelectedOption: React.Dispatch<React.SetStateAction<string | null>>;
  selectedAnswers: string[];
  setSelectedAnswers: React.Dispatch<React.SetStateAction<string[]>>;
  partnerAnswers: string[];
  setPartnerAnswers: React.Dispatch<React.SetStateAction<string[]>>;
  isPlayerFinished: boolean;
  setIsPlayerFinished: React.Dispatch<React.SetStateAction<boolean>>;
  isPartnerFinished: boolean;
  setIsPartnerFinished: React.Dispatch<React.SetStateAction<boolean>>;
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
  router: NextRouter | null;
}

export const GameContext = createContext<GameContextType>({
  gameId: null,
  setGameId: () => {},
  peer: null,
  setPeer: () => {},
  conn: null,
  setConn: () => {},
  isGameStarted: false,
  setIsGameStarted: () => {},
  questions: [],
  setQuestions: () => {},
  currentQuestionIndex: 0,
  setCurrentQuestionIndex: () => {},
  selectedOption: null,
  setSelectedOption: () => {},
  selectedAnswers: [],
  setSelectedAnswers: () => {},
  partnerAnswers: [],
  setPartnerAnswers: () => {},
  isPlayerFinished: false,
  setIsPlayerFinished: () => {},
  isPartnerFinished: false,
  setIsPartnerFinished: () => {},
  timeLeft: 10,
  setTimeLeft: () => {},
  router: null,
});

export const GameProvider = ({ children }: any) => {
  const router = useRouter();

  const [gameId, setGameId] = useState<string | null>(null);
  const [peer, setPeer] = useState<Peer | null>(null);
  const [conn, setConn] = useState<DataConnection | null>(null);

  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [questions, setQuestions] = useState<
    Array<{ question: string; options: string[] }>
  >([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [partnerAnswers, setPartnerAnswers] = useState<string[]>([]);
  const [isPlayerFinished, setIsPlayerFinished] = useState<boolean>(false);
  const [isPartnerFinished, setIsPartnerFinished] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState(10);

  return (
    <GameContext.Provider
      value={{
        gameId,
        setGameId,
        peer,
        setPeer,
        conn,
        setConn,
        isGameStarted,
        setIsGameStarted,
        questions,
        setQuestions,
        currentQuestionIndex,
        setCurrentQuestionIndex,
        selectedOption,
        setSelectedOption,
        selectedAnswers,
        setSelectedAnswers,
        partnerAnswers,
        setPartnerAnswers,
        isPlayerFinished,
        setIsPlayerFinished,
        isPartnerFinished,
        setIsPartnerFinished,
        timeLeft,
        setTimeLeft,
        router,
      }}
    >
      {children}
    </GameContext.Provider>
  );
};
