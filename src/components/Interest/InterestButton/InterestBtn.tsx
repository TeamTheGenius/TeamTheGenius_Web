import { IconProp } from "@fortawesome/fontawesome-svg-core";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

type InterestBtnProps = {
  bgColor: string;
  textColor: string;
  checkText: string;
  icon: IconProp;
  className?: string;
};
const InterestBtn = ({
  bgColor,
  textColor,
  checkText,
  icon,
  className,
}: InterestBtnProps) => {
  return (
    <div
      className={`${bgColor} py-2 px-4 mt-6 rounded-full text-_body1 flex items-center ${className}`}
    >
      {/* 아이콘 */}
      <FontAwesomeIcon icon={icon} className={`${textColor} mr-4`} />
      <span className={`${textColor} whitespace-nowrap`}>
        {/* {checkText.length > 6 ? `${checkText.slice(0, 5)}...` : checkText} */}
        {checkText}
      </span>
    </div>
  );
};

export default InterestBtn;
