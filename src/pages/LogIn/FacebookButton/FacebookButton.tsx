import GoogleLogo from "@/assets/image/facebook-logo.png";

function FacebookButton() {
  return (
    <div className="flex justify-center items-center w-[456px] h-[53px] py-0 px-[15px] rounded-xl bg-[#1877F2] ">
      <img
        src={GoogleLogo}
        alt="naver logo"
        className="ml-10 shrink-0 w-[20px]"
      />
      <p className="flex justify-center items-center w-full text-white text-[1.5rem] font-medium leading-[2.25rem]">
        Facebook 로그인
      </p>
    </div>
  );
}

export default FacebookButton;
