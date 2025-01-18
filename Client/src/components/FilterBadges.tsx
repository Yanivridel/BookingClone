import { Button } from '@/components/ui/button';
import { XIcon } from 'lucide-react';
import { useSearchParams } from 'react-router-dom';
import { cf, cw } from '@/utils/functions';
import {
    Popover,
    PopoverContent,
    PopoverTrigger,
} from "@/components/ui/popover";
import { UpDownHeads } from './ui/Icons';

// Base interface for filter configuration
interface BaseFilterConfig {
    param: string;
    formatFn: (value: string) => string;
}

// Interface for single-value filters
interface SingleValueFilterConfig extends BaseFilterConfig {
    isSingle: true;
    formatFn: () => string;
}

// Interface for multi-value filters
interface MultiValueFilterConfig extends BaseFilterConfig {
    isSingle?: false;
}

// Type for any filter configuration
type FilterConfig = SingleValueFilterConfig | MultiValueFilterConfig;

// Type for grouped filters
type GroupedFiltersConfig = {
    [key: string]: MultiValueFilterConfig;
};

// Type for standalone filters
type StandaloneFiltersConfig = {
    [key: string]: FilterConfig;
};

const FilterBadges = () => {
    const [searchParams, setSearchParams] = useSearchParams();

    // Grouped filters configuration
    const groupedFilters: GroupedFiltersConfig = {
        'Room facilities': {
            param: 'roomFacility',
            formatFn: cw,
        },
        'distance': {
            param: 'distance',
            formatFn: (value: string) => `Less than ${value} km`,
        },
        'Property Type': {
            param: 'type',
            formatFn: cf,
        },
        'Popular Facilities': {
            param: 'facility',
            formatFn: (text: string) => text,
        },
        'Meals': {
            param: 'meal',
            formatFn: cf,
        },
        'Property rating': {
            param: 'rating',
            formatFn: (value: string) => `${value} ${parseInt(value) === 1 ? 'Star' : 'Stars'}`,
        },
        'Room Types': {
            param: 'room',
            formatFn: cf,
        },
        'Bed preference': {
            param: 'Bed preference',
            formatFn: cf,
        }
    };

    // Standalone filters configuration
    const standaloneFilters: StandaloneFiltersConfig = {
        'Bedrooms': {
            param: 'Bedrooms',
            formatFn: (value: string) => `${value} Bedrooms`,
        },
        'Bathrooms': {
            param: 'Bathrooms',
            formatFn: (value: string) => `${value} Bathrooms`,
        },
        'free': {
            param: 'free',
            formatFn: () => 'Free cancellation',
            isSingle: true,
        },
        'online': {
            param: 'online',
            formatFn: () => 'Online payment accepted',
            isSingle: true,
        }
    };

    const min = searchParams.get("min") || null;
    const max = searchParams.get("max") || null;

    const handleRemoveFilter = (param: string, value?: string) => {
        const updatedParams = new URLSearchParams(searchParams);
        console.log(param);
        if (value) {
            const values = updatedParams.getAll(param);
            updatedParams.delete(param);
            values.filter(v => v !== value).forEach(v => updatedParams.append(param, v));
        } else if(param === "price") {
            updatedParams.delete("min");
            updatedParams.delete("max");
        } else {
            updatedParams.delete(param);
        }
        setSearchParams(updatedParams);
    };

    interface ActiveFilterConfig {
        values: string[];
        formatFn: (text: string) => string;
        param: string;
    }

    const getActiveGroupedFilters = () => {
        return Object.entries(groupedFilters).reduce<Record<string, ActiveFilterConfig>>((acc, [category, config]) => {
        const values = searchParams.getAll(config.param);
        if (values.length > 0) {
            acc[category] = {
            values,
            formatFn: config.formatFn,
            param: config.param
            };
        }
        return acc;
        }, {});
    };

    const getActiveStandaloneFilters = () => {
        return Object.entries(standaloneFilters).filter(([_, config]) => {
        if ('isSingle' in config && config.isSingle) {
            return searchParams.has(config.param);
        }
        return searchParams.getAll(config.param).length > 0;
        });
    };

    const activeGroupedFilters = getActiveGroupedFilters();
    const activeStandaloneFilters = getActiveStandaloneFilters();

    return (
        <div className="flex flex-wrap gap">
        { (min || max) ?
        <Button variant="negativeDefault" className="rounded-3xl m-2"
        onClick={() => { handleRemoveFilter("price");}}
        >
            {`₪${Number(min) || 0} - ₪${Number(max) || 0} (per night)`}
            <XIcon/>
        </Button>
        :
        <></>
        }

        {/* Render grouped filters */}
        {Object.entries(activeGroupedFilters).map(([category, { values, formatFn, param }]) => (
            <Popover key={category}>
            <PopoverTrigger className="cursor-pointer">
                <Button 
                variant="negativeDefault"
                className="flex items-center gap-2 rounded-full m-1"
                >
                {category}
                <span className='bg-[#316cdf] rounded-full min-h-5 min-w-5 flex justify-center items-center text-white'>
                    {values.length}
                </span>
                <UpDownHeads className='fill-buttonBlue'/>
                </Button>
            </PopoverTrigger>
            <PopoverContent className="w-[350px] p-4">
                <div className="flex justify-between items-center mb-4">
                <h4 className="font-semibold">{category}</h4>
                <Button 
                    variant="ghost"
                    size="sm"
                    onClick={() => handleRemoveFilter(param)}
                    className="text-sm text-gray-500 hover:text-gray-700"
                >
                    Clear all
                </Button>
                </div>
                <div className="flex flex-wrap gap-2">
                {values.map((value) => (
                    <Button
                    key={value}
                    variant="negativeDefault"
                    className="flex items-center gap-2 rounded-full"
                    size="sm"
                    onClick={() => handleRemoveFilter(param, value)}
                    >
                    {formatFn(value)}
                    <XIcon className="h-3 w-3" />
                    </Button>
                ))}
                </div>
            </PopoverContent>
            </Popover>
        ))}

        {/* Render standalone filters */}
        {activeStandaloneFilters.map(([key, config]) => {
            const value = 'isSingle' in config && config.isSingle ? '1' : searchParams.get(config.param);
            if (!value) return null;

            return (
            <Button
                key={key}
                variant="negativeDefault"
                className="flex items-center gap-2 rounded-full m-1"
                onClick={() => handleRemoveFilter(config.param, 'isSingle' in config && config.isSingle ? undefined : value)}
            >
                {'isSingle' in config && config.isSingle ? 
                config.formatFn() : 
                config.formatFn(value)}
                <XIcon className="h-3 w-3" />
            </Button>
            );
        })}
        </div>
    );
};

export default FilterBadges;