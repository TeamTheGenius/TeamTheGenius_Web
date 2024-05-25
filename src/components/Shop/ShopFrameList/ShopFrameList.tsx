import { useState, useEffect } from "react";
import { shopFrameListType } from "@/types/shopType";
import ShopFrameItem from "./ShopFrameItem/ShopFrameItem";
import SubHeader from "../SubHeader/SubHeader";
import christmasFrame from "@/assets/icon/profile-frame-christmas.svg";
import powerOfDarkFrame from "@/assets/icon/profile-frame-power-of-dark.svg";
import { useGetFrameItems } from "@/hooks/queries/useItemQuery";

const ShopFrameList = () => {
  const [frameDataState, setframeDataState] = useState<shopFrameListType[]>();

  const { data: frameItemData } = useGetFrameItems();
  const onSuccessGetFrameItem = () => {
    const updatedFrameData = frameItemData?.map((item) => ({
      ...item,
      imgSrc:
        item.itemId === 1
          ? christmasFrame
          : item.itemId === 2
          ? powerOfDarkFrame
          : "기본 이미지 경로",
    }));
    setframeDataState(updatedFrameData);
  };

  useEffect(() => {
    if (frameItemData) {
      onSuccessGetFrameItem();
    }
  }, [frameItemData]);

  return (
    <>
      <SubHeader content="프로필 프레임" />
      <div className="flex flex-wrap w-full">
        <ul className="w-full grid grid-cols-4 gap-[1rem]">
          {frameDataState?.map((item: shopFrameListType) => (
            <li
              key={item.itemId}
              className="w-full flex flex-col items-center max-w-[9.9rem] mb-[1rem]"
            >
              <ShopFrameItem item={item} />
            </li>
          ))}
        </ul>
      </div>
    </>
  );
};

export default ShopFrameList;
