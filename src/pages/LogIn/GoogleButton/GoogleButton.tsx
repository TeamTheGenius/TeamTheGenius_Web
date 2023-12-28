import GoogleLogo from "@/assets/image/google-logo.png";

function Facebook() {
  return (
    <div className="flex justify-center items-center w-[456px] h-[53px] py-0 px-[15px] rounded-xl bg-white border border-[#6D6D6D] ">
      <img
        src={GoogleLogo}
        alt="naver logo"
        className="ml-10 shrink-0 w-[20px]"
      />
      <p className="font-RobotoMdium flex justify-center items-center w-full text-black text-[1.5rem] font-semibold leading-[2.25rem]">
        Google 로그인
      </p>
    </div>
  );
}

export default Facebook;
