import Button from "@/components/Common/Button";
import CommonMutationErrorModal from "@/components/Error/CommonMutationErrorModal/CommonMutationErrorModal";
import {
  usePostFrameItemEquiptment,
  usePostFrameItemUnEquiptment,
} from "@/hooks/queries/useItemQuery";
import { useModalStore } from "@/stores/modalStore";
import { shopFrameListType } from "@/types/shopType";
import { breakLine } from "@/utils/breakLine";
import { AxiosError } from "axios";

type ShopCompleteFrameType = {
  item?: shopFrameListType;
};

function ShopCompleteFrame({ item }: ShopCompleteFrameType) {
  const { setModal, closeModal } = useModalStore();
  const onErrorPostFrameItemUnEquiptment = (
    error: AxiosError<{ message?: string }>
  ) => {
    setModal(
      <CommonMutationErrorModal error={error} closeModal={closeModal} />
    );
  };
  const onErrorPostFrameItemEquiptment = (
    error: AxiosError<{ message?: string }>
  ) => {
    setModal(
      <CommonMutationErrorModal error={error} closeModal={closeModal} />
    );
  };
  const { mutateAsync: postFrameItemUnEquipmentAsync } =
    usePostFrameItemUnEquiptment({ onError: onErrorPostFrameItemUnEquiptment });

  const onSuccessPostFrameItemEquipment = () => {
    closeModal();
  };
  const { mutate: postFrameItemEquiptment } = usePostFrameItemEquiptment({
    onError: onErrorPostFrameItemEquiptment,
    onSuccess: onSuccessPostFrameItemEquipment,
  });

  const mountFrameHandle = async (itemId: number | undefined) => {
    if (!itemId) return null;
    await postFrameItemUnEquipmentAsync();
    postFrameItemEquiptment(itemId);
  };

  const completeHandle = () => {
    mountFrameHandle(item?.itemId);
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
