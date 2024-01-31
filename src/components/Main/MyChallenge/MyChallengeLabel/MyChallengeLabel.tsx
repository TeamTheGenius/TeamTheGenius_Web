type MyChallengeLabelType = {
  labelText: string;
  labelState: boolean;
};

const MyChallengeLabel = ({ labelText, labelState }: MyChallengeLabelType) => {
  return (
    <>
      <div className="flex justify-end w-full absolute bottom-0 right-0">
        <div
          className={`flex justify-center items-center w-full max-w-[24.8rem] h-[3.8rem] _sm:w-[16.4rem] _ld:w-[22.4rem] _md:w-[20.4rem] ${
            labelState ? "bg-[#282828]" : "bg-[#dddddd]"
          }  rounded-[10px]`}
        >
          <span
            className={`${
              labelState ? "text-white" : "text-[#b5b5b5]"
            } text-[13px] font-medium`}
          >
            {labelText}
          </span>
        </div>
      </div>
    </>
  );
};

export default MyChallengeLabel;
