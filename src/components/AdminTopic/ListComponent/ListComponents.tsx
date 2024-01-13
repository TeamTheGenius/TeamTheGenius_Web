import Button from "@/components/Common/Button";

const ListComponents = () => {
  // 생성된 데이터 가져오기

  return (
    <ul className="flex flex-col gap-10 rounded-xl">
      <li className="flex justify-between w-full relative bg-_neutral-10 ">
        <div className="flex">
          <img
            src="https://picsum.photos/300/300"
            alt="임시 이미지"
            className="mr-8 w-[25rem] h-[17rem] rounded-l-xl"
          />
          <h3 className="mt-5 text-_h3">1 일 1 커밋 챌린지</h3>
        </div>
        <div className="flex w-2/5 justify-between absolute right-10 bottom-8">
          <Button
            width="w-[20rem]"
            backgroundColor="bg-_neutral-70"
            fontWeight=""
            textColor="text-_neutral-10"
            height="h-[3.5rem]"
            textSize="text-_h3"
            handleClick={() => {}}
            content="인스턴스"
          />
          <Button
            width="w-[10rem]"
            backgroundColor="bg-_neutral-70"
            fontWeight=""
            textColor="text-_neutral-10"
            height="h-[3.5rem]"
            textSize="text-_h3"
            handleClick={() => {}}
            content="수정"
          />
          <Button
            width="w-[10rem]"
            backgroundColor="bg-_neutral-70"
            fontWeight=""
            textColor="text-_neutral-10"
            height="h-[3.5rem]"
            textSize="text-_h3"
            handleClick={() => {}}
            content="삭제"
          />
          <Button
            width="w-[10rem]"
            backgroundColor="bg-_neutral-70"
            fontWeight=""
            textColor="text-_neutral-10"
            height="h-[3.5rem]"
            textSize="text-_h3"
            handleClick={() => {}}
            content="종료"
          />
        </div>
      </li>
      <li className="flex justify-between w-full relative bg-_neutral-10 ">
        <div className="flex">
          <img
            src="https://picsum.photos/300/300"
            alt="임시 이미지"
            className="mr-8 w-[25rem] h-[17rem] rounded-l-xl"
          />
          <h3 className="mt-5 text-_h3">1 일 1 커밋 챌린지</h3>
        </div>
        <div className="flex w-2/5 justify-between absolute right-10 bottom-8">
          <Button
            width="w-[20rem]"
            backgroundColor="bg-_neutral-70"
            fontWeight=""
            textColor="text-_neutral-10"
            height="h-[3.5rem]"
            textSize="text-_h3"
            handleClick={() => {}}
            content="인스턴스"
          />
          <Button
            width="w-[10rem]"
            backgroundColor="bg-_neutral-70"
            fontWeight=""
            textColor="text-_neutral-10"
            height="h-[3.5rem]"
            textSize="text-_h3"
            handleClick={() => {}}
            content="수정"
          />
          <Button
            width="w-[10rem]"
            backgroundColor="bg-_neutral-70"
            fontWeight=""
            textColor="text-_neutral-10"
            height="h-[3.5rem]"
            textSize="text-_h3"
            handleClick={() => {}}
            content="삭제"
          />
          <Button
            width="w-[10rem]"
            backgroundColor="bg-_neutral-70"
            fontWeight=""
            textColor="text-_neutral-10"
            height="h-[3.5rem]"
            textSize="text-_h3"
            handleClick={() => {}}
            content="종료"
          />
        </div>
      </li>
      <li className="flex justify-between w-full relative bg-_neutral-10 ">
        <div className="flex">
          <img
            src="https://picsum.photos/300/300"
            alt="임시 이미지"
            className="mr-8 w-[25rem] h-[17rem] rounded-l-xl"
          />
          <h3 className="mt-5 text-_h3">1 일 1 커밋 챌린지</h3>
        </div>
        <div className="flex w-2/5 justify-between absolute right-10 bottom-8">
          <Button
            width="w-[20rem]"
            backgroundColor="bg-_neutral-70"
            fontWeight=""
            textColor="text-_neutral-10"
            height="h-[3.5rem]"
            textSize="text-_h3"
            handleClick={() => {}}
            content="인스턴스"
          />
          <Button
            width="w-[10rem]"
            backgroundColor="bg-_neutral-70"
            fontWeight=""
            textColor="text-_neutral-10"
            height="h-[3.5rem]"
            textSize="text-_h3"
            handleClick={() => {}}
            content="수정"
          />
          <Button
            width="w-[10rem]"
            backgroundColor="bg-_neutral-70"
            fontWeight=""
            textColor="text-_neutral-10"
            height="h-[3.5rem]"
            textSize="text-_h3"
            handleClick={() => {}}
            content="삭제"
          />
          <Button
            width="w-[10rem]"
            backgroundColor="bg-_neutral-70"
            fontWeight=""
            textColor="text-_neutral-10"
            height="h-[3.5rem]"
            textSize="text-_h3"
            handleClick={() => {}}
            content="종료"
          />
        </div>
      </li>
    </ul>
  );
};

export default ListComponents;
