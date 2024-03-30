import React from "react";
import { shopFrameSliceType, shopFrameListType } from "@/types/shopType";
import ShopFrameItem from "./ShopFrameItem/ShopFrameItem";
import SubHeader from "../SubHeader/SubHeader";
import LoadingBox from "@/components/Common/Loading/LoadingBox/LoadingBox";

const ShopFrameList = ({
  frameData,
  frameLoading,
  buyItem,
  mountFrameHandle,
  frameDataState,
  unMountFrameHandle,
}: shopFrameSliceType) => {
  return (
    <>
      <SubHeader content="프로필 프레임" />
      <div className="flex flex-wrap w-full">
        {frameLoading ? (
          <LoadingBox />
        ) : (
          <>
            <ul className="w-full grid grid-cols-4 gap-[1rem]">
              {frameDataState?.map((item: shopFrameListType) => {
                return (
                  <React.Fragment key={item.itemId}>
                    <li className="w-full flex flex-col items-center max-w-[9.9rem] mb-[1rem]">
                      <ShopFrameItem
                        item={item}
                        buyItem={buyItem}
                        mountFrameHandle={mountFrameHandle}
                        unMountFrameHandle={unMountFrameHandle}
                      />
                    </li>
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

export default ShopFrameList;
