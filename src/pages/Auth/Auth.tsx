import Loading from "@/components/Common/Loading/Loading";
import { IDENTIFIER } from "@/constants/localStorageKey";
import { PATH } from "@/constants/path";
import { usePostAuth } from "@/hooks/queries/useAuthQuery";
import { encrypt } from "@/hooks/useCrypto";
import { AuthDataType } from "@/types/authType";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Auth = () => {
  const location = useLocation();
  const { search } = location;
  const params = new URLSearchParams(search);
  const gitName = params.get("identifier");
  const identifier = localStorage.getItem(IDENTIFIER);
  const navigate = useNavigate();

  const onSuccessPostAuth = (res: AuthDataType) => {
    if (res.role === "ADMIN") {
      navigate(PATH.ADMIN);
    } else {
      navigate(PATH.HOME);
    }
  };
  const { mutateAsync, isLoading } = usePostAuth();

  const auth = async () => {
    if (identifier) {
      const data = await mutateAsync();
      onSuccessPostAuth(data);
    } else if (gitName) {
      localStorage.setItem(IDENTIFIER, encrypt(gitName));
      const data = await mutateAsync();
      onSuccessPostAuth(data);
    } else {
      navigate(PATH.LOGIN);
    }
  };

  useEffect(() => {
    auth();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
};

export default Auth;
