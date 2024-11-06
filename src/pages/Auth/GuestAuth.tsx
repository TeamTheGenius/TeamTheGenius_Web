import Loading from "@/components/Common/Loading/Loading";
import { PATH } from "@/constants/path";
import { usePostGuestAuth } from "@/hooks/queries/useAuthQuery";
import { AuthDataType } from "@/types/authType";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const GuestAuth = () => {
  const navigate = useNavigate();

  const onSuccessPostAuth = (res: AuthDataType) => {
    if (res.role === "USER") {
      navigate(PATH.HOME);
    }
  };
  const { mutateAsync, isLoading } = usePostGuestAuth();

  const auth = async () => {
    const data = await mutateAsync();
    console.log("guest auth data", data);
    onSuccessPostAuth(data);
  };

  useEffect(() => {
    auth();
  }, []);

  if (isLoading) {
    return <Loading />;
  }
};

export default GuestAuth;
