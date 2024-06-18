import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import CommonGetErrorFallback from "@/components/Error/CommonGetErrorFallback/CommonGetErrorFallback";
import MyChallengePreActivityList from "@/components/Main/MyChallenge/MyChallengePreActivityList/MyChallengePreActivityList";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";

const MyChallengeStart = () => {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={CommonGetErrorFallback}
        >
          <Suspense fallback={<LoadingBox />}>
            <MyChallengePreActivityList />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
};

export default MyChallengeStart;
