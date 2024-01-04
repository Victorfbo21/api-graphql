import mongoose, { MongooseOptions } from "mongoose";
import http from 'http'
import cors from 'cors'
import express from 'express'
import { ApolloServer } from "@apollo/server";
import { Schema } from "./infra/schemas";
import { ApolloServerPluginDrainHttpServer } from '@apollo/server/plugin/drainHttpServer';
import { expressMiddleware } from '@apollo/server/express4';
import { resolve } from "path";
import { dbConnect } from "./infra/database/dbConnect";

export class app {

    private app: express.Application;
    dbConnect: Promise<void>;

    constructor() {
        this.app = express();
        this.dbConnect = dbConnect()
    }

    public async startApolloServer(port: number) {
        const httpServer = http.createServer(this.app)
        const server = new ApolloServer({
            schema: Schema,
            formatError: (err) => {
                console.log(err)
                return err
            },
            plugins: [ApolloServerPluginDrainHttpServer({ httpServer })]

        });

        await server.start();

        this.app.use('/graphql', cors(), express.json(), expressMiddleware(server));
        await new Promise<void>((resolve) => httpServer.listen({ port }, resolve));
        console.log(`🚀 Server ready at ${(process.env.BACKEND_URL).replace("@@HASH@@", process.env.PORT)}`)
    }
}

export default new app()