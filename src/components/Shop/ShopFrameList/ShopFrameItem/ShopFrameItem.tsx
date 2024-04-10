import { shopFrameType } from "@/types/shopType";

import ShopFrameButton from "./ShopFrameButton/ShopFrameButton";
import ShopFrameName from "./ShopFrameName/ShopFrameName";
import ShopFrameImg from "./ShopFrameImg/ShopFrameImg";
function ShopFrameItem({ item }: shopFrameType) {
  return (
    <div>
      <ShopFrameImg item={item} imgSrc={item.imgSrc} equip={item.equipStatus} />
      <ShopFrameName name={item.name} />
      <ShopFrameButton item={item} />
    </div>
  );
}

export default ShopFrameItem;
