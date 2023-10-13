import { NextPage } from "next";
import { AppProps } from "next/app";
import { GameProvider } from "../hooks/context";

import "../styles/main.css";

const App: NextPage<AppProps> = ({ Component, pageProps }) => {
  return (
    <GameProvider>
      <Component {...pageProps} />
    </GameProvider>
  );
};

export default App;
