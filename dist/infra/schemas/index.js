"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Schema = void 0;
const graphql_compose_1 = require("graphql-compose");
const user_1 = require("./user");
const schemaComposer = new graphql_compose_1.SchemaComposer();
schemaComposer.Query.addFields({
    ...user_1.UserQuery
});
schemaComposer.Mutation.addFields({
    ...user_1.UserMutation
});
schemaComposer.Subscription.addFields({});
exports.Schema = schemaComposer.buildSchema();
