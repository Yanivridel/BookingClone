import { IProperty } from "@/types/propertyTypes";
import { getPropertyById } from "@/utils/api/propertyApi";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

//! Route for testing : http://localhost:5173/property/67810bb5824440db4b93a785

function Property() {
    const { id } = useParams();
    const [propertyData, setPropertyData] = useState<IProperty | null>(null);

    useEffect(() => {
        if(id) {
            getPropertyById(id)
            .then(data => {
                setPropertyData(data)
                console.log(data)
            });
        }
    }, [id])

    
    return (
        <div>
            name : {propertyData?.title} <br/>
            type : {propertyData?.type} <br/>
            description : {propertyData?.description} <br/>
            fine_print : {propertyData?.fine_print} <br/>

        </div>
    )

}

export default Property;