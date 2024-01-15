import TopicListComponents from "@/components/Admin/AdminTopic/TopicListComponent/TopicListComponent";
import TopicCreateModal from "@/components/Admin/AdminTopic/TopicCreateModal/TopicCreateModal";
import CreateBtn from "@/components/Admin/CreateBtn/CreateBtn";
import Title from "@/components/Admin/Title/Title";
import { useState } from "react";

const AdminTopic = () => {
  const [topicModalIsOpen, setTopicModalIsOpen] = useState<boolean>(false);

  return (
    <>
      <header className="w-full h-[145px]">
        {/* 헤더 디자인 완성전이라 임시로 넣었습니다. */}
      </header>
      <section className="flex flex-col items-center">
        <div className="w-3/4">
          <Title title="토픽 생성 페이지" />
          <CreateBtn setModal={setTopicModalIsOpen} />
          <TopicListComponents />
        </div>
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
