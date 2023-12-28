import naverLogo from "@/assets/image/naver-logo.png";
import Button from "../Button/Button";
function NaverButton() {
  const onClick = () => {};
  return (
    <Button backgroundColor="bg-[#03C75A]" oncClick={onClick}>
      <Button.Logo imageSrc={naverLogo} imageAlt="kakao logo" />
      <Button.Coontent content="네이버 로그인" textColor="text-white" />
    </Button>
  );
}

export default NaverButton;
