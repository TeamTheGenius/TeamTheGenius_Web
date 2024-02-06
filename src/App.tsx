import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";

import LogIn from "./pages/LogIn/LogIn";
import Error from "./pages/Error/Error";
import SignUp from "./pages/SignUp/SignUp";
import Interest from "./pages/Interest/Interest";
import Main from "./pages/Main/Main";
import AdminTopic from "./pages/Admin/AdminTopic/AdminTopic";
import AdminInstance from "./pages/Admin/AdminInstance/AdminInstance";
import MyChallenge from "./pages/MyChallenge/MyChallenge";
import Pet from "./pages/Pet/Pet";
import MyPage from "./pages/MyPage/MyPage";
import { PATH } from "./constants/path";
import Home from "./pages/Home/Home";
import PopularChallenge from "./pages/PopularChallenge/PopularChallenge";
import NewChallenge from "./pages/NewChallenge/NewChallenge";
import SuggestionChallenge from "./pages/SuggestionChallenge/SuggestionChallenge";
import Search from "./pages/Search/Search";
import ChallengeDetail from "./pages/ChallengeDetail/ChallengeDetail";
import Auth from "./pages/Auth/Auth";

function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path={PATH.LOGIN} element={<LogIn />} />
          <Route path={PATH.SIGNUP} element={<SignUp />} />
          <Route path={PATH.AUTH} element={<Auth />} />
          <Route path={PATH.INTEREST} element={<Interest />} />
          <Route path={PATH.ERROR} element={<Error />} />
          <Route path={PATH.MAIN} element={<Main />}>
            <Route path={PATH.MY_CHALLENGE} element={<MyChallenge />} />
            <Route path={PATH.PET} element={<Pet />} />
            <Route path={PATH.MY_PAGE} element={<MyPage />} />
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
            <Route path={PATH.SEARCH} element={<Search />} />
          </Route>
          <Route path={PATH.CHALLENGE_ITEM_ID} element={<ChallengeDetail />} />
          <Route path={PATH.ADMIN} element={<AdminTopic />} />
          <Route path={PATH.ADMIN_INSTANCE_ID} element={<AdminInstance />} />
        </Routes>
      </Router>
    </>
  );
}

export default App;
