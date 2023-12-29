import landingImage from "@/assets/image/landing-image.png";

function Image() {
  return (
    <div className="relative w-full pb-[119.5%]">
      <img
        src={landingImage}
        alt="landing page image"
        className="w-full h-full absolute top-0 left-0"
      />
    </div>
  );
}

export default Image;
