import ShopBuyModal from "@/components/Shop/ShopModal/ShopBuyModal/ShopBuyModal";
import { useModalStore } from "@/stores/modalStore";
import { shopFrameListType } from "@/types/shopType";

type ShopFrameImgProps = {
  imgSrc?: string;
  item?: shopFrameListType;
  equip?: string;
};

function ShopFrameImg({ imgSrc, item, equip }: ShopFrameImgProps) {
  const { setModal } = useModalStore();
  const buyItem = (item: shopFrameListType | undefined) => {
    setModal(<ShopBuyModal item={item} />);
  };
  return (
    <>
      <button
        className={`flex justify-center w-full h-[9.9rem] rounded-[0.5rem] mb-[1.1rem] border-[0.1rem] ${
          equip === "장착 불가"
            ? "border-[#D9D9D9]"
            : equip === "장착"
            ? "border-[#D9D9D9]"
            : equip === "장착중"
            ? "border-[#FF4356]"
            : ""
        }`}
        onClick={() => {
          buyItem(item);
        }}
      >
        <img src={imgSrc} alt={"프레임"} className="w-11/12 h-11/12" />
      </button>
    </>
  );
}

export default ShopFrameImg;
