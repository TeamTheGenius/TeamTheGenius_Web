import { Suspense, useEffect } from "react";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import { useOnlyAdminPermit } from "@/hooks/queries/useAuthQuery";
import { AdminListLayOut } from "@/components/Admin/AdminLayOut/AdminListLayOut/AdminListLayOut";
import AdminInstanceContent from "@/components/Admin/AdminInstance/InstanceListComponent/AdminInstanceContent/AdminInstanceContent";
import { QueryErrorResetBoundary } from "react-query";
import { ErrorBoundary } from "react-error-boundary";
import CommonGetErrorFallback from "@/components/Error/CommonGetErrorFallback/CommonGetErrorFallback";

const AdminInstance = () => {
  const { mutate: checkAdmin } = useOnlyAdminPermit();

  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <>
      <AdminListLayOut>
        <AdminListLayOut.Title title="인스턴스 페이지" />
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              FallbackComponent={CommonGetErrorFallback}
              onReset={reset}
            >
              <Suspense fallback={<LoadingBox />}>
                <AdminInstanceContent />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </AdminListLayOut>
    </>
  );
};

export default AdminInstance;
