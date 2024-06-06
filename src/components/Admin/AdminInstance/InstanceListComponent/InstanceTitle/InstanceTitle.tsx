function InstanceTitle({
  title,
  startDate,
  completedDate,
}: {
  title: string;
  startDate: string;
  completedDate: string;
}) {
  return (
    <div className="flex">
      <span className="flex flex-col gap-2">
        <h3 className="mt-5 text-_h3">{title}</h3>
        <div className="flex text-_h4">
          <span>{startDate}</span>
          <span className="mx-[0.5rem]">~</span>
          <span>{completedDate}</span>
        </div>
      </span>
    </div>
  );
}

export default InstanceTitle;
