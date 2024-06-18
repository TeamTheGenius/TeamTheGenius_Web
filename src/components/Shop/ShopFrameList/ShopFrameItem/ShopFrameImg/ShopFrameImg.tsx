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
        className={`flex justify-center items-center py-[0.5rem] rounded-[0.5rem] mb-[1.1rem] border-[0.1rem] _sm:w-[8rem] _sm:h-[8rem] ${
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
        <img
          src={imgSrc}
          alt={"프레임"}
          className="_md:w-11/12 _md:h-11/12 _sm:w-[7rem] _sm:h-[7rem]"
        />
      </button>
    </>
  );
}

export default ShopFrameImg;
