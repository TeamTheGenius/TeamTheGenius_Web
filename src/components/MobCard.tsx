import { ReactNode } from "react";

const MobCard = ({ children }: { children: ReactNode }) => {
  return (
    <div className="card-pading flex justify-center items-center">
      <div className="mobView-card bg-slate-50 ">{children}</div>
    </div>
  );
};

export default MobCard;
