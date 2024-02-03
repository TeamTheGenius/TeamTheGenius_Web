import TopicListComponents from "@/components/Admin/AdminTopic/TopicListComponent/TopicListComponent";
import TopicCreateModal from "@/components/Admin/AdminTopic/TopicCreateModal/TopicCreateModal";
import CreateBtn from "@/components/Admin/CreateBtn/CreateBtn";
import Title from "@/components/Admin/Title/Title";
import { useState } from "react";
import { Pagination } from "antd";

const AdminTopic = () => {
  const [topicModalIsOpen, setTopicModalIsOpen] = useState<boolean>(false);

  return (
    <>
      <header className="w-full h-[145px]"></header>
      <section className="flex flex-col items-center">
        <div className="w-3/4">
          <Title title="토픽 생성 페이지" />
          <CreateBtn setModal={setTopicModalIsOpen} />
          <TopicListComponents />
        </div>
        <Pagination
          defaultCurrent={1}
          total={50}
          defaultPageSize={5}
          className="mt-10"
        />
      </section>
      {topicModalIsOpen && (
        <TopicCreateModal
          setModalIsOpen={setTopicModalIsOpen}
          ModalIsOpen={topicModalIsOpen}
        />
      )}
    </>
  );
};

export default AdminTopic;
