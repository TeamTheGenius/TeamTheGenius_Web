import { useNavigate } from "react-router-dom";
import Button from "../../../components/common/Button";

function Landing() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/login");
  };
  return (
    <Button
      content={"시작하기"}
      width={"w-full"}
      height={"h-[6.1rem]"}
      backgroundColor={"bg-_primary-50"}
      textSize={"text-_h2"}
      textColor={"text-white"}
      fontWeight={"font-semibold"}
      handleClick={handleClick}
    />
  );
}

export default Landing;
