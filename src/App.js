import Login from "./components/Login";
import Create from "./components/Create"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="Create" element={<Create />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;
