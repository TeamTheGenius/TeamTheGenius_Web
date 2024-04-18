import HomeLayout from "@/layout/HomeLayout/HomeLayout";
import { QueryErrorResetBoundary } from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import CommonGetErrorFallback from "@/components/Error/CommonGetErrorFallback/CommonGetErrorFallback";
import InfiniteRecommededChallenge from "@/components/Home/InfiniteRecommededChallenge/InfiniteRecommededChallenge";

const SuggestionChallenge = () => {
  return (
    <HomeLayout>
      <div className="mx-[2.2rem] mt-[1rem] h-full">
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              FallbackComponent={CommonGetErrorFallback}
            >
              <InfiniteRecommededChallenge />
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </HomeLayout>
  );
};

export default SuggestionChallenge;
