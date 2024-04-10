import "./index.css";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import { PATH } from "./constants/path";
import {
  QueryClient,
  QueryClientProvider,
  useQueryErrorResetBoundary,
} from "react-query";
import { ReactQueryDevtools } from "react-query/devtools";
import LogIn from "./pages/LogIn/LogIn";
import Interest from "./pages/Interest/Interest";
import Main from "./pages/Main/Main";
import AdminTopic from "./pages/Admin/AdminTopic/AdminTopic";
import AdminInstance from "./pages/Admin/AdminInstance/AdminInstance";
import MyChallenge from "./pages/MyChallenge/MyChallenge";
import Home from "./pages/Home/Home";
import ChallengeDetail from "./pages/ChallengeDetail/ChallengeDetail";
import Auth from "./pages/Auth/Auth";
import InterestChallenge from "./pages/MyPage/InterestChallenge/InterestChallenge";
import Error from "./pages/Error/Error";
import PopularChallenge from "./pages/Home/PopularChallenge/PopularChallenge";
import NewChallenge from "./pages/Home/NewChallenge/NewChallenge";
import SuggestionChallenge from "./pages/Home/SuggestionChallenge/SuggestionChallenge";
import Search from "./pages/Home/Search/Search";
import MyPage from "./pages/MyPage/MyPage/MyPage";
import Certification from "./pages/Certification/Certification/Certification";
import MyCurrentCertification from "./pages/Certification/MyCurrentCertification/MyCurrentCertification";
import OthersCurrentCertification from "./pages/Certification/OthersCurrentCertification/OthersCurrentCertification";
import SettingMenu from "./pages/MyPage/SettingMenu/SettingMenu";
import MyAllCurrentCertification from "./pages/Certification/MyAllCurrentCertification/MyAllCurrentCertification";
import OthersAllCurrentCertification from "./pages/Certification/OthersAllCurrentCertification/OthersAllCurrentCertification";
import InterestEdit from "./pages/MyPage/InterestEdit/InterestEdit";
import UserInfoEdit from "./pages/MyPage/UserInfoEdit/UserInfoEdit";
import SignUp from "./pages/SignUp/SignUp";
import Payments from "./pages/Payments/Payments";
import { Fail } from "./pages/Payments/Fail/Fail";
import Success from "./pages/Payments/Success/Success";
import GithubToken from "./pages/MyPage/GithubToken/GithubToken";
import GitPullReqConnect from "./pages/ChallengeDetail/GitPullReqConnect/GitPullReqConnect";
import ServiceWithdraw from "./pages/MyPage/ServiceWithdraw/ServiceWithdraw";
import Report from "./pages/Certification/Report/Report";
import MyChallengeStart from "./pages/MyChallenge/MyChallengeStart/MyChallengeStart";
import MyChallengeProgress from "./pages/MyChallenge/MyChallengeProgress/MyChallengeProgress";
import MyChallengeComplete from "./pages/MyChallenge/MyChallengeComplete/MyChallengeComplete";
import AllSearch from "./pages/Home/Search/AllSearch/AllSearch";
import PreActivitySearch from "./pages/Home/Search/PreActivitySearch/PreActivitySearch";
import ActivitySearch from "./pages/Home/Search/ActivitySearch/ActivitySearch";
import DoneSearch from "./pages/Home/Search/DoneSearch/DoneSearch";
import Shop from "./pages/Shop/Shop";
import Receipt from "./pages/MyPage/Receipt/Receipt";
import PrivateRoute from "./components/Route/PrivateRoute/PrivateRoute";
import { ErrorBoundary } from "react-error-boundary";
import { Suspense } from "react";
import Loading from "./components/Common/Loading/Loading";

function App() {
  const { reset } = useQueryErrorResetBoundary();
  const queryClient = new QueryClient({
    defaultOptions: {
      queries: {
        useErrorBoundary: true,
      },
      mutations: {
        useErrorBoundary: true,
      },
    },
  });
  return (
    <QueryClientProvider client={queryClient}>
      <ErrorBoundary
        fallback={
          <Error errorTxt="데이터 불러오기에 실패했어요." buttonExist={false} />
        }
        onReset={reset}
      >
        <Suspense fallback={<Loading />}>
          <Router>
            <Routes>
              <Route path={PATH.LOGIN} element={<LogIn />} />
              <Route path={PATH.SIGNUP} element={<SignUp />} />
              <Route path={PATH.AUTH} element={<Auth />} />
              <Route path={PATH.INTEREST} element={<Interest />} />
              <Route path={PATH.ERROR} element={<Error />} />
              <Route element={<PrivateRoute />}>
                <Route path={PATH.MAIN} element={<Main />}>
                  <Route path={PATH.MY_CHALLENGE} element={<MyChallenge />}>
                    <Route
                      path={PATH.MY_CHALLENGE_START}
                      element={<MyChallengeStart />}
                    />
                    <Route
                      path={PATH.MY_CHALLENGE_PROGRESS}
                      element={<MyChallengeProgress />}
                    />
                    <Route
                      path={PATH.MY_CHALLENGE_COMPLETED}
                      element={<MyChallengeComplete />}
                    />
                  </Route>

                  <Route path={PATH.SHOP} element={<Shop />} />
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
                  <Route path={PATH.SEARCH} element={<Search />}>
                    <Route path={PATH.SEARCH_ALL} element={<AllSearch />} />
                    <Route
                      path={PATH.SEARCH_PREACTIVITY}
                      element={<PreActivitySearch />}
                    />
                    <Route
                      path={PATH.SEARCH_ACTIVITY}
                      element={<ActivitySearch />}
                    />
                    <Route path={PATH.SEARCH_DONE} element={<DoneSearch />} />
                  </Route>
                </Route>
                <Route
                  path={PATH.MY_PAGE_INTEREST_CHALLENGE}
                  element={<InterestChallenge />}
                />
                <Route
                  path={PATH.MY_PAGE_SETTING_MENU}
                  element={<SettingMenu />}
                />
                <Route
                  path={PATH.MY_PAGE_INTEREST_EDIT}
                  element={<InterestEdit />}
                />
                <Route
                  path={PATH.MY_PAGE_USERINFO_DIT}
                  element={<UserInfoEdit />}
                />
                <Route
                  path={PATH.MY_PAGE_GITHUB_TOKEN}
                  element={<GithubToken />}
                />
                <Route path={PATH.MY_PAGE_RECEIPT} element={<Receipt />} />
                <Route
                  path={PATH.MY_PAGE_WITHDRAW}
                  element={<ServiceWithdraw />}
                />

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
                  path={PATH.CERTIFICATION_MY_ALL_CURRENT}
                  element={<MyAllCurrentCertification />}
                />
                <Route
                  path={PATH.CERTIFICATION_OTHERS_ALL_CURRENT}
                  element={<OthersAllCurrentCertification />}
                />
                <Route path={PATH.CERTIFICATION_REPORT} element={<Report />} />
                <Route
                  path={PATH.CHALLENGE_DETAIL_ID}
                  element={<ChallengeDetail />}
                />

                <Route path={PATH.PAYMENTS} element={<Payments />} />
                <Route path={PATH.PAYMENTS_SUCCESS} element={<Success />} />
                <Route path={PATH.PAYMENTS_FAIL} element={<Fail />} />
                <Route
                  path={PATH.GITHUB_REPO_REGISTER}
                  element={<GitPullReqConnect />}
                />

                <Route path={PATH.ADMIN} element={<AdminTopic />} />
                <Route
                  path={PATH.ADMIN_INSTANCE_ID}
                  element={<AdminInstance />}
                />
              </Route>

              <Route
                path="/*"
                element={
                  <Error
                    errNum={404}
                    errorTxt="페이지 정보를 찾을 수 없습니다."
                  />
                }
              />
            </Routes>
          </Router>
        </Suspense>
      </ErrorBoundary>
      <ReactQueryDevtools initialIsOpen={true} />
    </QueryClientProvider>
  );
}

export default App;
