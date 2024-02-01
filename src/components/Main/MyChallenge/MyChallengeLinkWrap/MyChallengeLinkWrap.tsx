import { ReactNode } from "react";
import { Link } from "react-router-dom";

type MyChallengeLinkWrapType = {
  link: string;
  children: ReactNode;
};

const MyChallengeLinkWrap = ({ link, children }: MyChallengeLinkWrapType) => {
  return (
    <>
      <li className="flex justify-between w-full relative mb-[1.3rem]">
        <Link to={link} className="w-full h-full flex">
          {children}
        </Link>
      </li>
    </>
  );
};

export default MyChallengeLinkWrap;
