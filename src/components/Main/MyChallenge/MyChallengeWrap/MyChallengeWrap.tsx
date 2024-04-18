import { ReactNode } from "react";

type MyChallengeWrapType = {
  children: ReactNode;
};

const MyChallengeWrap = ({ children }: MyChallengeWrapType) => {
  return (
    <div className="w-full relative flex justify-center">
      <div className="w-full max-w-[48.6rem]">{children}</div>
    </div>
  );
};

export default MyChallengeWrap;
