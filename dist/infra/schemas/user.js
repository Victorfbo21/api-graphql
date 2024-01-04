"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserMutation = exports.UserQuery = void 0;
const graphql_compose_1 = require("graphql-compose");
const user_1 = require("../../domain/entities/user");
const mutations_1 = require("../resolvers/user/mutations");
const schemaComposer = new graphql_compose_1.SchemaComposer();
exports.UserQuery = {
    userById: user_1.UserTC.mongooseResolvers.findById(),
    userMany: user_1.UserTC.mongooseResolvers.findMany(),
    userCount: user_1.UserTC.mongooseResolvers.count(),
    userPagination: user_1.UserTC.mongooseResolvers.pagination(),
};
exports.UserMutation = {
    userCreateOne: user_1.UserTC.mongooseResolvers.createOne(),
    userUpdateOne: user_1.UserTC.mongooseResolvers.updateOne(),
    userDelete: new graphql_compose_1.Resolver(mutations_1.userDelete, schemaComposer)
};
