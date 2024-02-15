interface Props {
  title: string;
  content: string;
}
function Information({ title, content }: Props) {
  return (
    <div className="flex flex-col gap-[1.5rem] ">
      <p className="text-[1.8rem] font-semibold">{title}</p>
      <p className="text-[1.3rem] font-normal">{content}</p>
    </div>
  );
}

export default Information;
