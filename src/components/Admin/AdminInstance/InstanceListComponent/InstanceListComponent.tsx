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
      <ul className="flex flex-col gap-10 rounded-xl h-full">
        <>
          {instanceFilterList.map((item: instanceListDataType) => {
            const imageData = `data:image/png;base64,${item.fileResponse.encodedFile}`;
            const startDate = moment(item.startedAt).format("YYYY-MM-DD");
            const completedDate = moment(item.completedAt).format("YYYY-MM-DD");
            return (
              <li
                className="flex gap-[1.5rem] p-[1rem] bg-_neutral-10"
                key={item.instanceId}
              >
                <img
                  src={imageData}
                  alt={item.title}
                  className="w-[22rem] h-[17rem] rounded-l-xl"
                />

                <div className="w-full flex flex-col justify-between">
                  <InstanceTitle
                    startDate={startDate}
                    completedDate={completedDate}
                    title={item.title}
                  />
                  <div className="flex gap-[1rem] justify-end">
                    <Button
                      width="w-[5rem]"
                      backgroundColor="bg-_neutral-70"
                      fontWeight="font-normal"
                      textColor="text-_neutral-10"
                      height="h-[3rem]"
                      textSize="text-[1.3rem]"
                      handleClick={() => {
                        instanceData(item);
                      }}
                      content="수정"
                    />
                    <Button
                      width="w-[5rem]"
                      backgroundColor="bg-_neutral-70"
                      fontWeight="font-normal"
                      textColor="text-_neutral-10"
                      height="h-[3rem]"
                      textSize="text-[1.3rem]"
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
