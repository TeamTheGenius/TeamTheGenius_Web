import { shopFrameListType, shopTicketListType } from "@/types/shopType";
import { Modal } from "@/components/Common/Modal/Modal";
import ShopCompleteNonePoint from "./ShopCompleteNonePoint/ShopCompleteNonePoint";
import ShopCompleteFrame from "./ShopCompleteFrame/ShopCompleteFrame";
import ShopCompleteEquip from "./ShopCompleteEquip/ShopCompleteEquip";
import ShopCompleteTicket from "./ShopCompleteTicket/ShopCompleteTicket";

type ShopCompletedModalType = {
  err?: string;
  closeModal: () => void;
  item?: shopFrameListType | shopTicketListType;
  queryClient: any;
  mountFrameHandle: (itemId: number | undefined) => void;
  isValidCategory?: boolean;
  loadingState: boolean;
};

function ShopCompletedModal({
  closeModal,
  item,
  err,
  mountFrameHandle,
  isValidCategory,
  loadingState,
}: ShopCompletedModalType) {
  return (
    <Modal.ModalContentBox width="w-[35.5rem]" height="h-[32.3rem]">
      <div className="flex flex-col justify-center relative items-center">
        {item?.itemCategory === "PROFILE_FRAME" && (
          <ShopCompleteFrame
            loadingState={loadingState}
            closeModal={closeModal}
            item={item}
            mountFrameHandle={mountFrameHandle}
          />
        )}
        {err === "사용자의 보유 포인트가 충분하지 않습니다." && (
          <ShopCompleteNonePoint loadingState={loadingState} />
        )}
        {err === "프로필 프레임은 재구매가 불가능 합니다." && (
          <ShopCompleteEquip
            closeModal={closeModal}
            loadingState={loadingState}
          />
        )}
        {isValidCategory && (
          <ShopCompleteTicket
            loadingState={loadingState}
            closeModal={closeModal}
            item={item}
            mountFrameHandle={mountFrameHandle}
          />
        )}
      </div>
    </Modal.ModalContentBox>
  );
}

export default ShopCompletedModal;
