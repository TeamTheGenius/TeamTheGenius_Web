import { ReactNode } from "react";

const LoginMobCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[773px] min-h-[100vh] bg-white flex">
        <div className="w-full px-[15.3rem] py-[11.2rem] _sm:px-[2rem] _sm:py-[11.2rem] _md:px-[2rem] _md:py-[11.2rem]">
          {children}
        </div>
      </div>
    </div>
  );
};

export default LoginMobCard;
