import MyPoint from "@/components/MyPage/MyPage/MyPoint/MyPoint";
import ShopHeader from "@/components/Shop/ShopHeader/ShopHeader";
import MobShopFrameSlice from "@/components/Shop/ShopFrameList/MobShopFrameSlice/MobShopFrameSlice";
import "@/pages/Shop/swiperCustomStyle.css";
import { useEffect, useMemo, useState } from "react";
import { useQuery, useQueryClient } from "react-query";
import { shopFrameListType, shopTicketListType } from "@/types/shopType";
import getItemFrameApi from "@/apis/getItemFrameApi";
import getItemPassApi from "@/apis/getItemPassApi";
import christmasFrame from "@/assets/icon/profile-frame-christmas.svg";
import powerOfDarkFrame from "@/assets/icon/profile-frame-power-of-dark.svg";
import pointTwiceItem from "@/assets/image/pass_0.svg";
import passItem from "@/assets/image/pass_1.svg";
import postItemEquipApi from "@/apis/postItemEquipApi";
import postItemUnEquipApi from "@/apis/postItemUnEquipApi";

import useModal from "@/hooks/useModal";
import { ModalLayer } from "@/components/Common/Modal/Modal";
import ShopBuyModal from "@/components/Shop/ShopModal/ShopBuyModal/ShopBuyModal";
import { Data } from "@/types/myProfileData";
import getMyPageProfile from "@/apis/getMyPageProfile";
import getItemPointApi from "@/apis/getItemPointApi";
import ShopFrameList from "@/components/Shop/ShopFrameList/ShopFrameList";
import ShopTicketList from "@/components/Shop/ShopTicketList/ShopTicketList";
import MainHeader from "@/components/Common/MainHeader/MainHeader";

const Shop = () => {
  const [loadingState, setLoadingState] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [frameDataState, setframeDataState] = useState<shopFrameListType[]>();
  const [ticketDataState, setTicketDataState] =
    useState<shopTicketListType[]>();
  const [modal, setModal] = useState<React.ReactNode>();
  const { openModal, closeModal, isModalOpened } = useModal();
  const { data: profilePoint } = useQuery<Data>({
    queryKey: ["myPageProfile"],
    queryFn: () => getMyPageProfile(),
  });

  const { data: frameData, isLoading: frameLoading } = useQuery<
    shopFrameListType[]
  >({
    queryKey: ["itemFrameList"],
    queryFn: () => getItemFrameApi(),
  });

  const { data: passData, isLoading: passLoading } = useQuery<
    shopTicketListType[]
  >({
    queryKey: ["itemPassList"],
    queryFn: () => getItemPassApi(),
  });

  const { data: pointData, isLoading: pointLoading } = useQuery<
    shopTicketListType[]
  >({
    queryKey: ["itemPointList"],
    queryFn: () => getItemPointApi(),
  });

  const queryClient = useQueryClient();

  const combinedData = useMemo(() => {
    if (passData && pointData) {
      return [...passData, ...pointData];
    }
    return [];
  }, [passData, pointData]);

  const mountFrameHandle = async (itemId: number | undefined) => {
    setLoadingState(true);
    await postItemUnEquipApi({});
    await postItemEquipApi({
      setLoadingState: setLoadingState,
      itemId: itemId,
      queryClient: queryClient,
    });
  };
  const unMountFrameHandle = async (itemId: number | undefined) => {
    setLoadingState(true);
    await postItemUnEquipApi({
      queryClient: queryClient,
      setLoadingState: setLoadingState,
    });
  };

  const buyItem = (item: shopFrameListType | undefined) => {
    setModal(
      <ShopBuyModal
        loadingState={loadingState}
        setLoadingState={setLoadingState}
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
          ? christmasFrame
          : item.itemId === 2
          ? powerOfDarkFrame
          : "기본 이미지 경로",
    }));
    const updatedcombinedData = combinedData?.map((item) => ({
      ...item,
      imgSrc:
        item.itemId === 3
          ? passItem
          : item.itemId === 4
          ? pointTwiceItem
          : "기본 이미지 경로",
    }));
    setTicketDataState(updatedcombinedData);
    setframeDataState(updatedFrameData);
    const handleResize = () => {
      setViewportWidth(window.innerWidth);
    };

    window.addEventListener("resize", handleResize);

    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [frameData, combinedData]);

  if (!frameData || !combinedData) {
    return null;
  }

  return (
    <>
      {modal && isModalOpened && (
        <ModalLayer onClick={closeModal}>{modal}</ModalLayer>
      )}
      <MainHeader headerText="포인트 상점" />
      <div className="px-[2.2rem] pt-[6.7rem] w-full _sm:px-[1.5rem] _sm:pt-[6rem]">
        <div className="flex flex-col w-full justify-center items-center">
          <div className="w-full max-w-[44.5rem] _sm:max-w-[27.8rem] mt-[2.9rem]">
            <MyPoint point={profilePoint?.point} pointLoading={pointLoading} />
          </div>
          {isMobile ? (
            <div className="w-full max-w-[44.5rem] _sm:max-w-[35rem] mt-[2.1rem] mb-[4rem]">
              <MobShopFrameSlice
                frameData={frameData}
                frameDataState={frameDataState}
                buyItem={buyItem}
                mountFrameHandle={mountFrameHandle}
                unMountFrameHandle={unMountFrameHandle}
                frameLoading={frameLoading}
              />
            </div>
          ) : (
            <div className="w-full max-w-[44.5rem] _sm:max-w-[27.8rem] mt-[2.1rem] mb-[4rem]">
              <ShopFrameList
                frameData={frameData}
                frameDataState={frameDataState}
                buyItem={buyItem}
                mountFrameHandle={mountFrameHandle}
                unMountFrameHandle={unMountFrameHandle}
                frameLoading={frameLoading}
              />
            </div>
          )}
          <div className="w-full max-w-[44.5rem] _sm:max-w-[38rem] mt-[2.1rem] mb-[4rem]">
            <ShopTicketList
              buyItem={buyItem}
              ticketDataState={ticketDataState}
              passLoading={passLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
