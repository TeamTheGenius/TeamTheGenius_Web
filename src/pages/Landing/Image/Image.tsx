import landingImage from "../../../assets/image/landing-image.png";

function Image() {
  return (
    <div className="relative w-full pb-[110.04%]">
      <img
        src={landingImage}
        alt="landing page image"
        className="w-full absolute top-0 left-0 px-[1.8rem]"
      />
    </div>
  );
}

export default Image;
