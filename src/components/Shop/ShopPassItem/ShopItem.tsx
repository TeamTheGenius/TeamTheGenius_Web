import pointBigIcon from "@/assets/icon/point-big-icon.svg";
import SubHeader from "@/components/Shop/SubHeader/SubHeader";
import { shopPassListData } from "@/types/shopType";
import React from "react";
type shopItemType = {
  itemData: any;
  buyItem: any;
  passDataState?: shopPassListData[];
};
const ShopPassItem = ({ itemData, buyItem, passDataState }: shopItemType) => {
  return (
    <>
      <SubHeader content="아이템" />
      <div className="flex flex-wrap w-full">
        <ul className="w-full grid grid-cols-2 gap-[2.5rem] _sm:gap-[1.6rem]">
          {passDataState?.map((item: shopPassListData) => {
            return (
              <React.Fragment key={item.itemId}>
                <li
                  className="w-full h-[26.8rem] _sm:h-[22.2rem] flex flex-col items-center mb-[1rem] cursor-pointer shadow-[0_4px_4px_0_rgba(0,0,0,0.20)] px-[1.7rem] py-[1rem] _sm:px-[1.4rem] _sm:py-[0.8rem] rounded-[1rem]"
                  onClick={() => {
                    buyItem(item.itemId);
                  }}
                  key={item.itemId}
                >
                  <span className="ml-auto text-[1.4rem] _sm:text-[1.2rem] font-medium text-[#777777] mb-[1.8rem] _sm:mb-[1.5rem]">
                    보유 개수:{item.count}
                  </span>
                  <div className="w-[8.5rem] h-[8.5rem] _sm:w-[7rem] _sm:h-[7rem] rounded-[0.5rem] mb-[1.6rem]">
                    <img
                      src={item.imgSrc}
                      alt={"패스 아이템"}
                      className="w-full"
                    />
                  </div>
                  <span className="font-medium text-[1.5rem] _sm:text-[1.3rem] mb-[4rem] _sm:mb-[2.8rem] block">
                    {item.name}
                  </span>
                  <div className="flex justify-center items-center">
                    <img
                      src={pointBigIcon}
                      alt="point 아이콘"
                      className="w-[2.5rem] h-[2.5rem] _sm:w-[2.1rem] _sm:h-[2.1] mr-[0.5rem]"
                    />
                    <span className="font-bold text-[#000000] text-[1.5rem] _sm:text-[1.3rem]">
                      {item.cost}P
                    </span>
                  </div>
                </li>
              </React.Fragment>
            );
          })}
        </ul>
      </div>
    </>
  );
};

export default ShopPassItem;
