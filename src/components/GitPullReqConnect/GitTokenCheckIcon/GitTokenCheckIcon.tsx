import checkIcon from "@/assets/icon/check-icon.svg";
import failIcon from "@/assets/icon/sign-icon.svg";
type GitTokenCheckIconType = {
  githubTokenOk?: string;
};
const GitTokenCheckIcon = ({ githubTokenOk }: GitTokenCheckIconType) => {
  return (
    <div>
      {githubTokenOk === "OK" ? (
        <>
          <img src={checkIcon} alt="Icon" />
        </>
      ) : (
        <>
          <img src={failIcon} alt="Icon" />
        </>
      )}
    </div>
  );
};

export default GitTokenCheckIcon;
