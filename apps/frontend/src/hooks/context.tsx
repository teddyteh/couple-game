import { Alert } from "@/types/alert";
import { Product, ProductPurchase } from "@/types/product";
import { Question } from "@/types/question";
import Peer, { DataConnection } from "peerjs";
import { createContext, useMemo, useState } from "react";

export interface GameContextType {
  products: Product[];
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  availablePurchases: ProductPurchase[];
  setAvailablePurchases: React.Dispatch<
    React.SetStateAction<ProductPurchase[]>
  >;
  isShowingStore: boolean;
  setIsShowingStore: React.Dispatch<React.SetStateAction<boolean>>;
  isSelectingCategory: boolean;
  setIsSelectingCategory: React.Dispatch<React.SetStateAction<boolean>>;
  category: string;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  isShowingHowToPlay: boolean;
  setIsShowingHowToPlay: React.Dispatch<React.SetStateAction<boolean>>;
  alert: Alert | null;
  setAlert: React.Dispatch<React.SetStateAction<Alert | null>>;
  loadingText: string | null;
  setLoadingText: React.Dispatch<React.SetStateAction<string | null>>;
  gameId: string | null;
  setGameId: React.Dispatch<React.SetStateAction<string | null>>;
  hasCopiedShareLink: boolean;
  setHasCopiedShareLink: React.Dispatch<React.SetStateAction<boolean>>;
  peer: Peer | null;
  setPeer: React.Dispatch<React.SetStateAction<Peer | null>>;
  conn: DataConnection | null;
  setConn: React.Dispatch<React.SetStateAction<DataConnection | null>>;
  isGameStarted: boolean;
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  questions: Array<Question>;
  setQuestions: React.Dispatch<React.SetStateAction<Array<Question>>>;
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
}

export const GameContext = createContext<GameContextType>({
  products: [],
  setProducts: () => {},
  availablePurchases: [],
  setAvailablePurchases: () => {},
  isShowingStore: false,
  setIsShowingStore: () => {},
  isSelectingCategory: false,
  setIsSelectingCategory: () => {},
  category: "",
  setCategory: () => {},
  isShowingHowToPlay: false,
  setIsShowingHowToPlay: () => {},
  alert: null,
  setAlert: () => {},
  loadingText: null,
  setLoadingText: () => {},
  gameId: null,
  setGameId: () => {},
  hasCopiedShareLink: false,
  setHasCopiedShareLink: () => {},
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
});

export const GameProvider = ({ children }: any) => {
  const [products, setProducts] = useState<any[]>([]);
  const [availablePurchases, setAvailablePurchases] = useState<any[]>([]);
  const [isShowingStore, setIsShowingStore] = useState<boolean>(false);
  const [isSelectingCategory, setIsSelectingCategory] =
    useState<boolean>(false);
  const [category, setCategory] = useState<string>("couple-compatiblity");
  const [isShowingHowToPlay, setIsShowingHowToPlay] = useState<boolean>(false);

  const [alert, setAlert] = useState<Alert | null>(null);
  const [loadingText, setLoadingText] = useState<string | null>(null);

  const [gameId, setGameId] = useState<string | null>(null);
  const [hasCopiedShareLink, setHasCopiedShareLink] = useState<boolean>(false);

  const [peer, setPeer] = useState<Peer | null>(null);
  const [conn, setConn] = useState<DataConnection | null>(null);

  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [questions, setQuestions] = useState<Array<Question>>([]);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [partnerAnswers, setPartnerAnswers] = useState<string[]>([]);
  const [isPlayerFinished, setIsPlayerFinished] = useState<boolean>(false);
  const [isPartnerFinished, setIsPartnerFinished] = useState<boolean>(false);
  const [timeLeft, setTimeLeft] = useState(10);

  const value = useMemo(() => {
    return {
      products,
      setProducts,
      availablePurchases,
      setAvailablePurchases,
      isShowingStore,
      setIsShowingStore,
      isSelectingCategory,
      setIsSelectingCategory,
      category,
      setCategory,
      isShowingHowToPlay,
      setIsShowingHowToPlay,
      alert,
      setAlert,
      loadingText,
      setLoadingText,
      gameId,
      setGameId,
      hasCopiedShareLink,
      setHasCopiedShareLink,
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
    };
  }, [
    products,
    availablePurchases,
    isShowingStore,
    isSelectingCategory,
    category,
    isShowingHowToPlay,
    alert,
    gameId,
    loadingText,
    hasCopiedShareLink,
    peer,
    conn,
    isGameStarted,
    questions,
    currentQuestionIndex,
    selectedOption,
    selectedAnswers,
    partnerAnswers,
    isPlayerFinished,
    isPartnerFinished,
    timeLeft,
  ]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
