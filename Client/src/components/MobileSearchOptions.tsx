import React, { useState } from 'react';
import { Button } from './ui/button';
import { FiltersIcon, MapIcon } from './ui/Icons';
import { Drawer, DrawerContent, DrawerTrigger } from './ui/drawer';
import FilterSearchResult from './FilterSearchResult';
import { IPage } from '@/pages/SearchResults';
import CheckpointMap, { LatLng } from './CheckpointMap';
import { DialogTitle } from '@radix-ui/react-dialog';

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

            <Drawer>
                <DrawerTrigger asChild>
                    <Button variant="ghost" className='flex-grow'>
                        <MapIcon />
                        Map
                    </Button>
                </DrawerTrigger>
                <DrawerContent>
                    <DialogTitle>Title goes here</DialogTitle>
                    <div className="h-[80vh]">
                    <CheckpointMap center={center} markers={markers}
                    data={data} showFilter={false} isFull={true}/>
                    </div>
                </DrawerContent>
            </Drawer>
        </div>
    );
};

export default MobileSearchOptions;