import SubHeader from "@/components/Shop/SubHeader/SubHeader";
import React from "react";
import ShopTicketItem from "./ShopTicketItem/ShopTicketItem";
import { shopTicketListType } from "@/types/shopType";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";
type shopItemType = {
  buyItem: any;
  ticketDataState?: shopTicketListType[];
  passLoading: boolean;
};
const ShopTicketList = ({
  buyItem,
  ticketDataState,
  passLoading,
}: shopItemType) => {
  return (
    <>
      <SubHeader content="아이템" />
      <div className="flex flex-wrap w-full">
        {passLoading ? (
          <LoadingBox />
        ) : (
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
        )}
      </div>
    </>
  );
};

export default ShopTicketList;
