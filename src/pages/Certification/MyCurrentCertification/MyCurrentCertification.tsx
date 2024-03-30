import getCertificationInformation from "@/apis/getCertificationInformation ";
import getMyWeekCertification from "@/apis/getMyWeekCertification";
import CurrentAchivementRate from "@/components/Certification/MyCurrentCertification/CurrentAchivementRate/CurrentAchivementRate";
import MyAllCertificationLinkButton from "@/components/Certification/MyCurrentCertification/MyAllCertificationLinkButton/MyAllCertificationLinkButton";
import MyCertificationSummary from "@/components/Certification/MyCurrentCertification/MyCertificationSummary/MyCertificationSummary";
import MyRepository from "@/components/Certification/MyCurrentCertification/MyRepository/MyRepository";
import MyThisWeekCertification from "@/components/Certification/MyCurrentCertification/MyWeekCertification/MyThisWeekCertification";
import PRTemplate from "@/components/Certification/MyCurrentCertification/PRTemplate/PRTemplate";
import { decrypt } from "@/hooks/useCrypto";
import { useQuery } from "react-query";
import { useParams } from "react-router-dom";

interface myCurrentCertificationData {
  prTemplate: string;
  repository: string;
  successPercent: number;
  totalAttempt: number;
  currentAttempt: number;
  pointPerPerson: number;
  successCount: number;
  failureCount: number;
  remainCount: number;
}

interface myWeekCertificationData {
  userId: number;
  certifications: CertificationData[];
}

interface CertificationData {
  certificationId: number;
  certificationAttempt: number;
  dayOfWeek: DayOfWeek;
  certificatedAt: string;
  certificateStatus: "NOT_YET" | "CERTIFICATED";
  prCount: number;
  prLinks: string[];
}

type DayOfWeek =
  | "MONDAY"
  | "TUESDAY"
  | "WEDNESDAY"
  | "THURSDAY"
  | "FRIDAY"
  | "SATURDAY"
  | "SUNDAY";

function MyCurrentCertification() {
  const { id } = useParams();
  const decryptedInstanceId = decrypt(id);

  const { data: myCurrentCertificationData } =
    useQuery<myCurrentCertificationData>({
      queryKey: ["myCurrentCertification", { decryptedInstanceId }],
      queryFn: () =>
        decryptedInstanceId
          ? getCertificationInformation({
              instanceId: parseInt(decryptedInstanceId),
            })
          : Promise.resolve(null),
    });

  const { data: myWeekCertificationData } = useQuery<myWeekCertificationData>({
    queryKey: ["myWeekCertification", { decryptedInstanceId }],
    queryFn: () =>
      decryptedInstanceId
        ? getMyWeekCertification({
            instanceId: parseInt(decryptedInstanceId),
          })
        : Promise.resolve(null),
  });

  if (!myCurrentCertificationData) {
    return;
  }

  if (!myWeekCertificationData) {
    return;
  }

  const {
    successPercent,
    totalAttempt,
    currentAttempt,
    pointPerPerson,
    repository,
    successCount,
    failureCount,
    remainCount,
    prTemplate,
  } = myCurrentCertificationData;

  return (
    <div className="px-[2.2rem] pb-[2.2rem]">
      <div className="mt-[2.4rem]">
        <MyAllCertificationLinkButton userId={myWeekCertificationData.userId} />
      </div>
      <div className="mt-[2rem] max-w-[45.2rem]">
        <PRTemplate prTemplate={prTemplate} />
      </div>
      <div className="mt-[1.5rem] max-w-[45.6rem]">
        <MyRepository
          repository={repository || "설정된 레포지토리가 없습니다"}
        />
      </div>
      <div className=" mt-[1.5rem] ">
        <CurrentAchivementRate
          successPercent={successPercent}
          totalAttempt={totalAttempt}
          currentAttempt={currentAttempt}
          pointPerPerson={pointPerPerson}
        />
      </div>
      <div className="mt-[2.3rem] _sm:mt-[3.7rem]">
        <MyCertificationSummary
          successCount={successCount}
          failureCount={failureCount}
          remainCount={remainCount}
        />
      </div>
      <div className="mt-[4.6rem] _sm:mt-[3.7rem]">
        <MyThisWeekCertification data={myWeekCertificationData} />
      </div>
    </div>
  );
}

export default MyCurrentCertification;
