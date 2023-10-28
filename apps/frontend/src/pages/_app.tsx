import { GameProvider } from "@/contexts/game";
import { NextPage } from "next";
import { AppProps } from "next/app";

import "../styles/global.css";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <GameProvider>
      <Component {...pageProps} />
    </GameProvider>
  );
};

export default App;
