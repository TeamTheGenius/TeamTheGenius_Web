import { shopPassListDataType } from "@/types/shopType";
import ShopPassCount from "./ShopPassCount/ShopPassCount";
import ShopPassImg from "./ShopPassImg/ShopPassImg";
import ShopPassName from "./ShopPassName/ShopPassName";
import ShopPassCost from "./ShopPassCost/ShopPassCost";

type ShopPassItemType = {
  buyItem: (item: shopPassListDataType | undefined) => void;
  item: shopPassListDataType;
};

function ShopPassItem({ buyItem, item }: ShopPassItemType) {
  return (
    <>
      <li
        className="w-full h-[26.8rem] _sm:h-[22.2rem] flex flex-col items-center mb-[1rem] cursor-pointer shadow-[0_4px_4px_0_rgba(0,0,0,0.20)] px-[1.7rem] py-[1rem] _sm:px-[1.4rem] _sm:py-[0.8rem] rounded-[1rem]"
        onClick={() => {
          buyItem(item);
        }}
        key={item.itemId}
      >
        <ShopPassCount item={item} />
        <ShopPassImg item={item} />
        <ShopPassName item={item} />
        <ShopPassCost item={item} />
      </li>
    </>
  );
}

export default ShopPassItem;
