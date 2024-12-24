import { AdminListLayOut } from "@/components/Admin/AdminLayOut/AdminListLayOut/AdminListLayOut";
import CreateBtn from "@/components/Admin/CreateBtn/CreateBtn";
import TopicListComponents from "@/components/Admin/AdminTopic/TopicListComponent/TopicListComponent";
import { useState } from "react";
import { useTopicListQuery } from "@/hooks/queries/useAdminTopicQuery";
import { Pagination } from "@/components/Common/Pagination";

function AdminTopicContent() {
  const [pageNumber, setPageNumber] = useState<number>(1);

  const { data: adminData } = useTopicListQuery({
    pageNumber: pageNumber - 1,
  });
  const adminList = adminData.content;

  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  return (
    <>
      <AdminListLayOut.MainContent>
        <>
          <CreateBtn tokken={"topic"} />
          <TopicListComponents adminList={adminList} />
        </>
      </AdminListLayOut.MainContent>
      <AdminListLayOut.PageNation>
        {adminData.totalElements > 0 && (
          <Pagination
            currentPage={pageNumber}
            totalPages={adminData.totalPages}
            limit={5}
            onPageChange={handlePageChange}
            className="mt-10"
          />
        )}
      </AdminListLayOut.PageNation>
    </>
  );
}

export default AdminTopicContent;
