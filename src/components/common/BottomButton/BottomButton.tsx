const BottomButton = ({
  content,
  onClick,
}: {
  content: string;
  onClick: any;
}) => {
  return (
    <div className="fixed w-full max-w-[77.3rem] bottom-0 left-1/2 -translate-x-1/2 box-shodow z-[99999] bg-white">
      <div className="w-full flex justify-center">
        <button
          className="w-full max-w-[46.7rem] h-[6.1rem] mx-[2rem] mt-[1.2rem] mb-[1.7rem] bg-white text-[1.8rem] text-[#FF4356] font-medium rounded-[1rem] border-2 border-[#FF4356]"
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
