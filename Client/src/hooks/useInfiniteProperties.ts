import { useInfiniteQuery, useQuery, useQueryClient } from "@tanstack/react-query";
import { useCallback, useEffect, useState } from "react";
import { ISearchPropertiesReq } from "@/types/propertyTypes";
import { searchPropertiesChunks } from "@/utils/api/propertyApi";



export default function useInfiniteProperties(searchBody: ISearchPropertiesReq) {
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
                }, 1000 * (retryCount + 1)); // Exponential backoff
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
                15
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


//* 2: This doesnt fetch all time filters *//
// export default function useInfiniteProperties(searchBody: ISearchPropertiesReq) {
//     const queryClient = useQueryClient();
//     const [filtersMap, setFiltersMap] = useState<Record<number, any>>({}); // Store filters separately
//     const [isFiltering, setIsFiltering] = useState(true); // Track if filters are being processed


//     return useInfiniteQuery({
//         queryKey: ["properties", searchBody], // Depend on search filters
//         queryFn: async ({ pageParam = 1 }) => {
//         const { firstChunkPromise, secondChunkPromise } = await searchPropertiesChunks(searchBody, pageParam, 15);
//         console.log("isFiltering", isFiltering)
//         // Wait for the first chunk (fastest)
//         const filteredProperties = await firstChunkPromise;

//         // Start fetching the second chunk in the background
//         secondChunkPromise.then(filters => {
//             if (filters && !filtersMap[pageParam]) {
//                 // Only update filters if they haven't been stored for this page yet
//                 setFiltersMap(prev => ({ ...prev, [pageParam]: filters }));
//                 // Set flag to indicate filtering is complete
//                 setIsFiltering(false);
//             }
//         });

//         return { filteredProperties, pageParam };
//         },
//         initialPageParam: 1,
//         getNextPageParam: (lastPage, allPages) => {
//         return (lastPage.filteredProperties as any).length > 0 ? allPages.length + 1 : undefined;
//         },
//         select: (data) => {
//         // Merge stored filters into each page result
//         return {
//             ...data,
//             pages: data.pages.map(page => ({
//                 ...page,
//                 filters: filtersMap[page.pageParam] || null, // Add filters when available
//             }))
//         };
//         },
//     });
// }


//* 1: This Re Renders*//
// export default function useInfiniteProperties(searchBody: ISearchPropertiesReq) {
//     const queryClient = useQueryClient();
//     const [filtersMap, setFiltersMap] = useState<Record<number, any>>({}); // Store filters separately

//     return useInfiniteQuery({
//         queryKey: ["properties", searchBody], // Depend on search filters
//         queryFn: async ({ pageParam = 1 }) => {
//         const { firstChunkPromise, secondChunkPromise } = await searchPropertiesChunks(searchBody, pageParam, 15);
        
//         // Wait for the first chunk (fastest)
//         const filteredProperties = await firstChunkPromise;

//         // Start fetching the second chunk in the background
//         secondChunkPromise.then(filters => {
//             if (filters) {
//             setFiltersMap(prev => ({ ...prev, [pageParam]: filters })); // Store filters separately
//             queryClient.invalidateQueries({queryKey :["properties", searchBody]}); // Trigger re-render
//             }
//         });

//         return { filteredProperties, pageParam };
//         },
//         initialPageParam: 1,
//         getNextPageParam: (lastPage, allPages) => {
//         return (lastPage.filteredProperties as any).length > 0 ? allPages.length + 1 : undefined;
//         },
//         select: (data) => {
//         // Merge stored filters into each page result
//         return {
//             ...data,
//             pages: data.pages.map(page => ({
//             ...page,
//             filters: filtersMap[page.pageParam] || null, // Add filters when available
//             }))
//         };
//         }
//     });
// }