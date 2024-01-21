import "@/pages/signUp/signUpStyle.css";
import SignUpHeader from "@/components/SignUp/SignUpHeader/SignUpHeader";
import MobView from "@/components/Common/MobCard";
import SignUpForm from "@/components/SignUp/SignUpForm/SignUpForm";
const SignUp = () => {
  return (
    <div>
      <MobView>
        <SignUpHeader />
        <SignUpForm />
      </MobView>
    </div>
  );
};

export default SignUp;
