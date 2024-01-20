const SignUpHeader = () => {
  return (
    <div className="flex flex-col mb-44">
      <h1 className="font-bold text-_h1 flex">
        GithubUser 님,
        <br />
        환영합니다!
      </h1>
      <span className="text-_caption ">
        <i className="nomal text-_primary-50 mr-1">*</i>는 필수 입력란입니다.
      </span>
    </div>
  );
};

export default SignUpHeader;
