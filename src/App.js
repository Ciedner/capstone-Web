import Login from "./components/Login";
import Create from "./components/Create"
import Dashboard from "./components/Dashboard"
import OperatorDashboard from "./Operator/OperatorDashboard";
import ViewSpace from "./Operator/ViewSpace"
import AgentRegistration from "./components/AgentRegistration"
import Tracks from "./components/Tracks";
import Feedback from "./components/Feedback"
import Profiles from "./components/Profiles"
import ForgetPassword from "./components/ForgetPassword"
import OperatorProfile from "./Operator/OperatorProfile"
import AgentSchedule from "./components/AgentSchedule"
import TicketInfo from "./components/TicketInfo"


import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="Create" element={<Create />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="OperatorDashboard" element={<OperatorDashboard />} />
          <Route path="ViewSpace" element={<ViewSpace/>} />
          <Route path="AgentRegistration" element={<AgentRegistration/>} />
          <Route path="Tracks" element={<Tracks/>} />
          <Route path="Feedback" element={<Feedback/>} />
          <Route path="Profiles" element={<Profiles/>} />
          <Route path="forget" element={<ForgetPassword/>} />
          <Route path="OperatorProfile" element={<OperatorProfile/>} />
          <Route path="AgentSchedule" element={<AgentSchedule/>} />
          <Route path="TicketInfo" element={<TicketInfo/>} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
