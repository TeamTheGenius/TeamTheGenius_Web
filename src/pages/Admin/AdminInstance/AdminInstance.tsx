import getAdminDetailTopicApi from "@/apis/getAdminDetailTopicApi";
import InstanceCreateModal from "@/components/Admin/AdminInstance/InstanceCreateModal/InstanceCreateModal";
import InstanceListComponent from "@/components/Admin/AdminInstance/InstanceListComponent/InstanceListComponent";
import CreateBtn from "@/components/Admin/CreateBtn/CreateBtn";
import Title from "@/components/Admin/Title/Title";
import { Pagination } from "antd";
import React, { useEffect, useState } from "react";
import { useLocation } from "react-router-dom";
import { topicDeteilType } from "@/components/Admin/AdminTopic/TopicListComponent/TopicListComponent";

const AdminInstance = () => {
  const [instanceModalIsOpen, setInstanceModalIsOpen] =
    useState<boolean>(false);
  const [instanceEditModalData, setInstanceEditModalData] = useState();
  const [instanceList, setInstanceList] = useState([]);
  const [instanceDetail, setInstanceDetail] = useState();
  const [topicDetail, setTopicDetail] = useState<topicDeteilType>();
  const [instanceDetailNumber, setInstanceDetailNumber] = useState<number>();
  const [pageNumber, setPageNumber] = useState<number>(0);
  const [totalNumber, setTotalNumber] = useState<number>(0);
  const location = useLocation();

  const topicId = location.state.topicId;

  useEffect(() => {
    getAdminDetailTopicApi({
      topicId: topicId,
      setTopicDetail: setTopicDetail,
    });
  }, []);
  return (
    <>
      <header className="w-full h-[145px]"></header>
      <section className="flex flex-col items-center">
        <div className="w-3/4">
          <Title title={"인스턴스 페이지"} />
          <CreateBtn setModal={setInstanceModalIsOpen} />
          <InstanceListComponent />
        </div>
        <Pagination
          defaultCurrent={1}
          total={50}
          defaultPageSize={5}
          className="mt-10"
        />
      </section>
      {instanceModalIsOpen && (
        <InstanceCreateModal
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
