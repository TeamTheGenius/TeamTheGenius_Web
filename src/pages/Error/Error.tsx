import ErrorHeader from "@/components/Error/ErrorHeader/ErrorHeader";
import Button from "@/components/Common/Button";
import MobCard from "@/components/Common/MobCard";
import "@/pages/Error/errorStyle.css";
import { useLocation, useNavigate } from "react-router-dom";
import { PATH } from "@/constants/path";
export type ErrorHeaderType = {
  errNum?: number;
  errorTxt?: string;
  onClick?: () => void;
  buttonText?: string;
  buttonExist?: boolean;
};
const Error = ({
  errNum,
  errorTxt,
  buttonText,
  buttonExist,
}: ErrorHeaderType) => {
  const location = useLocation();
  const navigate = useNavigate();

  const {
    errNum: locationErrNum,
    errorTxt: locationErrorTxt,
  }: ErrorHeaderType = location.state || {};

  const onClickButton = () => {
    navigate(PATH.HOME);
  };
  return (
    <MobCard>
      <div className="w-full h-full flex flex-col justify-center items-center">
        <ErrorHeader
          errNum={errNum || locationErrNum}
          errorTxt={errorTxt || locationErrorTxt}
        />
        {buttonExist === false ? null : (
          <div className="w-full flex justify-center items-center mt-[5rem]">
            <Button
              content={buttonText || "홈으로"}
              width={"w-full max-w-[20rem]"}
              height={"h-[6.1rem]"}
              backgroundColor={"bg-black"}
              textSize={"text-[1.8rem]"}
              textColor={"text-white"}
              fontWeight={"font-medium"}
              handleClick={onClickButton}
            />
          </div>
        )}
      </div>
    </MobCard>
  );
};

export default Error;
