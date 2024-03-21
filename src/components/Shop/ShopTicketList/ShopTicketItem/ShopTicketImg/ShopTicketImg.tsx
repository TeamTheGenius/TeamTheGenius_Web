import { shopTicketListType } from "@/types/shopType";

function ShopTicketImg({ item }: { item: shopTicketListType }) {
  return (
    <div className="w-[8.5rem] h-[8.5rem] _sm:w-[7rem] _sm:h-[7rem] rounded-[0.5rem] mb-[1.6rem]">
      <img src={item.imgSrc} alt={"패스 아이템"} className="w-full" />
    </div>
  );
}

export default ShopTicketImg;
