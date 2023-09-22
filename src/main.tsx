import "./polyfills"
import '@rainbow-me/rainbowkit/styles.css'
import "react-toastify/dist/ReactToastify.css";
import "./index.scss";
import React from "react";
import { WagmiConfig } from "wagmi";
import { config, chains } from "./wagmi";
import { RainbowKitProvider } from "@rainbow-me/rainbowkit";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/kanit/400.css";
import "@fontsource/kanit/500.css";
import "@fontsource/roboto-mono/400.css";
import { BrowserRouter as Router } from "react-router-dom";

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <WagmiConfig config={config}>
      <RainbowKitProvider chains={chains} modalSize="wide">
        <Router basename="/">
          <App />
        </Router>
      </RainbowKitProvider>
    </WagmiConfig>
  </React.StrictMode>
);
