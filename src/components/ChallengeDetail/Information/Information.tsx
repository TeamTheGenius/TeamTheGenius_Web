interface Props {
  title: string;
  content: string;
}
function Information({ title, content }: Props) {
  return (
    <div className="flex flex-col gap-[1.5rem] mt-[1.4rem] px-[2.2rem]">
      <p className="text-[1.8rem] font-semibold leading-_normal">{title}</p>
      <p className="text-[1.4rem] font-normal">{content}</p>
    </div>
  );
}

export default Information;
