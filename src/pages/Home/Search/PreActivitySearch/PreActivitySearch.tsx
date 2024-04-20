import { useOutletContext } from "react-router-dom";
import { QueryErrorResetBoundary } from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import CommonGetErrorFallback from "@/components/Error/CommonGetErrorFallback/CommonGetErrorFallback";
import InfinitePreActivitySearchedChallenge from "@/components/Home/InfinitePreActivitySearchedChallenge/InfinitePreActivitySearchedChallenge";

interface Outlet {
  searchQuery: string;
  searchEnter: string;
  setSearchEnter: React.Dispatch<React.SetStateAction<boolean>>;
}

function PreActivitySearch() {
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
            <InfinitePreActivitySearchedChallenge
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

export default PreActivitySearch;
