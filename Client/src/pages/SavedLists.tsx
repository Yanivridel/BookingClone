import styles from "@/css/search.module.css";
import { Button } from "@/components/ui/button";
import { Card } from "@/components/ui/card";
import IconHeartRed, { DeleteIcon, EditIcon, UpDownHeads, ViIcon, XIcon } from "@/components/ui/Icons";
import { RootState } from "@/store";
import { IUser } from "@/types/userTypes";
import { Popover, PopoverContent, PopoverTrigger } from "@radix-ui/react-popover";
import { useEffect, useMemo, useState } from "react";
import { useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { SampleNextArrow, SamplePrevArrow } from "@/components/ui/carousel-slick";
import Slider from "react-slick";
import { useTranslation } from "react-i18next";
import MainCard from "@/components/MainCard";
import { cn } from "@/lib/utils";
import CheckpointMap, { LatLng } from "@/components/CheckpointMap";
import { IProperty } from "@/types/propertyTypes";
import { getPropertyByIdForCard } from "@/utils/api/propertyApi";
import { IPage } from "./SearchResults";


function SavedLists() {
    const { listName } = useParams();
    const currentUser = useSelector((state: RootState) => state.currentUser) as unknown as IUser;
    const selectedList = currentUser.savedLists.find(list => list.name === listName);
    const navigate = useNavigate();
    const [editName, setEditName] = useState("");
    const [ properties, setProperties] = useState<IProperty[] | null>(null);
    // const [coordinates, setCoordinates] = useState<LatLng[]>([]);

    const [isMobile, setIsMobile] = useState<boolean>(
        window.innerWidth < 1140
    );
    const { t, i18n } = useTranslation();
    const isRtl = i18n.language === "he";

    const settingsCarousel = {
        infinite: false,
        slidesToScroll: 1,
        prevArrow: <SamplePrevArrow />,
    };

    useEffect(() => {
        const checkMobile = () => {
        setIsMobile((prevIsMobile) => {
            if (window.innerWidth < 1140 && !prevIsMobile) return true;
            else if (window.innerWidth >= 1140 && prevIsMobile)
            return false;
            return prevIsMobile;
        });
        };
    
        window.addEventListener("resize", checkMobile);
    
        return () => {
        window.removeEventListener("resize", checkMobile);
        };
    }, []);

    useEffect(() => {
        const fetchProperties = async () => {
            if (!selectedList || !selectedList.properties?.length) return;  // Prevent fetching if no properties exist
    
            const fetchedProperties = await Promise.all(
                selectedList.properties.map(async (id) => {
                    return await getPropertyByIdForCard(id);
                })
            );
            setProperties(fetchedProperties);
        };
    
        fetchProperties();
    }, [selectedList]);

    // useEffect(() => {
    //     if (properties) {
    //         const newCoordinates = properties.map(prop => ({
    //             lat: prop.location.coordinates?.coordinates[0],
    //             lng: prop.location.coordinates?.coordinates[1],
    //         })) as LatLng[];
    //         setCoordinates(newCoordinates );
    //     }
    // }, [properties]);

    const coordinates = useMemo(() => {
        if (!properties) return [];
        return properties.map(prop => ({
        lat: prop.location.coordinates?.coordinates[0],
        lng: prop.location.coordinates?.coordinates[1],
        } as LatLng));
    }, [properties]);
    
    const center = useMemo(() => (
        properties && properties.length ? coordinates[0] : { lat: 32.0717, lng: 34.7754 } as LatLng
    ), [properties, coordinates]);

    function handleChangeListName(e: React.MouseEvent<HTMLButtonElement>) {
        e.stopPropagation(); 
    }

    if(!selectedList)
        return null;

    return (
        <div className="max-w-[1100px] mx-auto">
            {/* List Selection */}
            <div className="flex gap-3 items-center p-4">
                Saved
                <Popover   
                onOpenChange={(open) => { if (!open) setEditName("");}}>
                <div className="flex flex-wrap gap-2">
                    <PopoverTrigger asChild  
                    className="border-[#006ce4] 
                    text-[#006ce4] hover:bg-[#f0f6fd]">
                        <Button variant="outline"
                        // onClick={() => setSelectOpen(!open)}
                        >
                            {listName}
                            <UpDownHeads className="fill-[#006ce4]"/>
                        </Button>
                    </PopoverTrigger>
                    <Button>Share the list</Button>
                    <Button>Create a list</Button>
                </div>
                <PopoverContent 
                onBlur={() => console.log("clicked")}
                className="w-[360px] rounded-xl shadow-lg bg-white mt-2 ml-2 z-10">
                { currentUser.savedLists.map(list => 
                        <div
                        // onBlur={() => setEditName("")}
                        onClick={() => navigate(`/account/saved-lists/${list.name}`)}
                        key={list.name}
                        className={
                            `${listName === list.name ? "bg-[#f0f6fd] text-[#006ce4]" : ""} 
                            flex justify-between items-center rounded-lg p-4 bg-white hover:bg-[#e4eaf0]
                            cursor-pointer `
                        }
                        >
                            { editName === list.name ? 
                            <>
                            <input className="p-1" 
                            placeholder={list.name}/>
                                <div>
                                <Button onClick={(e) => { e.stopPropagation(); setEditName("") }}
                                variant="iconHover">
                                    <XIcon/>
                                </Button>
                                <Button onClick={(e) => handleChangeListName(e)} variant="iconHover">
                                    <ViIcon/>
                                </Button>
                                </div>
                            </>
                            :
                            <>
                                <p className="flex items-center gap-1 text-sm">{list.name}
                                <span className="w-4 h-4 flex items-center justify-center rounded-full bg-[#595959] text-white text-xs">
                                    {list.properties.length}
                                </span>
                                </p>
                                <div>
                                <Button onClick={(e) => {
                                    e.stopPropagation();
                                    setEditName(list.name)}
                                    }
                                variant="iconHover"><EditIcon/></Button>
                                <Button onClick={(e) => {  e.stopPropagation(); } } variant="iconHover"><DeleteIcon/></Button>
                                </div>
                            </>
                            }
                        </div>
                )}
                </PopoverContent>
                </Popover>
            </div>
            <hr />
            {/* No Saved Properties */}
            { selectedList.properties.length <= 0 &&
            <div className="flex flex-col justify-center p-4">
                <picture >
                    <img className="mx-auto w-fit" src="https://t-cf.bstatic.com/design-assets/assets/v3.138.1/illustrations-traveller/WishlistEmptyList.png" alt="" role="presentation" loading="lazy"/>
                </picture>
                <div className="text-center">
                    <h3 className="font-bold text-2xl my-3">Here are 3 simple steps to get you started:</h3>
                        <ol className="text-lg">
                            <li>1. Search for a place to stay</li>
                            <li>2. Tap the heart icon when you find a property you like</li>
                            <li>3. You'll find everything you've saved here</li>
                        </ol>
                </div>
                <Button className="w-fit mx-auto mt-5 w-[220px] h-[50px] font-bold text-lg"
                onClick={() => navigate("/")}
                >
                    Start Searching
                </Button>
            </div>
            }
            {/* List Details */}
            { selectedList.properties.length > 0 &&
            <div className="p-4 flex flex-wrap justify-between">
                <div>
                    <h1 className="font-bold text-xl mb-2">{listName}</h1>
                    <span className="flex gap-1 items-center">
                        <IconHeartRed className="fill-red-700 w-4 mt-1"/>
                        {selectedList?.properties.length || 0} saved properties
                    </span>
                </div>
                <div>
                    <Card className='h-[100px] w-[260px]rounded-lg relative'>
                        { coordinates && <>
                        <div className='border h-[100px] w-[260px] rounded-lg mb-2'>
                            <CheckpointMap center={center} 
                            markers={coordinates.length > 0 ? coordinates : undefined} 
                            showFilter={false} data={{ filteredProperties: properties } as IPage} />
                        </div>
                        </>}
                    </Card>
                </div>
            </div>
            }
            <hr />
            {/* List Carousel */}
            {isMobile || selectedList.properties.length <= 3 ? (
            <div
                className={cn(
                "w-full flex gap-2 overflow-scroll p-4",
                styles.scrollContainer
                )}
            >
                {selectedList.properties.map((propertyId) => (
                <MainCard
                    key={propertyId}
                    propertyId={propertyId}
                    is_X={true}
                    listName={listName}
                />
                ))}
                
            </div>
            ) : (
            <Slider className=" p-4"
            key={isRtl ? "rtl" : "ltr"}
            {...{
                ...settingsCarousel,
                slidesToShow: 3.8,
                initialSlide: isRtl
                ? selectedList.properties.length - 3.8
                : 0,
                nextArrow: <SampleNextArrow slidesToShow={3.8} />,
            }}
            >
            {selectedList.properties.map((propertyId) => (
                <MainCard
                key={propertyId}
                propertyId={propertyId}
                is_X={true}
                listName={listName}
                />
            ))}
            </Slider>
            )}
        </div>
    )
}

export default SavedLists;