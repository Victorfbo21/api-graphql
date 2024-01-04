"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.app = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const http_1 = __importDefault(require("http"));
const cors_1 = __importDefault(require("cors"));
const express_1 = __importDefault(require("express"));
const server_1 = require("@apollo/server");
const schemas_1 = require("./infra/schemas");
const drainHttpServer_1 = require("@apollo/server/plugin/drainHttpServer");
const express4_1 = require("@apollo/server/express4");
class app {
    constructor() {
        this.app = (0, express_1.default)();
        this.startApolloServer();
    }
    async startApolloServer() {
        try {
            const dbConnect = await mongoose_1.default.connect(process.env.MONGO_URL, {
                useNewUrlParser: true,
                useUnifiedTopology: true,
                dbName: process.env.DB_NAME,
            });
        }
        catch (error) {
            console.log(error);
            throw error;
        }
    }
    async listen(port) {
        const httpServer = http_1.default.createServer(this.app);
        const server = new server_1.ApolloServer({
            schema: schemas_1.Schema,
            formatError: (err) => {
                console.log(err);
                return err;
            },
            plugins: [(0, drainHttpServer_1.ApolloServerPluginDrainHttpServer)({ httpServer })]
        });
        await server.start();
        this.app.use('/graphql', (0, cors_1.default)(), express_1.default.json(), (0, express4_1.expressMiddleware)(server));
        await new Promise((resolve) => httpServer.listen({ port }, resolve));
        console.log(`🚀 Server ready at ${(process.env.BACKEND_URL).replace("@@HASH@@", process.env.PORT)}`);
    }
}
exports.app = app;
exports.default = new app();
