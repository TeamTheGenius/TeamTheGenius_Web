import ChallengeInformation from "@/components/Certification/Certification/ChallengeInformation/ChallengeInformation";
import Tabs from "@/components/Certification/Certification/Tabs/Tabs";
import DynamicBackIcon from "@/components/Common/DynamicBackIcon/DynamicBackIcon";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import MobCard from "@/components/Common/MobCard";
import CommonGetErrorFallback from "@/components/Error/CommonGetErrorFallback/CommonGetErrorFallback";
import { decrypt } from "@/hooks/useCrypto";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";
import { Outlet, useParams } from "react-router-dom";

function Certification() {
  const { id } = useParams();
  const decryptedInstanceId = decrypt(id);

  if (!id) {
    return;
  }
  return (
    <MobCard>
      <div className="max-w-[77.3rem] w-full z-10 fixed ml-[1.9rem] top-[1.3rem]">
        <DynamicBackIcon />
      </div>
      <div className="flex flex-col items-center h-full">
        <div className="max-w-[54.6rem] w-full flex flex-col h-full">
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                onReset={reset}
                FallbackComponent={CommonGetErrorFallback}
              >
                <Suspense fallback={<LoadingBox />}>
                  <ChallengeInformation />
                </Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>

          <Tabs id={decryptedInstanceId} />

          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                onReset={reset}
                FallbackComponent={CommonGetErrorFallback}
              >
                <Suspense fallback={<LoadingBox />}>
                  <Outlet />
                </Suspense>
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </div>
      </div>
    </MobCard>
  );
}

export default Certification;
