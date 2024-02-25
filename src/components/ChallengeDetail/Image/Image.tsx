interface Props {
  imgSrc: string;
  alt: string;
}

function Image({ imgSrc, alt }: Props) {
  return (
    <div className="w-full h-full relative pb-[55%]">
      <img
        src={imgSrc}
        alt={alt}
        className="absolute top-0 left-0 w-full h-full object-contain"
      />
    </div>
  );
}

export default Image;
