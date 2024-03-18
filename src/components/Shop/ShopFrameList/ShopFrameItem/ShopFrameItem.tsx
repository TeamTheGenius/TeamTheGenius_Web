import { shopFrameType } from "@/types/shopType";

import ShopFrameButton from "./ShopFrameButton/ShopFrameButton";
import ShopFrameName from "./ShopFrameName/ShopFrameName";
import ShopFrameImg from "./ShopFrameImg/ShopFrameImg";
function ShopFrameItem({ item, buyItem, mountFrameHandle }: shopFrameType) {
  return (
    <div>
      <ShopFrameImg
        item={item}
        imgSrc={item.imgSrc}
        buyItem={buyItem}
        equip={item.equipStatus}
      />
      <ShopFrameName name={item.name} />
      <ShopFrameButton
        itemId={item.itemId}
        mountFrameHandle={mountFrameHandle}
        equip={item.equipStatus}
        cost={item.cost}
      />
    </div>
  );
}

export default ShopFrameItem;
