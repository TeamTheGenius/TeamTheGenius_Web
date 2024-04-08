import { useState, useEffect } from "react";
import { shopFrameListType } from "@/types/shopType";
import ShopFrameItem from "./ShopFrameItem/ShopFrameItem";
import SubHeader from "../SubHeader/SubHeader";
import { useGetFrameItems } from "@/hooks/queries/useItemQuery";
import christmasFrame from "@/assets/icon/profile-frame-christmas.svg";
import powerOfDarkFrame from "@/assets/icon/profile-frame-power-of-dark.svg";
import { ModalLayer } from "@/components/Common/Modal/Modal";
import useModal from "@/hooks/useModal";
import ShopBuyModal from "../ShopModal/ShopBuyModal/ShopBuyModal";
import { createPortal } from "react-dom";

const ShopFrameList = () => {
  const [frameDataState, setframeDataState] = useState<shopFrameListType[]>();
  const [modal, setModal] = useState<React.ReactNode>();
  const { openModal, closeModal, isModalOpened } = useModal();

  const { data: frameItemData, isSuccess: getFrameItemSuccess } =
    useGetFrameItems();
  const onSuccessGetFrameItem = () => {
    const updatedFrameData = frameItemData?.map((item) => ({
      ...item,
      imgSrc:
        item.itemId === 1
          ? christmasFrame
          : item.itemId === 2
          ? powerOfDarkFrame
          : "기본 이미지 경로",
    }));
    setframeDataState(updatedFrameData);
  };

  useEffect(() => {
    if (getFrameItemSuccess) {
      onSuccessGetFrameItem();
    }
  }, [getFrameItemSuccess, frameItemData]);

  const buyItem = (item: shopFrameListType | undefined) => {
    setModal(
      <ShopBuyModal closeModal={closeModal} setModal={setModal} item={item} />
    );
    openModal();
  };

  return (
    <>
      {isModalOpened &&
        createPortal(
          <ModalLayer onClick={closeModal}>{modal}</ModalLayer>,
          document.body
        )}

      <SubHeader content="프로필 프레임" />
      <div className="flex flex-wrap w-full">
        <ul className="w-full grid grid-cols-4 gap-[1rem]">
          {frameDataState?.map((item: shopFrameListType) => (
            <li
              key={item.itemId}
              className="w-full flex flex-col items-center max-w-[9.9rem] mb-[1rem]"
            >
              <ShopFrameItem item={item} buyItem={buyItem} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ShopFrameList;
