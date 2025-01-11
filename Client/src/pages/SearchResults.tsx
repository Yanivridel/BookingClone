import BreadcrumbCard from "@/components/Breadcrumb";
import FilterSearchResult from "@/components/FilterSearchResult";
import PropertyCard from "@/components/PropertyCard";
import Search from "@/components/search";
import SortComponent from "@/components/SortComponent";
import useInfiniteProperties from "@/hooks/useInfiniteProperties";
import { ISearchPropertiesReq } from "@/types/propertyTypes";
import { useEffect, useState } from "react";

const searchBody = {
    primary: {
      location: {
        country: "Israel",
        region: "Center District Israel",
        city: "Ness Ziona",
        // addressLine: "24 Rothschild Street"
      },
      date: {
        startDate: "2025-01-10",
        endDate: "2025-01-12",
        // length: 3,
        // fromDay: 0,
        // yearMonths: [
        //   {
        //     year: 2025,
        //     month: 0
        //   },
        //   {
        //     year: 2025,
        //     month: 1
        //   }
        // ],
        // isWeekend: true
      },
      options: {
        adults: 6,
        rooms: 2,
        childrenAges: [
          4
        ]
      }
    },
    secondary: {}
  } as ISearchPropertiesReq;

function SearchResults() {
  const [isGrid, setIsGrid] = useState(false)
  const [filterDisplay, SetFilterDisplay] = useState(true)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteProperties(searchBody);

  console.log(data);
  const [isOver, setIsOver] = useState(false); // To track if there are no more pages to load

  useEffect(() => {
    function checkScreenSize() {
      if(window.innerWidth <= 768) {
        SetFilterDisplay(false)
      } else {
        SetFilterDisplay(true)
      }
    }
  
    window.addEventListener('resize', checkScreenSize);

    return () => {
      window.removeEventListener('resize', checkScreenSize);
    }
  }, [])
  
  // Infinite scroll listener
  const handleScroll = () => {
    const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight;
    if (bottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage(); // Fetch next page when user scrolls near the bottom
    }
  };

  useEffect(() => {
    // Set up scroll listener
    if (hasNextPage) {
      window.addEventListener('scroll', handleScroll);
    } else {
      setIsOver(true); // If no next page, stop infinite scrolling
    }

    // Cleanup scroll listener when no more pages
    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage, isFetchingNextPage]);


  return (
    <div className="max-w-[1100px] mx-auto">
      {/* <Search /> */}
      <BreadcrumbCard />
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
          {isFetchingNextPage && <div>Loading more...</div>}
          {isOver && <div>No more results</div>}
        </div>
      </div>
    </div>
  );
}

export default SearchResults;
