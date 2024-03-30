import { Link } from "react-router-dom";
import { PATH } from "@/constants/path";

type titleType = {
  title: string;
};

const Title = ({ title }: titleType) => {
  return (
    <>
      <div className="flex flex-col items-center gap-7">
        <Link
          to={PATH.HOME}
          className="w-full h-[42px] bg-blue-200 rounded-2xl flex justify-center items-center"
        >
          <span className="text-_h3">홈 이동</span>
        </Link>
        <Link
          to={PATH.ADMIN}
          className="w-full h-[42px] bg-green-200 rounded-2xl flex justify-center items-center"
        >
          <span className="text-_h3">토픽</span>
        </Link>
        <h2 className="text-_h2">{title}</h2>
      </div>
    </>
  );
};

export default Title;
