import { Suspense, useEffect } from "react";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import { useOnlyAdminPermit } from "@/hooks/queries/useAuthQuery";
import { AdminListLayOut } from "@/components/Admin/AdminLayOut/AdminListLayOut/AdminListLayOut";
import { QueryErrorResetBoundary } from "react-query";
import CommonGetErrorFallback from "@/components/Error/CommonGetErrorFallback/CommonGetErrorFallback";
import { ErrorBoundary } from "react-error-boundary";
import AdminTopicContent from "@/components/Admin/AdminTopic/TopicListComponent/AdminTopicContent/AdminTopicContent";

const AdminTopic = () => {
  const { mutate: checkAdmin } = useOnlyAdminPermit();

  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <>
      <AdminListLayOut>
        <AdminListLayOut.Title title="토픽 페이지" />
        <QueryErrorResetBoundary>
          {({ reset }) => (
            <ErrorBoundary
              FallbackComponent={CommonGetErrorFallback}
              onReset={reset}
            >
              <Suspense fallback={<LoadingBox />}>
                <AdminTopicContent />
              </Suspense>
            </ErrorBoundary>
          )}
        </QueryErrorResetBoundary>
      </AdminListLayOut>
    </>
  );
};

export default AdminTopic;
