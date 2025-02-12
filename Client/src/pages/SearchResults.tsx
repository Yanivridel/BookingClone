import BreadcrumbCard from "@/components/Breadcrumb";
import CheckpointMap, { LatLng } from "@/components/CheckpointMap";
import FilterSearchResult from "@/components/FilterSearchResult";
import MobileSearchOptions from "@/components/MobileSearchOptions";
import PropertyCard from "@/components/PropertyCard";
import Search from "@/components/search";
import SortComponent from "@/components/SortComponent";
import { Badge } from "@/components/ui/badge";
import { Card } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";
import useInfiniteProperties from "@/hooks/useInfiniteProperties";
import { IFilters, IProperty, ISearchPropertiesReq } from "@/types/propertyTypes";
import { parseMonthsFromQueryString } from "@/utils/functions";
import { useEffect, useMemo, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";

export interface IPage {
  filters?: IFilters;
  filteredProperties: IProperty[];
  pageParam?: number;
}


function SearchResults() {
  const [isGrid, setIsGrid] = useState(false);
  const [filterDisplay, SetFilterDisplay] = useState(window.innerWidth > 1024)

  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();
  // console.log(searchParams.get("childrenAges")?.split(", "));
  const type = searchParams.getAll("type")
  const rating = searchParams.getAll("rating").map(Number);
  const popularFacilities = searchParams.getAll("facility");
  const roomType = searchParams.getAll("room");
  const roomFacilities = searchParams.getAll("roomFacility");
  const meals = searchParams.getAll("meal");
  const BedPreference = searchParams.getAll("Bed preference");

  let distance = Math.min(...searchParams.getAll("distance").map(Number)) as number | null;
  if(distance === Infinity) 
    distance = null;

  const searchBody = useMemo(() => ({
    primary: {
      location: {
        country: searchParams.get("country") ?? "Israel",
        region: searchParams.get("region") ?? undefined,
        city: searchParams.get("city") ?? undefined,
        addressLine: searchParams.get("addressLine") ?? undefined
      },
      date: {
        startDate: searchParams.get("startDate") ?? undefined,
        endDate: searchParams.get("endDate") ?? undefined,
        length: searchParams.get("length") ? +searchParams.get("length")! : undefined,
        fromDay: searchParams.get("fromDay") ? +searchParams.get("fromDay")! : undefined,
        yearMonths: searchParams.get("yearMonths") ? parseMonthsFromQueryString(searchParams.get("yearMonths")!) : undefined,
        isWeekend: searchParams.get("isWeekend") ?? undefined
      },
      options: {
        adults: searchParams.get("adults") ? +searchParams.get("adults")! : undefined,
        rooms: searchParams.get("rooms") ? +searchParams.get("rooms")! : undefined,
        childrenAges: searchParams.get("childrenAges")?.split(", "),
        distance: distance 
      }
    },
    secondary: {
      type: type.length > 0 ? type : undefined,
      rating: rating.length > 0 ? rating : undefined,
      popularFacilities: popularFacilities.length > 0 ? popularFacilities : undefined,
      roomType: roomType.length > 0 ? roomType : undefined,
      roomFacilities: roomFacilities.length > 0 ? roomFacilities : undefined,
      meals: meals.length > 0 ? meals : undefined,
      freeCancellation: searchParams.get("free") ? true : undefined,
      onlinePayment: searchParams.get("online") ? true : undefined,
      doubleBeds: BedPreference.includes("Double Bed") ? true: undefined,
      singleBeds: BedPreference.includes("Single Bed") ? true: undefined,
      bedrooms: +(searchParams.get("Bedrooms") ?? 0),
      bathrooms: +(searchParams.get("Bathrooms") ?? 0),
      price: {
        min: searchParams.get("min") ? +searchParams.get("min")! : undefined,
        max: searchParams.get("max") ? +searchParams.get("max")! : undefined,
      }
    }
  } as ISearchPropertiesReq), [searchParams]);

  const {
    data,
    fetchNextPage,
    hasNextPage,
    isFetching,
    isFetchingNextPage
  } = useInfiniteProperties(searchBody, 5);
  
  // console.log("DATA", data);

  useEffect(() => {
    function checkScreenSize() {
      if(window.innerWidth <= 1024) {
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
    const bottom = window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 1100;
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

  const coordinates = useMemo(() => {
    if (!data?.pages) return []; // Ensure pages exist
    const allProperties = data.pages.flatMap(page => page.filteredProperties) as IProperty[];
    
    return allProperties.map(prop => ({
      lng: prop.location.coordinates?.coordinates[0],
      lat: prop.location.coordinates?.coordinates[1],
    } as LatLng));
  }, [data?.pages]);

  const center = useMemo(() => {
    if (coordinates.length > 0) {
      return coordinates[0]; // First coordinate as center
    }
    return { lat: 32.0717, lng: 34.7754 } as LatLng; // Default center if coordinates are empty
  }, [coordinates]);

  const breadcrumbItems = [
    { label: "Home", onClick: () => { navigate("/")}},
    { label: searchParams.get("country"), onClick: () => { 
      const param =  searchParams.get("country") as string;
      deleteLocationSearchParams(4);
      searchParamsSetter("country", param)} },
    { label: searchParams.get("region"), onClick: () => { 
      const param =  searchParams.get("region") as string;
      deleteLocationSearchParams(3);
      searchParamsSetter("region", param)} },
    { label: searchParams.get("city"), onClick: () => { 
      const param =  searchParams.get("city") as string;
      deleteLocationSearchParams(2);
      searchParamsSetter("city", param)} },
    { label: searchParams.get("addressLine"), onClick: () => { 
      const param =  searchParams.get("addressLine") as string;
      deleteLocationSearchParams(1);
      searchParamsSetter("addressLine", param)} },
    { label: "Search results" },
  ];

  const deleteLocationSearchParams = (length: number) => {
    if(length >= 1) searchParams.delete("addressLine")
    if(length >= 2) searchParams.delete("city")
    if(length >= 3) searchParams.delete("region")
    if(length >= 4) searchParams.delete("country")
      setSearchParams(searchParams);
  }
  const searchParamsSetter = (key: string, val: string) => {
    searchParams.set(key,val);
    setSearchParams(searchParams);
  } 

  return (
    <div className="max-w-[1100px] mx-auto">
      
      <Search />
      <BreadcrumbCard items={breadcrumbItems} />
      <div className={filterDisplay ? "hidden" : ""}>
        <MobileSearchOptions data={data?.pages[0] as IPage} isFetching={isFetching}
        center={center} markers={coordinates.length > 0 ? coordinates : undefined}/>
      </div>
      <div className="flex">
        <div className={filterDisplay ? "w-1/4" : "hidden"}>  
          <div className='border h-[150px] max-w-[260px] rounded-lg mb-2'>
            <CheckpointMap center={center} 
            markers={coordinates.length > 0 ? coordinates : undefined} isFetching={isFetching}
            data={data?.pages[0] as IPage} showFilter={true}/>
          </div>
          <FilterSearchResult data={data?.pages[0] as IPage} isFetching={isFetching}/>
          
        </div>
        <div className="flex-1">
          <SortComponent filters={data?.pages[0].filters} isGrid={isGrid} setIsGrid={setIsGrid} />
          <div className={isGrid ? "grid grid1:grid-cols-2 sm:grid-cols-2 grid2:grid-cols-3 gap-2 p-2 justify-items-center " 
            : " flex flex-col gap-2 p-2"}>
            { !data && isFetching && SkeletonCard(10) }
            { data && 
            data.pages.map((page:any) => {
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
        className="max-w-[815px] h-[200px] p-4 my-4 flex gap-3">
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
