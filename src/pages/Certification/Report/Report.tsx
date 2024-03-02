import OthersProfile from "@/components/Certification/Report/OthersProfile/OthersProfile";
import ReportButton from "@/components/Certification/Report/ReportButton/ReportButton";
import ReportSelect from "@/components/Certification/Report/ReportSelect/ReportSelect";
import Title from "@/components/Certification/Report/Title/Title";
import Header from "@/components/Common/Header/Header";
import MobCard from "@/components/Common/MobCard";
import { othersAllCertificationData } from "@/data/othersCertificationResultData";
import { useParams } from "react-router-dom";

function Report() {
  const { othersId } = useParams();
  const data = othersAllCertificationData.find(
    (person) => person.id.toString() === othersId
  );

  if (!data) return;

  return (
    <MobCard>
      <Header content="참가자 인증 현황" />
      <div className="pt-[6rem] pb-[15rem] px-[2.2rem] mt-[3.4rem]">
        <OthersProfile
          imgSrc={data.imgSrc}
          alt="프로필 이미지"
          nickName={data.nickName}
          githubId={data.githubId}
        />
        <div className="mt-[5.7rem] w-full max-w-[54.6rem] mx-auto">
          <Title />
        </div>
        <div className="mt-[5.2rem] _sm:mt-[2.5rem]">
          <ReportSelect />
        </div>
      </div>
      <div className="h-[8.5rem] px-[2.2rem] fixed bottom-0 flex justify-center items-center _sm:justify-end w-full max-w-[77.3rem] mx-auto bg-white">
        <ReportButton />
      </div>
    </MobCard>
  );
}

export default Report;
