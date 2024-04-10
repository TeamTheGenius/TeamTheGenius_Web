interface Props {
  content: string;
}

function Title({ content }: Props) {
  return (
    <div className="w-full max-w-[19.6rem] text-[1.8rem] font-semibold leading-_normal">
      {content}
    </div>
  );
}

export default Title;
