import { shopFrameType } from "@/types/shopType";
import pointBigIcon from "@/assets/icon/point-big-icon.svg";
function ShopFrameItem({ item, buyItem, mountFrameHandle }: shopFrameType) {
  return (
    <div>
      <button
        className="w-full h-[9.9rem] rounded-[0.5rem] mb-[1.1rem] bg-[#666666]"
        onClick={() => {
          buyItem(item?.itemId);
        }}
      >
        <img
          // src={item?.imgSrc}
          // alt={item?.imgSrc}
          className="w-full h-full"
        />
      </button>
      <span className="text-[1.3rem] font-medium mb-[0.6rem]">
        {item?.name}
      </span>
      {item?.equipStatus === "장착중" && (
        <button className="bg-white border-2 border-[#ff4356] rounded-[1rem] cursor-default">
          <span className="mx-[0.8rem] my-[0.4rem] font-bold text-[#ff4356] text-[1.2rem]">
            장착중
          </span>
        </button>
      )}
      {item?.equipStatus === "장착" && (
        <button
          className="bg-[#ff4356] border-2 border-[#ff4356] rounded-[1rem]"
          onClick={mountFrameHandle}
        >
          <span className="mx-[0.8rem] my-[0.4rem] font-bold text-white text-[1.2rem]">
            장착
          </span>
        </button>
      )}
      {item?.equipStatus === "미구매" && (
        <div className="flex justify-center items-center">
          <img
            src={pointBigIcon}
            alt="point 아이콘"
            className="w-[2.1rem] h-[2.1rem] mr-[0.5rem]"
          />
          <span className="font-bold text-[#000000] text-[1.3rem]">
            {item?.cost}P
          </span>
        </div>
      )}
    </div>
  );
}

export default ShopFrameItem;
