import ErrorHeader from "@/components/Error/ErrorHeader/ErrorHeader";
import Button from "@/components/Common/Button";
import MobCard from "@/components/Common/MobCard";
import "@/pages/Error/errorStyle.css";
import { useNavigate } from "react-router-dom";

export type ErrorHeaderType = {
  errNum?: number;
  errorTxt?: string;
};

interface Props {
  errNum?: number;
  errorTxt?: string;
  buttonContent?: string;
  onClick?: () => void;
}

const Error = ({ errNum, errorTxt, buttonContent, onClick }: Props) => {
  const navigate = useNavigate();
  const back = () => {
    navigate(-1);
  };
  return (
    <MobCard>
      <div className="w-full h-screen">
        <ErrorHeader errNum={errNum} errorTxt={errorTxt} />
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 box-shodow">
          <div className="mx-[15.3rem] my-[1.9rem]">
            <Button
              content={buttonContent || "뒤로 가기"}
              width={"w-[46.7rem]"}
              height={"h-[6.1rem]"}
              backgroundColor={"bg-black"}
              textSize={"text-[1.8rem]"}
              textColor={"text-white"}
              fontWeight={"font-medium"}
              handleClick={onClick || back}
            />
          </div>
        </div>
      </div>
    </MobCard>
  );
};

export default Error;
