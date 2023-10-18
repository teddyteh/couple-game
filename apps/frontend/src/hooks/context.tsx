import { Alert } from "@/types/alert";
import { Product, ProductPurchase } from "@/types/product";
import { Question } from "@/types/question";
import Peer, { DataConnection } from "peerjs";
import { createContext, useMemo, useState } from "react";

export interface GameContextType {
  alert: Alert | null;
  availablePurchases: ProductPurchase[];
  category: string;
  conn: DataConnection | null;
  currentQuestionIndex: number;
  gameId: string | null;
  hasCopiedShareLink: boolean;
  isGameStarted: boolean;
  isPartnerFinished: boolean;
  isPlayerFinished: boolean;
  isSelectingCategory: boolean;
  isShowingHowToPlay: boolean;
  isShowingStore: boolean;
  loadingText: string | null;
  partnerAnswers: string[];
  peer: Peer | null;
  products: Product[];
  questions: Array<Question>;
  selectedAnswers: string[];
  selectedOption: string | null;
  setAlert: React.Dispatch<React.SetStateAction<Alert | null>>;
  setAvailablePurchases: React.Dispatch<
    React.SetStateAction<ProductPurchase[]>
  >;
  setCategory: React.Dispatch<React.SetStateAction<string>>;
  setConn: React.Dispatch<React.SetStateAction<DataConnection | null>>;
  setCurrentQuestionIndex: React.Dispatch<React.SetStateAction<number>>;
  setGameId: React.Dispatch<React.SetStateAction<string | null>>;
  setHasCopiedShareLink: React.Dispatch<React.SetStateAction<boolean>>;
  setIsGameStarted: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPartnerFinished: React.Dispatch<React.SetStateAction<boolean>>;
  setIsPlayerFinished: React.Dispatch<React.SetStateAction<boolean>>;
  setIsSelectingCategory: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowingHowToPlay: React.Dispatch<React.SetStateAction<boolean>>;
  setIsShowingStore: React.Dispatch<React.SetStateAction<boolean>>;
  setLoadingText: React.Dispatch<React.SetStateAction<string | null>>;
  setPartnerAnswers: React.Dispatch<React.SetStateAction<string[]>>;
  setPeer: React.Dispatch<React.SetStateAction<Peer | null>>;
  setProducts: React.Dispatch<React.SetStateAction<Product[]>>;
  setQuestions: React.Dispatch<React.SetStateAction<Array<Question>>>;
  setSelectedAnswers: React.Dispatch<React.SetStateAction<string[]>>;
  setSelectedOption: React.Dispatch<React.SetStateAction<string | null>>;
  timeLeft: number;
  setTimeLeft: React.Dispatch<React.SetStateAction<number>>;
}

export const GameContext = createContext<GameContextType>({
  alert: null,
  availablePurchases: [],
  category: "",
  conn: null,
  currentQuestionIndex: 0,
  gameId: null,
  hasCopiedShareLink: false,
  isGameStarted: false,
  isPartnerFinished: false,
  isPlayerFinished: false,
  isSelectingCategory: false,
  isShowingHowToPlay: false,
  isShowingStore: false,
  loadingText: null,
  partnerAnswers: [],
  peer: null,
  products: [],
  questions: [],
  selectedAnswers: [],
  selectedOption: null,
  setAlert: () => {},
  setAvailablePurchases: () => {},
  setCategory: () => {},
  setConn: () => {},
  setCurrentQuestionIndex: () => {},
  setGameId: () => {},
  setHasCopiedShareLink: () => {},
  setIsGameStarted: () => {},
  setIsPartnerFinished: () => {},
  setIsPlayerFinished: () => {},
  setIsSelectingCategory: () => {},
  setIsShowingHowToPlay: () => {},
  setIsShowingStore: () => {},
  setLoadingText: () => {},
  setPartnerAnswers: () => {},
  setPeer: () => {},
  setProducts: () => {},
  setQuestions: () => {},
  setSelectedAnswers: () => {},
  setSelectedOption: () => {},
  timeLeft: 10,
  setTimeLeft: () => {},
});

export const GameProvider = ({ children }: any) => {
  const [alert, setAlert] = useState<Alert | null>(null);
  const [availablePurchases, setAvailablePurchases] = useState<
    ProductPurchase[]
  >([]);
  const [category, setCategory] = useState<string>("couple-compatiblity");
  const [conn, setConn] = useState<DataConnection | null>(null);
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [gameId, setGameId] = useState<string | null>(null);
  const [hasCopiedShareLink, setHasCopiedShareLink] = useState<boolean>(false);
  const [isGameStarted, setIsGameStarted] = useState<boolean>(false);
  const [isPartnerFinished, setIsPartnerFinished] = useState<boolean>(false);
  const [isPlayerFinished, setIsPlayerFinished] = useState<boolean>(false);
  const [isSelectingCategory, setIsSelectingCategory] =
    useState<boolean>(false);
  const [isShowingHowToPlay, setIsShowingHowToPlay] = useState<boolean>(false);
  const [isShowingStore, setIsShowingStore] = useState<boolean>(false);
  const [loadingText, setLoadingText] = useState<string | null>(null);
  const [partnerAnswers, setPartnerAnswers] = useState<string[]>([]);
  const [peer, setPeer] = useState<Peer | null>(null);
  const [products, setProducts] = useState<Product[]>([]);
  const [questions, setQuestions] = useState<Question[]>([]);
  const [selectedAnswers, setSelectedAnswers] = useState<string[]>([]);
  const [selectedOption, setSelectedOption] = useState<string | null>(null);
  const [timeLeft, setTimeLeft] = useState<number>(10);

  const value = useMemo(() => {
    return {
      alert,
      availablePurchases,
      category,
      conn,
      currentQuestionIndex,
      gameId,
      hasCopiedShareLink,
      isGameStarted,
      isPartnerFinished,
      isPlayerFinished,
      isSelectingCategory,
      isShowingHowToPlay,
      isShowingStore,
      loadingText,
      partnerAnswers,
      peer,
      products,
      questions,
      selectedAnswers,
      selectedOption,
      setAlert,
      setAvailablePurchases,
      setCategory,
      setConn,
      setCurrentQuestionIndex,
      setGameId,
      setHasCopiedShareLink,
      setIsGameStarted,
      setIsPartnerFinished,
      setIsPlayerFinished,
      setIsSelectingCategory,
      setIsShowingHowToPlay,
      setIsShowingStore,
      setLoadingText,
      setPartnerAnswers,
      setPeer,
      setProducts,
      setQuestions,
      setSelectedAnswers,
      setSelectedOption,
      timeLeft,
      setTimeLeft,
    };
  }, [
    alert,
    availablePurchases,
    category,
    conn,
    currentQuestionIndex,
    gameId,
    hasCopiedShareLink,
    isGameStarted,
    isPartnerFinished,
    isPlayerFinished,
    isSelectingCategory,
    isShowingHowToPlay,
    isShowingStore,
    loadingText,
    partnerAnswers,
    peer,
    products,
    questions,
    selectedAnswers,
    selectedOption,
    timeLeft,
  ]);

  return <GameContext.Provider value={value}>{children}</GameContext.Provider>;
};
