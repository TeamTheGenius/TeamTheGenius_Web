import MyChallengeHeader from "@/components/Main/MyChallenge/MyChallengeHeader/MyChallengeHeader";
import "@/pages/MyChallenge/MyChallengeStyle.css";
import { Suspense } from "react";
import { Outlet } from "react-router-dom";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";

const MyChallenge = () => {
  return (
    <>
      <div className="w-full h-full">
        <MyChallengeHeader />
        <Suspense fallback={<LoadingBox />}>
          <div className="px-[2.2rem]">
            <Outlet />
          </div>
        </Suspense>
      </div>
    </>
  );
};

export default MyChallenge;
