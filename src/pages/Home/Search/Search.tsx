import HomeHeader from "@/components/Home/HomeHeader/HomeHeader";
import FilterButtons from "@/components/Search/FilterButtons/FilterButtons";
import { useState } from "react";
import { Outlet, useOutletContext } from "react-router-dom";

interface Outlet {
  searchQuery: string;
}

function Search() {
  const { searchQuery } = useOutletContext<Outlet>();
  const [searchEnter, setSearchEnter] = useState<boolean>(false);
  return (
    <div className="h-full">
      <div className="max-w-[77.3rem] w-full z-10 bg-white fixed top-0">
        <div className="my-[1.1rem] _sm:my-[1.5rem]">
          <HomeHeader setSearchEnter={setSearchEnter} />
        </div>
        <div className="px-[3.2rem] py-[1rem]">
          <FilterButtons />
        </div>
      </div>
      <div className="px-[2.2rem] h-full">
        <div className="pt-[12.5rem]  h-full">
          <Outlet context={{ searchQuery, searchEnter, setSearchEnter }} />
        </div>
      </div>
    </div>
  );
}

export default Search;
