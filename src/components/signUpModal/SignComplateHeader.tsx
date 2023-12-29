import complateIcon from "../../assets/image/complate-icon.png";
const SignComplateHeader = () => {
  return (
    <>
      <img src={complateIcon} alt="complate icon" className="w-[4.8rem]" />
      <h1 className="font-pretendard text-_h1 font-bold mb-12">
        {/* 가입한 프로필네임 */}
        <span>유저님,</span> 반갑습니다 <i>:)</i>
      </h1>
    </>
  );
};

export default SignComplateHeader;
