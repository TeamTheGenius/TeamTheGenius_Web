import postJWTApi from "@/apis/postJWTApi";
import { FRAMEID, IDENTIFIER } from "@/constants/localStorageKey";
import { PATH } from "@/constants/path";
import { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Auth = () => {
  const identifier = window.localStorage.getItem(IDENTIFIER);
  const location = useLocation();
  const navigate = useNavigate();
  const { search } = location;
  const params = new URLSearchParams(search);
  const gitName = params.get("identifier");

  const auth = async () => {
    if (identifier) {
      postJWTApi()
        .then((res) => {
          localStorage.setItem(FRAMEID, res.frameId);
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
      localStorage.setItem(IDENTIFIER, gitName);
      postJWTApi()
        .then((res) => {
          localStorage.setItem(FRAMEID, res.frameId);
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
