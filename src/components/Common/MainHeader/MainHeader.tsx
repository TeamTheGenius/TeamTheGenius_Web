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
    <div className="py-[3.45rem] max-w-[77.3rem] w-full z-50 bg-white fixed top-0 h-[4.7rem] _sm:h-[3.8rem]">
      <div className="w-full h-full  px-[2.2rem] flex justify-between items-center">
        <div className="flex justify-center items-center h-[4.2rem] ">
          <Link
            to={PATH.HOME}
            className="cursor-pointer font-extralight text-[1.2rem] leading-_normal text-black"
          >
            <img src={logo} className="_sm:shrink-0 h-full mr-auto"></img>
          </Link>
        </div>
        <div className="absolute left-1/2 -translate-x-1/2">
          <span className="text-[1.8rem] font-bold text-black self-center">
            {headerText}
          </span>
        </div>
        <div className="_sm:shrink-0 h-full flex justify-center items-center font-extralight text-[1.2rem] leading-_normal text-black">
          {/* <img src={alram} alt="알람" className="ml-auto w-[3.8rem]" /> */}
          <div className="dummy w-[3.8rem]"></div>
        </div>
      </div>
    </div>
  );
}

export default MainHeader;
