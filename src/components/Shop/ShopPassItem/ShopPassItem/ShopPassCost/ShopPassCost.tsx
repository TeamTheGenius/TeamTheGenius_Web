import pointBigIcon from "@/assets/icon/point-big-icon.svg";
import { shopPassListDataType } from "@/types/shopType";

function ShopPassCost({ item }: { item: shopPassListDataType }) {
  return (
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
  );
}

export default ShopPassCost;
