import mongoose, { Schema, Types } from 'mongoose'

import { IProperty } from 'src/types/propertyTypes';
import { EAccommodationType, EFacility, EFeatures, EPaymentMethods, EPropertyHighlight } from './../utils/structures';
import { LocationSchema } from './locationSchema';

const PropertySchema = new Schema<IProperty>({
    title: { type: String, required: true },
    type: { type:String, required: true, enum: Object.values(EAccommodationType),
        validate: {
            validator: (v) => Object.values(EAccommodationType).includes(v),
            message: props => `${props.value} is not a valid Accommodation!`
        }
    },
    location: LocationSchema,
    images: { type: [String], required: true },
    rating: {
        staff: { type: Number, default: 0, min: 0, max: 10},
        facilities: { type: Number, default: 0, min: 0, max: 10 },
        cleanliness: { type: Number, default: 0, min: 0, max: 10 },
        conform: { type: Number, default: 0, min: 0, max: 10 },
        value_for_money: { type: Number, default: 0, min: 0, max: 10 },
        location: { type: Number, default: 0, min: 0, max: 10 },
        free_wifi: { type: Number, default: 0 , min: 0, max: 10},
    },
    description: { type: String, default: '' },
    popularFacilities: { type: [String], required: true, enum: EFacility },
    highlights: [{
        title: { type: String, required: true, enum: EPropertyHighlight },
        content: { type: String, required: true },
    }],
    features: [{
        category: { type: String, required: true, enum: EFeatures },
        sub: { type: [String], required: true },
    }],
    rooms: [{ type: Schema.Types.ObjectId, ref: "Room" }],
    qa: [{
    question: { type: String, required: true },
    answer: { type: String, required: true },
    }],
    houseRules: {
        checkin: {
            start: { type: String, required: true },
            end: { type: String, required: false },
        },
        checkout: {
            start: { type: String, required: true },
            end: { type: String, required: false },
        },
        cancellation_prepayment: { type: String, required: true },
        children_beds: {
            child_policy: { type: String },
            bed_policy: [{
                age: {
                    start: { type: Number, required: true },
                    end: { type: Number, required: true },
                },
                type: { type: String },
                price_num: { type: Number },
                price_msg: { type: String }
            }],
        },
        age_restriction: { type: Number },
        pets: { type: Boolean },
        groups: { type: String },
        accepted_payments: { type: [String], required: true, enum: EPaymentMethods },
        parties: { type: Boolean },
    },
    fine_print: { type: String },
    license: { type: Number },
    fqa: [{
    question: { type: String, required: true },
    answer: { type: String, required: true },
    }],
    desk_help: {
        start: { type: Number, default: 0 },
        end: { type: Number, default: 24 },
    },
    host: { type: Schema.Types.ObjectId, ref: 'User', required: true },
});

PropertySchema.set('toJSON', { virtuals: true });
PropertySchema.set('toObject', { virtuals: true });

// Virtual property total_rating
PropertySchema.virtual("total_rating").get(function () {
    return (this.rating.staff + this.rating.facilities + this.rating.cleanliness + this.rating.conform
    + this.rating.value_for_money+ this.rating.location + this.rating.free_wifi) / 7;
});

// Mongoose Model for Property
export const propertyModel = mongoose.model<IProperty>('Property', PropertySchema);