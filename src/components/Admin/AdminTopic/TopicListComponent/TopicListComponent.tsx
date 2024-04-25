import Button from "@/components/Common/Button";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import deleteAdminTopicApi from "@/apis/deleteAdminTopicApi";
import { adminTopicDataType, topicListType } from "@/types/adminType";
import TopicTitle from "./TopicTitle/TopicTitle";
import { encrypt } from "@/hooks/useCrypto";
import { useQueryClient } from "react-query";

type adminProps = {
  adminList: adminTopicDataType[];
};

const TopicListComponent = ({ adminList }: adminProps) => {
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const topicData = async (data: topicListType) => {
    const topicCryptoId = encrypt(data.topicId);
    navigate(`${PATH.ADMIN_TOPIC_EDIT}/${topicCryptoId}`);
  };

  return (
    <>
      <ul className="flex flex-col gap-10 rounded-xl">
        <>
          {adminList?.map((item: adminTopicDataType) => {
            const imageData = `data:image/jpeg;base64,${item.fileResponse.encodedFile}`;
            const InstanceLink = (i: number) => {
              const cryptoNumber = encrypt(i);
              const topicCryptoId = encrypt(item.topicId);
              navigate(`${PATH.ADMIN_INSTANCE}/${cryptoNumber}`, {
                state: {
                  topicId: topicCryptoId,
                },
              });
            };
            return (
              <li
                key={item.topicId}
                className="flex justify-between w-full relative bg-_neutral-10"
              >
                <TopicTitle imageData={imageData} title={item.title} />
                <div className="flex w-2/5 justify-between absolute right-10 bottom-8">
                  <Button
                    width="w-[20rem]"
                    backgroundColor="bg-_neutral-70"
                    fontWeight="font-normal"
                    textColor="text-_neutral-10"
                    height="h-[3.5rem]"
                    textSize="text-_h3"
                    handleClick={() => {
                      InstanceLink(item.topicId);
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
                      topicData(item);
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
                        deleteAdminTopicApi({
                          topicId: item.topicId,
                          queryClient: queryClient,
                        });
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
                    handleClick={() => {
                      alert("업데이트 예정입니다.");
                    }}
                    content="종료"
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

export default TopicListComponent;
