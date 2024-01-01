import { useNavigate } from "react-router-dom";
import Button from "../../../components/Common/Button";

function Landing() {
  const navigate = useNavigate();

  const handleClick = () => {
    fetch("http://localhost:8080/api/auth/test?text-test text")
      .then((res) => res.json())
      .then((res) => console.log(res));
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
