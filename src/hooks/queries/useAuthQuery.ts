import postAuthLogout from "@/apis/postAuthLogout";
import { FRAMEID, IDENTIFIER } from "@/constants/localStorageKey";
import { PATH } from "@/constants/path";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

export const usePostAuthLogout = () => {
  const navigate = useNavigate();

  const { mutate } = useMutation(() => postAuthLogout(), {
    onSuccess: () => {
      localStorage.removeItem(IDENTIFIER);
      localStorage.removeItem(FRAMEID);
      navigate(PATH.LOGIN);
    },
  });
  return { mutate };
};
