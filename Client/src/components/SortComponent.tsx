import { Popover, PopoverContent, PopoverTrigger } from "./ui/popover"
import { Button } from "./ui/button"
import { Information, SmallUpDown, UpDown } from "./ui/Icons"
import { Switch } from "./ui/switch"
function SortComponent() {
  return (
    <div className="border p-3">
        
        <div className="border p-4 flex justify-center">
            <div className="border w-[50%] rounded-xl grid gap-3 p-3">
                <p className="font-bold text-lg">Dubai: 1,559 properties found</p>
                <div >
                    <Popover> 
                        <PopoverTrigger>
                            <Button  variant= "outline" className="rounded-full border-black"><UpDown></UpDown> Sort by: Our top picks <SmallUpDown></SmallUpDown></Button>
                        </PopoverTrigger>
                        <PopoverContent>
                            <div className="p-2 hover:bg-gray-200">ss</div>
                            <hr />
                            <div className="p-2 hover:bg-gray-200">ss</div>
                            <hr />
                            <div className="p-2 hover:bg-gray-200">ss</div>
                            <hr />
                            <div className="p-2 hover:bg-gray-200">ss</div>
                            <hr />
                            <div className="p-2 hover:bg-gray-200">ss</div>
                            <hr />
                            <div className="p-2 hover:bg-gray-200">ss</div>
                            <hr />
                        </PopoverContent>
                    </Popover>
                </div>
            </div>
            <div dir="rtl" className="border w-[50%] p-3"><Switch/></div>
        </div>
        <div className="border rounded-xl p-2 flex items-center">
            <div className="w-[90%] p-3 flex gap-2"><Information className="text-gray-600 w-6"/><p className="font-bold	">89% of places to stay are unavailable for your dates on our site.</p></div>
            <div className="w-[10%] p-3"><Button variant="outline" size="icon">X</Button></div>
        </div>
    </div>
  )
}

export default SortComponent
