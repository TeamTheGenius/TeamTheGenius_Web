import { useState } from "react";
import CreateBtn from "@/components/AdminTopic/CreateBtn/CreateBtn";
import ListComponents from "@/components/AdminTopic/ListComponent/ListComponents";
import TopicModal from "@/components/AdminTopic/TopicModal/TopicModal";
import Title from "antd/es/skeleton/Title";

const AdminTopic = () => {
  const [topicModalIsOpen, setTopicModalIsOpen] = useState<boolean>(false);

  return (
    <>
      <header className="w-full h-[145px]">
        {/* 헤더 디자인 완성전이라 임시로 넣었습니다. */}
      </header>
      <section className="flex flex-col items-center">
        <div className="w-3/4">
          <Title />
          <CreateBtn setTopicModalIsOpen={setTopicModalIsOpen} />
          <ListComponents />
        </div>
      </section>
      {topicModalIsOpen && (
        <TopicModal
          setTopicModalIsOpen={setTopicModalIsOpen}
          topicModalIsOpen={topicModalIsOpen}
        />
      )}
    </>
  );
};

export default AdminTopic;
