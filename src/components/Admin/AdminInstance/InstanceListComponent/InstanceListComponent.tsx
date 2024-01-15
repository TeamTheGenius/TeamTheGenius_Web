import Button from "@/components/Common/Button";
import { useState } from "react";
import InstanceEditModal from "../InstanceEditModal/InstanceEditModal";

const InstanceListComponent = () => {
  const [instanceEditModalIsOpen, setinstanceEditModalIsOpen] =
    useState<boolean>(false);
  const [instanceEditModalData, setInstanceEditModalData] = useState(null);
  const instanceModalData = (edit: any) => {
    setInstanceEditModalData(edit);
    setinstanceEditModalIsOpen(true);
  };
  const data = [
    {
      id: 1,
      imgSrc: "https://picsum.photos/300/300",
      alt: "임시 이미지",
      title: "1 일 1 커밋 챌린지",
      date: "2023.01.13 ~ 2023.01.15",
    },
    {
      id: 2,
      imgSrc: "https://picsum.photos/300/300",
      alt: "임시 이미지2",
      title: "프로그래밍 스터디 그룹",
      date: "2023.02.13 ~ 2023.02.15",
    },
    {
      id: 3,
      imgSrc: "https://picsum.photos/300/300",
      alt: "임시 이미지3",
      title: "오픈소스 프로젝트 참여",
      date: "2023.03.13 ~ 2023.03.15",
    },
  ];
  return (
    <>
      <ul className="flex flex-col gap-10 rounded-xl">
        {data.map((item) => (
          <li className="flex justify-between w-full relative bg-_neutral-10 ">
            <div className="flex">
              <img
                src={item.imgSrc}
                alt={item.alt}
                className="mr-8 w-[25rem] h-[17rem] rounded-l-xl"
              />
              <p className="flex flex-col gap-2">
                <h3 className="mt-5 text-_h3">{item.title}</h3>
                <span className="text-_h4">{item.date}</span>
              </p>
            </div>
            <div className="flex w-1/6 justify-between absolute right-10 bottom-8">
              <Button
                width="w-[10rem]"
                backgroundColor="bg-_neutral-70"
                fontWeight="font-normal"
                textColor="text-_neutral-10"
                height="h-[3.5rem]"
                textSize="text-_h3"
                handleClick={() => {
                  instanceModalData(item);
                  setinstanceEditModalIsOpen(true);
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
            </div>
          </li>
        ))}
      </ul>
      {instanceEditModalIsOpen && (
        <>
          <InstanceEditModal
            setinstanceEditModalIsOpen={setinstanceEditModalIsOpen}
            instanceEditModalIsOpen={instanceEditModalIsOpen}
            instanceEditModalData={instanceEditModalData}
          />
        </>
      )}
    </>
  );
};

export default InstanceListComponent;
