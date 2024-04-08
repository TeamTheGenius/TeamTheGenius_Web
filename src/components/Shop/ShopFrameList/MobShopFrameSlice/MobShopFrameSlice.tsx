import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SubHeader from "@/components/Shop/SubHeader/SubHeader";
import { shopFrameListType } from "@/types/shopType";
import ShopFrameItem from "../ShopFrameItem/ShopFrameItem";
import { useGetFrameItems } from "@/hooks/queries/useItemQuery";
import christmasFrame from "@/assets/icon/profile-frame-christmas.svg";
import powerOfDarkFrame from "@/assets/icon/profile-frame-power-of-dark.svg";
import { useEffect, useState } from "react";
import { ModalLayer } from "@/components/Common/Modal/Modal";
import useModal from "@/hooks/useModal";
import ShopBuyModal from "../../ShopModal/ShopBuyModal/ShopBuyModal";
import { createPortal } from "react-dom";

const MobShopFrameSlice = () => {
  const [modal, setModal] = useState<React.ReactNode>();
  const { openModal, closeModal, isModalOpened } = useModal();
  const [frameDataState, setframeDataState] = useState<shopFrameListType[]>();
  const { data: frameItemData } = useGetFrameItems();
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
    if (frameItemData) {
      onSuccessGetFrameItem();
    }
  }, [frameItemData]);

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
      <Swiper slidesPerView={4} centeredSlides={false} className="mySwiper">
        {frameDataState?.map((item: shopFrameListType) => (
          <SwiperSlide key={item.itemId}>
            <div className="w-full flex flex-col items-center max-w-[9.9rem] mb-[1rem]">
              <ShopFrameItem item={item} buyItem={buyItem} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MobShopFrameSlice;
