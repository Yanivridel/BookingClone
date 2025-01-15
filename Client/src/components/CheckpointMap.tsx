import { cn } from '@/lib/utils';
import { IFilters } from '@/types/propertyTypes';
import { useEffect, useRef, useState } from 'react';
import FilterSearchResult from './FilterSearchResult';
import { Button } from './ui/button';
import { CardXIcon, Location } from './ui/Icons';

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
    markers: LatLng[];
    className?: string;
    filters?: IFilters | null;
}


export default function CheckpointMap({center, markers, className, filters}: MapProps ) {
    const mapRef = useGoogleMap({center,markers});
    const [isFullscreen, setIsFullscreen] = useState(false);

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

            { isFullscreen && filters &&
                <div className='fixed top-0 left-0 z-50 max-h-screen overflow-auto'>
                <FilterSearchResult filters={filters}/>
                </div>
            }
        </div>
    );
}


function useGoogleMap({ center, markers }: MapProps) {
    const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const mapId = import.meta.env.VITE_GOOGLE_MAP_ID;
    const mapRef = useRef<HTMLDivElement | null>(null);
    const scriptId = "google-maps-script";

    useEffect(() => {
        if (!googleApiKey || !mapId) {
            console.error("Google Maps API Key or Map ID is missing.");
            return;
        }

        // ✅ Prevent multiple script injections
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

            const map = new window.google.maps.Map(mapRef.current, {
                center,
                zoom: 13,
                mapId,
                fullscreenControl: false,
                scrollwheel: true
            });


            markers.forEach((position) => {
                const marker = new window.google.maps.marker.AdvancedMarkerElement({
                    position: position, // ✅ Directly pass LatLng object
                    map,
                    title: position.info,
                    content: createCustomMarkerIcon()
                });

                
                const infoWindow = new window.google.maps.InfoWindow({
                    content: `
                        <div class="p-4 bg-white rounded-lg shadow-lg max-w-xs cursor-pointer">
                            <div class="space-y-2">
                                <h3 class="font-semibold text-lg">${position.info}</h3>
                                <div class="text-sm text-gray-600">
                                    <p>Comfort Double Room</p>
                                    <p>1 bed • 1 night • 5 adults</p>
                                    <p class="mt-2 text-2xl font-bold">₹ 2,807</p>
                                </div>
                            </div>
                        </div>
                    `,
                    pixelOffset: new google.maps.Size(0, -20)
                });



                if (marker.content) {
                    const markerContent = marker.content.getRootNode();
                    
                    markerContent.addEventListener('mouseenter', () => {
                        infoWindow.open(map, marker);
                        console.log('Mouse entered marker');
                    });
            
                    markerContent.addEventListener('mouseleave', () => {
                        infoWindow.close();
                        console.log('Mouse left marker');
                    });
            
                    markerContent.addEventListener('click', () => {
                        position.onClick?.();
                        console.log(`Marker clicked: Lat: ${position.lat}, Lng: ${position.lng}`);
                    });
                }
            });
        };

        return () => {
            // ✅ Remove script on unmount to prevent duplicate injections
            const existingScript = document.getElementById(scriptId);
            if (existingScript) {
                document.body.removeChild(existingScript);
            }
        };
    }, [center, markers]);

    return mapRef;
}


function createCustomMarkerIcon() {
    const div = document.createElement('div');
    div.style.width = '30px';
    div.style.height = '45px';
    div.style.backgroundImage = 'url(/src/assets/images/marker.png)';
    div.style.backgroundSize = 'contain';
    div.style.backgroundRepeat = 'no-repeat';
    return div;
}



/*
export default function CheckpointMap({center, markers, className}: MapProps ) {
    const mapRef = useGoogleMap({center,markers});
    const [isFullscreen, setIsFullscreen] = useState(false);

    const enterFullscreen = () => {
        if (mapRef.current) {
            const element = mapRef.current;
            if (element.requestFullscreen) {
                element.requestFullscreen();
            } else if ((element as any).webkitRequestFullscreen) { 
                (element as any).webkitRequestFullscreen();
            } else if ((element as any).mozRequestFullScreen) { 
                (element as any).mozRequestFullScreen();
            } else if ((element as any).msRequestFullscreen) { 
                (element as any).msRequestFullscreen();
            }
            setIsFullscreen(true);
        }
    };

    const exitFullscreen = () => {
        if (document.fullscreenElement) {
            document.exitFullscreen();
        }
        setIsFullscreen(false);
    };

    useEffect(() => {
        const handleFullscreenChange = () => {
            setIsFullscreen(!!document.fullscreenElement);
        };

        document.addEventListener("fullscreenchange", handleFullscreenChange);
        return () => {
            document.removeEventListener("fullscreenchange", handleFullscreenChange);
        };
    }, []);

    return (
        <div className="relative w-full h-full">
            <div ref={mapRef} className={cn('w-full h-full', className)} />
            
            {!isFullscreen && (
                <button
                    onClick={enterFullscreen}
                    className="absolute top-4 left-1/2 transform -translate-x-1/2
                    bg-blue-500 text-white p-1 text-sm rounded-lg z-10"
                >
                    Show On Map
                </button>
            )}

            {isFullscreen && (
                <button
                    onClick={exitFullscreen}
                    className="absolute top-4 right-4 bg-red-500 text-white px-4 py-2 rounded-lg z-10"
                >
                    Close Map
                </button>
            )}
        </div>
    );
}


function useGoogleMap({ center, markers }: MapProps) {
    const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const mapId = import.meta.env.VITE_GOOGLE_MAP_ID;
    const mapRef = useRef<HTMLDivElement | null>(null);
    const scriptId = "google-maps-script";

    useEffect(() => {
        if (!googleApiKey || !mapId) {
            console.error("Google Maps API Key or Map ID is missing.");
            return;
        }

        // ✅ Prevent multiple script injections
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

            const map = new window.google.maps.Map(mapRef.current, {
                center,
                zoom: 13,
                mapId,
                fullscreenControl: false
            });


            markers.forEach((position) => {
                const marker = new window.google.maps.marker.AdvancedMarkerElement({
                    position: position, // ✅ Directly pass LatLng object
                    map,
                    title: position.info,
                    content: createCustomMarkerIcon()
                });

                
                const infoWindow = new window.google.maps.InfoWindow({
                    content: `
                        <div class="p-4 bg-white rounded-lg shadow-lg max-w-xs cursor-pointer">
                            <div class="space-y-2">
                                <h3 class="font-semibold text-lg">${position.info}</h3>
                                <div class="text-sm text-gray-600">
                                    <p>Comfort Double Room</p>
                                    <p>1 bed • 1 night • 5 adults</p>
                                    <p class="mt-2 text-2xl font-bold">₹ 2,807</p>
                                </div>
                            </div>
                        </div>
                    `,
                    pixelOffset: new google.maps.Size(0, -20)
                });



                if (marker.content) {
                    const markerContent = marker.content.getRootNode();
                    
                    markerContent.addEventListener('mouseenter', () => {
                        infoWindow.open(map, marker);
                        console.log('Mouse entered marker');
                    });
            
                    markerContent.addEventListener('mouseleave', () => {
                        infoWindow.close();
                        console.log('Mouse left marker');
                    });
            
                    markerContent.addEventListener('click', () => {
                        position.onClick?.();
                        console.log(`Marker clicked: Lat: ${position.lat}, Lng: ${position.lng}`);
                    });
                }
            });
        };

        return () => {
            // ✅ Remove script on unmount to prevent duplicate injections
            const existingScript = document.getElementById(scriptId);
            if (existingScript) {
                document.body.removeChild(existingScript);
            }
        };
    }, [center, markers]);

    return mapRef;
}


function createCustomMarkerIcon() {
    const div = document.createElement('div');
    div.style.width = '30px';
    div.style.height = '45px';
    div.style.backgroundImage = 'url(/src/assets/images/marker.png)';
    div.style.backgroundSize = 'contain';
    div.style.backgroundRepeat = 'no-repeat';
    return div;
}
*/