import MyPoint from "@/components/MyPage/MyPage/MyPoint/MyPoint";
import MobShopFrameSlice from "@/components/Shop/ShopFrameList/MobShopFrameSlice/MobShopFrameSlice";
import "@/pages/Shop/swiperCustomStyle.css";
import { Suspense, useEffect, useState } from "react";
import ShopFrameList from "@/components/Shop/ShopFrameList/ShopFrameList";
import ShopTicketList from "@/components/Shop/ShopTicketList/ShopTicketList";
import MainHeader from "@/components/Common/MainHeader/MainHeader";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";

const Shop = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const isMobile = viewportWidth <= 393;

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  return (
    <>
      <MainHeader headerText="포인트 상점" />
      <div className="px-[2.2rem] pt-[6.7rem] w-full h-full _sm:px-[1.5rem] _sm:pt-[6rem]">
        <Suspense fallback={<LoadingBox />}>
          <div className="flex flex-col w-full justify-center items-center">
            <div className="w-full max-w-[44.5rem] _sm:max-w-[27.8rem] mt-[2.9rem]">
              <MyPoint />
            </div>

            <div className="_md:hidden _ld:hidden w-full max-w-[44.5rem] _sm:max-w-[35rem] mt-[2.1rem] mb-[4rem]">
              <MobShopFrameSlice />
            </div>

            <div className="_sm:hidden w-full max-w-[44.5rem] _sm:max-w-[27.8rem] mt-[2.1rem] mb-[4rem]">
              <ShopFrameList />
            </div>

            <div className="w-full max-w-[44.5rem] _sm:max-w-[38rem] mt-[2.1rem] mb-[4rem]">
              <ShopTicketList />
            </div>
          </div>
        </Suspense>
      </div>
    </>
  );
};

export default Shop;
