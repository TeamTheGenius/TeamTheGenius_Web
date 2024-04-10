function TopicTitle({
  imageData,
  title,
}: {
  imageData: string;
  title: string;
}) {
  return (
    <div className="flex">
      <img
        src={imageData}
        alt={title}
        className="mr-8 w-[25rem] h-[17rem] rounded-l-xl"
      />
      <h3 className="mt-5 text-_h3">{title}</h3>
    </div>
  );
}

export default TopicTitle;
