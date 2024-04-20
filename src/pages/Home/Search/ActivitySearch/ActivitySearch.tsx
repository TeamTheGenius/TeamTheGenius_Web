import CommonGetErrorFallback from "@/components/Error/CommonGetErrorFallback/CommonGetErrorFallback";
import InfiniteActivitySearchedChallenge from "@/components/Home/InfiniteActivitySearchedChallenge/InfiniteActivitySearchedChallenge";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";
import { useOutletContext } from "react-router-dom";

interface Outlet {
  searchQuery: string;
  searchEnter: boolean;
  setSearchEnter: React.Dispatch<React.SetStateAction<boolean>>;
}

function ActivitySearch() {
  const { searchQuery, searchEnter, setSearchEnter } =
    useOutletContext<Outlet>();

  return (
    <>
      <QueryErrorResetBoundary>
        {({ reset }) => (
          <ErrorBoundary
            onReset={reset}
            FallbackComponent={CommonGetErrorFallback}
          >
            <InfiniteActivitySearchedChallenge
              searchEnter={searchEnter}
              searchQuery={searchQuery}
              setSearchEnter={setSearchEnter}
            />
          </ErrorBoundary>
        )}
      </QueryErrorResetBoundary>
    </>
  );
}

export default ActivitySearch;
