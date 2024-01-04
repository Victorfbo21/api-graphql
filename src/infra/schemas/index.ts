import { SchemaComposer } from "graphql-compose";
import { UserQuery, UserMutation } from "./user";

const schemaComposer = new SchemaComposer();


schemaComposer.Query.addFields({
    ...UserQuery
})

schemaComposer.Mutation.addFields({
    ...UserMutation
})

schemaComposer.Subscription.addFields({

})

export const Schema = schemaComposer.buildSchema();