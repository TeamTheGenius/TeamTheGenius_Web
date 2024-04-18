import HomeLayout from "@/layout/HomeLayout/HomeLayout";
import { QueryErrorResetBoundary } from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import CommonGetErrorFallback from "@/components/Error/CommonGetErrorFallback/CommonGetErrorFallback";
import InfinitePopularChallenge from "@/components/Home/InfinitePopularChallenge/InfinitePopularChallenge";

const PopularChallenge = () => {
  return (
    <HomeLayout>
      <div className="mx-[2.2rem] mt-[1rem] h-full">
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              FallbackComponent={CommonGetErrorFallback}
            >
              <InfinitePopularChallenge />
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </HomeLayout>
  );
};

export default PopularChallenge;
