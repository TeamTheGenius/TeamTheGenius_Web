import getCertificationInformation from "@/apis/getCertificationInformation ";
import CurrentAchivementRate from "@/components/Certification/MyCurrentCertification/CurrentAchivementRate/CurrentAchivementRate";
import MyAllCertificationLinkButton from "@/components/Certification/MyCurrentCertification/MyAllCertificationLinkButton/MyAllCertificationLinkButton";
import MyCertificationSummary from "@/components/Certification/MyCurrentCertification/MyCertificationSummary/MyCertificationSummary";
import MyRepository from "@/components/Certification/MyCurrentCertification/MyRepository/MyRepository";
import ThisWeekCertification from "@/components/Certification/MyCurrentCertification/ThisWeekCertification/ThisWeekCertification";
import { useQuery } from "@tanstack/react-query";
import { useParams } from "react-router-dom";

interface Data {
  repository: string;
  successPercent: number;
  totalAttempt: number;
  currentAttempt: number;
  pointPerPerson: number;
  successCount: number;
  failureCount: number;
  remainCount: number;
}

function MyCurrentCertification() {
  const { id } = useParams();

  const { data } = useQuery<Data>({
    queryKey: ["myCurrentCertification", { id }],
    queryFn: () =>
      id
        ? getCertificationInformation({ instanceId: parseInt(id) })
        : Promise.resolve(null),
  });

  if (!data) {
    return;
  }

  return (
    <div className="px-[2.2rem] pb-[2.2rem]">
      <div className="mt-[2.4rem]">
        <MyAllCertificationLinkButton />
      </div>
      <div className="mt-[1rem] max-w-[45.6rem]">
        <MyRepository
          repository={data.repository || "설정된 레포지토리가 없습니다"}
        />
      </div>
      <div className=" mt-[1.4rem] ">
        <CurrentAchivementRate
          successPercent={data.successPercent || 0}
          totalAttempt={data.totalAttempt || 0}
          currentAttempt={data.currentAttempt || 0}
          pointPerPerson={data.pointPerPerson || 0}
        />
      </div>
      <div className="mt-[2.3rem] _sm:mt-[3.7rem]">
        <MyCertificationSummary
          successCount={data.successCount || 0}
          failureCount={data.failureCount || 0}
          remainCount={data.remainCount || 0}
        />
      </div>
      <div className="mt-[4.6rem] _sm:mt-[3.7rem]">
        <ThisWeekCertification />
      </div>
    </div>
  );
}

export default MyCurrentCertification;
