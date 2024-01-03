const ErrorHeader = () => {
  return (
    <p className="flex flex-col mb-[40rem]">
      <h1 className="font-bold text-_h1 mb-12">일시적 오류가 발생했습니다</h1>
      <span className="text-_h3">서비스 이용에 불편을 드려서 죄송합니다.</span>
      <span className="text-_h3">잠시 후 다시 이용해 주세요.</span>
    </p>
  );
};

export default ErrorHeader;
