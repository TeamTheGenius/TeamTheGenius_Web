import naverLogo from "@/assets/image/naver-logo.png";
import Button from "@/pages/LogIn/Button/Button";
import { useNavigate } from "react-router-dom";

function NaverButton() {
  const CLIENT_ID = import.meta.env.REACT_APP_NAVER;
  const REDIRECT_URI = import.meta.env.REACT_APP_NAVER;
  const NAVER_URL = `https://nid.naver.com/oauth2.0/authorize?response_type=code&client_id=${CLIENT_ID}&state=NaverLogin&redirect_uri=${REDIRECT_URI}`;

  const navigate = useNavigate();
  const onClick = () => {
    navigate(NAVER_URL);
  };
  return (
    <Button backgroundColor="bg-[#03C75A]" onClick={onClick}>
      <Button.Logo imageSrc={naverLogo} imageAlt="Naver logo" />
      <Button.Coontent content="네이버 로그인" textColor="text-white" />
    </Button>
  );
}

export default NaverButton;
