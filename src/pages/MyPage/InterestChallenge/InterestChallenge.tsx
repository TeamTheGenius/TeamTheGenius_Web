import Header from "@/components/Common/Header/Header";
import MobCard from "@/components/Common/MobCard";
import CommonGetErrorFallback from "@/components/Error/CommonGetErrorFallback/CommonGetErrorFallback";
import InfiniteInterestChallenge from "@/components/MyPage/InterestChallenge/InfiniteInterestChallenge/InfiniteInterestChallenge";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";

function InterestChallenge() {
  return (
    <>
      <MobCard>
        <Header content="좋아요 목록" />
        <div className="px-[2.2rem] flex justify-center h-full">
          <QueryErrorResetBoundary>
            {({ reset }) => (
              <ErrorBoundary
                onReset={reset}
                FallbackComponent={CommonGetErrorFallback}
              >
                <InfiniteInterestChallenge />
              </ErrorBoundary>
            )}
          </QueryErrorResetBoundary>
        </div>
      </MobCard>
    </>
  );
}

export default InterestChallenge;
