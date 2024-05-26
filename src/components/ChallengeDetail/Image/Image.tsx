import basicChallengeImage from "@/assets/image/basicChallengeImage.jpg";

interface Props {
  imgSrc: string;
  alt: string;
}

function Image({ imgSrc, alt }: Props) {
  const onErrorImageLoad = (
    event: React.SyntheticEvent<HTMLImageElement, Event>
  ) => {
    event.currentTarget.src = basicChallengeImage;
  };
  return (
    <div className="w-full h-full relative pb-[55%]">
      <img
        src={imgSrc}
        alt={alt}
        onError={onErrorImageLoad}
        className="absolute top-0 left-0 w-full h-full object-cover"
      />
    </div>
  );
}

export default Image;
