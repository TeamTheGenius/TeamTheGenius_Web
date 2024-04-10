import Button from "@/components/Common/Button";
import { shopFrameListType } from "@/types/shopType";
import { breakLine } from "@/utils/breakLine";

type ShopCompleteTicketType = {
  closeModal: () => void;
  item?: shopFrameListType;
};

function ShopCompleteTicket({ closeModal, item }: ShopCompleteTicketType) {
  const completeHandle = () => {
    closeModal();
  };
  return (
    <>
      <p className="break-all text-center text-[1.8rem] font-medium text-black whitespace-pre-wrap mb-[7.4rem]">
        {breakLine(`${item?.name}\n구매 완료!`)}
      </p>
      <Button
        content="돌아가기"
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

export default ShopCompleteTicket;
