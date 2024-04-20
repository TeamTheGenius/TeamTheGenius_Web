import Header from "@/components/Common/Header/Header";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import MobCard from "@/components/Common/MobCard";
import CommonGetErrorFallback from "@/components/Error/CommonGetErrorFallback/CommonGetErrorFallback";
import InterestTagEditFrom from "@/components/MyPage/InterestEdit/InterestTagEditFrom/InterestTagEditFrom";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";

const InterestEdit = () => {
  return (
    <>
      <MobCard>
        <Header content="관심사 수정" />
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              FallbackComponent={CommonGetErrorFallback}
            >
              <Suspense fallback={<LoadingBox />}>
                <InterestTagEditFrom />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </MobCard>
    </>
  );
};

export default InterestEdit;
