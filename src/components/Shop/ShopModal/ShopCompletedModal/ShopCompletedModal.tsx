import { shopFrameListType, shopTicketListType } from "@/types/shopType";
import { Modal } from "@/components/Common/Modal/Modal";
import ShopCompleteNonePoint from "./ShopCompleteNonePoint/ShopCompleteNonePoint";
import ShopCompleteFrame from "./ShopCompleteFrame/ShopCompleteFrame";
import ShopCompleteEquip from "./ShopCompleteEquip/ShopCompleteEquip";
import ShopCompleteTicket from "./ShopCompleteTicket/ShopCompleteTicket";

type ShopCompletedModalType = {
  err?: string;
  item?: shopFrameListType | shopTicketListType;
  isValidCategory?: boolean;
};

function ShopCompletedModal({
  item,
  err,
  isValidCategory,
}: ShopCompletedModalType) {
  return (
    <Modal.ModalContentBox width="w-[35.5rem]" height="h-[32.3rem]">
      <div className="flex flex-col justify-center relative items-center">
        {item?.itemCategory === "PROFILE_FRAME" && (
          <ShopCompleteFrame item={item} />
        )}
        {err === "사용자의 보유 포인트가 충분하지 않습니다." && (
          <ShopCompleteNonePoint />
        )}
        {err === "프로필 프레임은 재구매가 불가능 합니다." && (
          <ShopCompleteEquip />
        )}
        {isValidCategory && <ShopCompleteTicket item={item} />}
      </div>
    </Modal.ModalContentBox>
  );
}

export default ShopCompletedModal;
