import githubLogo from "@/assets/icon/github-mark.svg";
import Button from "@/components/LogIn/Button/Button";

function GithubLoginButton() {
  const GITHUB_REDIRECT_URI =
    "https://api.gitget.co.kr/oauth2/authorization/github";

  const onClick = () => {
    window.location.href = GITHUB_REDIRECT_URI;
  };

  return (
    <Button backgroundColor="bg-[#7446D4]" onClick={onClick}>
      <Button.Logo imageSrc={githubLogo} imageAlt="github logo" />
      <Button.Coontent content="Github 로그인" textColor="text-white" />
    </Button>
  );
}

export default GithubLoginButton;
