export const PATH = {
  LOGIN: "/",
  SIGNUP: "/login/signup",
  AUTH: "/auth",
  INTEREST: "/login/signup/interest",
  ERROR: "/error",
  MAIN: "/main",
  HOME: "/main/home",
  SEARCH: "/main/home/search",
  POPULAR_CHALLENGE: "/main/home/popular",
  NEW_CHALLENGE: "/main/home/new",
  SUGGESTION_CHALLENGE: "/main/home/suggestion",

  CHALLENGE_DETAIL: "/challenge-detail",
  CHALLENGE_DETAIL_ID: "/challenge-detail/:id",

  MY_CHALLENGE: "/main/my-challenge/*",
  MY_CHALLENGE_START: "/main/my-challenge/start",
  MY_CHALLENGE_PROGRESS: "/main/my-challenge/progress",
  MY_CHALLENGE_COMPLETED: "/main/my-challenge/completed",

  PET: "/main/pet",

  MY_PAGE: "/main/my-page",
  MY_PAGE_INTEREST_CHALLENGE: "/main/my-page/interest",
  MY_PAGE_SETTING_MENU: "/main/my-page/setting",

  MY_PAGE_INTEREST_EDIT: "/main/my-page/interestedit",
  MY_PAGE_USERINFO_DIT: "/main/my-page/userinfoedit",

  MY_PAGE_GITHUB_TOKEN: "/main/my-page/token",
  MY_PAGE_WITHDRAW: "/main/my-page/service-withdraw",


  CERTIFICATION: "/certification",
  CERTIFICATION_ID: "/certification/:id",
  CERTIFICATION_MY_CURRENT: "/certification/:id/my-current",
  CERTIFICATION_MY_ALL_CURRENT: "/certification/:id/my-all-current",
  CERTIFICATION_OTHERS_CURRENT: "/certification/:id/others-current",
  CERTIFICATION_OTHERS_ALL_CURRENT:
    "/certification/:id/others-current/:othersId",
  CERTIFICATION_REPORT: "/certification/:id/others-current/:othersId/report",

  PAYMENTS: "/payments",
  PAYMENTS_SUCCESS: "/payments/success",
  PAYMENTS_FAIL: "/payments/fail",

  // 임시 주손
  GITHUB_PULLREQ: "/pullrequest",

  ADMIN: "/admin",
  ADMIN_INSTANCE: "/admin/instance",
  ADMIN_INSTANCE_ID: "/admin/instance/:id",
};
