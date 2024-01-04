"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserTC = void 0;
const mongoose_1 = require("mongoose");
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const type = ["owner", "admin", "worker"];
const UserSchema = new mongoose_1.Schema({
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
const User = (0, mongoose_1.model)('User', UserSchema);
exports.UserTC = (0, graphql_compose_mongoose_1.composeMongoose)(User, {});
exports.default = User;
