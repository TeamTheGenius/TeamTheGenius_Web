import { AdminListLayOut } from "@/components/Admin/AdminLayOut/AdminListLayOut/AdminListLayOut";
import CreateBtn from "@/components/Admin/CreateBtn/CreateBtn";
import { useInstanceListQuery } from "@/hooks/queries/useAdminInstanceQuery";
import { useTopicDetailQuery } from "@/hooks/queries/useAdminTopicQuery";
import { decrypt } from "@/hooks/useCrypto";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import InstanceListComponent from "../InstanceListComponent";

function AdminInstanceContent() {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const location = useLocation();

  const topicId = location.state.topicId;
  const decryptTopicId = decrypt(topicId);

  const { data: topicDetail } = useTopicDetailQuery({
    topicId: decryptTopicId,
  });
  const { data: instanceContent } = useInstanceListQuery({
    pageNumber: pageNumber - 1,
  });

  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  useEffect(() => {
    setTotalNumber(instanceContent.totalElements);
  }, [instanceContent]);

  return (
    <>
      <AdminListLayOut.MainContent>
        <>
          <CreateBtn tokken="instance" topicId={topicId} />
          <InstanceListComponent
            instanceList={instanceContent.content}
            topicDetail={topicDetail}
          />
        </>
      </AdminListLayOut.MainContent>
      <AdminListLayOut.PageNation>
        <Pagination
          current={pageNumber}
          pageSize={5}
          total={totalNumber}
          onChange={handlePageChange}
          className="mt-10"
        />
      </AdminListLayOut.PageNation>
    </>
  );
}

export default AdminInstanceContent;
