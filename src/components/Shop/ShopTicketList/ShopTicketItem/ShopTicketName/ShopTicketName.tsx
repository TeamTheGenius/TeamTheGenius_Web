import { shopTicketListType } from "@/types/shopType";

function ShopTicketName({ item }: { item: shopTicketListType }) {
  return (
    <span className="font-medium text-[1.5rem] _sm:text-[1.3rem] mb-[4rem] _sm:mb-[2.8rem] block">
      {item.name}
    </span>
  );
}

export default ShopTicketName;
