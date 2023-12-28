import googleLogo from "@/assets/image/google-logo.png";
import Button from "../Button/Button";

function GoogleButton() {
  const onClick = () => {};
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
        className="font-RobotoMedium"
      />
    </Button>
  );
}

export default GoogleButton;
