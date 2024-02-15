import { Link } from "react-router-dom";

interface Props {
  path: string;
  content: string;
}
function LinkButton({ content, path }: Props) {
  return (
    <Link to={path} className="text-[1.5rem] font-medium">
      {content}
    </Link>
  );
}

export default LinkButton;
