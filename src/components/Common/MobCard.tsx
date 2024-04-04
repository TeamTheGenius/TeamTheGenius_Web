import { ReactNode } from "react";

const MobCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="w-[773px] min-h-[100vh] bg-white flex justify-center">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default MobCard;
