import Button from "@/components/Common/Button";
import { Dispatch, SetStateAction, useEffect, useState } from "react";
import InstanceEditModal from "../InstanceEditModal/InstanceEditModal";
import moment from "moment";
import getAdminDetailInstanceApi from "@/apis/getAdminDetailInstanceApi";
import deleteAdminInstanceApi from "@/apis/deleteAdminInstanceApi";
import {
  adminTopicDataType,
  instanceDeteilType,
  instanceListDataType,
} from "@/types/adminType";
import Loading from "@/components/Common/Loading/Loading";
import InstanceTitle from "./InstanceTitle/InstanceTitle";

type instanceListPropsType = {
  instanceList: any;
  topicDetail?: adminTopicDataType;
  pageNumber: number;
  setInstanceList: Dispatch<SetStateAction<instanceListDataType[]>>;
};

const InstanceListComponent = ({
  instanceList,
  setInstanceList,
  topicDetail,
  pageNumber,
}: instanceListPropsType) => {
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [instanceEditModalIsOpen, setinstanceEditModalIsOpen] =
    useState<boolean>(false);
  const [instanceDetail, setInstanceDetail] = useState<instanceDeteilType>();
  const [instanceNumber, setInstanceNumber] = useState<number>(0);

  const instanceModalData = (data: instanceListDataType) => {
    getAdminDetailInstanceApi({
      setInstanceList: setInstanceList,
      instanceId: data.instanceId,
      setInstanceDetail: setInstanceDetail,
    });
    setInstanceNumber(data.instanceId);
  };

  const topicPropsId = topicDetail?.topicId;
  const instanceFilterList = instanceList.filter(
    (item: instanceListDataType) => item.topicId === topicPropsId
  );
  useEffect(() => {
    setIsLoading(true);
  });
  return (
    <>
      <ul className="flex flex-col gap-10 rounded-xl">
        {!isLoading ? (
          <div>
            <Loading />
          </div>
        ) : (
          <>
            {instanceFilterList.map((item: instanceListDataType) => {
              const imageData = `data:image/png;base64,${item.fileResponse.encodedFile}`;
              const startDate = moment(item.startedAt).format("YYYY-MM-DD");
              const completedDate = moment(item.completedAt).format(
                "YYYY-MM-DD"
              );
              return (
                <li
                  className="flex justify-between w-full relative bg-_neutral-10"
                  key={item.instanceId}
                >
                  <InstanceTitle
                    imageData={imageData}
                    startDate={startDate}
                    completedDate={completedDate}
                    title={item.title}
                  />
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
                          deleteAdminInstanceApi({
                            instanceId: item.instanceId,
                            setInstanceList: setInstanceList,
                            pageNumber: pageNumber,
                          });
                        }
                      }}
                      content="삭제"
                    />
                  </div>
                </li>
              );
            })}
          </>
        )}
      </ul>
      {instanceEditModalIsOpen && (
        <>
          <InstanceEditModal
            setInstanceList={setInstanceList}
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
