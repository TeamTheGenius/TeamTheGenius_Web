import "@/pages/SignUp/signUpStyle.css";
import SignUpHeader from "@/components/SignUp/SignUpHeader/SignUpHeader";
import LoginMobCard from "@/components/Common/LoginMobCard";
import SignUpForm from "@/components/SignUp/SignUpForm/SignUpForm";
const SignUp = () => {
  return (
    <LoginMobCard>
      <div className="mb-[20rem]">
        <SignUpHeader />
      </div>
      <SignUpForm />
    </LoginMobCard>
  );
};

export default SignUp;
