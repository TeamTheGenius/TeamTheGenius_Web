import SubHeader from "@/components/Shop/SubHeader/SubHeader";
import React, { useEffect, useMemo, useState } from "react";
import ShopTicketItem from "./ShopTicketItem/ShopTicketItem";
import { shopFrameListType, shopTicketListType } from "@/types/shopType";
import {
  useGetPassItems,
  useGetPointTwiceItems,
} from "@/hooks/queries/useItemQuery";
import pointTwiceItem from "@/assets/image/pass_0.svg";
import passItem from "@/assets/image/pass_1.svg";
import useModal from "@/hooks/useModal";
import ShopBuyModal from "../ShopModal/ShopBuyModal/ShopBuyModal";
import { ModalLayer } from "@/components/Common/Modal/Modal";
import { createPortal } from "react-dom";

const ShopTicketList = () => {
  const [modal, setModal] = useState<React.ReactNode>();
  const { openModal, closeModal, isModalOpened } = useModal();

  const { data: passItemData } = useGetPassItems();
  const { data: pointTwiceItemData } = useGetPointTwiceItems();
  const [ticketDataState, setTicketDataState] =
    useState<shopTicketListType[]>();

  const combinedData = useMemo(() => {
    if (passItemData && pointTwiceItemData) {
      return [...passItemData, ...pointTwiceItemData];
    }
    return [];
  }, [passItemData, pointTwiceItemData]);

  const onSuccessGetPassAndPointTwiceItem = () => {
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
  };

  useEffect(() => {
    if (passItemData && pointTwiceItemData) {
      onSuccessGetPassAndPointTwiceItem();
    }
  }, [passItemData, pointTwiceItemData]);

  const buyItem = (item: shopFrameListType | undefined) => {
    setModal(
      <ShopBuyModal closeModal={closeModal} setModal={setModal} item={item} />
    );
    openModal();
  };

  return (
    <>
      {isModalOpened &&
        createPortal(
          <ModalLayer onClick={closeModal}>{modal}</ModalLayer>,
          document.body
        )}
      <SubHeader content="아이템" />
      <div className="flex flex-wrap w-full">
        <>
          <ul className="w-full grid grid-cols-2 gap-[2.5rem] _sm:gap-[1.6rem]">
            {ticketDataState?.map((item: shopTicketListType) => {
              return (
                <React.Fragment key={item.itemId}>
                  <ShopTicketItem item={item} buyItem={buyItem} />
                </React.Fragment>
              );
            })}
          </ul>
        </>
      </div>
    </>
  );
};

export default ShopTicketList;
