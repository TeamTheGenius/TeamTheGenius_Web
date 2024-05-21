import Button from "@/components/Common/Button";
import { Modal } from "@/components/Common/Modal/Modal";
import { useModalStore } from "@/stores/modalStore";

function ShopCompleteEquip() {
  const { closeModal } = useModalStore();
  const completeHandle = () => {
    closeModal();
  };
  return (
    <>
      <div className="mb-[7.4rem]">
        <Modal.ModalContent content="이미 소지하고 있는 아이템입니다!" />
      </div>
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

export default ShopCompleteEquip;
