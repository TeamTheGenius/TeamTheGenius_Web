import facebookLogo from "@/assets/image/facebook-logo.png";
import Button from "@/pages/LogIn/Button/Button";
import FacebookLogin from "@greatsumini/react-facebook-login";

function FacebookButton() {
  return (
    <FacebookLogin
      appId="app Id"
      onSuccess={(response) => {
        console.log("Login Success!");
        console.log("id: ", response);
      }}
      onFail={() => {
        alert("비정상적인 결과입니다. 다시 시도해주세요!");
      }}
      onProfileSuccess={(response) => {
        console.log("Get Profile Success!");
        console.log("name: ", response.name);
      }}
      render={({ onClick }) => (
        <button
          onClick={onClick}
          className={` bg-[#1877F2] flex justify-center items-center w-full h-[5.3rem] py-0 px-[1.5rem] rounded-xl`}
        >
          <Button.Logo imageSrc={facebookLogo} imageAlt="facebook logo" />
          <Button.Coontent content="Facebook 로그인" textColor="text-white" />
        </button>
      )}
    />
  );
}

export default FacebookButton;
