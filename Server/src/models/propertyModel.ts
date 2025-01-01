import mongoose, { Schema, Types } from 'mongoose'

import { IProperty } from 'src/types/propertyTypes';
import { EFacility, EFeatures, EPaymentMethods, EPropertyHighlight } from 'src/utils/structures';
import { LocationSchema } from './locationSchema';

const PropertySchema = new Schema<IProperty>({
    title: { type: String, required: true },
    location: LocationSchema,
    images: { type: [String], required: true },
    rating: {
        team: { type: Number, default: 0 },
        facilities: { type: Number, default: 0 },
        cleanliness: { type: Number, default: 0 },
        conform: { type: Number, default: 0 },
        value_for_money: { type: Number, default: 0 },
        location: { type: Number, default: 0 },
        free_wifi: { type: Number, default: 0 },
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
    rooms: { type: Types.ObjectId, ref: "Room" },
    qa: [{
    question: { type: String, required: true },
    answer: { type: String, required: true },
    }],
    houseRules: {
        checkin: {
            start: { type: String, required: true },
            end: { type: String, required: true },
        },
        checkout: {
            start: { type: String, required: true },
            end: { type: String, required: true },
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
            price: { type: String },
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
    host: { type: Types.ObjectId, ref: 'User', required: true },
});

// Mongoose Model for Property
const PropertyModel = mongoose.model<IProperty>('Property', PropertySchema);

export { PropertyModel };