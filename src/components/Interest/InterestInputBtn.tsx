import Button from "@/components/Common/Button";

type InterestInputBtnType = {
  setInputModalIsOpen: React.Dispatch<React.SetStateAction<boolean>>;
};
const InterestInputBtn = ({ setInputModalIsOpen }: InterestInputBtnType) => {
  const openInputModal = () => {
    setInputModalIsOpen(true);
  };

  const input = () => {
    openInputModal();
  };
  return (
    <Button
      content={"직접입력"}
      width={"w-full"}
      height={"h-[2.2rem]"}
      backgroundColor={""}
      textSize={"text-_body1"}
      textColor={"text-black"}
      fontWeight={"font-normal"}
      handleClick={input}
    />
  );
};

export default InterestInputBtn;
