import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";
import SubHeader from "@/components/Shop/SubHeader/SubHeader";
import { shopFrameListType } from "@/types/shopType";
import ShopFrameItem from "../ShopFrameItem/ShopFrameItem";
import christmasFrame from "@/assets/icon/profile-frame-christmas.svg";
import powerOfDarkFrame from "@/assets/icon/profile-frame-power-of-dark.svg";
import { useEffect, useState } from "react";
import { useGetFrameItems } from "@/hooks/queries/useItemQuery";

const MobShopFrameSlice = () => {
  const [frameDataState, setframeDataState] = useState<shopFrameListType[]>();
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
    setframeDataState(updatedFrameData?.slice(0, 2));
  };

  useEffect(() => {
    if (getFrameItemSuccess) {
      onSuccessGetFrameItem();
    }
  }, [getFrameItemSuccess]);

  return (
    <>
      <SubHeader content="프로필 프레임" />
      <Swiper slidesPerView={4} centeredSlides={false} className="mySwiper">
        {frameDataState?.map((item: shopFrameListType) => (
          <SwiperSlide key={item.itemId}>
            <div className="w-full flex flex-col items-center max-w-[9.9rem] mb-[1rem]">
              <ShopFrameItem item={item} />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MobShopFrameSlice;
