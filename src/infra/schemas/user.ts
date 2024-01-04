import { Resolver, SchemaComposer } from "graphql-compose";
import { UserTC } from "../../domain/entities/user";
import { userDelete } from '../resolvers/user/mutations'

const schemaComposer = new SchemaComposer();

export const UserQuery = {
    userById: UserTC.mongooseResolvers.findById(),
    userMany: UserTC.mongooseResolvers.findMany(),
    userCount: UserTC.mongooseResolvers.count(),
    userPagination: UserTC.mongooseResolvers.pagination(),
}



export const UserMutation = {
    userCreateOne: UserTC.mongooseResolvers.createOne(),
    userUpdateOne: UserTC.mongooseResolvers.updateOne(),
    userDelete: new Resolver(userDelete, schemaComposer)
}