import Header from "@/components/Common/Header/Header";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import MobCard from "@/components/Common/MobCard";
import CommonGetErrorFallback from "@/components/Error/CommonGetErrorFallback/CommonGetErrorFallback";
import PaymentList from "@/components/MyPage/Receipt/PaymentList/PaymentList";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";

const Receipt = () => {
  return (
    <MobCard>
      <Header content="결제 내역" />
      <div className="pt-[6rem] px-[2.2rem] flex justify-center items-center h-full">
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              FallbackComponent={CommonGetErrorFallback}
            >
              <Suspense fallback={<LoadingBox />}>
                <div className="w-full max-w-[53.7rem]">
                  <PaymentList />
                </div>
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </MobCard>
  );
};

export default Receipt;
