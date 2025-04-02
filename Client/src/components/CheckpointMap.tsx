import { useCallback, useEffect, useState } from 'react';
import { APIProvider, Map, AdvancedMarker, MapCameraChangedEvent } from '@vis.gl/react-google-maps';
import FilterSearchResult from './FilterSearchResult';
import { Button } from './ui/button';
import { CardXIcon, Location } from './ui/Icons';
import { IPage } from '@/pages/SearchResults';
import { useNavigate } from 'react-router-dom';
import { IProperty } from '@/types/propertyTypes';
import { cn } from '@/lib/utils';
import markerImg from '@/assets/images/marker.png';

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
}

export default function CheckpointMap({ center, markers, className, data, isFetching, showFilter, isFull }: MapProps) {
    const [isFullscreen, setIsFullscreen] = useState(isFull ?? false);
    const navigate = useNavigate();
    const googleApiKey = import.meta.env.VITE_GOOGLE_MAPS_API_KEY;
    const mapId = import.meta.env.VITE_GOOGLE_MAP_ID;
    const [mapCenter, setMapCenter] = useState(center);
    const [loading, setLoading] = useState(false);

    useEffect(() => {
        setLoading(true);
        setMapCenter(center);
        if (!isFetching) {
            setLoading(false);
        }
    }, [center])

    useEffect(() => {
        if (!isFetching) {
            setLoading(false);
        }
    }, [isFetching])

    useEffect(() => {
        const handleEscKey = (e: KeyboardEvent) => {
            if (e.key === 'Escape' && isFullscreen) {
                setIsFullscreen(false);
            }
        };

        window.addEventListener('keydown', handleEscKey);
        return () => window.removeEventListener('keydown', handleEscKey);
    }, [isFullscreen]);

    const handleMarkerClick = (propertyId: string | undefined) => {
        if (!propertyId) return;
        navigate(`/property/${propertyId}`);
    };

    const handleCameraChange = useCallback((ev: MapCameraChangedEvent) => {
        const newCenter = ev.detail.center;
        setMapCenter((prevCenter) => {
            if (prevCenter.lat === newCenter.lat && prevCenter.lng === newCenter.lng) {
                return prevCenter; // Prevent unnecessary state updates
            }
            return newCenter;
        });
    }, []);
    

    return (
        <div className="relative w-full h-full">
            <APIProvider apiKey={googleApiKey}>
                <div className={cn(
                    `w-full h-full z-40
                    ${isFullscreen ? "fixed top-0 left-0 " : ""}`,
                    className
                )}>
                    {loading && isFullscreen && 
                    <div className='fixed top-0 left-0 h-full w-full bg-gray-800 opacity-50 z-50 flex justify-center items-center'>
                            <div className="w-16 h-16 border-4 border-t-transparent border-blue-500 rounded-full animate-spin"></div>
                    </div>}
                    <Map
                        defaultZoom={13}
                        center={mapCenter}
                        mapId={mapId}
                        fullscreenControl={false}
                        gestureHandling="greedy"
                        streetViewControl={false}
                        onCameraChanged={handleCameraChange}
                    >
                        {markers?.map((position, index) => {
                            const property = data?.filteredProperties[index];
                            if (!property) return null;
                            
                            return (
                                <MarkerWithInfoWindow
                                    key={index}
                                    position={position}
                                    property={property}
                                    onClick={() => handleMarkerClick(property._id)}
                                />
                            );
                        })}
                    </Map>
                </div>
            </APIProvider>

            {!isFullscreen && (
                <button
                    onClick={() => setIsFullscreen(true)}
                    className="absolute bottom-4 left-1/2 transform -translate-x-1/2
                    bg-blue-500 text-white p-2 text-sm font-bold rounded-lg z-50 flex"
                >
                    <Location className="fill-white w-5" />
                    Show On Map
                </button>
            )}

            {isFullscreen && (
                <Button
                    variant="secondary"
                    onClick={() => setIsFullscreen(false)}
                    className="fixed top-4 right-4 hover:bg-[#f2f2f2] px-4 py-2 rounded-lg z-50"
                >
                    Close Map
                    <CardXIcon />
                </Button>
            )}

            {showFilter && isFullscreen && (
                <div className="fixed top-0 left-0 z-50 max-h-screen overflow-auto">
                    <FilterSearchResult data={data} isFetching={isFetching} isOnMap={true} />
                </div>
            )}
        </div>
    );
}

const MarkerWithInfoWindow = ({position, property, onClick}: { position: LatLng; property: IProperty; onClick: () => void; }) => {
    const [isHovered, setIsHovered] = useState(false);
    
    return (
        <AdvancedMarker
            position={position}
            onClick={onClick}
        >
            <div 
                className="marker-content"
                onMouseEnter={() => setIsHovered(true)}
                onMouseLeave={() => setIsHovered(false)}
            >
                <CustomMarker />
                {isHovered && (
                    <div
                        className="absolute bottom-[calc(100%+10px)] left-1/2 transform -translate-x-1/2 z-[9950] !important"
                    >
                        <InfoWindowContent property={property} />
                    </div>
                )}
            </div>
        </AdvancedMarker>
    );
};

const CustomMarker = () => {
    return (
        <div className='relative'
            style={{
                width: '30px',
                height: '45px',
                backgroundImage: `url(${markerImg})`,
                backgroundSize: 'contain',
                backgroundRepeat: 'no-repeat',
                zIndex: 9999
            }}
        />
    );
};

function InfoWindowContent({ property }: { property: IProperty }) {
    // return <PropertyCard propertyData={property}/>
    return (
        <div className="w-[280px] p-3 rounded-lg shadow-lg bg-white font-sans">
            <div className="relative">
                <img src={property?.images[0]} alt="Hotel Image" className="w-full h-[160px] object-cover rounded-lg" />
            </div>
            <h2 className="text-blue-600 text-lg font-bold mt-2 cursor-pointer">
                {property.title}
            </h2>
            <div className="flex items-center text-sm mt-1">
                <span className="text-yellow-400">{'⭐'.repeat(Math.round((property.total_rating || 0) / 2))}</span>
                <span className="ml-2 bg-blue-600 text-white px-2 py-1 rounded text-xs">{property.total_rating?.toFixed(1)}</span>
                <span className="ml-2 text-gray-600">{property.reviews_num} reviews</span>
            </div>
            <p className="text-gray-700 text-sm mt-2">{property.location.city}, {property.location.addressLine}</p>
            <p className="text-gray-500 text-xs">Includes taxes and fees</p>
        </div>
    );
}