import LoginMobCard from "@/components/Common/LoginMobCard";
import GuestLoginForm from "@/components/GuestLogin/GuestLoginForm/GuestLoginForm";
import GuestLoginHeader from "@/components/GuestLogin/GuestLoginHeader";

function GuestLogin() {
  return (
    <>
      <LoginMobCard>
        <div className="mb-[20rem]">
          <GuestLoginHeader />
        </div>
        <GuestLoginForm />
      </LoginMobCard>
    </>
  );
}

export default GuestLogin;
