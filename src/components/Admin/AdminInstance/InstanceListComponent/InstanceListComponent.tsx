import Button from "@/components/Common/Button";
import { useState } from "react";
import InstanceEditModal from "../InstanceEditModal/InstanceEditModal";
import { adminTopicDataType } from "@/pages/Admin/AdminTopic/AdminTopic";
import moment from "moment";
import getAdminDetailInstanceApi from "@/apis/getAdminDetailInstanceApi";

type instanceListPropsType = {
  instanceList: any;
  topicDetail?: adminTopicDataType;
};

export type instanceListDataType = {
  topicId: number;
  instanceId: number;
  title: string;
  startedAt: string;
  completedAt: string;
  fileResponse: { fileId: number; encodedFile: string };
};
export type instanceDeteilType = {
  topicId: number;
  instanceId: number;
  title: string;
  tags: string;
  description: string;
  notice: string;
  pointPerPerson: number;
  fileResponse: {
    fileId: number;
    encodedFile: string;
  };
};

const InstanceListComponent = ({
  instanceList,
  topicDetail,
}: instanceListPropsType) => {
  const [instanceEditModalIsOpen, setinstanceEditModalIsOpen] =
    useState<boolean>(false);
  const [instanceDetail, setInstanceDetail] = useState<instanceDeteilType>();
  const [instanceNumber, setInstanceNumber] = useState<number>(0);
  const topicPropsId = topicDetail?.topicId;
  const instanceModalData = (data: instanceListDataType) => {
    console.log("data");
    getAdminDetailInstanceApi({
      instanceId: data.instanceId,
      setInstanceDetail: setInstanceDetail,
    });
    setInstanceNumber(data.instanceId);
    setinstanceEditModalIsOpen(true);
  };

  const instanceFilterList = instanceList.filter(
    (item: instanceListDataType) => item.topicId === topicPropsId
  );
  return (
    <>
      <ul className="flex flex-col gap-10 rounded-xl">
        {instanceFilterList.map((item: instanceListDataType) => {
          const imageData = `data:image/png;base64,${item.fileResponse.encodedFile}`;
          const startDate = moment(item.startedAt).format("YYYY-MM-DD");
          const completedDate = moment(item.completedAt).format("YYYY-MM-DD");
          return (
            <li
              className="flex justify-between w-full relative bg-_neutral-10"
              key={item.instanceId}
            >
              <div className="flex">
                <img
                  src={imageData}
                  alt={item.title}
                  className="mr-8 w-[25rem] h-[17rem] rounded-l-xl"
                />
                <span className="flex flex-col gap-2">
                  <h3 className="mt-5 text-_h3">{item.title}</h3>
                  <div className="flex text-_h4">
                    <span>{startDate}</span>
                    <span className="mx-[0.5rem]">~</span>
                    <span>{completedDate}</span>
                  </div>
                </span>
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
          );
        })}
      </ul>
      {instanceEditModalIsOpen && (
        <>
          <InstanceEditModal
            instanceNumber={instanceNumber}
            instanceDetail={instanceDetail}
            setinstanceEditModalIsOpen={setinstanceEditModalIsOpen}
            instanceEditModalIsOpen={instanceEditModalIsOpen}
          />
        </>
      )}
    </>
  );
};

export default InstanceListComponent;
