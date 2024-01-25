import { useOutletContext } from "react-router-dom";

interface Props {
  searchQuery: string;
  setSearchQuery: React.Dispatch<React.SetStateAction<string>>;
}

function Search() {
  const { searchQuery } = useOutletContext<Props>();

  return <div>{searchQuery}</div>;
}

export default Search;
