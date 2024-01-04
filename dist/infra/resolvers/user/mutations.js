"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    var desc = Object.getOwnPropertyDescriptor(m, k);
    if (!desc || ("get" in desc ? !m.__esModule : desc.writable || desc.configurable)) {
      desc = { enumerable: true, get: function() { return m[k]; } };
    }
    Object.defineProperty(o, k2, desc);
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.userDelete = exports.ErrorTC = void 0;
const graphql_compose_mongoose_1 = require("graphql-compose-mongoose");
const user_1 = __importStar(require("../../../domain/entities/user"));
const graphql_1 = require("graphql");
const graphql_compose_1 = require("graphql-compose");
exports.ErrorTC = graphql_compose_1.schemaComposer.createObjectTC({
    name: 'ErrorPayload',
    fields: {
        message: 'String'
    },
});
exports.userDelete = {
    type: graphql_compose_1.schemaComposer.createObjectTC({
        name: 'UserDeletePayload',
        fields: {
            record: user_1.UserTC.getType(),
            recordId: graphql_compose_mongoose_1.GraphQLMongoID,
        },
    }),
    args: {
        _id: graphql_compose_mongoose_1.GraphQLMongoID
    },
    resolve: async ({ args }) => {
        const user = await user_1.default.updateOne({ _id: args._id }, {
            isDeleted: true,
            deletedAt: new Date()
        });
        if (user.modifiedCount)
            return { record: { _id: args._id }, recordId: args._id, error: null };
        return new graphql_1.GraphQLError("Registro não Encontrado!");
    },
    name: "userDelete",
};
// module.exports = resolver
