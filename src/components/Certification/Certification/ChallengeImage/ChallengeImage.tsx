import basicChallengeImage from "@/assets/image/basicChallengeImage.jpg";

interface Props {
  imgSrc: string;
  alt: string;
}

function ChallengeImage({ imgSrc, alt }: Props) {
  const onErrorImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = basicChallengeImage;
  };

  return (
    <div className="w-full h-full pb-[55%] relative">
      <img
        src={imgSrc}
        alt={alt}
        onError={onErrorImageLoad}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
      <div className="absolute top-0 left-0 w-full h-full opacity-35 bg-black " />
    </div>
  );
}

export default ChallengeImage;
