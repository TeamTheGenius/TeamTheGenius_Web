import getAdminDetailTopicApi from "@/apis/getAdminDetailTopicApi";
import InstanceCreateModal from "@/components/Admin/AdminInstance/InstanceCreateModal/InstanceCreateModal";
import InstanceListComponent from "@/components/Admin/AdminInstance/InstanceListComponent/InstanceListComponent";
import CreateBtn from "@/components/Admin/CreateBtn/CreateBtn";
import Title from "@/components/Admin/Title/Title";
import { Pagination } from "antd";
import { useEffect, useState } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import getAdminInstanceListApi from "@/apis/getAdminInstanceListApi";
import { instanceListDataType, topicDeteilType } from "@/types/adminType";
import postJWTApi from "@/apis/postJWTApi";
import { PATH } from "@/constants/path";

const AdminInstance = () => {
  const [instanceModalIsOpen, setInstanceModalIsOpen] =
    useState<boolean>(false);
  const [instanceList, setInstanceList] = useState<instanceListDataType[]>([]);
  const [topicDetail, setTopicDetail] = useState<topicDeteilType>();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const location = useLocation();
  const navigate = useNavigate();
  const handlePageChange = (page: number) => {
    setPageNumber(page);
    getAdminInstanceListApi({
      setInstanceList,
      pageNumber: page - 1,
      setTotalNumber,
    });
  };

  const topicId = location.state.topicId;

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
    getAdminDetailTopicApi({
      topicId: topicId,
      setTopicDetail: setTopicDetail,
    });
    getAdminInstanceListApi({
      setInstanceList,
      pageNumber,
      setTotalNumber,
    });
  }, []);

  return (
    <>
      <header className="w-full h-[145px]"></header>
      <section className="flex flex-col items-center">
        <div className="w-3/4">
          <Title title={"인스턴스 페이지"} />
          <CreateBtn setModal={setInstanceModalIsOpen} />
          <InstanceListComponent
            pageNumber={pageNumber}
            setInstanceList={setInstanceList}
            instanceList={instanceList}
            topicDetail={topicDetail}
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
      {instanceModalIsOpen && (
        <InstanceCreateModal
          setInstanceList={setInstanceList}
          setModalIsOpen={setInstanceModalIsOpen}
          ModalIsOpen={instanceModalIsOpen}
          topicDetail={topicDetail}
          topicId={topicId}
        />
      )}
    </>
  );
};

export default AdminInstance;
