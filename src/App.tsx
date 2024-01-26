import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import Landing from "./pages/Landing/Landing";
import LogIn from "./pages/LogIn/LogIn";
import Error from "./pages/Error/Error";
import SignUp from "./pages/SignUp/SignUp";
import Interest from "./pages/Interest/Interest";
import Main from "./pages/Main/Main";
import AdminTopic from "./pages/Admin/AdminTopic/AdminTopic";
import AdminInstance from "./pages/Admin/AdminInstance/AdminInstance";
import Home from "./pages/Main/Home/Home";
import PopularChallenge from "./pages/Main/PopularChallenge/PopularChallenge";
import NewChallenge from "./pages/Main/NewChallenge/NewChallenge";
import SuggestionChallenge from "./pages/Main/SuggestionChallenge/SuggestionChallenge";
import Search from "./pages/Main/Search/Search";
import TabContent from "./pages/Main/TabContent/TabContent";

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
          <Route path="/main" element={<Main />}>
            <Route path="tab" element={<TabContent />}>
              <Route path="home" element={<Home />} />
              <Route path="popular" element={<PopularChallenge />} />
              <Route path="new" element={<NewChallenge />} />
              <Route path="suggestion" element={<SuggestionChallenge />} />
            </Route>
            <Route path="search" element={<Search />} />
          </Route>
          <Route path="/admin" element={<AdminTopic />} />
          <Route path="/admin/instance/:id" element={<AdminInstance />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
