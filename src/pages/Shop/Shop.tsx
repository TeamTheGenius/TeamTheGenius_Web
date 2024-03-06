import MyPoint from "@/components/MyPage/MyPage/MyPoint/MyPoint";
import ShopHeader from "@/components/Shop/ShopHeader/ShopHeader";
import { itemData } from "@/data/shopItemData";
import { frameData } from "@/data/shopFrameData";
import ShopFrame from "@/components/Shop/ShopFrame/ShopFrame";
import ShopItem from "@/components/Shop/ShopItem/ShopItem";
import MobShopFrameSlice from "@/components/Shop/MobShopFrameSlice/MobShopFrameSlice";
import "@/pages/Shop/swiperCustomStyle.css";
import { useEffect, useState } from "react";

const Shop = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const buyHandle = () => {
    alert("구매기능");
  };
  const mountFrameHandle = () => {
    alert("장착기능");
  };
  const buyItem = () => {
    alert("아이템 사기");
  };

  useEffect(() => {
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const isMobile = viewportWidth <= 393;

  return (
    <>
      <ShopHeader />
      <div className="px-[2.2rem] pt-[6.7rem] w-full _sm:px-[1.5rem] _sm:pt-[6rem]">
        <div className="flex flex-col w-full justify-center items-center">
          <div className="w-full max-w-[44.5rem] _sm:max-w-[27.8rem] mt-[2.9rem]">
            <MyPoint />
          </div>
          {isMobile ? (
            <div className="w-full max-w-[44.5rem] _sm:max-w-[35rem] mt-[2.1rem] mb-[4rem]">
              <MobShopFrameSlice
                frameData={frameData}
                buyHandle={buyHandle}
                mountFrameHandle={mountFrameHandle}
              />
            </div>
          ) : (
            <div className="w-full max-w-[44.5rem] _sm:max-w-[27.8rem] mt-[2.1rem] mb-[4rem]">
              <ShopFrame
                frameData={frameData}
                buyHandle={buyHandle}
                mountFrameHandle={mountFrameHandle}
              />
            </div>
          )}
          <div className="w-full max-w-[44.5rem] _sm:max-w-[38rem] mt-[2.1rem] mb-[4rem]">
            <ShopItem itemData={itemData} buyItem={buyItem} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
