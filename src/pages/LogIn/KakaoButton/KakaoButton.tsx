import KaKaoLpgp from "@/assets/image/kakao-logo.png";

function KakaoButton() {
  return (
    <div className="flex justify-center items-center w-[456px] h-[53px] py-0 px-[15px] rounded-xl bg-[#FEE500]">
      <img
        src={KaKaoLpgp}
        alt="kakao logo"
        className="ml-10 shrink-0 w-[20px]"
      />
      <p className="flex justify-center items-center w-full text-black text-opacity-85 text-[1.5rem] font-semibold leading-[2.25rem]">
        카카오 로그인
      </p>
    </div>
  );
}

export default KakaoButton;
