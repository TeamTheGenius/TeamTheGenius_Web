import Line from "@/components/Common/Line/Line";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import MainHeader from "@/components/Common/MainHeader/MainHeader";
import LinkButtons from "@/components/MyPage/MyPage/LinkButtons/LinkButtons";
import MyChallengeSummary from "@/components/MyPage/MyPage/MyChallengeSummary/MyChallengeSummary";
import MyProfile from "@/components/MyPage/MyPage/MyProfile/MyProfile";
import { Suspense } from "react";

function MyPage() {
  return (
    <>
      <MainHeader headerText="마이 페이지" />
      <Suspense fallback={<LoadingBox />}>
        <div className="px-[2.2rem] pt-[6.7rem] w-full">
          <div className="flex flex-col w-full justify-center items-center">
            <div className="w-full max-w-[49rem]">
              <MyProfile />
            </div>
            <div className="w-full mt-[5.1rem] _sm:mt-[2.6rem] max-w-[53rem] _sm:max-w-[31.2rem]">
              <MyChallengeSummary />
            </div>
          </div>
        </div>
        <div className="mt-[5.6rem] w-full">
          <Line />
        </div>
        <div className="w-full px-[2.2rem] py-[2.7rem]">
          <div className="w-full flex justify-center items-center">
            <div className=" w-full max-w-[53rem]">
              <LinkButtons />
            </div>
          </div>
        </div>
      </Suspense>
    </>
  );
}

export default MyPage;
