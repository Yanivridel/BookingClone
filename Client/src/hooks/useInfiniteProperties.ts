import { useInfiniteQuery } from "@tanstack/react-query";
import { useEffect, useState } from "react";
import { ISearchPropertiesReq } from "@/types/propertyTypes";
import { searchPropertiesChunks } from "@/utils/api/propertyApi";


export default function useInfiniteProperties(searchBody: ISearchPropertiesReq, limit?: number) {
    const [filtersMap, setFiltersMap] = useState<Record<number, any>>({});
    const [pendingFilters, setPendingFilters] = useState<Record<number, boolean>>({});

    // Function to handle filter fetching with retry logic
    const fetchFilters = async (pageParam: number, retryCount = 0) => {
        if (retryCount > 3) return; // Maximum retry attempts

        try {
            const { secondChunkPromise } = await searchPropertiesChunks(searchBody, pageParam, 15);
            const filters = await secondChunkPromise;

            if (filters) {
                setFiltersMap(prev => ({ ...prev, [pageParam]: filters }));
                setPendingFilters(prev => ({ ...prev, [pageParam]: false }));
            } else {
                // If filters are null/undefined, retry after a delay
                setTimeout(() => {
                    fetchFilters(pageParam, retryCount + 1);
                }, 100 * (retryCount + 1)); // Exponential backoff
            }
        } catch (error) {
            console.error(`Error fetching filters for page ${pageParam}:`, error);
            // Retry on error
            setTimeout(() => {
                fetchFilters(pageParam, retryCount + 1);
            }, 1000 * (retryCount + 1));
        }
    };

    const query = useInfiniteQuery({
        queryKey: ["properties", searchBody],
        queryFn: async ({ pageParam = 1 }) => {
            // Mark this page as pending filters
            setPendingFilters(prev => ({ ...prev, [pageParam]: true }));

            const { firstChunkPromise, secondChunkPromise } = await searchPropertiesChunks(
                searchBody,
                pageParam,
                limit ?? 15
            );

            // Wait for the first chunk
            const filteredProperties = await firstChunkPromise;

            // Start filter fetching process
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
                    isLoadingFilters: pendingFilters[page.pageParam] || false
                }))
            };
        },
    });

    // Cleanup function to remove pending filters when component unmounts
    useEffect(() => {
        return () => {
            setPendingFilters({});
            setFiltersMap({});
        };
    }, []);

    return query;
}
