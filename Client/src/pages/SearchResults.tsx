import BreadcrumbCard from "@/components/Breadcrumb";
import FilterSearchResult from "@/components/FilterSearchResult";
import PropertyCard from "@/components/PropertyCard";
import SortComponent from "@/components/SortComponent";
import { useState } from "react";


function SearchResults() {
  const [isGrid, setIsGrid] = useState(false)
  const [filterDisplay, SetFilterDisplay] = useState(true)


  function checkScreenSize() {
    if(window.innerWidth <= 768) {
      SetFilterDisplay(false)
    } else {
      SetFilterDisplay(true)
    }
  }

  window.addEventListener('resize', checkScreenSize);

  return (
    <div>
      <div>
        <BreadcrumbCard />
      </div>
      <div className="flex">
        <div className={filterDisplay ? "w-1/4" : "hidden"}>  
          <FilterSearchResult />
        </div>
        <div className="flex-1">
          <SortComponent setIsGrid={setIsGrid} />
          <div className={isGrid ? " grid grid-cols-3 gap-2 p-2 " : " flex flex-col gap-2 p-2"}>
            <PropertyCard isGrid={isGrid} />
            <PropertyCard isGrid={isGrid} />
            <PropertyCard isGrid={isGrid} />
            <PropertyCard isGrid={isGrid} />
            <PropertyCard isGrid={isGrid} />
            <PropertyCard isGrid={isGrid} />
            <PropertyCard isGrid={isGrid} />

          </div>
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
