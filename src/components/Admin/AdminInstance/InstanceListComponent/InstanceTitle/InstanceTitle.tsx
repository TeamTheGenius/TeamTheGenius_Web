function InstanceTitle({
  imageData,
  title,
  startDate,
  completedDate,
}: {
  imageData: string;
  title: string;
  startDate: string;
  completedDate: string;
}) {
  return (
    <div className="flex">
      <img
        src={imageData}
        alt={title}
        className="mr-8 w-[25rem] h-[17rem] rounded-l-xl"
      />
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
