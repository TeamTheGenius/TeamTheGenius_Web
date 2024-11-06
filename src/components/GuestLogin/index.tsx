import Button from "@/components/LogIn/Button/Button";
import { PATH } from "@/constants/path";
import { useNavigate } from "react-router-dom";

function GuestLoginButton() {
  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    navigate(PATH.GUESTAUTH); // API 호출 성공 시 페이지 이동
  };

  return (
    <Button backgroundColor="bg-[#D4A646]" onClick={handleGuestLogin}>
      <Button.Content content="GUEST 로그인" textColor="text-white" />
    </Button>
  );
}

export default GuestLoginButton;
