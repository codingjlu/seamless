import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App.jsx"
import GlobalStyles from "./GlobalStyles.js"
import { Toaster } from "react-hot-toast"

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <GlobalStyles />
    <App />
    <Toaster />
  </React.StrictMode>
)
