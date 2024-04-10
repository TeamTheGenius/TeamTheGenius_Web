import Loading from "@/components/Common/Loading/Loading";
import { IDENTIFIER } from "@/constants/localStorageKey";
import { usePostAuth } from "@/hooks/queries/useAuthQuery";
import { encrypt } from "@/hooks/useCrypto";
import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const Auth = () => {
  const location = useLocation();
  const { search } = location;
  const params = new URLSearchParams(search);
  const gitName = params.get("identifier");
  const identifier = localStorage.getItem(IDENTIFIER);
  const { mutate, isLoading } = usePostAuth();

  const auth = async () => {
    if (identifier) {
      mutate();
    } else if (gitName) {
      localStorage.setItem(IDENTIFIER, encrypt(gitName));
      mutate();
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
