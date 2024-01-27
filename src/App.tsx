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
import { PATH } from "@/constants/path";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={PATH.ROOT} element={<Landing />} />
          <Route path={PATH.LOGIN} element={<LogIn />} />
          <Route path={PATH.SIGNUP} element={<SignUp />} />
          <Route path={PATH.INTEREST} element={<Interest />} />
          <Route path={PATH.ERROR} element={<Error />} />
          <Route path={PATH.MAIN} element={<Main />}>
            <Route path={PATH.TAB} element={<TabContent />}>
              <Route path={PATH.HOME} element={<Home />} />
              <Route
                path={PATH.POPULAR_CHALLENGE}
                element={<PopularChallenge />}
              />
              <Route path={PATH.NEW_CHALLENGE} element={<NewChallenge />} />
              <Route
                path={PATH.SUGGESTION_CHALLENGE}
                element={<SuggestionChallenge />}
              />
            </Route>
            <Route path={PATH.SEARCH} element={<Search />} />
          </Route>
          <Route path={PATH.ADMIN} element={<AdminTopic />} />
          <Route path={PATH.ADMIN_INSTANCE_ID} element={<AdminInstance />} />
        </Routes>
      </Router>
      ;
    </>
  );
}

export default App;
