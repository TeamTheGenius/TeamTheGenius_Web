import { useRef } from "react";
import checkIcon from "@/assets/icon/red-check-icon.svg";
import copyIcon from "@/assets/icon/copy-icon.svg";

interface Props {
  prTemplate: string;
}

function PRTemplate({ prTemplate }: Props) {
  const inputRef = useRef<HTMLInputElement>(null);
  const handleCopy = () => {
    if (inputRef.current) {
      const inputValue = inputRef.current.value;
      if (!inputValue) return;
      navigator.clipboard
        .writeText(inputValue)
        .then(() => {})
        .catch((err) => {
          throw err;
        });
    }
  };

  return (
    <>
      <div className="flex gap-[1.5rem]">
        <img src={checkIcon} alt="레드 체크 모양 아이콘" />
        <p className="text-[1.4rem] font-medium">PR 템플릿</p>
      </div>
      <div className="flex h-[3.2rem] _sm:h-[2.6rem] ml-[2.5rem] mt-[0.8rem] border border-[#CCC] rounded-[0.6rem] ">
        <input
          ref={inputRef}
          type="text"
          value={prTemplate}
          readOnly
          className="focus:outline-none px-[0.6rem] rounded-l-[0.6rem] text-[1.3rem] font-medium text-[#5C5C5C] w-full"
        />
        <button
          onClick={handleCopy}
          className="hover:bg-[#eaeaea] w-[2.6rem] box-border border-l border-[#CCC]"
        >
          <img src={copyIcon} alt="복사하기 버튼" />
        </button>
      </div>
    </>
  );
}

export default PRTemplate;
