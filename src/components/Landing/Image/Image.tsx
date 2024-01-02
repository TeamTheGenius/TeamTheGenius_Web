import landingImageWebp from "@/assets/image/landing-image.webp";
import landingImagePng from "@/assets/image/landing-image.png";

function Image() {
  return (
    <div className="relative w-full pb-[119.5%]">
      <picture>
        <source
          srcSet={landingImageWebp}
          type="image/webp"
          className="w-full h-full absolute top-0 left-0"
        />
        <img
          src={landingImagePng}
          alt="landing page image"
          className="w-full h-full absolute top-0 left-0"
        />
      </picture>
    </div>
  );
}

export default Image;
