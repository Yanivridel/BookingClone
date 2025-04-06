import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "./ui/tooltip";
import { Button } from "./ui/button";

function PropertyTitles() {
  return (
    <div>
      <a className="flex items-center justify-between">
        <p className="py-3 text-lg font-bold">Property surroundings</p>
        <Button>Check available dates</Button>
      </a>
      <div className="flex gap-2">
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <p className="border inline text-blue-900 text-xs bg-blue-100">
                Guests loved walking around the neighbourhood!
              </p>
            </TooltipTrigger>
            <TooltipContent>
              <p>Add to library</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
        <p className="text-sm text-blue-500 hover:underline cursor-pointer">
          Excellent location - show map
        </p>
      </div>
    </div>
  );
}

export default PropertyTitles;
