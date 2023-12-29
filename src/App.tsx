import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import SignUp from "./pages/SignUp/SignUp";
import Landing from "./pages/Landing/Landing";
import LogIn from "./pages/LogIn/LogIn";
import Error from "./pages/error/Error";
import SignComplate from "./pages/SignComplate/SignComplate";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/login/signup" element={<SignUp />} />
          <Route path="/error" element={<Error />} />
          <Route path="/signcomplate" element={<SignComplate />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
