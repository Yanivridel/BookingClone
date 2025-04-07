import { cn } from "@/lib/utils";
import { TBookingDetails } from "@/types/bookingTypes";
import { format } from "date-fns";
import { Card, CardDescription, CardTitle } from "../ui/card";
import { Badge } from "../ui/badge";
import { TPartialProperty } from "@/types/propertyTypes";
import imageNotLoaded from '@/assets/images/image_not_loaded.png'

interface BookingCardProps {
    order: TBookingDetails,
    status: string,
    className?: string,
}
function BookingCard({ order, status, className }: BookingCardProps) {
    const {
        checkIn,
        checkOut,
        guests,
        rooms,
        add_to_stay,
        special_req,
    } = order;
    const property = order.propertyId as TPartialProperty;

    const dateRange = `${format(new Date(checkIn), "MMM d")} - ${format(new Date(checkOut), "MMM d, yyyy")}`;
    const roomsCount = rooms.reduce((sum, r) => sum + r.count, 0);
    const stayAddons = [
        add_to_stay?.taxi && "Taxi",
        add_to_stay?.car_rent && "Car Rental",
        add_to_stay?.shuttle && "Shuttle",
    ]
        .filter(Boolean)
        .join(" • ");

    return (
        <Card className={cn("p-2 sm:p-3 flex gap-2 w-full min-w-[400px] mx-auto", className)}>
            <div className="w-[65%] sm:w-[70%] grid gap-3">
                <CardTitle className="text-base sm:text-xl font-semibold">
                {property.title}
                </CardTitle>
                <CardDescription className="text-xs sm:text-sm">
                {roomsCount} room{roomsCount > 1 ? "s" : ""} • {guests} guest{guests > 1 ? "s" : ""}<br />
                {dateRange}
                </CardDescription>

                {stayAddons && (
                <CardDescription className="text-xs sm:text-sm text-muted-foreground">
                    Extras: {stayAddons}
                </CardDescription>
                )}

                {special_req?.text && (
                <CardDescription className="text-xs sm:text-sm text-muted-foreground italic">
                    “{special_req.text}”
                </CardDescription>
                )}

                <Badge className="w-fit py-1 px-3 text-[12px] sm:text-sm flex items-center">
                Booking {status}
                </Badge>
            </div>
            <div className="w-[35%] sm:w-[30%] flex justify-end items-center">
                <img
                    src={property?.images?.[0] || imageNotLoaded}
                    alt="Booking"
                    className="rounded-lg h-[100px] w-[100px] sm:h-[145px] sm:w-[145px] object-cover"
                />
            </div>
        </Card>
    );
}

export default BookingCard;
