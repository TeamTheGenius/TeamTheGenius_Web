import humanIcon from "@/assets/icon/human-icon.svg";
type MyChallengePicType = {
  overlayText?: string;
  overlayState: boolean;
  img: string;
  alt: string;
  people?: number;
  completeState?: boolean;
};

const MyChallengePic = ({
  overlayText,
  overlayState,
  img,
  alt,
  people,
  completeState,
}: MyChallengePicType) => {
  return (
    <>
      <div className="relative mr-[1.8rem] _sm:mr-[1.1rem] w-[16.4rem] h-[12.6rem]">
        {overlayState && (
          <>
            <div className="overlay">
              <div className="absolute w-full h-full opacity-55 bg-black rounded-[10px]"></div>
              <div className="absolute w-full h-full flex justify-center items-center">
                <span
                  className={`text-white ${
                    !completeState ? "text-[1.6rem]" : "text-[2.2rem]"
                  } font-medium`}
                >
                  {overlayText}
                </span>
              </div>
            </div>
            {people !== null && people !== undefined && (
              <div className="absolute flex justify-evenly items-center w-[4.8rem] h-[1.9rem] left-[1rem] top-[0.3rem] bg-black rounded-[0.8rem]">
                <img src={humanIcon} alt="humanIcon" />
                <span className="text-white text-[1rem]">{people}명</span>
              </div>
            )}
          </>
        )}
        <img src={img} alt={alt} className="w-full h-full rounded-[10px]" />
      </div>
    </>
  );
};

export default MyChallengePic;
