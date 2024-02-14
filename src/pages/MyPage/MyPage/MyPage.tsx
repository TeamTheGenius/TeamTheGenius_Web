import Line from "@/components/Common/Line/Line";
import Header from "@/components/MyPage/MyPage/Header/Header";
import LinkButtons from "@/components/MyPage/MyPage/LinkButtons/LinkButtons";
import MyChallengeSummary from "@/components/MyPage/MyPage/MyChallengeSummary/MyChallengeSummary";
import MyPoint from "@/components/MyPage/MyPage/MyPoint/MyPoint";
import MyProfile from "@/components/MyPage/MyPage/MyProfile/MyProfile";

function MyPage() {
  return (
    <>
      <Header />
      <div className="px-[2.2rem] pt-[6.7rem] w-full">
        <div className="flex flex-col w-full justify-center items-center">
          <div className="w-full max-w-[49rem]">
            <MyProfile />
          </div>
          <div className="w-full max-w-[44.5rem] _sm:max-w-[27.8rem] mt-[2.9rem]">
            <MyPoint />
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
    </>
  );
}

export default MyPage;
