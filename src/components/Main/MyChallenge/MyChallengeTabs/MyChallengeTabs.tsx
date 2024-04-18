import MyChallengeTab from "../MyChallengeTab/MyChallengeTab";
import { PATH } from "@/constants/path";

function MyChallengeTabs() {
  return (
    <div className="bg-white flex justify-between items-end  w-full max-w-[48.6rem]">
      <MyChallengeTab content="시작 전" path={PATH.MY_CHALLENGE_START} />
      <MyChallengeTab content="진행 중" path={PATH.MY_CHALLENGE_PROGRESS} />
      <MyChallengeTab content="완료" path={PATH.MY_CHALLENGE_COMPLETED} />
    </div>
  );
}

export default MyChallengeTabs;
