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
      <ul className="flex flex-col gap-10 rounded-xl h-full">
        <>
          {adminList?.map((item: adminTopicDataType) => {
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
                className="flex flex-col flex-wrap gap-[2rem]  p-[1rem] bg-_neutral-10"
              >
                <TopicTitle title={item.title} />
                <div className="flex flex-wrap gap-[1rem] justify-end  right-10 bottom-8">
                  <Button
                    width="w-[7rem]"
                    backgroundColor="bg-_neutral-70"
                    fontWeight="font-normal"
                    textColor="text-_neutral-10"
                    height="h-[3rem]"
                    textSize="text-[1.3rem]"
                    handleClick={() => {
                      InstanceLink(item.topicId);
                    }}
                    content="인스턴스"
                  />
                  <Button
                    width="w-[5rem]"
                    backgroundColor="bg-_neutral-70"
                    fontWeight="font-normal"
                    textColor="text-_neutral-10"
                    height="h-[3rem]"
                    textSize="text-[1.3rem]"
                    handleClick={() => {
                      topicData(item);
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
                        deleteAdminTopicApi({
                          topicId: item.topicId,
                          queryClient: queryClient,
                        });
                      }
                    }}
                    content="삭제"
                  />
                  <Button
                    width="w-[5rem]"
                    backgroundColor="bg-_neutral-70"
                    fontWeight="font-normal"
                    textColor="text-_neutral-10"
                    height="h-[3rem]"
                    textSize="text-[1.3rem]"
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
