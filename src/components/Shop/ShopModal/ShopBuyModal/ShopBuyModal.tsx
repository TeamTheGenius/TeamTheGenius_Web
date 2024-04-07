import Button from "@/components/Common/Button";
import pointBigIcon from "@/assets/icon/point-big-icon.svg";
import { shopFrameListType, shopTicketListType } from "@/types/shopType";
import { cls } from "@/utils/mergeTailwind";
import ShopCompletedModal from "@/components/Shop/ShopModal/ShopCompletedModal/ShopCompletedModal";
import ShopTicketCount from "@/components/Shop/ShopTicketList/ShopTicketItem/ShopTicketCount/ShopTicketCount";
import Loading from "@/components/Common/Loading/Loading";
import { usePostItemBuy } from "@/hooks/queries/useItemQuery";

type ShopBuyModalType = {
  closeModal: () => void;
  setModal: React.Dispatch<React.SetStateAction<React.ReactNode>>;
  setLoadingState: React.Dispatch<React.SetStateAction<boolean>>;
  loadingState: boolean;
  item?: shopFrameListType | shopTicketListType;
  queryClient: any;
  mountFrameHandle: (itemId: number | undefined) => void;
};

function ShopBuyModal({
  item,
  queryClient,
  setLoadingState,
  loadingState,
  setModal,
  closeModal,
  mountFrameHandle,
}: ShopBuyModalType) {
  const onSuccessPostItemBuy = () => {
    completeModal();
    setLoadingState(false);
  };
  const onErrorPostItemBuy = (errMessage: string) => {
    setLoadingState(false);
    setModal(
      <ShopCompletedModal
        loadingState={loadingState}
        mountFrameHandle={mountFrameHandle}
        err={errMessage}
        queryClient={queryClient}
        closeModal={closeModal}
      />
    );
  };
  const { mutate: postItemBuy } = usePostItemBuy({
    onSuccess: onSuccessPostItemBuy,
    onError: onErrorPostItemBuy,
  });

  const isValidCategory = ["CERTIFICATION_PASSER", "POINT_MULTIPLIER"].includes(
    item?.itemCategory || ""
  );
  const completeModal = () => {
    setModal(
      <ShopCompletedModal
        loadingState={loadingState}
        mountFrameHandle={mountFrameHandle}
        item={item}
        isValidCategory={isValidCategory}
        queryClient={queryClient}
        closeModal={closeModal}
      />
    );
  };
  const buyHandle = () => {
    setLoadingState(true);
    if (item) {
      postItemBuy(item.itemId);
    }
  };

  const onClickModalBox = (e: React.MouseEvent) => {
    e.stopPropagation();
  };
  return (
    <div
      onClick={onClickModalBox}
      className={cls(
        `relative overflow-scroll scrollbar-hide bg-white z-[9999] mx-[2.2rem] rounded-[2rem] p-[1.7rem] flex justify-center items-center w-[35.5rem]`,
        isValidCategory ? "h-[46.1rem]" : "h-[36rem]"
      )}
    >
      {loadingState ? (
        <Loading />
      ) : (
        <>
          {isValidCategory && (
            <div className="absolute right-[1.1rem] top-[1.3rem]">
              <ShopTicketCount item={item} />
            </div>
          )}
          <div className="flex flex-col justify-center relative items-center">
            <div
              className={`flex justify-center w-[11.3rem] h-[12.9rem] rounded-[0.5rem] mb-[1.1rem]`}
            >
              <img
                src={item?.imgSrc}
                alt={"프레임"}
                className="w-11/12 h-11/12"
              />
            </div>
            <span className="text-[1.5rem] font-medium mb-[1.3rem]">
              {item?.name}
            </span>
            <div className="flex justify-center items-center mb-[2.2rem]">
              <img
                src={pointBigIcon}
                alt="point 아이콘"
                className="w-[2.5rem] h-[2.5rem] mr-[0.5rem]"
              />
              <span className="font-bold text-[#000000] text-[1.6rem]">
                {item?.cost}P
              </span>
            </div>
            {isValidCategory && (
              <div className="flex w-full max-w-[22.3rem] mb-[5.8rem]">
                <span className="block font-normal text-[#000000] text-[1.4rem]">
                  {item?.details}
                </span>
              </div>
            )}
            <Button
              content="구매하기"
              width="w-[16.4rem]"
              height="h-[5rem]"
              backgroundColor="bg-[#FF4356]"
              textSize="text-[1.5rem]"
              fontWeight="font-[500]"
              textColor="text-white"
              handleClick={buyHandle}
            />
          </div>
        </>
      )}
    </div>
  );
}

export default ShopBuyModal;
