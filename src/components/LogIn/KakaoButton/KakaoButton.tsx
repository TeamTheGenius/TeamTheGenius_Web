import kakaoLogo from "@/assets/image/kakao-logo.png";
import Button from "@/components/LogIn/Button/Button";

function KakaoButton() {
  const KAKAO_REDIRECT_URI = "http://localhost:8080/oauth2/authorization/kakao";

  const onClick = () => {
    window.location.href = KAKAO_REDIRECT_URI;
  };

  return (
    <Button backgroundColor="bg-[#FEE500]" onClick={onClick}>
      <Button.Logo imageSrc={kakaoLogo} imageAlt="kakao logo" />
      <Button.Coontent content="카카오 로그인" textColor="text-black" />
    </Button>
  );
}

export default KakaoButton;
