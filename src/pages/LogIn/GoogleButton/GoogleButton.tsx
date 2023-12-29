import googleLogo from "@/assets/image/google-logo.png";
import Button from "../Button/Button";

function GoogleButton() {
  const REST_API_KEY = import.meta.env.VITE_APP_GOOGLE_REST_API_KEY;
  const REDIRECT_URI = import.meta.env.VITE_APP_GOOGLE_REDIRECT_URI;

  const GOOGLE_AUTH_URI = `https://accounts.google.com/o/oauth2/v2/auth?response_type=code&client_id=${REST_API_KEY}&scope=openid%20profile%20email&redirect_uri=${REDIRECT_URI}`;

  const onClick = () => {
    window.location.href = GOOGLE_AUTH_URI;
  };

  return (
    <Button
      backgroundColor="bg-white"
      className="border border-[#6D6D6D]"
      oncClick={onClick}
    >
      <Button.Logo imageSrc={googleLogo} imageAlt="google logo" />
      <Button.Coontent
        content="Google 로그인"
        textColor="text-black"
        className="font-RobotoMdium"
      />
    </Button>
  );
}

export default GoogleButton;
