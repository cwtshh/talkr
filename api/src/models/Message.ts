import mongoose, { mongo, Schema } from "mongoose";

interface MessageInterface {
    text: String,
    sender: mongoose.Schema.Types.ObjectId,
    receiver: mongoose.Schema.Types.ObjectId,
    date: Date,
};

const MessageSchema = new Schema<MessageInterface>(
    {
        text: { type: String, required: true },
        sender: {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',
        },
        receiver: { 
            type: mongoose.Schema.Types.ObjectId,
            ref: 'User',    
        },
        date: {
            type: Date,
            default: Date.now,
        },
    },
    { 
        timestamps: true,
        collection: 'messages'
    }
)

const Message = mongoose.model('Message', MessageSchema);

export default Message;
