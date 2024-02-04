import postJWTApi from "@/apis/postJWTApi";
import { IDENTIFIER } from "@/constants/localStorageKey";
import { PATH } from "@/constants/path";
import React, { useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";

const Auth = () => {
  const identifier = window.localStorage.getItem(IDENTIFIER);
  const location = useLocation();
  const navigate = useNavigate();

  const { search } = location;

  const params = new URLSearchParams(search);
  const gitName = params.get("identifier");

  useEffect(() => {
    if (identifier) {
      postJWTApi();
    } else {
      navigate(`${PATH.SIGNUP}?identifier=${gitName}`);
    }
  }, []);

  return <div></div>;
};

export default Auth;
