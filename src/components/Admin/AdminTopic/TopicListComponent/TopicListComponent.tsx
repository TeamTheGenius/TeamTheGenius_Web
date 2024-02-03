import Button from "@/components/Common/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import TopicEditModal from "../TopicEditModal/TopicEditModal";
import { PATH } from "@/constants/path";
import getAdminListApi from "@/apis/getAdminListApi";
import axios from "axios";

const TopicListComponent = () => {
  const [adminList, setAdminList] = useState([]);
  const [TopicEditModalIsOpen, setTopicEditModalIsOpen] =
    useState<boolean>(false);
  const [topicEditModalData, setTopicEditModalData] = useState(null);
  // 생성된 데이터 가져오기
  const navigate = useNavigate();
  // 넘겨받을 데이터 타입지정
  const topicModalData = (edit: any) => {
    setTopicEditModalData(edit);
    setTopicEditModalIsOpen(true);
  };
  const InstanceLink = (i: number) => {
    navigate(`${PATH.ADMIN_INSTANCE}/${i}`);
  };

  const data = [
    {
      id: 1,
      imgSrc: "https://picsum.photos/300/300",
      alt: "임시 이미지",
      title: "1 일 1 커밋 챌린지",
      instanceLinkId: 1,
    },
    {
      id: 2,
      imgSrc: "https://picsum.photos/300/300",
      alt: "임시 이미지2",
      title: "프로그래밍 스터디 그룹",
      instanceLinkId: 2,
    },
    {
      id: 3,
      imgSrc: "https://picsum.photos/300/300",
      alt: "임시 이미지3",
      title: "오픈소스 프로젝트 참여",
      instanceLinkId: 3,
    },
  ];
  const topicList = () => {
    axios
      .get(`http://localhost:8080/api/admin/topic?page=0&size=5`)
      .then((response) => {
        console.log(response);
      })
      .catch((error) => {
        console.error(error);
      });
  };
  useEffect(() => {
    topicList();
  }, []);
  return (
    <>
      <ul className="flex flex-col gap-10 rounded-xl">
        {data.map((item) => (
          <li
            key={item.id}
            className="flex justify-between w-full relative bg-_neutral-10 "
          >
            <div className="flex">
              <img
                src={item.imgSrc}
                alt={item.alt}
                className="mr-8 w-[25rem] h-[17rem] rounded-l-xl"
              />
              <h3 className="mt-5 text-_h3">{item.title}</h3>
            </div>
            <div className="flex w-2/5 justify-between absolute right-10 bottom-8">
              <Button
                width="w-[20rem]"
                backgroundColor="bg-_neutral-70"
                fontWeight="font-normal"
                textColor="text-_neutral-10"
                height="h-[3.5rem]"
                textSize="text-_h3"
                handleClick={() => {
                  InstanceLink(item.instanceLinkId);
                }}
                content="인스턴스"
              />
              <Button
                width="w-[10rem]"
                backgroundColor="bg-_neutral-70"
                fontWeight="font-normal"
                textColor="text-_neutral-10"
                height="h-[3.5rem]"
                textSize="text-_h3"
                handleClick={() => {
                  console.log("id", item.id);
                  topicModalData(item);
                  setTopicEditModalIsOpen(true);
                }}
                content="수정"
              />
              <Button
                width="w-[10rem]"
                backgroundColor="bg-_neutral-70"
                fontWeight="font-normal"
                textColor="text-_neutral-10"
                height="h-[3.5rem]"
                textSize="text-_h3"
                handleClick={() => {
                  if (window.confirm("정말로 삭제하시겠습니까?")) {
                    console.log("삭제되었습니다.");
                  } else {
                    console.log("삭제가 취소되었습니다.");
                  }
                }}
                content="삭제"
              />
              <Button
                width="w-[10rem]"
                backgroundColor="bg-_neutral-70"
                fontWeight="font-normal"
                textColor="text-_neutral-10"
                height="h-[3.5rem]"
                textSize="text-_h3"
                handleClick={() => {}}
                content="종료"
              />
            </div>
          </li>
        ))}
      </ul>
      {TopicEditModalIsOpen && (
        <>
          <TopicEditModal
            setTopicEditModalIsOpen={setTopicEditModalIsOpen}
            TopicEditModalIsOpen={TopicEditModalIsOpen}
            topicEditModalData={topicEditModalData}
          />
        </>
      )}
    </>
  );
};

export default TopicListComponent;
