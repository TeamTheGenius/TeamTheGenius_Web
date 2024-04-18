import { useOutletContext } from "react-router-dom";
import { ErrorBoundary } from "react-error-boundary";
import { QueryErrorResetBoundary } from "react-query";
import CommonGetErrorFallback from "@/components/Error/CommonGetErrorFallback/CommonGetErrorFallback";
import InfiniteAllSearchedChallenge from "@/components/Home/InfiniteAllSearchedChallenge/InfiniteAllSearchedChallenge";

interface Outlet {
  searchQuery: string;
  searchEnter: boolean;
  setSearchEnter: React.Dispatch<React.SetStateAction<boolean>>;
}

function AllSearch() {
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
            <InfiniteAllSearchedChallenge
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

export default AllSearch;
