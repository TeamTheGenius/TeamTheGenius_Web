import patchProfileImage from "@/apis/patchProfileImage";
import postProfileImage from "@/apis/postProfileImage";
import { PATH } from "@/constants/path";
import { useMutation } from "react-query";
import { useNavigate } from "react-router-dom";

interface PostProfileImageMutationType {
  file: string;
  userId: number;
}

export const usePostProfileImage = () => {
  const navigate = useNavigate();
  const { mutate, isLoading } = useMutation(
    ({ file, userId }: PostProfileImageMutationType) =>
      postProfileImage({ files: file, userId }),
    {
      onError: () => {
        navigate(PATH.AUTH);
      },
      onSuccess: () => {
        navigate(PATH.AUTH);
      },
    }
  );
  return { mutate, isLoading };
};

interface PatchProfileImageMutationType {
  file: string;
  userId: number;
}

export const usePatchProfileImage = () => {
  const { mutate, isLoading, mutateAsync } = useMutation(
    ({ file, userId }: PatchProfileImageMutationType) =>
      patchProfileImage({ files: file, userId }),
    {
      onError: (error) => {
        throw error;
      },

      onSuccess: () => {},
    }
  );
  return { mutate, isLoading, mutateAsync };
};
