import mongoose, { Document, Schema, Types } from 'mongoose';

interface IChat extends Document {
    users: Types.ObjectId[];
    messages: Types.ObjectId[];
    createdAt: Date;
}

const chatSchema = new Schema<IChat>({
    users: [{
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    }],
    messages: [{
        type: Schema.Types.ObjectId,
        ref: 'Message',
        default: []
    }],
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default mongoose.model<IChat>('Chat', chatSchema);

