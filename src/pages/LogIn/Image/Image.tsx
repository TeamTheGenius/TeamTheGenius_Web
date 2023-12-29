import heroImageJpg from "@/assets/image/Hero.jpg";
import heroImageWebp from "@/assets/image/hero.webp";
function Image() {
  return (
    <div className="w-full relative pb-[96.04%]">
      <picture>
        <source
          srcSet={heroImageWebp}
          type="image/webp"
          className="w-full h-full absolute top-0 left-0"
        />
        <img
          src={heroImageJpg}
          alt="login page comment"
          className="w-full h-full absolute top-0 left-0"
        />
      </picture>
    </div>
  );
}

export default Image;
