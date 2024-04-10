import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type InterestBtnProps = {
  bgColor: string;
  textColor: string;
  checkText: string;
  icon: IconProp;
};
const InterestBtn = ({
  bgColor,
  textColor,
  checkText,
  icon,
}: InterestBtnProps) => {
  return (
    <div
      className={`${bgColor} h-[36px] px-[1.5rem] mt-6 rounded-full text-[1.2rem] font-medium flex items-center hover:shadow-md`}
    >
      <FontAwesomeIcon icon={icon} className={`${textColor} mr-4`} />
      <span className={`${textColor} whitespace-nowrap`}>{checkText}</span>
    </div>
  );
};

export default InterestBtn;
