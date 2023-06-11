import './App.css';
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Login from "./Components/Login";
import Register from "./Components/Register";
import GrassrootDashboard from "./Components/Grassroot/GrassrootDashboard";
import OperationsDashboard from "./Components/Operations/OperationsDashboard";
import TeamLeadDashoard from "./Components/TeamLead/TeamLeadDashboard";
import GDetails from "./Components/Grassroot/GDetails";
import StatusUpdate from "./Components/Grassroot/StatusUpdate";
import Help from "./Components/Help";
import ProcessEdit from "./Components/Operations/ProcessEdit";
import TeamLeadHome from "./Components/TeamLead/TeamLeadHome";
import OperationsHome from "./Components/Operations/OperationsHome";
import Home from './Components/Home';

// import Home from "./Components/Home";

function App() {
  return (
    <div className="App">
     
      <BrowserRouter>
          <Routes>
          {/* not sure about the which page is home page */}
            <Route exact path="/" element={<Home />} />
            <Route exact path="/login" element={<Login />} />
            <Route exact path="/register" element={<Register />} />
            <Route exact path="/grassDashboard" element={<GrassrootDashboard />} />
            <Route exact path="/operationsDashoard" element={<OperationsDashboard />} />
            <Route exact path="/teamLeadDashoard" element={<TeamLeadDashoard />} />
            {/* Grassroot's children's details page */}
            {/* <Route exact path="/details" element={<GDetails />} /> */}
            <Route exact path="/details/:id" element={<GDetails />} />
            <Route exact path="/status-update/:childId/:processId" element={<StatusUpdate />} />
            <Route exact path="/help" element={<Help />} />
            <Route exact path="/processEdit" element={<ProcessEdit />} />
            <Route exact path="/teamleadhome" element={<TeamLeadHome />} />
            <Route exact path="/operationshome" element={<OperationsHome />} />
          </Routes>
        </BrowserRouter>
  
    </div>
  );
}

export default App;
