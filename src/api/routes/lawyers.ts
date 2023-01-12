import * as express from "express";
const lawyerRouter = express.Router();
import LawyerController from "../controller/lawyer_controller";
import registerMiddleware from "../middleweares/validationMiddlewear";
import auth from "../middleweares/authentication.middlewear";

const lawyer = new LawyerController();
const {  authenticate } = auth;

lawyerRouter.post("/signup", registerMiddleware, lawyer.signUp);
lawyerRouter.post("/signin", lawyer.signIn);
lawyerRouter.use(authenticate);

export { lawyerRouter };
