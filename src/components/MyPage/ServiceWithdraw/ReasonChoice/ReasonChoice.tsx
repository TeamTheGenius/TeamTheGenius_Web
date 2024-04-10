import { ChangeEvent } from "react";
import UnderLine from "../UnderLine/UnderLine";
import { cls } from "@/utils/mergeTailwind";

type Reason =
  | "앱 사용이 불편해요"
  | "참여할 만한 챌린지가 없어요"
  | "쓰지 않는 서비스예요"
  | "기타";

interface Props {
  reasons: Reason[];
  selectedReason: Reason;
  onChangeRadio: (e: ChangeEvent<HTMLInputElement>) => void;
  otherReason: string;
  onChangeOtherReason: (e: ChangeEvent<HTMLTextAreaElement>) => void;
}

function ReasonChoice({
  reasons,
  selectedReason,
  onChangeRadio,
  otherReason,
  onChangeOtherReason,
}: Props) {
  return (
    <>
      {reasons.map((reason, index) => (
        <div key={`${index}_${reason}`}>
          <input
            type="radio"
            id={reason}
            name="withdraw-reason"
            value={reason}
            checked={selectedReason === reason}
            onChange={onChangeRadio}
            className="hidden"
          />
          <label key={`${index}_${reason}`} htmlFor={reason}>
            <div className="flex items-center gap-[1.3rem] py-[1.3rem] cursor-pointer">
              <div
                className={cls(
                  "relative w-[2.3rem] h-[2.3rem] border-2 rounded-full",
                  selectedReason === reason
                    ? " border-black "
                    : "border-[#777777]"
                )}
              >
                {selectedReason === reason && (
                  <div className="absolute w-[1.3rem] h-[1.3rem] bg-black rounded-full top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
                )}
              </div>
              <div
                className={cls(
                  "text-[1.3rem] font-medium",
                  selectedReason === reason ? "text-black" : "text-[#777]"
                )}
              >
                {reason}
              </div>
            </div>
          </label>
          <UnderLine />
          {selectedReason === "기타" && reason === "기타" && (
            <div className="flex justify-center items-center mt-[1.45rem] px-[2rem]">
              <textarea
                id="otherReason"
                placeholder="더 나은 깃갯이 될 수 있도록 의견을 들려주세요."
                value={otherReason}
                onChange={onChangeOtherReason}
                className="border p-2 mt-2  w-full h-[14rem] _sm:h-[8rem] max-w-[45rem] rounded-[1rem] border-1 border-[#777] px-[2.5rem] py-[1.5rem] text-[1.2rem] font-medium  text-black placeholder:text-[#777] "
              />
            </div>
          )}
        </div>
      ))}
    </>
  );
}

export default ReasonChoice;
