import facebookLogo from "@/assets/image/facebook-logo.png";
import Button from "../Button/Button";

function FacebookButton() {
  const onClick = () => {};
  return (
    <Button backgroundColor="bg-[#1877F2] " oncClick={onClick}>
      <Button.Logo imageSrc={facebookLogo} imageAlt="facebook logo" />
      <Button.Coontent content="Facebook 로그인" textColor="text-white" />
    </Button>
  );
}

export default FacebookButton;
