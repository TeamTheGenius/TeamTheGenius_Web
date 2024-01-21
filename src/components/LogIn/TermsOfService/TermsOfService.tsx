function TermsOfService() {
  return (
    <p className="text-[1.1rem] leading-_normal text-center text-[#777]">
      <a href="#" className="font-medium underline underline-offset-[0.2rem] ">
        이용약관
      </a>
      {", "}
      <a href="#" className="font-medium underline underline-offset-[0.2rem] ">
        개인정보 취급방침
      </a>{" "}
      <span className="font-light"> 내용을 확인하였고 이에 동의합니다.</span>
    </p>
  );
}

export default TermsOfService;
