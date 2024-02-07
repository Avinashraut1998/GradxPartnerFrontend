import React from "react";
import ReactDOM from "react-dom/client";

import "./index.css";
import {
  BrowserRouter as Router, // Use BrowserRouter instead of createBrowserRouter
  Routes,
  Route,
} from "react-router-dom";
import SignIn from "./Pages/Authentication/SignIn.jsx";
import SignUp from "./Pages/Authentication/SignUp.jsx";
import Leads from "./component/Leads.jsx";
import DefaultLayout from "./Layout/DefaultLayout.jsx";
import Dashboard from "./component/Dashboard.jsx";

ReactDOM.createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <Router>
      <Routes>
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<DefaultLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
        </Route>
      </Routes>
    </Router>
  </React.StrictMode>
);
