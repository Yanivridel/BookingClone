import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { Information, SmallUpDown, UpDown, XIcon } from "./ui/Icons"
import { Switch } from "./ui/switch"
import { Dispatch, SetStateAction, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Badge } from "./ui/badge";
import { useSearchParams } from "react-router-dom";
import { Skeleton } from "./ui/skeleton";




interface SortComponentProps {
    isGrid: boolean;
    setIsGrid: Dispatch<SetStateAction<boolean>>
    filters: any;
}

function SortComponent({isGrid, setIsGrid, filters} : SortComponentProps ) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isVisible, setIsVisible] = useState<boolean>(true);
    const min = searchParams.get("min") || null;
    const max = searchParams.get("max") || null;

    function HandleClick() {
        setIsVisible(false);
    }

    function handleRemoveSearchParams() {
        searchParams.delete("min");
        searchParams.delete("max");
        setSearchParams(searchParams);
    }

    return (
        <div className=" p-2 flex flex-col gap-4">

            <div className="border p-4 flex justify-center">
                <div className=" flex-grow rounded-xl grid gap-3 p-3">
                    <span className="font-bold text-lg flex items-center gap-2">
                        { searchParams.get("city") ? searchParams.get("country") + ", " + searchParams.get("city") + ": " : 
                        searchParams.get("country") ? searchParams.get("country") + ": " : "unknown"}
                        {filters ? filters.overall_count : <Skeleton className="h-5 w-8 inline-block"/>} properties found</span>
                    <div className="flex flex-wrap">
                        <Popover>
                            <PopoverTrigger>
                                <Badge variant="outline" className="flex ms-2 gap-2 rounded-full border-black p-2">
                                    <UpDown className="w-4"></UpDown> Sort by: Our top picks 
                                    <SmallUpDown className="w-4"></SmallUpDown></Badge>
                            </PopoverTrigger>
                            <PopoverContent className="rounded-lg grid gap-2">
                                <div className="p-2 hover:bg-gray-200 cursor-pointer text-xs">our top picks</div>
                                <div className="p-2 hover:bg-gray-200 cursor-pointer text-xs">Homes & apartments first</div>
                                <div className="p-2 hover:bg-gray-200 cursor-pointer text-xs">Price (lowest first)</div>
                                <div className="p-2 hover:bg-gray-200 cursor-pointer text-xs">Price (highest first)</div>
                                <div className="p-2 hover:bg-gray-200 cursor-pointer text-xs">Property rating (high to low)</div>
                                <div className="p-2 hover:bg-gray-200 cursor-pointer text-xs">Property rating (low to high)</div>
                                <div className="p-2 hover:bg-gray-200 cursor-pointer text-xs">Property rating and price</div>
                                <div className="p-2 hover:bg-gray-200 cursor-pointer text-xs">Distance from city centre</div>
                                <div className="p-2 hover:bg-gray-200 cursor-pointer text-xs">Top reviewed</div>
                                <div className="p-2 hover:bg-gray-200 cursor-pointer text-xs">Genius discounts first</div>
                            </PopoverContent>
                        </Popover>
                        { (min || max) ?
                        <Button variant="negativeDefault" className="rounded-3xl m-2"
                        onClick={() => handleRemoveSearchParams()}
                        >
                            {`₪${Number(min) || 0} - ₪${Number(max) || 0} (per night)`}
                            <XIcon/>
                        </Button>
                        :
                        <></>
                        }
                    </div>
                </div>
                {/* Change Grid-List Toggle */}
                <div className=" w-[20%] pr-7 flex items-center justify-end">
                    <label className="relative inline-block w-16 h-8">
                    <input
                        type="checkbox"
                        className="opacity-0 absolute inset-0 peer"
                        checked={isGrid}
                        onChange={() => setIsGrid(!isGrid)}
                    />
                    <div
                        className={`absolute top-0 left-0 w-[85px] h-[40px] flex justify-between items-center
                            text-black rounded-full transition duration-300 bg-[#f5f5f5] border-[1px] border-y-slate-300`}
                    >
                        <div
                        className={`absolute left-2 top-[1] w-[35px] h-[25px] bg-white rounded-full border-[1px] border-black
                            flex justify-center items-center shadow-md transition-all duration-300 p-1 text-sm
                            ${isGrid ? 'translate-x-8' : ''}`}
                        >
                        {isGrid ? 'Grid' : 'List'}
                        </div>
                    </div>
                </label>
                </div>


                
            </div>
            {isVisible &&
                <div className="border rounded-xl p-2 flex items-center">
                    <div className="w-[90%] p-3 flex gap-2"><Information className="text-gray-600 w-6" /><p className="font-bold	">89% of places to stay are unavailable for your dates on our site.</p></div>
                    <div className="w-[10%] p-3"><Button onClick={HandleClick} variant="outline" size="icon">X</Button></div>
                </div>
            }
        </div>
    )
}

export default SortComponent
