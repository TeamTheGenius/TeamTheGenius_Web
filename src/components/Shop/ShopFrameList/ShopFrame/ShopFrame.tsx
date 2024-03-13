import SubHeader from "../../SubHeader/SubHeader";
import React from "react";
import { shopFrameSliceType, shopListType } from "@/types/shopType";
import ShopFrameItem from "../ShopFrameItem/ShopFrameItem";

const ShopFrame = ({
  frameData,
  buyItem,
  mountFrameHandle,
}: shopFrameSliceType) => {
  return (
    <>
      <SubHeader content="프로필 프레임" />
      <div className="flex flex-wrap w-full">
        <ul className="w-full grid grid-cols-4 gap-[1rem]">
          {frameData?.map((item: shopListType) => {
            return (
              <React.Fragment key={item.itemId}>
                <li className="w-full flex flex-col items-center max-w-[9.9rem] mb-[1rem]">
                  <ShopFrameItem
                    item={item}
                    buyItem={buyItem}
                    mountFrameHandle={mountFrameHandle}
                  />
                </li>
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ShopFrame;
