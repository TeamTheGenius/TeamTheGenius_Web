const SignUpHeader = () => {
  return (
    <div className="flex">
      <h1 className="pretendard font-bold text-_h1 flex items-end">
        투두핀에
        <br />
        오신 것을 환영합니다
      </h1>
      <span className="pretendard text-_caption ml-auto">
        <i className="nomal text-_primary-50 mr-1">*</i>는 필수 입력란입니다.
      </span>
    </div>
  );
};

export default SignUpHeader;
