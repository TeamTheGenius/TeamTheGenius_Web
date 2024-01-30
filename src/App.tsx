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
import PopularChallengeTab from "./pages/Main/PopularChallengeTab/PopularChallenge";
import NewChallengeTab from "./pages/Main/NewChallengeTab/NewChallenge";
import SuggestionChallengeTab from "./pages/Main/SuggestionChallengeTab/SuggestionChallenge";
import Search from "./pages/Main/Search/Search";
import { PATH } from "@/constants/path";
import MyChallenge from "./pages/Main/MyChallenge/MyChallenge";
import Pet from "./pages/Main/Pet/Pet";
import MyPage from "./pages/Main/MyPage/MyPage";
import Home from "./pages/Main/Home/Home";

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
            <Route path={PATH.MY_CHALLENGE} element={<MyChallenge />} />
            <Route path={PATH.PET} element={<Pet />} />
            <Route path={PATH.MY_PAGE} element={<MyPage />} />
            <Route path={PATH.HOME} element={<Home />} />
            <Route
              path={PATH.POPULAR_CHALLENGE}
              element={<PopularChallengeTab />}
            />
            <Route path={PATH.NEW_CHALLENGE} element={<NewChallengeTab />} />
            <Route
              path={PATH.SUGGESTION_CHALLENGE}
              element={<SuggestionChallengeTab />}
            />
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
