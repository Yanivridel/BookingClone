import { useEffect, useRef } from 'react';

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
}

export default function CheckpointMap({center, markers}: MapProps ) {
    const mapRef = useGoogleMap({center,markers});

    return (
        <div ref={mapRef}
        className='w-full h-full' 
        // style={{ height: '400px', width: '100%' }}
        />
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
                fullscreenControl: true
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