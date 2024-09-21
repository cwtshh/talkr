import mongoose, { Collection, Schema } from "mongoose";

interface UserInterface {
    name: String,
    email: String,
    password: String,
    number: String,
    contacts: Schema.Types.ObjectId[],
};

const UserSchema = new Schema<UserInterface>(
    {
        name: { type: String, required: true },
        email: { type: String, required: true },
        password: { type: String, required: true },
        number: { type: String, required: true },
        contacts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'User',
            }
        ],
    },
    { 
        timestamps: true,
        collection: 'users'
    }
);

const User = mongoose.model('User', UserSchema);

export default User;