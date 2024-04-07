import TopicListComponents from "@/components/Admin/AdminTopic/TopicListComponent/TopicListComponent";
import TopicCreateModal from "@/components/Admin/AdminTopic/TopicCreateModal/TopicCreateModal";
import CreateBtn from "@/components/Admin/CreateBtn/CreateBtn";
import Title from "@/components/Admin/Title/Title";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import getAdminTopicListApi from "@/apis/getAdminTopicListApi";
import { adminTopicDataType } from "@/types/adminType";
import Loading from "@/components/Common/Loading/Loading";
import { useOnlyAdminPermit } from "@/hooks/queries/useAuthQuery";

const AdminTopic = () => {
  const [topicModalIsOpen, setTopicModalIsOpen] = useState<boolean>(false);
  const [adminList, setAdminList] = useState<adminTopicDataType[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const { mutate: checkAdmin } = useOnlyAdminPermit();

  const handlePageChange = (page: number) => {
    setPageNumber(page);
    setIsLoading(true);
    getAdminTopicListApi({
      setIsLoading,
      setAdminList,
      pageNumber: page - 1,
      setTotalNumber,
    });
  };

  useEffect(() => {
    checkAdmin();
    setIsLoading(true);
    getAdminTopicListApi({
      setIsLoading,
      setAdminList,
      pageNumber,
      setTotalNumber,
    });
  }, []);

  return (
    <>
      <header className="w-full h-[145px]"></header>
      <section className="flex flex-col items-center">
        <div className="w-3/4">
          <Title title="토픽 생성 페이지" />
          <CreateBtn setModal={setTopicModalIsOpen} />
          {isLoading ? (
            <Loading />
          ) : (
            <TopicListComponents
              pageNumber={pageNumber}
              setAdminList={setAdminList}
              adminList={adminList}
            />
          )}
        </div>
        <Pagination
          current={pageNumber}
          pageSize={5}
          total={totalNumber}
          onChange={handlePageChange}
          className="mt-10"
        />
      </section>
      {topicModalIsOpen && (
        <TopicCreateModal
          setAdminList={setAdminList}
          setModalIsOpen={setTopicModalIsOpen}
          ModalIsOpen={topicModalIsOpen}
        />
      )}
    </>
  );
};

export default AdminTopic;
