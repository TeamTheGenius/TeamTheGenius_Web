import Button from "@/components/LogIn/Button/Button";
import { PATH } from "@/constants/path";
import { useNavigate } from "react-router-dom";

function GuestLoginButton() {
  const navigate = useNavigate();

  const handleGuestLogin = async () => {
    navigate(PATH.GUESTLOGIN);
  };

  return (
    <Button backgroundColor="bg-[#D4A646]" onClick={handleGuestLogin}>
      <Button.Content content="GUEST 로그인" textColor="text-white" />
    </Button>
  );
}

export default GuestLoginButton;
