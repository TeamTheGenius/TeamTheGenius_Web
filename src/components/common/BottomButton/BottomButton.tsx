type bottomButtonType = {
  content: string;
  onClick: any;
  btnColor: string;
  btnMaxWidth: string;
  btnTextColor: string;
  borderColor: string;
  marginX: string;
  marginXmob?: string;
  btnMaxWidthMob?: string;
  btnHeight: string;
};
const BottomButton = ({
  content,
  onClick,
  btnColor,
  btnMaxWidth,
  btnTextColor,
  borderColor,
  marginX,
  marginXmob,
  btnMaxWidthMob,
  btnHeight,
}: bottomButtonType) => {
  return (
    <div className="fixed w-full max-w-[77.3rem] bottom-0 left-1/2 -translate-x-1/2 box-shodow z-[99999] bg-white">
      <div className="w-full flex justify-center">
        <button
          className={`w-full ${btnMaxWidth} ${btnMaxWidthMob} ${btnHeight} ${marginX} ${marginXmob} mt-[1.2rem] mb-[1.7rem] text-[1.8rem] ${btnTextColor} ${btnColor} font-medium rounded-[1rem] border-2 ${borderColor}`}
          onClick={() => {
            {
              onClick;
            }
          }}
        >
          {content}
        </button>
      </div>
    </div>
  );
};

export default BottomButton;
// max-w-[46.7rem]   h-[6.1rem]
// boder color border-[#FF4356]
// btn ccolor text-[#FF4356]
// mx-[2rem]
