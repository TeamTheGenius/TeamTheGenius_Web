import TopicListComponents from "@/components/Admin/AdminTopic/TopicListComponent/TopicListComponent";
import CreateBtn from "@/components/Admin/CreateBtn/CreateBtn";
import { Suspense, useEffect, useState } from "react";
import { Pagination } from "antd";
import { useOnlyAdminPermit } from "@/hooks/queries/useAuthQuery";
import { useTopicListQuery } from "@/hooks/queries/useAdminTopicQuery";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
import AdminListLayOut from "@/components/Admin/AdminLayOut/AdminListLayOut/AdminListLayOut";

const AdminTopic = () => {
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalNumber, setTotalNumber] = useState<number>(0);

  const { mutate: checkAdmin } = useOnlyAdminPermit();

  const { data: adminData } = useTopicListQuery({
    pageNumber: pageNumber - 1,
    setTotalNumber,
  });
  const adminList = adminData.content;

  const handlePageChange = (page: number) => {
    setPageNumber(page);
  };

  useEffect(() => {
    checkAdmin();
  }, []);

  return (
    <>
      <AdminListLayOut
        title="토픽 페이지"
        mainContent={
          <>
            <CreateBtn tokken={"topic"} />
            <Suspense fallback={<LoadingBox />}>
              <TopicListComponents adminList={adminList} />
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

export default AdminTopic;
