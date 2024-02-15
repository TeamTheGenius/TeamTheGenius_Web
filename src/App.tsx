import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ReactQueryDevtools } from "@tanstack/react-query-devtools";

import LogIn from "./pages/LogIn/LogIn";
import Error from "./pages/Error/Error";
import SignUp from "./pages/SignUp/SignUp";
import Interest from "./pages/Interest/Interest";
import Main from "./pages/Main/Main";
import AdminTopic from "./pages/Admin/AdminTopic/AdminTopic";
import AdminInstance from "./pages/Admin/AdminInstance/AdminInstance";
import MyChallenge from "./pages/MyChallenge/MyChallenge";
import Pet from "./pages/Pet/Pet";
import { PATH } from "./constants/path";
import Home from "./pages/Home/Home";
import ChallengeDetail from "./pages/ChallengeDetail/ChallengeDetail";
import Auth from "./pages/Auth/Auth";
import InterestChallenge from "./pages/MyPage/InterestChallenge/InterestChallenge";
import PopularChallenge from "./pages/Home/PopularChallenge/PopularChallenge";
import NewChallenge from "./pages/Home/NewChallenge/NewChallenge";
import SuggestionChallenge from "./pages/Home/SuggestionChallenge/SuggestionChallenge";
import Search from "./pages/Home/Search/Search";
import MyPage from "./pages/MyPage/MyPage/MyPage";
import Certification from "./pages/Certification/Certification/Certification";
import MyCurrentCertification from "./pages/Certification/MyCurrentCertification/MyCurrentCertification";
import OthersCurrentCertification from "./pages/Certification/OthersCurrentCertification/OthersCurrentCertification";
import SettingMenu from "./pages/MyPage/SettingMenu/SettingMenu";

function App() {
  const queryClient = new QueryClient();
  return (
    <QueryClientProvider client={queryClient}>
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
            <Route
              path={PATH.MY_PAGE_INTEREST_CHALLENGE}
              element={<InterestChallenge />}
            />
            <Route path={PATH.MY_PAGE_SETTING_MENU} element={<SettingMenu />} />
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
          <Route path={PATH.CERTIFICATION} element={<Certification />}>
            <Route
              path={PATH.CERTIFICATION_MY_CURRENT}
              element={<MyCurrentCertification />}
            />
            <Route
              path={PATH.CERTIFICATION_OTHERS_CURRENT}
              element={<OthersCurrentCertification />}
            />
          </Route>
          <Route
            path={PATH.CHALLENGE_DETAIL_ID}
            element={<ChallengeDetail />}
          />
          <Route path={PATH.ADMIN} element={<AdminTopic />} />
          <Route path={PATH.ADMIN_INSTANCE_ID} element={<AdminInstance />} />
        </Routes>
      </Router>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
