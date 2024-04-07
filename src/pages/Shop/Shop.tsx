import MyPoint from "@/components/MyPage/MyPage/MyPoint/MyPoint";
import MobShopFrameSlice from "@/components/Shop/ShopFrameList/MobShopFrameSlice/MobShopFrameSlice";
import "@/pages/Shop/swiperCustomStyle.css";
import { useEffect, useMemo, useState } from "react";
import { useQueryClient } from "react-query";
import { shopFrameListType, shopTicketListType } from "@/types/shopType";
import christmasFrame from "@/assets/icon/profile-frame-christmas.svg";
import powerOfDarkFrame from "@/assets/icon/profile-frame-power-of-dark.svg";
import pointTwiceItem from "@/assets/image/pass_0.svg";
import passItem from "@/assets/image/pass_1.svg";
import useModal from "@/hooks/useModal";
import { ModalLayer } from "@/components/Common/Modal/Modal";
import ShopBuyModal from "@/components/Shop/ShopModal/ShopBuyModal/ShopBuyModal";
import ShopFrameList from "@/components/Shop/ShopFrameList/ShopFrameList";
import ShopTicketList from "@/components/Shop/ShopTicketList/ShopTicketList";
import MainHeader from "@/components/Common/MainHeader/MainHeader";
import { useGetMyProfile } from "@/hooks/queries/useProfileQuery";
import {
  useGetFrameItems,
  useGetPassItems,
  useGetPointTwiceItems,
  usePostFrameItemEquiptment,
  usePostFrameItemUnEquiptment,
} from "@/hooks/queries/useItemQuery";

const Shop = () => {
  const [loadingState, setLoadingState] = useState(false);
  const [viewportWidth, setViewportWidth] = useState(window.innerWidth);
  const [frameDataState, setframeDataState] = useState<shopFrameListType[]>();
  const [ticketDataState, setTicketDataState] =
    useState<shopTicketListType[]>();
  const [modal, setModal] = useState<React.ReactNode>();
  const { openModal, closeModal, isModalOpened } = useModal();

  const { data: profilePoint } = useGetMyProfile();
  const { data: frameItemData, isLoading: frameItemLoading } =
    useGetFrameItems();
  const { data: passItemData, isLoading: passItemLoading } = useGetPassItems();
  const { data: pointTwiceItemData, isLoading: pointTwiceItemLoading } =
    useGetPointTwiceItems();

  const onSuccessPostFrameItemUnEquipment = () => {
    if (setLoadingState) {
      setLoadingState(false);
    }
  };
  const {
    mutate: postFrameItemUnEquipment,
    mutateAsync: postFrameItemUnEquipmentAsync,
  } = usePostFrameItemUnEquiptment({
    onSuccess: onSuccessPostFrameItemUnEquipment,
  });
  const onSuccessPostFrameItemEquiptment = () => {
    setLoadingState(false);
  };
  const { mutate: postFrameItemEquiptment } = usePostFrameItemEquiptment({
    onSuccess: onSuccessPostFrameItemEquiptment,
  });

  const queryClient = useQueryClient();

  const combinedData = useMemo(() => {
    if (passItemData && pointTwiceItemData) {
      return [...passItemData, ...pointTwiceItemData];
    }
    return [];
  }, [passItemData, pointTwiceItemData]);

  const mountFrameHandle = async (itemId: number | undefined) => {
    if (!itemId) return null;
    setLoadingState(true);
    await postFrameItemUnEquipmentAsync();
    postFrameItemEquiptment(itemId);
  };
  const unMountFrameHandle = async () => {
    setLoadingState(true);
    postFrameItemUnEquipment();
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
    const updatedFrameData = frameItemData?.map((item) => ({
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
  }, [frameItemData, combinedData]);

  if (!frameItemData || !combinedData) {
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
            <MyPoint
              point={profilePoint?.point}
              pointLoading={pointTwiceItemLoading}
            />
          </div>
          {isMobile ? (
            <div className="w-full max-w-[44.5rem] _sm:max-w-[35rem] mt-[2.1rem] mb-[4rem]">
              <MobShopFrameSlice
                frameData={frameItemData}
                frameDataState={frameDataState}
                buyItem={buyItem}
                mountFrameHandle={mountFrameHandle}
                unMountFrameHandle={unMountFrameHandle}
                frameLoading={frameItemLoading}
              />
            </div>
          ) : (
            <div className="w-full max-w-[44.5rem] _sm:max-w-[27.8rem] mt-[2.1rem] mb-[4rem]">
              <ShopFrameList
                frameData={frameItemData}
                frameDataState={frameDataState}
                buyItem={buyItem}
                mountFrameHandle={mountFrameHandle}
                unMountFrameHandle={unMountFrameHandle}
                frameLoading={frameItemLoading}
              />
            </div>
          )}
          <div className="w-full max-w-[44.5rem] _sm:max-w-[38rem] mt-[2.1rem] mb-[4rem]">
            <ShopTicketList
              buyItem={buyItem}
              ticketDataState={ticketDataState}
              passLoading={passItemLoading}
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default Shop;
