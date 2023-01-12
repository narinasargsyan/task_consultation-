import Validator from "fastest-validator";
import { ClientValidator } from "../validation/schemas/clientValidator";
import { LawyerValidator } from "../validation/schemas/lawyerValidator";
const v = new Validator();

const registerMiddleware = async (req, res, next) => {
  const validationClient = v.compile(ClientValidator.schema);
  const validationLawyer = v.compile(LawyerValidator.schema);
  const result = validationClient(req.body) || validationLawyer(req.body);
  if (Array.isArray(result)) {
    return res.status(409).json(result);
  }
  next();
};

export default registerMiddleware;
