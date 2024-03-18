import pointBigIcon from "@/assets/icon/point-big-icon.svg";
function ShopFrameButton({
  equip,
  mountFrameHandle,
  cost,
  itemId,
}: {
  equip?: string;
  mountFrameHandle: (itemId: number | undefined) => void;
  cost?: number;
  itemId: number;
}) {
  return (
    <div className="flex justify-center items-center">
      {equip === "장착 중" && (
        <button className="bg-white border-2 border-[#ff4356] rounded-[1rem] cursor-default">
          <span className="mx-[0.8rem] my-[0.4rem] font-bold text-[#ff4356] text-[1.2rem]">
            장착중
          </span>
        </button>
      )}
      {equip === "장착 가능" && (
        <button
          className="bg-[#ff4356] border-2 border-[#ff4356] rounded-[1rem]"
          onClick={() => {
            mountFrameHandle(itemId);
          }}
        >
          <span className="mx-[0.8rem] my-[0.4rem] font-bold text-white text-[1.2rem]">
            장착
          </span>
        </button>
      )}
      {equip === "장착 불가" && (
        <div className="flex justify-center items-center">
          <img
            src={pointBigIcon}
            alt="point 아이콘"
            className="w-[2.1rem] h-[2.1rem] mr-[0.5rem]"
          />
          <span className="font-bold text-[#000000] text-[1.3rem]">
            {cost}P
          </span>
        </div>
      )}
    </div>
  );
}

export default ShopFrameButton;
