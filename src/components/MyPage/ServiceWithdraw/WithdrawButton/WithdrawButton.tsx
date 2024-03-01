import Button from "@/components/Common/Button";

function WithdrawButton() {
  const onClick = () => {};

  return (
    <Button
      content="탈퇴하기"
      width="w-full max-w-[46.7rem] _sm:max-w-[16.4rem]"
      height="h-[5rem]"
      backgroundColor="bg-black"
      textSize="text-[1.5rem]"
      fontWeight="font-[500]"
      textColor="text-white"
      handleClick={onClick}
    />
  );
}

export default WithdrawButton;
