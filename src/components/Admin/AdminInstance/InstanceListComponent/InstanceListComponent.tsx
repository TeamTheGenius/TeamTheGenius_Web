import Button from "@/components/Common/Button";
import moment from "moment";
import deleteAdminInstanceApi from "@/apis/deleteAdminInstanceApi";
import { adminTopicDataType, instanceListDataType } from "@/types/adminType";
import InstanceTitle from "./InstanceTitle/InstanceTitle";
import { useNavigate } from "react-router-dom";
import { useQueryClient } from "react-query";
import { encrypt } from "@/hooks/useCrypto";
import { PATH } from "@/constants/path";

type instanceListPropsType = {
  instanceList: any;
  topicDetail?: adminTopicDataType;
};

const InstanceListComponent = ({
  instanceList,
  topicDetail,
}: instanceListPropsType) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();

  const instanceData = (data: instanceListDataType) => {
    const InstanceCryptoId = encrypt(data.instanceId);
    navigate(`${PATH.ADMIN_INSTANCE}/${InstanceCryptoId}/edit`);
  };

  const topicPropsId = topicDetail?.topicId;
  const instanceFilterList = instanceList.filter(
    (item: instanceListDataType) => item.topicId === topicPropsId
  );

  return (
    <>
      <ul className="flex flex-col gap-10 rounded-xl">
        <>
          {instanceFilterList.map((item: instanceListDataType) => {
            const imageData = `data:image/png;base64,${item.fileResponse.encodedFile}`;
            const startDate = moment(item.startedAt).format("YYYY-MM-DD");
            const completedDate = moment(item.completedAt).format("YYYY-MM-DD");
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
                      instanceData(item);
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
                          queryClient: queryClient,
                          instanceId: item.instanceId,
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
      </ul>
    </>
  );
};

export default InstanceListComponent;
