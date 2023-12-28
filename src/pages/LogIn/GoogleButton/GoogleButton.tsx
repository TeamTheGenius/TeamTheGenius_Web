import googleLogo from "@/assets/image/google-logo.png";
import Button from "../Button/Button";

function GoogleButton() {
  return (
    <Button backgroundColor="bg-white" className="border border-[#6D6D6D]">
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
