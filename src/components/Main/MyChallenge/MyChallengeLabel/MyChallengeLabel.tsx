import { cls } from "@/utils/mergeTailwind";

interface Props {
  labelText: "인증 필요" | "패스 완료" | "인증 갱신";
}

const MyChallengeLabel = ({ labelText }: Props) => {
  const labelCSS: { [key in Props["labelText"]]: string } = {
    "인증 필요": "bg-_coral-70",
    "패스 완료": "bg-[#A0A0A0] cursor-default",
    "인증 갱신": "bg-[#282828]",
  };

  const onClickCertificationNeededLabel = () => {
    console.log("인증 필요");
  };
  const onClickCertificationPassLabel = () => {};
  const onClickCertificationReplaceLabel = () => {
    console.log("인증 갱신");
  };

  const labelClick: { [key in Props["labelText"]]: () => void } = {
    "인증 필요": onClickCertificationNeededLabel,
    "패스 완료": onClickCertificationPassLabel,
    "인증 갱신": onClickCertificationReplaceLabel,
  };

  return (
    <button
      onClick={labelClick[labelText]}
      className="flex justify-end w-full absolute bottom-0 right-0"
    >
      <div
        className={cls(
          "flex justify-center  items-center w-full max-w-[24.8rem] h-[3.8rem] _sm:w-[16.4rem] _ld:w-[22.4rem] _md:w-[20.4rem] rounded-[10px]",
          labelCSS[labelText]
        )}
      >
        <span
          className={cls(
            "text-[13px] font-medium text-white",
            labelCSS[labelText]
          )}
        >
          {labelText}
        </span>
      </div>
    </button>
  );
};

export default MyChallengeLabel;
