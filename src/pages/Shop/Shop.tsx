import MyPoint from "@/components/MyPage/MyPage/MyPoint/MyPoint";
import ShopHeader from "@/components/Shop/ShopHeader/ShopHeader";
import ShopFrame from "@/components/Shop/ShopFrameList/ShopFrame/ShopFrame";
import ShopItem from "@/components/Shop/ShopItem/ShopItem";
import MobShopFrameSlice from "@/components/Shop/ShopFrameList/MobShopFrameSlice/MobShopFrameSlice";
import "@/pages/Shop/swiperCustomStyle.css";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { shopListType } from "@/types/shopType";
import getItemFrameApi from "@/apis/getItemFrameApi";
import getItemPassApi from "@/apis/getItemPassApi";
import postdItemBuyApi from "@/apis/postdItemBuyApi";
import getItemAllApi from "@/apis/getItemAllApi";
// import { passData } from "@/data/shopItemData";

const Shop = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);

  const { data: frameData } = useQuery<shopListType[]>({
    queryKey: ["itemFrameList"],
    queryFn: () => getItemFrameApi(),
  });
  const { data: passData } = useQuery<shopListType[]>({
    queryKey: ["itemPassList"],
    queryFn: () => getItemPassApi(),
  });
  const { data: allData } = useQuery<shopListType[]>({
    queryKey: ["itemAllList"],
    queryFn: () => getItemAllApi(),
  });
  const queryClient = useQueryClient();

  if (!frameData) {
    return;
  }
  if (!passData) {
    return;
  }

  const mountFrameHandle = () => {
    alert("장착기능");
  };
  const buyItem = (itemId: number | undefined) => {
    alert("아이템 사기");
    postdItemBuyApi({
      itemId: itemId,
      queryClient: queryClient,
    });
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
            <MyPoint point={100} />
          </div>
          {isMobile ? (
            <div className="w-full max-w-[44.5rem] _sm:max-w-[35rem] mt-[2.1rem] mb-[4rem]">
              <MobShopFrameSlice
                frameData={frameData}
                buyItem={buyItem}
                mountFrameHandle={mountFrameHandle}
              />
            </div>
          ) : (
            <div className="w-full max-w-[44.5rem] _sm:max-w-[27.8rem] mt-[2.1rem] mb-[4rem]">
              <ShopFrame
                frameData={frameData}
                buyItem={buyItem}
                mountFrameHandle={mountFrameHandle}
              />
            </div>
          )}
          <div className="w-full max-w-[44.5rem] _sm:max-w-[38rem] mt-[2.1rem] mb-[4rem]">
            <ShopItem itemData={passData} buyItem={buyItem} />
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
