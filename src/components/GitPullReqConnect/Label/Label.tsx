type LabelType = {
  id: string;
  label: string;
};
const Label = ({ id, label }: LabelType) => {
  return (
    <label
      htmlFor={id}
      className={`text-[1.8rem] font-bold relative mr-[1.2rem]`}
    >
      {label}
    </label>
  );
};

export default Label;
