import Login from "./components/Login";
import Create from "./components/Create"
import Dashboard from "./components/Dashboard"
import Ticketing from "./components/Ticketing"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="Create" element={<Create />} />
          <Route path="Dashboard" element={<Dashboard />} />
          <Route path="Ticketing" element={<Ticketing />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
