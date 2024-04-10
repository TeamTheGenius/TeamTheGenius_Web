import { useLocation } from "react-router-dom";

const SignUpHeader = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const gitName = searchParams.get("identifier");
  return (
    <h1 className="font-bold text-[2.8rem]">
      {gitName}님,
      <br />
      환영합니다!
    </h1>
  );
};

export default SignUpHeader;
