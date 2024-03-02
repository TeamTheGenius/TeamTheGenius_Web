import { ReactNode } from "react";
import { Link } from "react-router-dom";

type MyChallengeLinkWrapType = {
  link: string;
  children: ReactNode;
};

const MyChallengeLinkWrap = ({ link, children }: MyChallengeLinkWrapType) => {
  return (
    <Link to={link} className="w-full h-full flex">
      {children}
    </Link>
  );
};

export default MyChallengeLinkWrap;
