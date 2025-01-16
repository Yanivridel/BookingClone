import { cn } from '@/lib/utils';
import { IProperty } from '@/types/propertyTypes';
import { useEffect, useRef, useState } from 'react';
import FilterSearchResult from './FilterSearchResult';
import { Button } from './ui/button';
import { CardXIcon, Location } from './ui/Icons';
import { IPage } from '@/pages/SearchResults';

import { useNavigate } from 'react-router-dom';

declare global {
    interface Window {
        google: typeof google;
        initMap: () => void;
    }
}
export interface LatLng {
    lat: number;
    lng: number;
    info?: string;
    onClick?: () => void;
}

interface MapProps {
    center: LatLng;
    markers?: LatLng[];
    className?: string;
    data?: IPage;
    isFetching?: boolean;
    showFilter?: boolean;
    isFull?: boolean;
    isOpen?: boolean;
}


export default function CheckpointMap({center, markers, className, data, isFetching, showFilter, isFull, isOpen}: MapProps ) {
    const mapRef = useGoogleMap({center,markers, data, isOpen});
    const [isFullscreen, setIsFullscreen] = useState(isFull ?? false);

    console.log("markers", markers)

    useEffect(() => {
        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isFullscreen) {
                setIsFullscreen(false);
            }
        };

        window.addEventListener('keydown', handleEscKey);

        return () => window.removeEventListener('keydown', handleEscKey)
    })

    return (
        <div className="relative w-full h-full">
            <div ref={mapRef} className={cn(
                `w-full h-full z-40
                ${isFullscreen ? "fixed top-0 left-0 " : ""}`
                , className)} />
            
            {!isFullscreen && (
                <button
                    onClick={() => setIsFullscreen(true)}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2
                    bg-blue-500 text-white p-2 text-sm font-bold rounded-lg z-50 flex"
                >
                    <Location className='fill-white w-5'/> 
                    Show On Map 
                </button>
            )}

            {isFullscreen && (
                <Button variant="secondary"
                    onClick={() => setIsFullscreen(false)}
                    className="fixed top-4 right-4 hover:bg-[#f2f2f2] px-4 py-2 rounded-lg z-50"
                >
                    Close Map
                    <CardXIcon/>
                </Button>
            )}

            { showFilter && isFullscreen &&
                <div className='fixed top-0 left-0 z-50 max-h-screen overflow-auto'>
                <FilterSearchResult data={data} isFetching={isFetching} isOnMap={true}/>
                </div>
            }
        </div>
    );
}


// function useGoogleMap({ center, markers, data, isOpen, mapId: customMapId }: MapProps) {
//     const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
//     const defaultMapId = import.meta.env.VITE_GOOGLE_MAP_ID;
//     const mapRef = useRef<HTMLDivElement | null>(null);
//     const mapInstanceRef = useRef<google.maps.Map | null>(null);
//     const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
//     const navigate = useNavigate();
    
//     const instanceId = useRef(`map-${Math.random().toString(36).substr(2, 9)}`);

//     useEffect(() => {
//         if (!googleApiKey || !(customMapId || defaultMapId)) {
//             console.error("Google Maps API Key or Map ID is missing.");
//             return;
//         }

//         if (!isOpen || !mapRef.current) return;

//         const initMap = () => {
//             if (mapRef.current) {
//                 console.log(`Initializing Map ${instanceId.current}...`);
//                 mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
//                     center,
//                     zoom: 13,
//                     mapId: customMapId || defaultMapId,
//                     fullscreenControl: false,
//                     scrollwheel: true,
//                 });
//             }
//         };

//         const loadGoogleMapsScript = () => {
//             return new Promise<void>((resolve, reject) => {
//                 if (window.google?.maps?.marker?.AdvancedMarkerElement) {
//                     resolve();
//                     return;
//                 }

//                 const script = document.createElement("script");
//                 // Add marker library to the URL
//                 script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&libraries=marker`;
//                 script.async = true;
//                 script.defer = true;
//                 script.id = `google-maps-script-${instanceId.current}`;
                
//                 script.onload = () => resolve();
//                 script.onerror = () => reject(new Error("Google Maps API failed to load"));
                
//                 document.head.appendChild(script);
//             });
//         };

//         loadGoogleMapsScript()
//             .then(() => {
//                 initMap();
//                 updateMarkers();
//             })
//             .catch(error => console.error(error));

//         return () => {
//             clearMarkers();
//             if (mapInstanceRef.current) {
//                 console.log(`Cleaning up map ${instanceId.current}...`);
//                 mapInstanceRef.current = null;
//             }
//         };
//     }, [isOpen]);

//     useEffect(() => {
//         if (mapInstanceRef.current) {
//             mapInstanceRef.current.setCenter(center);
//         }
//     }, [center.lat, center.lng]);

//     const clearMarkers = () => {
//         markersRef.current.forEach(marker => {
//             marker.map = null;
//             if (marker.content) {
//                 const markerContent = marker.content.getRootNode();
//                 if (markerContent instanceof Element) {
//                     markerContent.replaceWith(markerContent.cloneNode(true));
//                 } else {
//                     const parent = markerContent.parentNode;
//                     if (parent) {
//                         parent.replaceChild(markerContent.cloneNode(true), markerContent);
//                     }
//                 }
//             }
//         });
//         markersRef.current = [];
//     };

//     const updateMarkers = () => {
//         if (!mapInstanceRef.current || !markers || !window.google?.maps?.marker?.AdvancedMarkerElement) return;

//         clearMarkers();

//         markers.forEach((position, i) => {
//             const markerData = data?.filteredProperties[i];
//             const marker = new window.google.maps.marker.AdvancedMarkerElement({
//                 position,
//                 map: mapInstanceRef.current,
//                 content: createCustomMarkerIcon()
//             });

//             const infoWindow = new window.google.maps.InfoWindow({
//                 content: createCardHtml(markerData as IProperty),
//                 pixelOffset: new google.maps.Size(0, -20)
//             });

//             if (marker.content) {
//                 const markerContent = marker.content.getRootNode();
//                 if (markerContent instanceof Element) {
//                     markerContent.addEventListener('mouseenter', () => {
//                         infoWindow.open(mapInstanceRef.current!, marker);
//                     });
            
//                     markerContent.addEventListener('mouseleave', () => {
//                         infoWindow.close();
//                     });
            
//                     markerContent.addEventListener('click', () => {
//                         navigate(`/property/${markerData?._id}`);
//                     });
//                 }
//             }

//             markersRef.current.push(marker);
//         });
//     };

//     useEffect(() => {
//         updateMarkers();
//     }, [markers]);

//     return mapRef;
// }

function createCustomMarkerIcon() {
    const div = document.createElement('div');
    div.style.width = '30px';
    div.style.height = '45px';
    div.style.backgroundImage = 'url(/src/assets/images/marker.png)';
    div.style.backgroundSize = 'contain';
    div.style.backgroundRepeat = 'no-repeat';
    return div;
}
function createCardHtml(markerData: IProperty) {
    return (
        `
        <div class="w-[280px] p-3 rounded-lg shadow-lg bg-white font-sans">
            
            <!-- Image -->
            <div class="relative">
                <img src="${markerData?.images[0]}" alt="Hotel Image" class="w-full h-[160px] object-cover rounded-lg">
            </div>

            <!-- Title -->
            <h2 class="text-blue-600 text-lg font-bold mt-2 cursor-pointer">
                ${markerData.title}
            </h2>

            <!-- Rating and Reviews -->
            <div class="flex items-center text-sm mt-1">
                <span class="text-yellow-400">${'⭐'.repeat(Math.round((markerData.total_rating || 0) / 2))}</span>
                <span class="ml-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">${markerData.total_rating?.toFixed(1)}</span>
                <span class="ml-2 text-gray-600">${markerData.reviews_num} reviews</span>
            </div>

            <!-- Location -->
            <p class="text-gray-700 text-sm mt-2">${markerData.location.city}, ${markerData.location.addressLine}</p>

            <!-- Badge -->

            <!-- Room Info -->

            <!-- Price -->
            <div class="flex items-center mt-2">
            </div>

            <p class="text-gray-500 text-xs">Includes taxes and fees</p>
        </div>
        `
    )
}

// Working useGoogleMaps
function useGoogleMap({ center, markers, data }: MapProps) {
    const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const mapId = import.meta.env.VITE_GOOGLE_MAP_ID;
    const mapRef = useRef<HTMLDivElement | null>(null);
    const mapInstanceRef = useRef<google.maps.Map | null>(null);
    const markersRef = useRef<google.maps.marker.AdvancedMarkerElement[]>([]);
    const scriptId = "google-maps-script";
    const navigate = useNavigate();

    // Initialize map only once
    useEffect(() => {
        if (!googleApiKey || !mapId) {
            console.error("Google Maps API Key or Map ID is missing.");
            return;
        }

        if (!document.getElementById(scriptId)) {
            const script = document.createElement("script");
            script.id = scriptId;
            script.src = `https://maps.googleapis.com/maps/api/js?key=${googleApiKey}&callback=initMap&map_ids=${mapId}&libraries=marker&loading=async`;
            script.async = true;
            script.defer = true;
            document.body.appendChild(script);

            script.onerror = () => {
                console.error("Failed to load Google Maps API.");
            };
        }

        window.initMap = () => {
            if (!mapRef.current || !window.google) return;
            
            if (!mapInstanceRef.current) {
                console.log("HERE")
                mapInstanceRef.current = new window.google.maps.Map(mapRef.current, {
                    center,
                    zoom: 13,
                    mapId,
                    fullscreenControl: false,
                    scrollwheel: true
                });
            }
        };

        return () => {
            const existingScript = document.getElementById(scriptId);
            if (existingScript) {
                document.body.removeChild(existingScript);
            }
        };
    }, []);

    // Handle center changes
    useEffect(() => {
        if (mapInstanceRef.current) {
            mapInstanceRef.current.setCenter(center);
        }
    }, [center.lat, center.lng]);

    // Handle markers changes
    useEffect(() => {
        console.log("INSIDE", mapInstanceRef.current);
        if (!mapInstanceRef.current) return;

        // Clear existing markers
        //! Missing clean up old markers
        markersRef.current = [];

        console.log(markers)
        if (!markers) return;

        // Add new markers
        for(let i=0; i< markers.length; i++) {
            const position = markers[i];
            const markerData = data?.filteredProperties[i];
            const marker = new window.google.maps.marker.AdvancedMarkerElement({
                position,
                map: mapInstanceRef.current,
                // title: position.info,
                content: createCustomMarkerIcon()
            });
            console.log(position, markerData);

            const infoWindow = new window.google.maps.InfoWindow({
                content: createCardHtml(markerData as IProperty),
                pixelOffset: new google.maps.Size(0, -20)
            });

            

            if (marker.content) {
                const markerContent = marker.content.getRootNode();
                
                markerContent.addEventListener('mouseenter', () => {
                    infoWindow.open(mapInstanceRef.current!, marker);
                });
        
                markerContent.addEventListener('mouseleave', () => {
                    infoWindow.close();
                });
        
                markerContent.addEventListener('click', () => {
                    navigate(`/property/${markerData?._id}`);
                });
            }

            markersRef.current.push(marker);
        }
    }, [markers]);

    return mapRef;
}
