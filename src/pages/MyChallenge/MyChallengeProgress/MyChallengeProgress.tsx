import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import CommonGetErrorFallback from "@/components/Error/CommonGetErrorFallback/CommonGetErrorFallback";
import MyChallengeActivityList from "@/components/Main/MyChallenge/MyChallengeActivityList/MyChallengeActivityList";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";

function MyChallengeProgress() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={CommonGetErrorFallback}
        >
          <Suspense fallback={<LoadingBox />}>
            <MyChallengeActivityList />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export default MyChallengeProgress;
