import MyPoint from "@/components/MyPage/MyPage/MyPoint/MyPoint";
import ShopHeader from "@/components/Shop/ShopHeader/ShopHeader";
import ShopFrame from "@/components/Shop/ShopFrameList/ShopFrame/ShopFrame";
import MobShopFrameSlice from "@/components/Shop/ShopFrameList/MobShopFrameSlice/MobShopFrameSlice";
import "@/pages/Shop/swiperCustomStyle.css";
import { useEffect, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { shopFrameListType, shopPassListDataType } from "@/types/shopType";
import getItemFrameApi from "@/apis/getItemFrameApi";
import getItemPassApi from "@/apis/getItemPassApi";
import getItemAllApi from "@/apis/getItemAllApi";
import frameImg1 from "@/assets/image/frame_0.svg";
import frameImg2 from "@/assets/image/frame_1.svg";
import frameImg3 from "@/assets/image/frame_1.svg";
import passImg1 from "@/assets/image/pass_0.svg";
import passImg2 from "@/assets/image/pass_1.svg";
import postItemEquipApi from "@/apis/postItemEquipApi";
import postItemUnEquipApi from "@/apis/postItemUnEquipApi";
import ShopPass from "@/components/Shop/ShopPassItem/ShopPass";
import useModal from "@/hooks/useModal";
import { ModalLayer } from "@/components/Common/Modal/Modal";
import ShopBuyModal from "@/components/Shop/ShopModal/ShopBuyModal/ShopBuyModal";
import { Data } from "@/types/myProfileData";
import getMyPageProfile from "@/apis/getMyPageProfile";

const Shop = () => {
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [frameDataState, setframeDataState] = useState<shopFrameListType[]>();
  const [passDataState, setPassDataState] = useState<shopPassListDataType[]>();
  const [modal, setModal] = useState<React.ReactNode>();
  const { openModal, closeModal, isModalOpened } = useModal();
  const { data: profilePoint } = useQuery<Data>({
    queryKey: ["myPageProfile"],
    queryFn: () => getMyPageProfile(),
  });
  // shop frame 리스트
  const { data: frameData } = useQuery<shopFrameListType[]>({
    queryKey: ["itemFrameList"],
    queryFn: () => getItemFrameApi(),
  });
  // shop pass 리스트
  const { data: passData } = useQuery<shopPassListDataType[]>({
    queryKey: ["itemPassList"],
    queryFn: () => getItemPassApi(),
  });
  // shop 모든 리스트
  const { data: allData } = useQuery<shopFrameListType[]>({
    queryKey: ["itemAllList"],
    queryFn: () => getItemAllApi(),
  });
  const queryClient = useQueryClient();

  const mountFrameHandle = (itemId: number | undefined) => {
    postItemUnEquipApi({
      itemId: itemId,
      queryClient: queryClient,
    });
    postItemEquipApi({
      itemId: itemId,
      queryClient: queryClient,
    });
  };
  const buyItem = (item: shopFrameListType | undefined) => {
    setModal(
      <ShopBuyModal
        mountFrameHandle={mountFrameHandle}
        closeModal={closeModal}
        setModal={setModal}
        queryClient={queryClient}
        item={item}
      />
    );
    openModal();
  };

  const isMobile = viewportWidth <= 393;

  useEffect(() => {
    const updatedFrameData = frameData?.map((item) => ({
      ...item,
      imgSrc:
        item.itemId === 1
          ? frameImg1
          : item.itemId === 2
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
      {modal && isModalOpened && (
        <ModalLayer onClick={closeModal}>{modal}</ModalLayer>
      )}
      <ShopHeader />
      <div className="px-[2.2rem] pt-[6.7rem] w-full _sm:px-[1.5rem] _sm:pt-[6rem]">
        <div className="flex flex-col w-full justify-center items-center">
          <div className="w-full max-w-[44.5rem] _sm:max-w-[27.8rem] mt-[2.9rem]">
            <MyPoint point={profilePoint?.point} />
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
            <ShopPass
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
