import facebookLogo from "@/assets/image/facebook-logo.png";
import Button from "@/pages/LogIn/Button/Button";

function FacebookButton() {
  const FACEBOOK_REDIRECT_URI =
    "http://localhost:8080/oauth2/authorization/facebook";

  const onClick = () => {
    window.location.href = FACEBOOK_REDIRECT_URI;
  };

  return (
    <Button backgroundColor="bg-[#1877F2]" onClick={onClick}>
      <Button.Logo imageSrc={facebookLogo} imageAlt="facebook logo" />
      <Button.Coontent content="Facebook 로그인" textColor="text-white" />
    </Button>
  );
}

export default FacebookButton;
