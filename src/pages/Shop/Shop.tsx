import MyPoint from "@/components/MyPage/MyPage/MyPoint/MyPoint";
import ShopHeader from "@/components/Shop/ShopHeader/ShopHeader";
import ShopFrame from "@/components/Shop/ShopFrameList/ShopFrame/ShopFrame";
import ShopItem from "@/components/Shop/ShopPassItem/ShopItem";
import MobShopFrameSlice from "@/components/Shop/ShopFrameList/MobShopFrameSlice/MobShopFrameSlice";
import "@/pages/Shop/swiperCustomStyle.css";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { shopFrameListType, shopPassListData } from "@/types/shopType";
import getItemFrameApi from "@/apis/getItemFrameApi";
import getItemPassApi from "@/apis/getItemPassApi";
import postdItemBuyApi from "@/apis/postdItemBuyApi";
import getItemAllApi from "@/apis/getItemAllApi";
import frameImg1 from "@/assets/image/frame_0.svg";
import frameImg2 from "@/assets/image/frame_1.svg";
import frameImg3 from "@/assets/image/frame_1.svg";
import passImg1 from "@/assets/image/pass_0.svg";
import passImg2 from "@/assets/image/pass_1.svg";
import postItemEquipApi from "@/apis/postItemEquipApi";
import postItemUnEquipApi from "@/apis/postItemUnEquipApi";
import ShopPassItem from "@/components/Shop/ShopItem/ShopItem";
const Shop = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [frameDataState, setframeDataState] = useState<shopFrameListType[]>();
  const [passDataState, setPassDataState] = useState<shopPassListData[]>();
  const { data: frameData } = useQuery<shopFrameListType[]>({
    queryKey: ["itemFrameList"],
    queryFn: () => getItemFrameApi(),
  });
  const { data: passData } = useQuery<shopFrameListType[]>({
    queryKey: ["itemPassList"],
    queryFn: () => getItemPassApi(),
  });
  const { data: allData } = useQuery<shopFrameListType[]>({
    queryKey: ["itemAllList"],
    queryFn: () => getItemAllApi(),
  });
  const queryClient = useQueryClient();

  const mountFrameHandle = (itemId: number | undefined) => {
    postItemUnEquipApi({
      itemId: itemId,
    });
    postItemEquipApi({
      itemId: itemId,
    });
  };
  const buyItem = (itemId: number | undefined) => {
    alert("아이템 사기");
    postdItemBuyApi({
      itemId: itemId,
      queryClient: queryClient,
    });
  };
  const isMobile = viewportWidth <= 393;

  useEffect(() => {
    const updatedFrameData = frameData?.map((item) => ({
      ...item,
      imgSrc:
        item.itemId === 1
          ? frameImg1
          : item.itemId === 4
          ? frameImg2
          : item.itemId === 5
          ? frameImg3
          : "기본 이미지 경로",
    }));
    const updatedpassData = passData?.map((item) => ({
      ...item,
      imgSrc:
        item.itemId === 2
          ? passImg1
          : item.itemId === 3
          ? passImg2
          : "기본 이미지 경로",
    }));
    setPassDataState(updatedpassData);
    setframeDataState(updatedFrameData);
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [frameData, passData]);

  if (!frameData || !passData || !allData) {
    return null;
  }

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
                frameDataState={frameDataState}
                buyItem={buyItem}
                mountFrameHandle={mountFrameHandle}
              />
            </div>
          ) : (
            <div className="w-full max-w-[44.5rem] _sm:max-w-[27.8rem] mt-[2.1rem] mb-[4rem]">
              <ShopFrame
                frameData={frameData}
                frameDataState={frameDataState}
                buyItem={buyItem}
                mountFrameHandle={mountFrameHandle}
              />
            </div>
          )}
          <div className="w-full max-w-[44.5rem] _sm:max-w-[38rem] mt-[2.1rem] mb-[4rem]">
            <ShopPassItem
              itemData={passData}
              buyItem={buyItem}
              passDataState={passDataState}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
