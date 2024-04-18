import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import CommonGetErrorFallback from "@/components/Error/CommonGetErrorFallback/CommonGetErrorFallback";
import PopularChallengeItems from "@/components/Home/PopularChallengeItems/PopularChallengeItems";
import SuggestionChallengeItems from "@/components/Home/SuggestionChallengeItems/SuggestionChallengeItems";
import HomeLayout from "@/layout/HomeLayout/HomeLayout";
import { Suspense } from "react";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";

function Home() {
  return (
    <HomeLayout>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            FallbackComponent={CommonGetErrorFallback}
          >
            <Suspense fallback={<LoadingBox />}>
              <div className="pl-[2.2rem] mt-[1.5rem] h-full flex flex-col gap-[1.5rem]">
                <SuggestionChallengeItems />
                <PopularChallengeItems />
              </div>
            </Suspense>
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </HomeLayout>
  );
}

export default Home;
