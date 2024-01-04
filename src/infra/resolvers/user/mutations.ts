import { resolve } from 'path';

import { GraphQLMongoID } from "graphql-compose-mongoose";
import UserSchema, { UserTC } from "../../../domain/entities/user";
import { GraphQLError } from "graphql";
import { schemaComposer } from "graphql-compose";

export const ErrorTC = schemaComposer.createObjectTC({
    name: 'ErrorPayload',
    fields: {
        message: 'String'
    },
});
export const userDelete = {
    type: schemaComposer.createObjectTC({
        name: 'UserDeletePayload',
        fields: {
            record: UserTC.getType(),
            recordId: GraphQLMongoID,
        },
    }),
    args: {
        _id: GraphQLMongoID
    },
    resolve: async ({ args }) => {
        const user = await UserSchema.updateOne({ _id: args._id }, {
            isDeleted: true,
            deletedAt: new Date()
        });
        if (user.modifiedCount)
            return { record: { _id: args._id }, recordId: args._id, error: null };
        return new GraphQLError("Registro não Encontrado!")
    },
    name: "userDelete",
}

// module.exports = resolver
