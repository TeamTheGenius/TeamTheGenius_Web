import { Outlet } from "react-router-dom";
import MainHeader from "@/components/Common/MainHeader/MainHeader";
import MyChallengeTabs from "@/components/Main/MyChallenge/MyChallengeTabs/MyChallengeTabs";

const MyChallenge = () => {
  return (
    <>
      <MainHeader headerText="마이 챌린지" />
      <div className="pt-[6.9rem] z-40 pb-[0.2rem] w-full flex justify-center left-0 fixed px-[2rem]">
        <MyChallengeTabs />
      </div>

      <div className="px-[2.2rem] pt-[12.5rem] h-full pb-[2rem]">
        <Outlet />
      </div>
    </>
  );
};
export default MyChallenge;
