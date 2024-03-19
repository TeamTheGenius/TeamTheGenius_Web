import { shopFrameListType, shopPassListDataType } from "@/types/shopType";
import { Modal } from "@/components/Common/Modal/Modal";
import ShopCompleteNonePoint from "./ShopCompleteNonePoint/ShopCompleteNonePoint";
import ShopCompletePass from "./ShopCompletePass/ShopCompletePass";
import ShopCompleteFrame from "./ShopCompleteFrame/ShopCompleteFrame";
import ShopCompleteEquip from "./ShopCompleteEquip/ShopCompleteEquip";

type ShopCompletedModalType = {
  err?: string;
  closeModal: () => void;
  item?: shopFrameListType | shopPassListDataType;
  queryClient: any;
  mountFrameHandle: (itemId: number | undefined) => void;
};

function ShopCompletedModal({
  closeModal,
  item,
  err,
  mountFrameHandle,
}: ShopCompletedModalType) {
  return (
    <Modal.ModalContentBox width="w-[35.5rem]" height="h-[32.3rem]">
      <div className="flex flex-col justify-center relative items-center">
        {item?.itemCategory === "PROFILE_FRAME" && (
          <ShopCompleteFrame
            closeModal={closeModal}
            item={item}
            mountFrameHandle={mountFrameHandle}
          />
        )}
        {err === "사용자의 보유 포인트가 충분하지 않습니다." && (
          <ShopCompleteNonePoint />
        )}
        {err === "프로필 프레임은 재구매가 불가능 합니다." && (
          <ShopCompleteEquip closeModal={closeModal} />
        )}
        {item?.itemCategory === "CERTIFICATION_PASSER" && (
          <ShopCompletePass
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
