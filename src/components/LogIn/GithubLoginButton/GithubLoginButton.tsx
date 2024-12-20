import githubLogo from "@/assets/icon/github-mark.svg";
import Button from "@/components/LogIn/Button/Button";

function GithubLoginButton() {
  const GITHUB_REDIRECT_URI = `${
    import.meta.env.VITE_API_URL
  }/oauth2/authorization/github`;

  const onClick = () => {
    window.location.href = GITHUB_REDIRECT_URI;
  };

  return (
    <Button backgroundColor="bg-[#7446D4]" onClick={onClick}>
      <Button.Logo imageSrc={githubLogo} imageAlt="github logo" />
      <Button.Content content="Github 로그인" textColor="text-white" />
    </Button>
  );
}

export default GithubLoginButton;
