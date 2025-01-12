import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { Information, SmallUpDown, UpDown } from "./ui/Icons"
import { Switch } from "./ui/switch"
import { Dispatch, SetStateAction, useState } from "react";
import { Label } from "@radix-ui/react-label";
import { Badge } from "./ui/badge";
import { useSearchParams } from "react-router-dom";




interface SortComponentProps {
    setIsGrid : Dispatch<SetStateAction<boolean>>
    filters: any;
}

function SortComponent({setIsGrid, filters} : SortComponentProps ) {
    const [searchParams, setSearchParams] = useSearchParams();
    const [isVisible, setIsVisible] = useState<boolean>(true);

    function HandleClick() {
        setIsVisible(false);
    }



    return (
        <div className=" p-3">

            <div className="border p-4 flex justify-center">
                <div className=" w-[50%] rounded-xl grid gap-3 p-3">
                    <p className="font-bold text-lg">
                        {searchParams.get("city") || "unknown"}: {filters ? filters.overall_count : "..."} properties found</p>
                    <div >
                        <Popover>
                            <PopoverTrigger>
                                <Badge variant="outline" className="flex gap-2 rounded-full border-black p-2">
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
                    </div>
                </div>
                <div className=" w-[50%] p-3 flex items-center justify-end">
                    <div className="border p-2 rounded-full">
                        <Label htmlFor="airplane-mode">List</Label>
                        <Switch onClick={() => setIsGrid(prev => !prev)}/>
                        <Label htmlFor="airplane-mode">Grid</Label>
                    </div>
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
