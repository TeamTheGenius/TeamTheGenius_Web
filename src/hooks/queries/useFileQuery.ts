import patchProfileImage from "@/apis/patchProfileImage";
import postProfileImage from "@/apis/postProfileImage";
import { AxiosError } from "axios";
import { useMutation } from "react-query";

interface PostProfileImageMutationType {
  file: string;
  userId: number;
}

interface PostProfileImageType {
  onSuccess: () => void;
  onError: (error: AxiosError<{ message?: string }>) => void | (() => void);
}

export const usePostProfileImage = ({
  onError,
  onSuccess,
}: PostProfileImageType) => {
  const { mutate, isLoading } = useMutation(
    ({ file, userId }: PostProfileImageMutationType) =>
      postProfileImage({ files: file, userId }),
    {
      onError: (error: AxiosError<{ message?: string }>) => {
        onError(error);
      },
      onSuccess: () => onSuccess(),
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
