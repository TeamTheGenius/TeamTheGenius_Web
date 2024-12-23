import Header from "@/components/Common/Header/Header";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import MobCard from "@/components/Common/MobCard";
import CommonGetErrorFallback from "@/components/Error/CommonGetErrorFallback/CommonGetErrorFallback";
import InterestTagEdit from "@/components/MyPage/InterestTagEdit/InterestTagEdit";
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
                <InterestTagEdit />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </MobCard>
    </>
  );
};

export default InterestEdit;
