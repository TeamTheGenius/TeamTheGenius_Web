import postJWTApi from "@/apis/postJWTApi";
import { FRAMEID, IDENTIFIER } from "@/constants/localStorageKey";
import { PATH } from "@/constants/path";
import { decrypt, encrypt } from "@/hooks/useCrypto";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { search } = location;
  const params = new URLSearchParams(search);
  const gitName = params.get("identifier");
  const identifierGet = localStorage.getItem(IDENTIFIER);
  const identifier = decrypt(identifierGet);

  const auth = async () => {
    if (identifier) {
      localStorage.setItem(IDENTIFIER, encrypt(identifier));
      postJWTApi()
        .then((res) => {
          if (res.frameId) {
            localStorage.setItem(FRAMEID, encrypt(res.frameId));
          }
          navigate(PATH.HOME);
        })
        .catch(() => {
          window.localStorage.removeItem(IDENTIFIER);
          navigate(PATH.ERROR);
        });
    } else if (gitName) {
      localStorage.setItem(IDENTIFIER, encrypt(gitName));
      postJWTApi()
        .then((res) => {
          if (res.frameId) {
            localStorage.setItem(FRAMEID, encrypt(res.frameId));
          }
          navigate(PATH.LOGIN);
        })
        .catch(() => {
          navigate(PATH.HOME);
        });
    }
  };

  useEffect(() => {
    auth();
  }, []);

  return <div></div>;
};

export default Auth;
