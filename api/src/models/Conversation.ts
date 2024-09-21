import mongoose, { Schema } from "mongoose";

interface ConversationInterface {
    user: Schema.Types.ObjectId,
    messages: Schema.Types.ObjectId[],
}

const ConversationSchema = new Schema<ConversationInterface>(
    {
        user: {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
        messages: [
            {
                type: Schema.Types.ObjectId,
                ref: 'Message',
            }
        ]
    },
    {
        timestamps: true,
        collection: 'conversations'
    }
);

const Conversation = mongoose.model('Conversation', ConversationSchema);

export default Conversation;
