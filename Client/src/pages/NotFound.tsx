import Search from "@/components/search";
import { Button } from "@/components/ui/button";
import { scrollToTopInstant } from "@/utils/functions";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

const NotFound = () => {
    const navigate = useNavigate();

    useEffect(() => {
        document.title = 'Booking.com | האתר הרשמי | לא נמצא';
        scrollToTopInstant();
    }, []);
    return (
    <div className=" text-center max-w-[1100px] mx-auto">
    <h1 className="text-6xl font-bold">Page Not Found</h1>
    <p className="text-gray-500 text-xl mt-5">It happens! Let’s get you back on track.</p>
    <Search/>
    <Button className="w-[200px] h-12 mt-5" onClick={() => navigate("/")}>Go Home</Button>
    </div>
    )
};
export default NotFound;