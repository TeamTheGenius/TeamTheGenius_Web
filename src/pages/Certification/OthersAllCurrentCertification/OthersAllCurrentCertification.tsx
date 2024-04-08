import OthersProfile from "@/components/Certification/OthersAllCurrentCertification/OthersProfile/OthersProfile";
import Header from "@/components/Common/Header/Header";
import MobCard from "@/components/Common/MobCard";
import { decrypt } from "@/hooks/useCrypto";
import { useParams } from "react-router-dom";
import OthersTotalCertification from "@/components/Certification/OthersAllCurrentCertification/OthersProfile/OthersTotalCertification";
import { Suspense } from "react";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";

function OthersAllCurrentCertification() {
  const { id } = useParams();
  const { userId } = useParams();
  const decryptedInstanceId = decrypt(id);
  const decryptedUserId = decrypt(userId);

  return (
    <MobCard>
      <Header content="참가자 인증 현황" />
      <div className="py-[6rem] px-[2.2rem] relative h-full">
        {/* <div className="absolute top-[6rem] right-[2.2rem]">
          <ReportButton />
        </div> */}
        <Suspense fallback={<LoadingBox />}>
          <div className="mt-[3.4rem] _sm:mt-[1.8rem]">
            <OthersProfile decryptedUserId={decryptedUserId} />
            <OthersTotalCertification
              decryptedInstanceId={decryptedInstanceId}
              decryptedUserId={decryptedUserId}
            />
          </div>
        </Suspense>
      </div>
    </MobCard>
  );
}

export default OthersAllCurrentCertification;
