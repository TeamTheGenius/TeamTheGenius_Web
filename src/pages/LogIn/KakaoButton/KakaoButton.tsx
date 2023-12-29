import kakaoLogo from "@/assets/image/kakao-logo.png";
import Button from "../Button/Button";

function KakaoButton() {
  const REST_API_KEY = import.meta.env.VITE_APP_KAKAO_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_APP_KAKAO_REDIRECT_URI;
  console.log(REST_API_KEY, REDIRECT_URI);

  const KAKAO_AUTH_URI = `https://kauth.kakao.com/oauth/authorize?client_id=${REST_API_KEY}&redirect_uri=${REDIRECT_URI}&response_type=code`;

  const onClick = () => {
    window.location.href = KAKAO_AUTH_URI;
  };

  return (
    <Button backgroundColor="bg-[#FEE500]" onClick={onClick}>
      <Button.Logo imageSrc={kakaoLogo} imageAlt="kakao logo" />
      <Button.Coontent content="카카오 로그인" textColor="text-black" />
    </Button>
  );
}

export default KakaoButton;
