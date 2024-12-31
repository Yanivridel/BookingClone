import { Schema, model, Document, ObjectId } from "mongoose";
import { IUser } from 'src/types/userTypes';
import { IProperty } from "src/types/propertyTypes";

// Define the IFavorite interface
export interface IFavorite extends Document {
    _id: ObjectId;
    user: IUser["_id"];
    property: IProperty["_id"];
    createdAt: Date;
}

// Define the Favorite schema
const favoriteSchema = new Schema<IFavorite>({
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    property: { type: Schema.Types.ObjectId, ref: "Property", required: true },
    createdAt: { type: Date, default: Date.now },
});

// Create the Favorite model
const Favorite = model<IFavorite>("Favorite", favoriteSchema);

export default Favorite;