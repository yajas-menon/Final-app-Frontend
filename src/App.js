import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SecurityTemplate from "./pages/SecurityTemplate";
import VendorComplianceTemplate from "./pages/VendorComplianceTemplate";
import VendorList from "./pages/VendorList";
import Dashboard from "./pages/Dashboard";
import Login from "./pages/Login";
import QuestionForm from "./pages/QuestionForm";
import SubmitForm from "./pages/SubmitForm";
import TemplateForm from "./pages/TemplateForm";
import VendorForm from "./pages/VendorForm";
import ReviewPage from "./pages/ReviewPage";
import AdminPage from "./pages/AdminPage";
import FetchUser from "./pages/FetchUser";
import Dashboard1 from './pages/Dashboard1';
// import { useEffect, useState } from "react";

function App() {

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<Login />}></Route>
        <Route exact path="/QuestionForm" element={<QuestionForm />}></Route>
        <Route exact path="/dashboard" element={<Dashboard />}></Route>
        <Route exact path="/VendorList" element={<VendorList />}></Route>
        <Route
          exact
          path="/SecurityTemplate"
          element={<SecurityTemplate />}
        ></Route>
        <Route
          exact
          path="/VendorComplianceTemplate"
          element={<VendorComplianceTemplate />}
        ></Route>
        <Route exact path="/SubmitForm" element={<SubmitForm />} />
        <Route exact path="/TemplateForm" element={<TemplateForm />} />
        <Route exact path="/VendorForm" element={<VendorForm />} />
        <Route
          exact
          path="/SubmitForm/requestId/:requestId"
          element={<SubmitForm />}
        ></Route>
        <Route exact path="/ReviewPage" element={<ReviewPage />}></Route>
        <Route exact path="/AdminPage" element={<AdminPage />}></Route>
        <Route exact path="/FetchUser" element={<FetchUser />}></Route>
        <Route exact path="/Dashboard1" element={<Dashboard1 />}></Route>
      </Routes>
    </Router>
  );
}

export default App;
 