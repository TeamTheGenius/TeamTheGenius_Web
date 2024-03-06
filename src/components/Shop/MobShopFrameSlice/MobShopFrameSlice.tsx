import pointBigIcon from "@/assets/icon/point-big-icon.svg";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/css";
import "swiper/css/pagination";

import SubHeader from "@/components/Shop/SubHeader/SubHeader";

type MobShopFrameSliceType = {
  frameData: any;
  buyHandle: () => void;
  mountFrameHandle: () => void;
};

const MobShopFrameSlice = ({
  frameData,
  buyHandle,
  mountFrameHandle,
}: MobShopFrameSliceType) => {
  return (
    <>
      <SubHeader content="프로필 프레임" />
      <Swiper slidesPerView={4} centeredSlides={false} className="mySwiper">
        {frameData.map((item: any, i: number) => (
          <SwiperSlide key={i}>
            <div className="w-full flex flex-col items-center max-w-[9.9rem] mb-[1rem]">
              <button
                className="w-full h-[9.9rem] rounded-[0.5rem] mb-[1.1rem] bg-[#666666]"
                onClick={buyHandle}
              >
                <img
                  src={item.imgSrc}
                  alt={item.imgSrc}
                  className="w-full h-full"
                />
              </button>
              <span className="text-[1.3rem] font-medium mb-[0.6rem]">
                {item.frameText}
              </span>
              {item.setFrame === "장착중" && (
                <button className="bg-white border-2 border-[#ff4356] rounded-[1rem] cursor-default">
                  <span className="mx-[0.8rem] my-[0.4rem] font-bold text-[#ff4356] text-[1.2rem]">
                    장착중
                  </span>
                </button>
              )}
              {item.setFrame === "장착" && (
                <button
                  className="bg-[#ff4356] border-2 border-[#ff4356] rounded-[1rem]"
                  onClick={mountFrameHandle}
                >
                  <span className="mx-[0.8rem] my-[0.4rem] font-bold text-white text-[1.2rem]">
                    장착
                  </span>
                </button>
              )}
              {item.setFrame === "미구매" && (
                <div className="flex justify-center items-center">
                  <img
                    src={pointBigIcon}
                    alt="point 아이콘"
                    className="w-[2.1rem] h-[2.1rem] mr-[0.5rem]"
                  />
                  <span className="font-bold text-[#000000] text-[1.3rem]">
                    {item.frameMoney}P
                  </span>
                </div>
              )}
            </div>
          </SwiperSlide>
        ))}
      </Swiper>
    </>
  );
};

export default MobShopFrameSlice;
