import React from "react";
import "./index.scss";
import ReactDOM from "react-dom/client";
import App from "./App";
import "@fontsource/kanit/400.css";
import "@fontsource/kanit/500.css";
import "@fontsource/roboto-mono/400.css";
import "react-toastify/dist/ReactToastify.css";
import { BrowserRouter as Router } from "react-router-dom";
import { ToastContainer } from "react-toastify";

ReactDOM.createRoot(document.getElementById("root")!).render(
  // <React.StrictMode>
  <Router basename="/">
    <App />
    <ToastContainer
          position="top-right"
          autoClose={3000}
          hideProgressBar={false}
          newestOnTop={false}
          closeOnClick
          rtl={false}
          pauseOnFocusLoss
          draggable
          pauseOnHover
        />
  </Router>
  // </React.StrictMode>
);
