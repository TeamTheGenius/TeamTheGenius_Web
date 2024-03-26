import Button from "@/components/Common/Button";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
import TopicEditModal from "../TopicEditModal/TopicEditModal";
import deleteAdminTopicApi from "@/apis/deleteAdminTopicApi";
import getAdminDetailTopicApi from "@/apis/getAdminDetailTopicApi";
import {
  adminTopicDataType,
  topicDeteilType,
  topicListType,
} from "@/types/adminType";
import Loading from "@/components/Common/Loading/Loading";
import TopicTitle from "./TopicTitle/TopicTitle";
import { encrypt } from "@/hooks/useCrypto";

type adminProps = {
  pageNumber: number;
  adminList: adminTopicDataType[];
  setAdminList: React.Dispatch<React.SetStateAction<adminTopicDataType[]>>;
};

const TopicListComponent = ({
  adminList,
  setAdminList,
  pageNumber,
}: adminProps) => {
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [TopicEditModalIsOpen, setTopicEditModalIsOpen] =
    useState<boolean>(false);
  const [topicEditModalData, setTopicEditModalData] = useState<topicListType>();
  const [topicDetail, setTopicDetail] = useState<topicDeteilType>();
  const [topicDetailNumber, setTopicDetailNumber] = useState<number>();
  const navigate = useNavigate();

  const topicModalData = (data: topicListType) => {
    getAdminDetailTopicApi({
      topicId: data.topicId,
      setTopicDetail: setTopicDetail,
    });
    setTopicEditModalData(data);
    setTopicEditModalIsOpen(true);
    setTopicDetailNumber(data.topicId);
  };
  useEffect(() => {
    setIsLoading(false);
  }, []);
  return (
    <>
      <ul className="flex flex-col gap-10 rounded-xl">
        {isLoading ? (
          <Loading />
        ) : (
          <>
            {adminList?.map((item: adminTopicDataType) => {
              const imageData = `data:image/png;base64,${item.fileResponse.encodedFile}`;
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
                          deleteAdminTopicApi({
                            topicId: item.topicId,
                            setAdminList: setAdminList,
                            pageNumber: pageNumber,
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
                      handleClick={() => {}}
                      content="종료"
                    />
                  </div>
                </li>
              );
            })}
          </>
        )}
      </ul>
      {TopicEditModalIsOpen && (
        <>
          <TopicEditModal
            setTopicDetail={setTopicDetail}
            topicDetailNumber={topicDetailNumber}
            topicDetail={topicDetail}
            pageNumber={pageNumber}
            setAdminList={setAdminList}
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
