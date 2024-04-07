import "@/components/Common/Loading/loading.css";
import loading from "@/assets/icon/loading.png";
import MobCard from "../MobCard";

function Loading() {
  return (
    <MobCard>
      <div className="bg-white w-auto h-full z-9999">
        <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 ">
          <img src={loading} alt="loading" className="loading" />
        </div>
      </div>
    </MobCard>
  );
}

export default Loading;
