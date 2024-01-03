import naverLogo from "@/assets/image/naver-logo.png";
import Button from "@/components/LogIn/Button/Button";

function NaverButton() {
  const NAVER_REDIRECT_URI = "http://localhost:8080/oauth2/authorization/naver";

  const onClick = () => {
    window.location.href = NAVER_REDIRECT_URI;
  };
  return (
    <Button backgroundColor="bg-[#03C75A]" onClick={onClick}>
      <Button.Logo imageSrc={naverLogo} imageAlt="Naver logo" />
      <Button.Coontent content="네이버 로그인" textColor="text-white" />
    </Button>
  );
}

export default NaverButton;
