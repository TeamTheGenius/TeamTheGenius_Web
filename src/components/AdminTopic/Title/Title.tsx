import { Link } from "react-router-dom";

const Title = () => {
  return (
    <div className="flex flex-col items-center gap-7">
      <Link
        to={"/admin"}
        className="w-full h-[42px] bg-green-200 rounded-2xl flex justify-center items-center"
      >
        <span className="text-_h3">토픽</span>
      </Link>
      <h2 className="text-_h2">토픽 관리 페이지</h2>
    </div>
  );
};

export default Title;
