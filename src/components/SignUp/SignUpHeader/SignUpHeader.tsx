import { useLocation } from "react-router-dom";

const SignUpHeader = () => {
  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const gitName = searchParams.get("identifier");
  return (
    <div className="flex flex-col mb-44">
      <h1 className="font-bold text-_h1 flex">
        {gitName}님,
        <br />
        환영합니다!
      </h1>
    </div>
  );
};

export default SignUpHeader;
