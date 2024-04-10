import { ReactNode } from "react";

type MyChallengeWrapType = {
  children: ReactNode;
};

const MyChallengeWrap = ({ children }: MyChallengeWrapType) => {
  return (
    <div className="w-full relative flex justify-center">
      <div className="myChallenge-wrap mt-[1.7rem]">{children}</div>
    </div>
  );
};

export default MyChallengeWrap;
