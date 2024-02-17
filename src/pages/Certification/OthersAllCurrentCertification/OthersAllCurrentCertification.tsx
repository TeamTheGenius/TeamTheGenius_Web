import OthersAllCertificationResult from "@/components/Certification/OthersAllCurrentCertification/OthersAllCertificationResult/OthersAllCertificationResult";
import OthersProfile from "@/components/Certification/OthersAllCurrentCertification/OthersProfile/OthersProfile";
import ReportButton from "@/components/Certification/OthersAllCurrentCertification/ReportButton/ReportButton";
import Header from "@/components/Common/Header/Header";
import MobCard from "@/components/Common/MobCard";
import { othersAllCertificationData } from "@/data/othersCertificationResultData";
import { useParams } from "react-router-dom";

function OthersAllCurrentCertification() {
  const { othersId } = useParams();
  const data = othersAllCertificationData.find(
    (person) => person.id.toString() === othersId
  );
  if (!data) return;
  return (
    <MobCard>
      <Header content="참가자 인증 현황" />
      <div className="py-[6rem] px-[2.2rem] relative">
        <div className="absolute top-[6rem] right-[2.2rem]">
          <ReportButton />
        </div>
        <div className="mt-[3.4rem] _sm:mt-[1.8rem]">
          <OthersProfile
            imgSrc={data.imgSrc}
            alt="프로필 이미지"
            nickName={data.nickName}
            githubId={data.githubId}
          />
          <div className="mt-[9.2rem] _sm:mt-[4.8rem]">
            <OthersAllCertificationResult data={data.certificationInfo} />
          </div>
        </div>
      </div>
    </MobCard>
  );
}

export default OthersAllCurrentCertification;
