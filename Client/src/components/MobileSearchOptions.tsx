import { Button } from './ui/button';
import { FiltersIcon, MapIcon } from './ui/Icons';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';
import FilterSearchResult from './FilterSearchResult';
import { IPage } from '@/pages/SearchResults';
import CheckpointMap, { LatLng } from './CheckpointMap';
import { DialogDescription, DialogTitle } from '@radix-ui/react-dialog';
import { Sheet, SheetContent, SheetTrigger } from './ui/sheet';

interface MobileSearchOptionsProps {
    data: IPage;
    isFetching?: boolean;
    center: LatLng;
    markers?: LatLng[];
    className?: string;
}

const MobileSearchOptions = ({ data, isFetching, center, markers} : MobileSearchOptionsProps) => {

    return (
        <div className='filtersPopup:hidden flex w-full text-[#0795ed] fill-[#0795ed]'>
            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="ghost" className='flex-grow'>
                        <FiltersIcon />
                        Filters
                    </Button>
                </DrawerTrigger>
                <DrawerContent className='h-[80vh]'>
                    <DialogTitle>Title goes here</DialogTitle>
                    <div className='fixed top-0 left-0 z-50 overflow-auto h-[80vh]'>
                    <FilterSearchResult className='w-screen' data={data} isFetching={isFetching}/>
                    </div>
                </DrawerContent>
            </Drawer>

            <Sheet>
                <SheetTrigger asChild>
                    <Button variant="ghost" className="flex-grow">
                        <MapIcon />
                        Map
                    </Button>
                </SheetTrigger>
                <SheetContent side="bottom" className="h-[85vh] pt-10">
                    <DialogTitle></DialogTitle><DialogDescription></DialogDescription>
                    <div className="h-[80vh]">
                        <CheckpointMap center={center} markers={markers}
                        data={data} showFilter={false} isFull={false}/>
                    </div>
                </SheetContent>
            </Sheet>
        </div>
    );
};

export default MobileSearchOptions;