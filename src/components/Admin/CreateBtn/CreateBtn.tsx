import Button from "@/components/Common/Button";
type CreateBtnType = {
  setModal: React.Dispatch<React.SetStateAction<boolean>>;
};
const CreateBtn = ({ setModal }: CreateBtnType) => {
  const createBtnOpen = () => {
    setModal(true);
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
