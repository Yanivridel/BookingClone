import mongoose, { Document, Schema, Types } from 'mongoose';


interface IMessage extends Document {
    chat: Types.ObjectId;
    sender: Types.ObjectId;
    message: string;
    read: boolean;
    createdAt: Date;
}

const messageSchema = new Schema<IMessage>({
    chat: {
        type: Schema.Types.ObjectId,
        ref: 'Chat',
        required: true
    },
    sender: {
        type: Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    message: {
        type: String,
        required: true,
        trim: true
    },
    read: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

export default  mongoose.model<IMessage>('Message', messageSchema);
