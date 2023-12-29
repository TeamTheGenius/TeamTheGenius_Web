import kakaoLogo from "@/assets/image/kakao-logo.png";
import Button from "../Button/Button";

function KakaoButton() {
  const onClick = () => {};
  return (
    <Button backgroundColor="bg-[#FEE500]" oncClick={onClick}>
      <Button.Logo imageSrc={kakaoLogo} imageAlt="kakao logo" />
      <Button.Coontent content="카카오 로그인" textColor="text-black" />
    </Button>
  );
}

export default KakaoButton;