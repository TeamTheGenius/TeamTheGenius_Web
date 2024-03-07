import { cls } from "@/utils/mergeTailwind";

interface Props {
  labelText: "인증 필요" | "패스 완료" | "인증 갱신" | "보상 수령" | "시작 전";
  onClick?: () => void;
}

const MyChallengeLabel = ({ labelText, onClick }: Props) => {
  const labelCSS: { [key in Props["labelText"]]: string } = {
    "인증 필요": "bg-_coral-70 text-white",
    "패스 완료": "bg-[#A0A0A0] cursor-default text-white",
    "인증 갱신": "bg-[#282828] text-white",
    "보상 수령": "bg-_coral-70 text-white",
    "시작 전": "bg-[#DDD] text-[#B5B5B5] cursor-default",
  };

  return (
    <button
      onClick={onClick}
      className="flex justify-end w-full absolute bottom-0 right-0 max-w-[24.8rem] h-[3.8rem] _sm:w-[16.4rem] _ld:w-[22.4rem] _md:w-[20.4rem]"
    >
      <div
        className={cls(
          "flex justify-center  items-center w-full rounded-[10px]",
          labelCSS[labelText]
        )}
      >
        <span className={cls("text-[13px] font-medium ", labelCSS[labelText])}>
          {labelText}
        </span>
      </div>
    </button>
  );
};

export default MyChallengeLabel;
