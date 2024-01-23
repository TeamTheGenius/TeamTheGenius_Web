import { ReactNode } from "react";

const LoginMobCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[773px] min-h-[100vh] bg-white px-[20px] py-[64px] flex justify-center items-center">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default LoginMobCard;
