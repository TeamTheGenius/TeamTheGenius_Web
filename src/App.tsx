import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/signUp/SignUp";
import Landing from "./pages/Landing/Landing";
import LogIn from "./pages/LogIn/LogIn";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/login/signup" element={<SignUp />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
