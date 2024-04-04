import postJWTApi from "@/apis/postJWTApi";
import { FRAMEID, IDENTIFIER } from "@/constants/localStorageKey";
import { PATH } from "@/constants/path";
import { encrypt } from "@/hooks/useCrypto";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Auth = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const { search } = location;
  const params = new URLSearchParams(search);
  const gitName = params.get("identifier");
  const identifier = localStorage.getItem(IDENTIFIER);

  const auth = async () => {
    if (identifier) {
      postJWTApi()
        .then((res) => {
          if (res.frameId) {
            localStorage.setItem(FRAMEID, encrypt(res.frameId));
          } else {
            localStorage.setItem(FRAMEID, "");
          }
          if (res.role === "ADMIN") {
            navigate(PATH.ADMIN);
          } else {
            navigate(PATH.HOME);
          }
        })
        .catch(() => {
          window.localStorage.removeItem(IDENTIFIER);
          navigate(PATH.LOGIN);
        });
    } else if (gitName) {
      localStorage.setItem(IDENTIFIER, encrypt(gitName));
      postJWTApi()
        .then((res) => {
          if (res.frameId) {
            localStorage.setItem(FRAMEID, encrypt(res.frameId));
          } else {
            localStorage.setItem(FRAMEID, "");
          }
          if (res.role === "ADMIN") {
            navigate(PATH.ADMIN);
          } else {
            navigate(PATH.HOME);
          }
        })
        .catch(() => {
          navigate(PATH.LOGIN);
        });
    }
  };

  useEffect(() => {
    auth();
  }, []);

  return <div></div>;
};

export default Auth;
