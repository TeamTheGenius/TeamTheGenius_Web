import SubHeader from "@/components/Shop/SubHeader/SubHeader";
import React, { useEffect, useMemo, useState } from "react";
import ShopTicketItem from "./ShopTicketItem/ShopTicketItem";
import { shopTicketListType } from "@/types/shopType";
import {
  useGetPassItems,
  useGetPointTwiceItems,
} from "@/hooks/queries/useItemQuery";
import pointTwiceItem from "@/assets/image/pass_0.svg";
import passItem from "@/assets/image/pass_1.svg";

const ShopTicketList = () => {
  const { data: passItemData, isSuccess: getPassItemSuccess } =
    useGetPassItems();
  const { data: pointTwiceItemData, isSuccess: getPoinTwiceItemSuccess } =
    useGetPointTwiceItems();
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
    if (getPassItemSuccess && getPoinTwiceItemSuccess) {
      onSuccessGetPassAndPointTwiceItem();
    }
  }, [getPassItemSuccess, getPoinTwiceItemSuccess]);

  return (
    <>
      <SubHeader content="아이템" />
      <div className="flex flex-wrap w-full">
        <>
          <ul className="w-full grid grid-cols-2 gap-[2.5rem] _sm:gap-[1.6rem]">
            {ticketDataState?.map((item: shopTicketListType) => {
              return (
                <React.Fragment key={item.itemId}>
                  <ShopTicketItem item={item} />
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
