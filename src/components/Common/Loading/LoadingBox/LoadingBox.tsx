import "@/components/Common/Loading/loading.css";
import loading from "@/assets/icon/loading.png";

function LoadingBox() {
  return (
    <div className="flex justify-center items-center w-full h-full">
      <img src={loading} alt="loading" className="loading" width={"50px"} />
    </div>
  );
}

export default LoadingBox;
