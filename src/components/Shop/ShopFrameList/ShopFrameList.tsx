import { shopFrameListType } from "@/types/shopType";
import ShopFrameItem from "./ShopFrameItem/ShopFrameItem";
import SubHeader from "../SubHeader/SubHeader";
import { useGetFrameItems } from "@/hooks/queries/useItemQuery";

const ShopFrameList = () => {
  const { data: frameItemData } = useGetFrameItems();

  return (
    <>
      <SubHeader content="프로필 프레임" />
      <div className="flex flex-wrap w-full">
        <ul className="w-full grid grid-cols-4 gap-[1rem]">
          {frameItemData?.map((item: shopFrameListType) => (
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
