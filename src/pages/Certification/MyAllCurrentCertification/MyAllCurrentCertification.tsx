import MyAllCertificationResult from "@/components/Certification/MyAllCurrentCertification/MyAllCertificationResult/MyAllCertificationResult";
import MyProfile from "@/components/Certification/MyAllCurrentCertification/MyProfile/MyProfile";
import Header from "@/components/Common/Header/Header";
import MobCard from "@/components/Common/MobCard";
import test from "@/assets/image/google-logo.png";

function MyAllCurrentCertification() {
  return (
    <MobCard>
      <Header content="나의 인증 현황" />
      <div className="py-[6rem] px-[2.2rem]">
        <div className="mt-[3.4rem] _sm:mt-[1.8rem]">
          <MyProfile
            imgSrc={test}
            alt="프로필 이미지"
            nickName="희연"
            githubId="Ssung023"
          />
          <div className="mt-[9.2rem] _sm:mt-[4.8rem]">
            <MyAllCertificationResult />
          </div>
        </div>
      </div>
    </MobCard>
  );
}

export default MyAllCurrentCertification;
