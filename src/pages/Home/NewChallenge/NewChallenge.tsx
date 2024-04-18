import HomeLayout from "@/layout/HomeLayout/HomeLayout";
import { ErrorBoundary } from "react-error-boundary";
import CommonGetErrorFallback from "@/components/Error/CommonGetErrorFallback/CommonGetErrorFallback";
import { QueryErrorResetBoundary } from "react-query";
import InfiniteNewChallenge from "@/components/Home/InfiniteNewChallenge/InfiniteNewChallenge";

const NewChallenge = () => {
  return (
    <HomeLayout>
      <div className="mx-[2.2rem] mt-[1rem] h-full">
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              onReset={reset}
              FallbackComponent={CommonGetErrorFallback}
            >
              <InfiniteNewChallenge />
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </div>
    </HomeLayout>
  );
};

export default NewChallenge;
