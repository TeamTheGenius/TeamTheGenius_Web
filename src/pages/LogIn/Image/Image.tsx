import heroImage from "@/assets/image/Hero.jpg";
function Image() {
  return (
    <div className="w-full relative pb-[96.04%]">
      <img
        src={heroImage}
        alt="login page comment"
        className="w-full absolute top-0 left-0"
      />
    </div>
  );
}

export default Image;
