import MobCard from "@/components/Common/MobCard";
import "@/components/Common/Loding/loading.css";
import loading from "@/assets/icon/loading.png";
function Loading() {
  return (
    <MobCard>
      <div className="fixed top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
        <img src={loading} alt="" className="loading" />
      </div>
    </MobCard>
  );
}

export default Loading;
