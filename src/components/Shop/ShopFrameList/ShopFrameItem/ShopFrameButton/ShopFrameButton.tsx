import pointBigIcon from "@/assets/icon/point-big-icon.svg";
import {
  usePostFrameItemEquiptment,
  usePostFrameItemUnEquiptment,
} from "@/hooks/queries/useItemQuery";
import { useModalStore } from "@/stores/modalStore";
import { shopFrameListType } from "@/types/shopType";

function ShopFrameButton({ item }: { item: shopFrameListType }) {
  const { closeModal } = useModalStore();

  const {
    mutate: postFrameItemUnEquipment,
    mutateAsync: postFrameItemUnEquipmentAsync,
  } = usePostFrameItemUnEquiptment();

  const onSuccessPostFrameItemEquiptment = () => {
    closeModal();
  };

  const { mutate: postFrameItemEquiptment } = usePostFrameItemEquiptment({
    onSuccess: onSuccessPostFrameItemEquiptment,
  });

  const mountFrameHandle = async (itemId: number | undefined) => {
    if (!itemId) return null;
    await postFrameItemUnEquipmentAsync();
    postFrameItemEquiptment(itemId);
  };

  const unMountFrameHandle = () => {
    postFrameItemUnEquipment();
  };

  return (
    <>
      <div className="flex justify-center items-center">
        {item.equipStatus === "장착 중" && (
          <button
            className="bg-white border-2 border-[#ff4356] rounded-[1rem]"
            onClick={unMountFrameHandle}
          >
            <span className="mx-[0.8rem] my-[0.4rem] font-bold text-[#ff4356] text-[1.2rem]">
              장착중
            </span>
          </button>
        )}
        {item.equipStatus === "장착 가능" && (
          <button
            className="bg-[#ff4356] border-2 border-[#ff4356] rounded-[1rem]"
            onClick={() => {
              mountFrameHandle(item.itemId);
            }}
          >
            <span className="mx-[0.8rem] my-[0.4rem] font-bold text-white text-[1.2rem]">
              장착
            </span>
          </button>
        )}
        {item.equipStatus === "장착 불가" && (
          <div className="flex justify-center items-center">
            <img
              src={pointBigIcon}
              alt="point 아이콘"
              className="w-[2.1rem] h-[2.1rem] mr-[0.5rem]"
            />
            <span className="font-bold text-[#000000] text-[1.3rem]">
              {item.cost}P
            </span>
          </div>
        )}
      </div>
    </>
  );
}

export default ShopFrameButton;
