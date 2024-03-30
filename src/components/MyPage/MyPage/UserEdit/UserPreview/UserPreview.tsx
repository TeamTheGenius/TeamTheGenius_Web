import Button from "@/components/Common/Button";

type SignUpInputProps = {
  label: string;
  id: string;
  value?: string;
  setShow: React.Dispatch<React.SetStateAction<number>>;
};

const UserPreview: React.FC<SignUpInputProps> = ({
  label,
  id,
  value,
  setShow,
}) => {
  const infoChangeHandle = () => {
    setShow(1);
  };
  return (
    <li className={`flex flex-col mb-[5rem]`}>
      <label htmlFor={id} className={`signUp-lable relative`}>
        {label}
      </label>
      <span className="w-full text-[1.5rem] outline-none py-4">{value}</span>
      <Button
        width="w-[76px]"
        height="h-[38px]"
        content="변경하기"
        fontWeight="font-medium"
        backgroundColor="bg-[#6893FF]"
        textColor="text-white"
        textSize="text-[1.3rem]"
        handleClick={infoChangeHandle}
      />
    </li>
  );
};

export default UserPreview;
