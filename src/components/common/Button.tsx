interface Props {
  content: string;
  width: string;
  height: string;
  backgroundColor: string;
  textSize: string;
  fontWeight: string;
  textColor: string;
  handleClick: () => void;
}

function Button({
  content,
  width,
  height,
  backgroundColor,
  textSize,
  fontWeight,
  textColor,
  handleClick,
}: Props) {
  return (
    <button
      className={`${width} ${height} ${backgroundColor} ${textColor} ${textSize} ${fontWeight} rounded-xl hover:opacity-65`}
      onClick={handleClick}
    >
      {content}
    </button>
  );
}

export default Button;
