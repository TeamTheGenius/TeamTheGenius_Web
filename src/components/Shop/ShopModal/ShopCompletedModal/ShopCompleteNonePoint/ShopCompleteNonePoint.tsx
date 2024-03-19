import Button from "@/components/Common/Button";
import { Modal } from "@/components/Common/Modal/Modal";
import { PATH } from "@/constants/path";
import { useNavigate } from "react-router-dom";

function ShopCompleteNonePoint() {
  const navigate = useNavigate();
  const completeHandle = () => {
    navigate(`${PATH.PAYMENTS}`);
  };
  return (
    <>
      <div className="mb-[7.4rem]">
        <Modal.ModalContent content="포인트 잔액이 부족해요 충전하시겠어요?" />
      </div>
      <Button
        content="충전하러 가기"
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

export default ShopCompleteNonePoint;
