import googleLogo from "@/assets/image/google-logo.png";
import Button from "@/components/LogIn/Button/Button";

function GoogleButton() {
  const GOOGLE_REDIRECT_URI =
    "http://localhost:8080/oauth2/authorization/google";

  const onClick = () => {
    window.location.href = GOOGLE_REDIRECT_URI;
  };

  return (
    <Button
      backgroundColor="bg-white"
      className="border border-[#6D6D6D]"
      onClick={onClick}
    >
      <Button.Logo imageSrc={googleLogo} imageAlt="google logo" />
      <Button.Coontent
        content="Google 로그인"
        textColor="text-black"
        className="font-RobotoMedium"
      />
    </Button>
  );
}

export default GoogleButton;
