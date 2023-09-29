import "./polyfills";
import "@rainbow-me/rainbowkit/styles.css";
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import React from "react";
import { WagmiConfig } from "wagmi";
import { config, chains } from "./wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import { AppProvider } from "./shared/utils/Appcontext";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/kanit/400.css";
import "@fontsource/kanit/500.css";
import "@fontsource/kanit/600.css";
import "@fontsource/kanit/700.css";
import "@fontsource/roboto-mono/400.css";
import "@fontsource/roboto-mono/500.css";
import "@fontsource/roboto-mono/600.css";
import "@fontsource/roboto-mono/700.css";
import "@fontsource/inter/400.css";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains} modalSize="wide">
        <Router basename="/">
          <AppProvider>
            <App />
          </AppProvider>
        </Router>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
