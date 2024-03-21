import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import SubHeader from "@/components/Shop/SubHeader/SubHeader";
import { shopFrameSliceType, shopFrameListType } from "@/types/shopType";
import ShopFrameItem from "../ShopFrameItem/ShopFrameItem";

const MobShopFrameSlice = ({
  frameData,
  frameDataState,
  buyItem,
  mountFrameHandle,
  unMountFrameHandle,
}: shopFrameSliceType) => {
  return (
    <>
      <SubHeader content="프로필 프레임" />
      <Swiper slidesPerView={4} centeredSlides={false} className="mySwiper">
        {frameDataState?.map((item: shopFrameListType) => (
          <SwiperSlide key={item.itemId}>
            <div className="w-full flex flex-col items-center max-w-[9.9rem] mb-[1rem]">
              <ShopFrameItem
                item={item}
                buyItem={buyItem}
                mountFrameHandle={mountFrameHandle}
                unMountFrameHandle={unMountFrameHandle}
              />
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MobShopFrameSlice;
