import { NextPage } from "next";
import { AppProps } from "next/app";
import { GameProvider } from "./game/_hooks/context";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <GameProvider>
      <Component {...pageProps} />
    </GameProvider>
  );
};

export default App;
