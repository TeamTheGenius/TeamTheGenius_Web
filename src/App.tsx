import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import LogIn from "./pages/LogIn/LogIn";
import Error from "./pages/Error/Error";
import SignUp from "./pages/SignUp/SignUp";
import Interest from "./pages/Interest/Interest";
import Main from "./pages/Main/Main";
import AdminTopic from "./pages/AdminTopic/Admin";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<LogIn />} />
          <Route path="/login/signup" element={<SignUp />} />
          <Route path="/login/signup/interest" element={<Interest />} />
          <Route path="/error" element={<Error />} />
          <Route path="/main" element={<Main />} />
          <Route path="/admin" element={<AdminTopic />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
