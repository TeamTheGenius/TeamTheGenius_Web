import FacebookButton from "../FacebookButton/FacebookButton";
import GoogleButton from "../GoogleButton/GoogleButton";
import KakaoButton from "../KakaoButton/KakaoButton";
import NaverButton from "../NaverButton/NaverButton";

function Buttons() {
  return (
    <div className="flex flex-col gap-[1.3rem] p-[0.8rem] w-full">
      <KakaoButton />
      <NaverButton />
      <FacebookButton />
      <GoogleButton />
    </div>
  );
}

export default Buttons;
