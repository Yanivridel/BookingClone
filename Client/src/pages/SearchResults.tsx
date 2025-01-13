import BreadcrumbCard from "@/components/Breadcrumb";
import { LatLng } from "@/components/CheckpointMap";
import FilterSearchResult from "@/components/FilterSearchResult";
import PropertyCard from "@/components/PropertyCard";
import Search from "@/components/search";
import SortComponent from "@/components/SortComponent";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useInfiniteProperties from "@/hooks/useInfiniteProperties";
import { IProperty, ISearchPropertiesReq } from "@/types/propertyTypes";
import { useEffect, useState } from "react";
import { useSearchParams } from "react-router-dom";




function SearchResults() {
  const [isGrid, setIsGrid] = useState(false)
  const [filterDisplay, SetFilterDisplay] = useState(true)

  const [searchParams, setSearchParams] = useSearchParams();

  // console.log(searchParams.get("childrenAges")?.split(", "));

  const searchBody = {
    primary: {
      location: {
        country: searchParams.get("country") ?? "Israel",
        region: searchParams.get("region") ?? "Center District Israel",
        city: searchParams.get("city") ?? "Tel Aviv",
        addressLine: searchParams.get("addressLine") ?? undefined
      },
      date: {
        startDate: searchParams.get("startDate") ?? undefined,
        endDate: searchParams.get("endDate") ?? undefined,
        length: searchParams.get("length") ? +searchParams.get("length")! : undefined,
        fromDay: searchParams.get("fromDay") ? +searchParams.get("fromDay")! : undefined,
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
        isWeekend: searchParams.get("isWeekend") ?? undefined
      },
      options: {
        adults: searchParams.get("adults") ? +searchParams.get("adults")! : undefined,
        rooms: searchParams.get("rooms") ? +searchParams.get("rooms")! : undefined,
        childrenAges: searchParams.get("childrenAges")?.split(", ")
      }
    },
    secondary: {}
  } as ISearchPropertiesReq;

console.log("SEARCH", searchBody)

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteProperties(searchBody, 5);
  
  console.log(data);

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
    const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 10;
    if (bottom && hasNextPage && !isFetchingNextPage) {
      fetchNextPage();
    }
  };

  useEffect(() => {
    if (hasNextPage) {
      window.addEventListener('scroll', handleScroll);
    }

    return () => {
      window.removeEventListener('scroll', handleScroll);
    };
  }, [hasNextPage, isFetchingNextPage]);

  let properties = data?.pages[0].filteredProperties as IProperty[]
  let coordinates = [] as LatLng[];
  if(properties)
    coordinates = properties.map(prop => {
      return {
          lat: prop.location.coordinates?.coordinates[0],
          lng: prop.location.coordinates?.coordinates[1],
      } as LatLng
      });

  return (
    <div className="max-w-[1100px] mx-auto">
      
      <Search />
      <BreadcrumbCard />
      <div className="flex">
        <div className={filterDisplay ? "w-1/4" : "hidden"}>  
          <FilterSearchResult coordinates={coordinates} filters={data?.pages[0].filters}/>
          
        </div>
        <div className="flex-1">
          <SortComponent filters={data?.pages[0].filters} setIsGrid={setIsGrid} />
          <div className={isGrid ? " grid grid-cols-3 gap-2 p-2 " : " flex flex-col gap-2 p-2"}>
            { !data && isFetching && SkeletonCard(5) }
            { data && 
            data.pages.map(page => {
              return (page.filteredProperties as IProperty[]).map((property,idx) =>
                <PropertyCard key={idx+property._id} propertyData={property} isGrid={isGrid} />
              )
            })
            }
          </div>
          {isFetchingNextPage && SkeletonCard(5) }
          {!hasNextPage && !isFetchingNextPage && 
          <div className="w-fit mx-auto my-5">
            <Badge variant="outline" className="h-[50px] w-[175px] text-base flex justify-center text-[#006ce4] border-[#006ce4]">
              No more results
            </Badge>
          </div>
          }
        </div>
      </div>
    </div>
  );
}

export default SearchResults;

function SkeletonCard(length?: number) {
  length ??= 1;
  return (<>
    {[...Array(length)].map((_,idx) => 
      <Card key={`skeleton-card-${idx}`}
        className="max-w-[815px] h-[200px] p-4 flex gap-3">
      <Skeleton className=" w-[225px] rounded-xl" />
      <div className="space-y-2 w-[40%]">
        <Skeleton className="h-4 w-full mb-5" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-5/6" />
        <Skeleton className="h-4 w-1/2" />
        <Skeleton className="h-4 w-2/3 mt-10" />
        <Skeleton className="h-4 w-[40%]" />
      </div>
      <div className="space-y-2 w-[25%] flex flex-col justify-end items-end">
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-full" />
        <Skeleton className="h-4 w-1/2" />
      </div>
    </Card>
    )}</>
  )
}