interface Props {
  content: string;
}
function Title({ content }: Props) {
  return (
    <div className="text-[2rem] _sm:text-[1.8rem] font-semibold">{content}</div>
  );
}

export default Title;
