const requests = {
  fetchAuth: `/auth`,
  fetchAuthSignup: `/auth/signup`,
  fetchLogout: `/logout`,
  fetchTopic: `/admin/topic`,
  fetchInstance: `/admin/instance`,
  fetchChallenges: `/challenges`,
  fetchChallengesLatest: `/challenges/latest`,
  fetchChallengesActivity: `/challenges/my/activity`,
  fetchChallengesDone: `/challenges/my/done`,
  fetchChallengesPreActivity: `/challenges/my/pre-activity`,
  fetchChallengesReward: `/challenges/reward`,
  fetchChallengesPopular: `/challenges/popular`,
  fetchChallengesRecommend: `/challenges/recommend`,
  fetchChallengesSearch: `/challenges/search`,
  fetchProfile: `/profile`,
  fetchProfileInterest: `/profile/interest`,
  fetchProfileInfo: `/profile/information`,
  fetchProfileChallenges: `/profile/challenges`,
  fetchLikeChallenge: `/profile/likes`,
  fetchCert: `/certification`,
  fetchCertTotal: `/certification/total`,
  fetchCertInfo: `/certification/information`,
  fetchCertRepo: `/certification/repositories`,
  fetchCertPullReq: `/certification/verify/pull-request`,
  fetchCertToday: `/certification/today`,
  fetchCertWeek: `/certification/week`,
  fetchCertPass: `/certification/pass`,
  fetchCertWeekAll: `/certification/week/all`,
  fetchCertVerifyToken: `/certification/verify/token`,
  fetchCertVerifyRepo: `/certification/verify/repository`,
  fetchCertRegisterToken: `/certification/register/token`,
  fetchCheckNickname: `/signup/check-nickname`,
  fetchPaymentToss: `/payment/toss`,
  fetchPaymentTossFail: `/payment/toss/fail`,
  fetchItemUse: `/items/use`,
};

export default requests;
