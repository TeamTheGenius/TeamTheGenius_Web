import { ReactNode } from "react";

const MobCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="flex justify-center items-center">
      <div className="mobView-card flex justify-center">
        <div className="w-full">{children}</div>
      </div>
    </div>
  );
};

export default MobCard;
