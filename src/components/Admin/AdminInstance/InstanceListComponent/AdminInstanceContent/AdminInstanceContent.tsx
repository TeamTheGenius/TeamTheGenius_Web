import { AdminListLayOut } from "@/components/Admin/AdminLayOut/AdminListLayOut/AdminListLayOut";
import CreateBtn from "@/components/Admin/CreateBtn/CreateBtn";
import { useInstanceListQuery } from "@/hooks/queries/useAdminInstanceQuery";
import { useTopicDetailQuery } from "@/hooks/queries/useAdminTopicQuery";
import { decrypt } from "@/hooks/useCrypto";
import { useState } from "react";
import { useLocation } from "react-router-dom";
import InstanceListComponent from "../InstanceListComponent";
import { Pagination } from "@/components/Common/Pagination";

function AdminInstanceContent() {
  const [pageNumber, setPageNumber] = useState<number>(1);
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
        {instanceContent.totalElements > 0 && (
          <Pagination
            currentPage={pageNumber}
            totalPages={instanceContent.totalPages}
            limit={5}
            onPageChange={handlePageChange}
            className="mt-10"
          />
        )}
      </AdminListLayOut.PageNation>
    </>
  );
}

export default AdminInstanceContent;
