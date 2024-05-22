import CurrentAchivementRate from "@/components/Certification/MyCurrentCertification/CurrentAchivementRate/CurrentAchivementRate";
import MyAllCertificationLinkButton from "@/components/Certification/MyCurrentCertification/MyAllCertificationLinkButton/MyAllCertificationLinkButton";
import MyCertificationSummary from "@/components/Certification/MyCurrentCertification/MyCertificationSummary/MyCertificationSummary";
import MyRepository from "@/components/Certification/MyCurrentCertification/MyRepository/MyRepository";
import MyThisWeekCertification from "@/components/Certification/MyCurrentCertification/MyWeekCertification/MyThisWeekCertification";
import PRTemplate from "@/components/Certification/MyCurrentCertification/PRTemplate/PRTemplate";
import {
  useGetCertificationStatistics,
  useGetMyCertificationWeek,
} from "@/hooks/queries/useCertificationQuery";

import { decrypt } from "@/hooks/useCrypto";
import { useParams } from "react-router-dom";

function MyCurrentCertification() {
  const { id } = useParams();
  const decryptedInstanceId = decrypt(id);

  const { data: myCurrentCertificationData } = useGetCertificationStatistics({
    decryptedInstanceId,
  });

  const { data: myWeekCertificationData } = useGetMyCertificationWeek({
    decryptedInstanceId,
  });

  if (!myCurrentCertificationData || !myWeekCertificationData) {
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
