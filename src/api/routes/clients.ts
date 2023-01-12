import * as express from "express";
const clientRouter = express.Router();
import ClientController from "../controller/client_controller";
import registerMiddleware from "../middleweares/validationMiddlewear";
import auth from "../middleweares/authentication.middlewear";

const client = new ClientController();
const {  authenticate } = auth;

clientRouter.post("/signup", registerMiddleware, client.signUp);
clientRouter.post("/signin", client.signIn);
clientRouter.use(authenticate);
clientRouter.post("/record",client.record)

export { clientRouter };
