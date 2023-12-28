import NaverImage from "@/assets/image/naver-logo.png";
function NaverButton() {
  return (
    <div className="flex justify-center items-center w-[456px] h-[53px] py-0 px-[15px] rounded-xl bg-[#03C75A]">
      <img
        src={NaverImage}
        alt="naver logo"
        className="ml-10 shrink-0  w-[20px]"
      />
      <p className="flex justify-center items-center w-full text-white text-[1.5rem] font-semibold leading-[2.25rem]">
        네이버 로그인
      </p>
    </div>
  );
}

export default NaverButton;
