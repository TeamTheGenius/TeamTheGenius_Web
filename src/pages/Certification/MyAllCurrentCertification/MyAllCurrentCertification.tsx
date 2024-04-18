import MyProfile from "@/components/Certification/MyAllCurrentCertification/MyProfile/MyProfile";
import Header from "@/components/Common/Header/Header";
import MobCard from "@/components/Common/MobCard";
import { useParams } from "react-router-dom";
import { decrypt } from "@/hooks/useCrypto";
import MyTotalCertification from "@/components/Certification/MyAllCurrentCertification/MyProfile/MyTotalCertification";
import { Suspense } from "react";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import { ErrorBoundary } from "react-error-boundary";
import CommonGetErrorFallback from "@/components/Error/CommonGetErrorFallback/CommonGetErrorFallback";
import { QueryErrorResetBoundary } from "react-query";

function MyAllCurrentCertification() {
  const { id } = useParams();
  const decryptedInstanceId = decrypt(id);
  const { userId } = useParams();
  const decryptedUserId = decrypt(userId);

  return (
    <MobCard>
      <Header content="나의 인증 현황" />
      <div className="py-[6rem] px-[2.2rem] h-full">
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              FallbackComponent={CommonGetErrorFallback}
            >
              <Suspense fallback={<LoadingBox />}>
                <div className="mt-[3.4rem] _sm:mt-[1.8rem]">
                  <MyProfile decryptedUserId={decryptedUserId} />
                  <MyTotalCertification
                    decryptedInstanceId={decryptedInstanceId}
                    decryptedUserId={decryptedUserId}
                  />
                </div>
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </MobCard>
  );
}

export default MyAllCurrentCertification;
