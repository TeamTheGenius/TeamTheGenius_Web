import { useOutletContext } from "react-router-dom";
import { QueryErrorResetBoundary } from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import CommonGetErrorFallback from "@/components/Error/CommonGetErrorFallback/CommonGetErrorFallback";
import InfiniteDoneSearchedChallenge from "@/components/Home/InfiniteDoneSearchedChallenge/InfiniteDoneSearchedChallenge";

interface Outlet {
  searchQuery: string;
  searchEnter: string;
  setSearchEnter: React.Dispatch<React.SetStateAction<boolean>>;
}

function DoneSearch() {
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
            <InfiniteDoneSearchedChallenge
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

export default DoneSearch;
