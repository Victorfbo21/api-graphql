import { Document, Model, Schema, model } from 'mongoose';
import { composeMongoose } from 'graphql-compose-mongoose';
import encodePassword from '../middlewares/encryptPassword';
const type = ["owner", "admin", "worker"];

interface UserDocument extends Document {
    name?: string;
    email?: string;
    password?: string;
    profile_image?: string;
    whatsapp?: string;
    type: string;
    function?: string;
    isDeleted: boolean;
}

export const UserSchema: Schema<UserDocument> = new Schema({
    name: { type: String },
    email: { type: String },
    password: { type: String, require: true },
    profile_image: { type: String },
    whatsapp: { type: String },
    type: { type: String, enum: type, default: "owner" },
    function: { type: String },
    isDeleted: { type: Boolean, default: false }
}, {
    timestamps: true
});

encodePassword()

const User: Model<UserDocument> = model('User', UserSchema);

export const UserTC = composeMongoose(User, {});

export default User;
