import { AdminListLayOut } from "@/components/Admin/AdminLayOut/AdminListLayOut/AdminListLayOut";
import CreateBtn from "@/components/Admin/CreateBtn/CreateBtn";
import { Pagination } from "antd";
import TopicListComponents from "@/components/Admin/AdminTopic/TopicListComponent/TopicListComponent";
import { useEffect, useState } from "react";
import { useTopicListQuery } from "@/hooks/queries/useAdminTopicQuery";

function AdminTopicContent() {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalNumber, setTotalNumber] = useState<number>(0);

  const { data: adminData } = useTopicListQuery({
    pageNumber: pageNumber - 1,
  });
  const adminList = adminData.content;

  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  useEffect(() => {
    setTotalNumber(adminData.totalElements);
  }, [adminData]);

  return (
    <>
      <AdminListLayOut.MainContent>
        <>
          <CreateBtn tokken={"topic"} />
          <TopicListComponents adminList={adminList} />
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

export default AdminTopicContent;
