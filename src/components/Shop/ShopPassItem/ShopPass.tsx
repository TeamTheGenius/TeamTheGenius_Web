import SubHeader from "@/components/Shop/SubHeader/SubHeader";
import { shopPassListDataType } from "@/types/shopType";
import React from "react";
import ShopPassItem from "./ShopPassItem/ShopPassItem";
type shopItemType = {
  itemData: shopPassListDataType[];
  buyItem: any;
  passDataState?: shopPassListDataType[];
};
const ShopPass = ({ itemData, buyItem, passDataState }: shopItemType) => {
  return (
    <>
      <SubHeader content="아이템" />
      <div className="flex flex-wrap w-full">
        <ul className="w-full grid grid-cols-2 gap-[2.5rem] _sm:gap-[1.6rem]">
          {passDataState?.map((item: shopPassListDataType) => {
            return (
              <React.Fragment key={item.itemId}>
                <ShopPassItem item={item} buyItem={buyItem} />
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ShopPass;
