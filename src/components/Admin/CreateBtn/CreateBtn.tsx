import Button from "@/components/Common/Button";
import { PATH } from "@/constants/path";
import { useNavigate } from "react-router-dom";

type CreateBtnType = { tokken: string; topicId?: string };
const CreateBtn = ({ tokken, topicId }: CreateBtnType) => {
  const navigate = useNavigate();
  const createBtnOpen = () => {
    if (tokken === "topic") {
      navigate(PATH.ADMIN_TOPIC_CREATE);
    }
    if (tokken === "instance") {
      if (topicId) {
        navigate(`${PATH.ADMIN_INSTANCE}/${topicId}/create`, {
          state: { topicId },
        });
      }
    }
  };
  return (
    <div className="flex justify-end mb-10">
      <Button
        width="w-[10rem]"
        backgroundColor="bg-_neutral-70"
        fontWeight=""
        textColor="text-_neutral-10"
        height="h-[3.5rem]"
        textSize="text-_h3"
        handleClick={() => {
          createBtnOpen();
        }}
        content="생성"
      />
    </div>
  );
};

export default CreateBtn;
