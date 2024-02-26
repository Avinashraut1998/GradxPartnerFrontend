import "./App.css";
import React from "react";
import SignIn from "./Pages/Authentication/SignIn.jsx";
import SignUp from "./Pages/Authentication/SignUp.jsx";
import Leads from "./component/Leads.jsx";
import DefaultLayout from "./Layout/DefaultLayout.jsx";
import Dashboard from "./component/Dashboard.jsx";
import LeadViewpage from "./component/Actions/LeadViewpage.jsx";
import LeadEditpage from "./component/Actions/LeadEditpage.jsx";
import AdminLogin from "./component/AdminComponent/AdminLogin.jsx";
import { Route, Routes } from "react-router-dom";
import AdminLayout from "./Layout/AdminLayout.jsx";
import AdminDashboard from "./component/AdminComponent/AdminDashboard.jsx";

function App() {
  return (
    <>
      <Routes>
        {/*User Routes */}
        <Route path="/" element={<SignIn />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/dashboard" element={<DefaultLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="leads" element={<Leads />} />
          <Route path="view/:id" element={<LeadViewpage />} />
          <Route path="edit/:id" element={<LeadEditpage />} />
        </Route>

        {/*Admin Route */}
        <Route path="admin/login" element={<AdminLogin />} />
        <Route path="admin/dashboard" element={<AdminLayout />}>
          <Route index element={<AdminDashboard />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
