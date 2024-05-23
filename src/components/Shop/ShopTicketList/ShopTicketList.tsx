import SubHeader from "@/components/Shop/SubHeader/SubHeader";
import React, { useEffect, useState } from "react";
import ShopTicketItem from "./ShopTicketItem/ShopTicketItem";
import { shopTicketListType } from "@/types/shopType";

import pointTwiceItem from "@/assets/image/pass_0.svg";
import passItem from "@/assets/image/pass_1.svg";
import {
  useGetPassItems,
  useGetPointTwiceItems,
} from "@/hooks/queries/useItemQuery";

const ShopTicketList = () => {
  const { data: pointTwiceItemData } = useGetPointTwiceItems();
  const { data: passItemData } = useGetPassItems();
  const [ticketDataState, setTicketDataState] =
    useState<shopTicketListType[]>();

  const onSuccessGetPassAndPointTwiceItem = () => {
    if (!passItemData || !pointTwiceItemData) return;
    const updatedcombinedData = [...passItemData, ...pointTwiceItemData].map(
      (item) => ({
        ...item,
        imgSrc:
          item.itemId === 3
            ? passItem
            : item.itemId === 4
            ? pointTwiceItem
            : "기본 이미지 경로",
      })
    );
    setTicketDataState(updatedcombinedData);
  };

  useEffect(() => {
    if (passItemData && pointTwiceItemData) {
      onSuccessGetPassAndPointTwiceItem();
    }
  }, [passItemData, pointTwiceItemData]);

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
