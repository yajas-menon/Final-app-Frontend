import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import SecurityTemplate from './pages/SecurityTemplate';
import VendorComplianceTemplate from './pages/VendorComplianceTemplate';
import VendorList from './pages/VendorList'
import Dashboard from './pages/Dashboard';
import Login from './pages/Login';
import QuestionForm from './pages/QuestionForm';
import SubmitForm from './pages/SubmitForm';
import TemplateForm from './pages/TemplateForm';
import VendorForm from './pages/VendorForm';
import ReviewPage from './pages/ReviewPage';
import AdminPage from './pages/AdminPage';


function App() {
  return (
    <Router>
      <Routes>
        <Route exact path="/Login" element={<Login/>}></Route>
        <Route exact path='/QuestionForm' element={<QuestionForm/>}></Route>
        <Route exact path='/' element={<Dashboard/>}></Route>
        <Route exact path="/VendorList" element={<VendorList/>}></Route>
        <Route exact path="/SecurityTemplate" element={<SecurityTemplate />}></Route>
        <Route exact path='/VendorComplianceTemplate' element={<VendorComplianceTemplate/>}></Route>
        <Route exact path='/SubmitForm' element={<SubmitForm/>}/>
        <Route exact path='/TemplateForm' element={<TemplateForm/>}/>
        <Route exact path='/VendorForm' element={<VendorForm/>}/>
        <Route exact path="/SubmitForm/requestId/:requestId" element={<SubmitForm/>}></Route>
        <Route exact path='/ReviewPage' element={<ReviewPage/>}></Route>
        <Route exact path='/AdminPage' element={<AdminPage/>}></Route>

      </Routes>
    </Router>
  );
}

export default App;


