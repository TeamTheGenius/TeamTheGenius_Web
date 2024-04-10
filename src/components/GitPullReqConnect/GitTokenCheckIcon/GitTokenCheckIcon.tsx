import checkIcon from "@/assets/icon/check-icon.svg";
import failIcon from "@/assets/icon/sign-icon.svg";
type GitTokenCheckIconType = {
  repoOk?: string;
  githubTokenInputOk?: string;
};
const GitTokenCheckIcon = ({
  githubTokenInputOk,
  repoOk,
}: GitTokenCheckIconType) => {
  return (
    <div>
      {githubTokenInputOk && (
        <>
          {githubTokenInputOk === "OK" ? (
            <>
              <img src={checkIcon} alt="Icon" />
            </>
          ) : (
            <>
              <img src={failIcon} alt="Icon" />
            </>
          )}
        </>
      )}
      {repoOk && (
        <>
          {repoOk === "OK" ? (
            <>
              <img src={checkIcon} alt="Icon" />
            </>
          ) : (
            <>
              <img src={failIcon} alt="Icon" />
            </>
          )}
        </>
      )}
    </div>
  );
};

export default GitTokenCheckIcon;
