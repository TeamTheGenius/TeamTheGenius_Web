import { shopFrameListType, shopTicketListType } from "@/types/shopType";
import ShopTicketCount from "./ShopTicketCount/ShopTicketCount";
import ShopTicketImg from "./ShopTicketImg/ShopTicketImg";
import ShopTicketName from "./ShopTicketName/ShopTicketName";
import ShopTicketCost from "./ShopTicketCost/ShopTicketCost";
import ShopBuyModal from "../../ShopModal/ShopBuyModal/ShopBuyModal";
import { useModalStore } from "@/stores/modalStore";

type ShopTicketItemType = {
  item: shopTicketListType;
};

function ShopTicketItem({ item }: ShopTicketItemType) {
  const { setModal } = useModalStore();
  const buyItem = (item: shopFrameListType | undefined) => {
    setModal(<ShopBuyModal item={item} />);
  };
  return (
    <>
      <li
        className="w-full h-[26.8rem] _sm:h-[22.2rem] flex flex-col items-center mb-[1rem] cursor-pointer shadow-[0_4px_4px_0_rgba(0,0,0,0.20)] px-[1.7rem] py-[1rem] _sm:px-[1.4rem] _sm:py-[0.8rem] rounded-[1rem]"
        onClick={() => {
          buyItem(item);
        }}
        key={item.itemId}
      >
        <ShopTicketCount item={item} />
        <ShopTicketImg item={item} />
        <ShopTicketName item={item} />
        <ShopTicketCost item={item} />
      </li>
    </>
  );
}

export default ShopTicketItem;
