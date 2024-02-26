import React from "react";
import ReactDOM from "react-dom/client";
import App from "./App.jsx";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import { AuthProvider } from "./context/AuthContext.jsx";
import { LeadProvider } from "./context/LeadContext.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <AuthProvider>
      <LeadProvider>
        <BrowserRouter>
          <App />
        </BrowserRouter>
      </LeadProvider>
    </AuthProvider>
  </React.StrictMode>
);
