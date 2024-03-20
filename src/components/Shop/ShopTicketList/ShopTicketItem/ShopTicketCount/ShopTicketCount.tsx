import { shopFrameListType, shopTicketListType } from "@/types/shopType";

function ShopTicketCount({
  item,
}: {
  item?: shopTicketListType | shopFrameListType;
}) {
  return (
    <span className="ml-auto text-[1.4rem] _sm:text-[1.2rem] font-medium text-[#777777] mb-[1.8rem] _sm:mb-[1.5rem]">
      보유 개수:{item?.count}
    </span>
  );
}

export default ShopTicketCount;
