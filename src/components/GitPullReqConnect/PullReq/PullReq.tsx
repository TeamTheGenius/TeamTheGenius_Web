import Button from "@/components/Common/Button";
import signIcon from "@/assets/icon/sign-icon.svg";
type PullReqType = {
  label: string;
};

function PullReq({ label }: PullReqType) {
  const pullReqCheck = () => {
    console.log("풀리퀘 체크");
  };
  return (
    <div className={`flex flex-col w-full`}>
      <div className="flex items-center mb-[1.5rem] ml-[6.5rem] _md:ml-0 _sm:ml-0">
        <span className={`text-[1.8rem] font-bold relative mr-[1.2rem]`}>
          {label}
        </span>
        <div>
          <img src={signIcon} alt="signIcon" />
        </div>
      </div>
      <div className="flex items-center ml-[8.5rem] _md:ml-[2rem] _sm:ml-[2rem] pt-[0.6rem] ">
        <Button
          width="w-[8.7rem]"
          height="h-[3.1rem]"
          content="연결확인"
          fontWeight="font-medium"
          backgroundColor="bg-[#18C665]"
          textColor="text-white"
          textSize="text-[1.3rem]"
          handleClick={pullReqCheck}
        />
      </div>
    </div>
  );
}

export default PullReq;
