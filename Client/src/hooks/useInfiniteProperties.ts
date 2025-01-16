import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ISearchPropertiesReq } from "@/types/propertyTypes";
import { searchPropertiesChunks } from "@/utils/api/propertyApi";


export default function useInfiniteProperties(searchBody: ISearchPropertiesReq, limit?: number) {
    const [filtersMap, setFiltersMap] = useState<Record<number, any>>({});

    // Function to handle filter fetching with retry logic
    const fetchFilters = async (pageParam: number, retryCount = 0) => {
        if (retryCount > 20) return; // Maximum retry attempts

        try {
            const { secondChunkPromise } = await searchPropertiesChunks(searchBody, pageParam, 15);
            const filters = await secondChunkPromise;

            if (filters) {
                setFiltersMap(prev => ({ ...prev, [pageParam]: filters }));
            } else {
                // If filters are null/undefined, retry after a delay
                setTimeout(() => {
                    fetchFilters(pageParam, retryCount + 1);
                }, 100 * (retryCount + 1)); // Exponential backoff
            }
        } catch (error) {
            console.error(`Error fetching filters for page:`, error);
        }
    };

    const query = useInfiniteQuery({
        queryKey: ["properties", searchBody],
        queryFn: async ({ pageParam = 1 }) => {
            const { firstChunkPromise } = await searchPropertiesChunks(
                searchBody,
                pageParam,
                limit ?? 15
            );

            // Wait for the first chunk
            const filteredProperties = await firstChunkPromise;

            // Start filter fetching only on first page
            if(pageParam === 1)
                fetchFilters(pageParam);

            return { filteredProperties, pageParam };
        },
        initialPageParam: 1,
        getNextPageParam: (lastPage, allPages) => {
            return (lastPage.filteredProperties as any).length > 0 ? allPages.length + 1 : undefined;
        },
        select: (data) => {
            return {
                ...data,
                pages: data.pages.map(page => ({
                    ...page,
                    filters: filtersMap[page.pageParam] || null,
                }))
            };
        },
    });

    // Cleanup function to remove pending filters when component unmounts
    useEffect(() => {
        return () => {
            setFiltersMap({});
        };
    }, []);

    return query;
}

