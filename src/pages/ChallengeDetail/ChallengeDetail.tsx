import { useParams } from "react-router-dom";
import MobCard from "@/components/Common/MobCard";
import DynamicBackIcon from "@/components/Common/DynamicBackIcon/DynamicBackIcon";
import { decrypt } from "@/hooks/useCrypto";
import ChallengeDetailContent from "@/components/ChallengeDetail/ChallengeDetailContent/ChallengeDetailContent";
import { Suspense } from "react";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";
import CommonGetErrorFallback from "@/components/Error/CommonGetErrorFallback/CommonGetErrorFallback";

function ChallengeDetail() {
  const { id } = useParams();
  const decryptId = decrypt(id);

  return (
    <MobCard>
      <div className="max-w-[77.3rem] w-full z-10 fixed ml-[1.9rem] top-[1.3rem]">
        <DynamicBackIcon />
      </div>
      <div className="pb-[13rem] flex flex-col items-center h-full">
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              FallbackComponent={CommonGetErrorFallback}
            >
              <Suspense fallback={<LoadingBox />}>
                <ChallengeDetailContent decryptId={decryptId} />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </MobCard>
  );
}

export default ChallengeDetail;
