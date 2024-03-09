import getTotalCertification from "@/apis/getTotalCertification";
import OthersProfile from "@/components/Certification/OthersAllCurrentCertification/OthersProfile/OthersProfile";
import ReportButton from "@/components/Certification/OthersAllCurrentCertification/ReportButton/ReportButton";
import TotalCertification from "@/components/Certification/TotalCertification/TotalCertification";
import Header from "@/components/Common/Header/Header";
import MobCard from "@/components/Common/MobCard";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

interface Data {
  totalAttempts: number;
  certifications: CertificationData[];
}

interface CertificationData {
  certificationId: number;
  certificationAttempt: number;
  dayOfWeek: string;
  certificatedAt: string;
  certificateStatus: "NOT_YET" | "CERTIFICATED";
  prCount: number;
  prLinks: string[];
}

function OthersAllCurrentCertification() {
  const { id } = useParams();
  const { userId } = useParams();

  const { data } = useQuery<Data>({
    queryKey: ["totalCertification", { id }, { userId }],
    queryFn: () =>
      id && userId
        ? getTotalCertification({
            instanceId: parseInt(id),
            userId: parseInt(userId),
          })
        : Promise.resolve(null),
  });

  if (!data) return null;

  return (
    <MobCard>
      <Header content="참가자 인증 현황" />
      <div className="py-[6rem] px-[2.2rem] relative">
        {/* <div className="absolute top-[6rem] right-[2.2rem]">
          <ReportButton />
        </div> */}
        <div className="mt-[3.4rem] _sm:mt-[1.8rem]">
          <OthersProfile
            imgSrc={""}
            alt="프로필 이미지"
            nickName={"seona"}
            githubId={"choiseona"}
          />
          <div className="mt-[9.2rem] _sm:mt-[4.8rem]">
            <div className="flex justify-center items-center w-full">
              <div className="w-full max-w-[54rem] grid grid-cols-7 _sm:grid-cols-5 _md:grid-cols-6 gap-x-[2rem] gap-y-[5rem] ">
                <TotalCertification data={data} />
              </div>
            </div>
          </div>
        </div>
      </div>
    </MobCard>
  );
}

export default OthersAllCurrentCertification;
