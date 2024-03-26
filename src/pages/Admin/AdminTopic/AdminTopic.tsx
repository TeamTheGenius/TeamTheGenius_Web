import TopicListComponents from "@/components/Admin/AdminTopic/TopicListComponent/TopicListComponent";
import TopicCreateModal from "@/components/Admin/AdminTopic/TopicCreateModal/TopicCreateModal";
import CreateBtn from "@/components/Admin/CreateBtn/CreateBtn";
import Title from "@/components/Admin/Title/Title";
import { useEffect, useState } from "react";
import { Pagination } from "antd";
import getAdminTopicListApi from "@/apis/getAdminTopicListApi";
import { adminTopicDataType } from "@/types/adminType";
import postJWTApi from "@/apis/postJWTApi";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";

const AdminTopic = () => {
  const [topicModalIsOpen, setTopicModalIsOpen] = useState<boolean>(false);
  const [adminList, setAdminList] = useState<adminTopicDataType[]>([]);
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const navigate = useNavigate();

  const handlePageChange = (page: number) => {
    setPageNumber(page);
    getAdminTopicListApi({
      setAdminList,
      pageNumber: page - 1,
      setTotalNumber,
    });
  };

  useEffect(() => {
    postJWTApi()
      .then((res) => {
        if (res.role !== "ADMIN") {
          navigate(PATH.ERROR, {
            state: { errNum: 403, errorTxt: "접근 권한이 없습니다." },
          });
        }
      })
      .catch(() => {
        navigate(PATH.LOGIN);
      });
    getAdminTopicListApi({
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
          <TopicListComponents
            pageNumber={pageNumber}
            setAdminList={setAdminList}
            adminList={adminList}
          />
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
