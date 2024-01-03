import { useEffect, useState } from "react";
import SignCompletePropsModal from "../SignCompletePropModal/SignCompletePropsModal";

const SignCompleteModal = () => {
  const [signUpModalIsOpen, setSignUpModalIsOpen] = useState<boolean>(false);

  const openSignupModal = () => {
    if (sessionStorage.getItem("signToken")) {
      setSignUpModalIsOpen(true);
    }
  };

  // 나중에하기 버튼
  const signUpcloseModal = () => {
    sessionStorage.removeItem("signToken");
    setSignUpModalIsOpen(false);
  };

  useEffect(() => {
    openSignupModal();
  }, []);
  return (
    <>
      {signUpModalIsOpen && (
        <SignCompletePropsModal
          signUpModalIsOpen={signUpModalIsOpen}
          signUpcloseModal={signUpcloseModal}
        />
      )}
    </>
  );
};

export default SignCompleteModal;
