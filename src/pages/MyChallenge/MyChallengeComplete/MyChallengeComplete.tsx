import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import CommonGetErrorFallback from "@/components/Error/CommonGetErrorFallback/CommonGetErrorFallback";
import MyChallengeDoneList from "@/components/Main/MyChallenge/MyChallengeDoneList/MyChallengeDoneList";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";

function MyChallengeComplete() {
  return (
    <QueryErrorResetBoundary>
      {({ reset }) => (
        <ErrorBoundary
          onReset={reset}
          FallbackComponent={CommonGetErrorFallback}
        >
          <Suspense fallback={<LoadingBox />}>
            <MyChallengeDoneList />
          </Suspense>
        </ErrorBoundary>
      )}
    </QueryErrorResetBoundary>
  );
}

export default MyChallengeComplete;
