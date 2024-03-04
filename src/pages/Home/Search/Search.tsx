import HomeHeader from "@/components/Home/HomeHeader/HomeHeader";
import FilterButtons from "@/components/Search/FilterButtons/FilterButtons";
import { Outlet, useOutletContext } from "react-router-dom";

interface Outlet {
  searchQuery: string;
}

function Search() {
  const { searchQuery } = useOutletContext<Outlet>();
  return (
    <div>
      <div className="max-w-[77.3rem] w-full z-10 bg-white fixed top-0">
        <div className="my-[1.1rem]">
          <HomeHeader />
        </div>
        <div className="px-[3.2rem] py-[1rem]">
          <FilterButtons />
        </div>
      </div>
      <div className="px-[2.2rem]">
        <div className="pt-[11.7rem] _sm:pt-[10.8rem]">
          <Outlet context={{ searchQuery }} />
        </div>
      </div>
    </div>
  );
}

export default Search;
