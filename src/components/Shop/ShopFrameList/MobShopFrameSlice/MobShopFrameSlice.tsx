import SubHeader from "@/components/Shop/SubHeader/SubHeader";
import { shopFrameListType } from "@/types/shopType";
import ShopFrameItem from "../ShopFrameItem/ShopFrameItem";
import { useGetFrameItems } from "@/hooks/queries/useItemQuery";

const MobShopFrameSlice = () => {
  const { data: frameItemData } = useGetFrameItems();

  return (
    <>
      <SubHeader content="프로필 프레임" />
      <div className="overflow-x-auto scrollbar-hide">
        <div className="max-w-[10rem] flex gap-[1rem]">
          {frameItemData?.map((item: shopFrameListType) => (
            <ShopFrameItem item={item} key={item.itemId} />
          ))}
        </div>
      </div>
    </>
  );
};

export default MobShopFrameSlice;
