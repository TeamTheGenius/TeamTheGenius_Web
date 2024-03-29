import Button from "@/components/Common/Button";
import { shopFrameListType } from "@/types/shopType";
import { breakLine } from "@/utils/breakLine";

type ShopCompleteFrameType = {
  closeModal: () => void;
  item?: shopFrameListType;
  mountFrameHandle: (itemId: number | undefined) => void;
};

function ShopCompleteFrame({
  closeModal,
  item,
  mountFrameHandle,
}: ShopCompleteFrameType) {
  const completeHandle = () => {
    mountFrameHandle(item?.itemId);
    closeModal();
  };
  return (
    <>
      <p className="break-all text-center text-[1.8rem] font-medium text-black whitespace-pre-wrap mb-[7.4rem]">
        {breakLine(`${item?.name}구매 완료! \n 바로 사용하시겠어요?`)}
      </p>
      <Button
        content="사용하기"
        width="w-[16.4rem]"
        height="h-[5rem]"
        backgroundColor="bg-white border-2 border-[#ff4356]"
        textSize="text-[1.5rem]"
        fontWeight="font-[500]"
        textColor="text-[#ff4356]"
        handleClick={completeHandle}
      />
    </>
  );
}

export default ShopCompleteFrame;
