
export interface ILocation {
    country: string;
    region?: string;
    city?: string; 
    area?: string; 
    addressLine: string;
    zipCode?: string; 
    coordinates?: ICoordinates;
}

export interface ICoordinates {
    type: "Point";
    coordinates: number[];
}