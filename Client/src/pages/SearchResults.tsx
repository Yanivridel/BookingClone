import FilterSearchResult from "@/components/FilterSearchResult";
import PropertyCard from "@/components/PropertyCard";
import SortComponent from "@/components/SortComponent";

function SearchResults() {
  return (
    <div className="flex">
      <FilterSearchResult />
      <div>
        <SortComponent />
        <PropertyCard />
        <PropertyCard />
      </div>
    </div>
  );
}

export default SearchResults;
