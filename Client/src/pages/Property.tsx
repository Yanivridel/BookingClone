import { getPropertyById } from "@/utils/api/propertyApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";



function Property() {
    const { id } = useParams();
    const [propertyData, setPropertyData] = useState(null);

    useEffect(() => {
        if(id)
            getPropertyById(id)
            .then(data => setPropertyData(data));
    }, [id])

    return (
        <div>
            {propertyData}
            
        </div>
    )

}

export default Property;