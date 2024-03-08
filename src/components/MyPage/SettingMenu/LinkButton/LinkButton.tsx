import { Link } from "react-router-dom";

interface Props {
  path: string;
  content: string;
  onClick?: () => void;
}
function LinkButton({ content, path, onClick }: Props) {
  return (
    <Link to={path} onClick={onClick} className="text-[1.5rem] font-medium">
      {content}
    </Link>
  );
}

export default LinkButton;
