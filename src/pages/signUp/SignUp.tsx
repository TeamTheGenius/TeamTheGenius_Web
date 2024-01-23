import "@/pages/signUp/signUpStyle.css";
import SignUpHeader from "@/components/SignUp/SignUpHeader/SignUpHeader";
import LoginMobCard from "@/components/Common/LoginMobCard";
import SignUpForm from "@/components/SignUp/SignUpForm/SignUpForm";
const SignUp = () => {
  return (
    <div>
      <LoginMobCard>
        <SignUpHeader />
        <SignUpForm />
      </LoginMobCard>
    </div>
  );
};

export default SignUp;
