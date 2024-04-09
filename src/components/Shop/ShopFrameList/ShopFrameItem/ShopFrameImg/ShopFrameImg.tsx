import { ModalLayer } from "@/components/Common/Modal/Modal";
import ShopBuyModal from "@/components/Shop/ShopModal/ShopBuyModal/ShopBuyModal";
import useModal from "@/hooks/useModal";
import { shopFrameListType } from "@/types/shopType";
import { useState } from "react";
import { createPortal } from "react-dom";

type ShopFrameImgProps = {
  imgSrc?: string;
  item?: shopFrameListType;
  equip?: string;
};

function ShopFrameImg({ imgSrc, item, equip }: ShopFrameImgProps) {
  const [modal, setModal] = useState<React.ReactNode>();
  const { openModal, closeModal, isModalOpened } = useModal();
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
      <button
        className={`flex justify-center w-full h-[9.9rem] rounded-[0.5rem] mb-[1.1rem] border-[0.1rem] ${
          equip === "장착 불가"
            ? "border-[#D9D9D9]"
            : equip === "장착"
            ? "border-[#D9D9D9]"
            : equip === "장착중"
            ? "border-[#FF4356]"
            : ""
        }`}
        onClick={() => {
          buyItem(item);
        }}
      >
        <img src={imgSrc} alt={"프레임"} className="w-11/12 h-11/12" />
      </button>
    </>
  );
}

export default ShopFrameImg;
