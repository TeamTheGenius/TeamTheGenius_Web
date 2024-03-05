import { PATH } from "@/constants/path";
import { useQuery } from "@tanstack/react-query";
import { Link } from "react-router-dom";
import getMyPageChallengesStatus from "../../../../apis/getMyPageChallengesStatus";

interface Data {
  fail: 0;
  success: 0;
  processing: 0;
  beforeStart: 0;
}

function MyChallengeSummary() {
  const { data } = useQuery<Data>({
    queryKey: ["myPageChallengeStatus"],
    queryFn: () => getMyPageChallengesStatus(),
  });

  if (!data) {
    return;
  }

  return (
    <>
      <p className="text-[1.8rem] font-semibold">챌린지 현황</p>
      <div className="flex flex-1 mt-[3.2rem] _sm:mt-[1.8rem] w-full _sm:h-[9.5rem] h-[15.7rem] border border-[#E1E1E1] rounded-[1rem] shadow-[0_4px_10px_0_rgba(225,225,225)]">
        <Link
          to={PATH.MY_CHALLENGE_START}
          className="flex-1 self-center text-center"
        >
          <div className="flex flex-col gap-[1.4rem] _sm:gap-0">
            <p className="text-[1.6rem] _sm:text-[1.4rem] font-medium text-[#777]">
              시작 전
            </p>
            <p className="text-[2.2rem] _sm:text-[2rem] font-medium">
              {data.beforeStart || 0}
            </p>
          </div>
        </Link>
        <Link
          to={PATH.MY_CHALLENGE_PROGRESS}
          className="flex-1 self-center text-center"
        >
          <div className="flex flex-col gap-[1.4rem] _sm:gap-0">
            <p className="text-[1.6rem] _sm:text-[1.4rem] font-medium text-[#777]">
              진행 중
            </p>
            <p className="text-[2.2rem] _sm:text-[2rem] font-medium">
              {data.processing || 0}
            </p>
          </div>
        </Link>
        <Link
          to={PATH.MY_CHALLENGE_COMPLETED}
          className="flex-1 self-center text-center"
        >
          <div className="flex flex-col gap-[1.4rem] _sm:gap-0">
            <p className="text-[1.6rem] _sm:text-[1.4rem] font-medium text-[#777]">
              완료/실패
            </p>
            <p className="text-[2.2rem] _sm:text-[2rem] font-medium">
              {data.success || 0}/{data.fail || 0}
            </p>
          </div>
        </Link>
      </div>
    </>
  );
}

export default MyChallengeSummary;
