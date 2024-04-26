import InstanceListComponent from "@/components/Admin/AdminInstance/InstanceListComponent/InstanceListComponent";
import CreateBtn from "@/components/Admin/CreateBtn/CreateBtn";
import { Pagination } from "antd";
import { Suspense, useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { decrypt } from "@/hooks/useCrypto";
import { useOnlyAdminPermit } from "@/hooks/queries/useAuthQuery";
import { useTopicDetailQuery } from "@/hooks/queries/useAdminTopicQuery";
import { useInstanceListQuery } from "@/hooks/queries/useAdminInstanceQuery";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import AdminListLayOut from "@/components/Admin/AdminLayOut/AdminListLayOut/AdminListLayOut";

const AdminInstance = () => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const location = useLocation();
  const { mutate: checkAdmin } = useOnlyAdminPermit();

  const topicId = location.state.topicId;
  const decryptTopicId = decrypt(topicId);

  const { data: topicDetail } = useTopicDetailQuery({
    topicId: decryptTopicId,
  });
  const { data: instanceContent } = useInstanceListQuery({
    pageNumber: pageNumber - 1,
    setTotalNumber,
  });
  const instanceList = instanceContent.content;
  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };
  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <>
      <AdminListLayOut
        title="인스턴스 페이지"
        mainContent={
          <>
            <CreateBtn tokken="instance" topicId={topicId} />
            <Suspense fallback={<LoadingBox />}>
              <InstanceListComponent
                instanceList={instanceList}
                topicDetail={topicDetail}
              />
            </Suspense>
          </>
        }
        pagenationContent={
          <Pagination
            current={pageNumber}
            pageSize={5}
            total={totalNumber}
            onChange={handlePageChange}
            className="mt-10"
          />
        }
      />
    </>
  );
};

export default AdminInstance;
