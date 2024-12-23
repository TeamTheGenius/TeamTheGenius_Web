import { useLocation } from "react-router-dom";
import LoginMobCard from "@/components/Common/LoginMobCard";
import Button from "@/components/Common/Button";
import { interestsOption } from "@/data/InterestData";
import InterestHeader from "@/components/Interest/InterestHeader/InterestHeader";
import basicOrangeProfileImage from "@/assets/image/basic-profile-image-orange.png";
import basicGrayProfileImage from "@/assets/image/basic-profile-image-gray.png";
import basicPinkProfileImage from "@/assets/image/basic-profile-image-pink.png";
import basicBlueProfileImage from "@/assets/image/basic-profile-image-blue.png";
import basicGreenProfileImage from "@/assets/image/basic-profile-image-green.png";
import Loading from "@/components/Common/Loading/Loading";
import { usePostAuth } from "@/hooks/queries/useAuthQuery";
import { usePostProfileImage } from "@/hooks/queries/useFileQuery";
import { usePostSignUp } from "@/hooks/queries/useUserQuery";
import { Checkbox } from "@/components/Common/Form";
import { useForm } from "react-hook-form";

interface InterestTagForm {
  interests: string[];
}

const Interest = () => {
  const location = useLocation();
  const locationState = location.state;
  const { mutateAsync: postSignUpMutateAsync, isLoading: postSignUpLoading } =
    usePostSignUp();

  const { register, watch, handleSubmit } = useForm<InterestTagForm>({
    defaultValues: { interests: [] },
  });
  const watchedInterests = watch("interests");

  const {
    mutate: postSignUpProfileImageMutate,
    isLoading: postSignUpProfileImageLoading,
  } = usePostProfileImage();

  const { mutateAsync } = usePostAuth();

  const getRandomProfileImage = () => {
    const imagePaths = [
      basicOrangeProfileImage,
      basicGrayProfileImage,
      basicPinkProfileImage,
      basicBlueProfileImage,
      basicGreenProfileImage,
    ];

    const randomIndex = Math.floor(Math.random() * imagePaths.length);
    return imagePaths[randomIndex];
  };

  const handleSignUp = async (formData: InterestTagForm) => {
    const data = await postSignUpMutateAsync({
      identifier: locationState.gitNickName,
      nickname: locationState.nickName,
      information: locationState.myInfo,
      interest: formData.interests,
    });
    await mutateAsync();
    postSignUpProfileImageMutate({
      userId: data.data.data.userId,
      file: getRandomProfileImage(),
    });
  };

  if (postSignUpLoading || postSignUpProfileImageLoading) {
    return <Loading />;
  }
  return (
    <form onSubmit={handleSubmit(handleSignUp)}>
      <LoginMobCard>
        <div className="mb-[22rem]">
          <InterestHeader />
        </div>
        <Checkbox
          options={interestsOption}
          registration={register("interests")}
          checkedValues={watchedInterests}
        />
        <div className="flex flex-col justify-between h-40 mt-[22rem]">
          <Button
            content={"가입하기"}
            width={"w-full"}
            height={"h-[6.1rem]"}
            backgroundColor={"bg-_coral-70"}
            textSize={"text-[1.7rem]"}
            textColor={"text-white"}
            fontWeight={"font-medium"}
          />
        </div>
      </LoginMobCard>
    </form>
  );
};
export default Interest;
