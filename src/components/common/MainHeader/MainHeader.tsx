import { useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { PATH } from "@/constants/path";
import deskTopLogo from "@/assets/icon/desktop-logo.svg";
import mobileLogo from "@/assets/icon/mobile-logo.svg";
import alram from "@/assets/icon/alarm.svg";
import debounce from "lodash/debounce";
interface Props {
  headerText: string;
}

function MainHeader({ headerText }: Props) {
  const [logo, setLogo] = useState(deskTopLogo);

  useEffect(() => {
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const handleResize = debounce(() => {
    if (window.innerWidth <= 393) setLogo(mobileLogo);
    else setLogo(deskTopLogo);
  }, 300);

  return (
    <div className="pt-[2rem] h-[4.7rem] _sm:h-[3.8rem] w-full flex items-center">
      <Link
        to={PATH.HOME}
        className="w-1/3 h-[4.2rem] flex justify-center items-center font-extralight text-[1.2rem] leading-_normal text-black"
      >
        <img src={logo} className="_sm:shrink-0 h-full mr-auto"></img>
      </Link>
      <div className="w-1/3 text-center">
        <span className="text-[1.8rem] font-bold text-black self-center">
          {headerText}
        </span>
      </div>
      <div className="w-1/3 _sm:shrink-0 h-full flex justify-center items-center font-extralight text-[1.2rem] leading-_normal text-black">
        <img src={alram} alt="알람" className="ml-auto w-[3.8rem]" />
      </div>
    </div>
  );
}

export default MainHeader;
