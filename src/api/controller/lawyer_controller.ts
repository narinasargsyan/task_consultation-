import * as bcrypt from "bcrypt";
import Lawyer from "../../db/models/lawyer";
const  authService = require("../services/auth.service");

class LawyerController {
    signUp = async (req, res) => {
        try {
            const { firstName, lastName, patronymic, phone, password, laws } = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await Lawyer.create({
                firstName,
                lastName,
                patronymic,
                phone,
                password: hashedPassword,
                laws,
            });
            res.send("Your registering is successfully");
        } catch (err) {
            res.status(400).send("Something went wrong");
            console.log("error=>", err);
        }
    };

    signIn = async (req, res) => {
        try {
            const { phone, password } = req.body;
            const isLawyerExists = await Lawyer.findOne({ phone });
            if (!isLawyerExists) {
                res.status(400).send("Lawyer not exists");
                return;
            }
            const validPassword = await bcrypt.compare(
                password,
                isLawyerExists.password
            );
            if (!validPassword) {
                res.status(400).send("Credentials are invalid");
                return;
            }

            const auth = { phone };
            const accessToken = await authService.signAccessToken(auth);

            const result = {
                accessToken,
            };
            res.status(200).send(result);
        } catch (err) {
            console.log("err", err);
            res.status(400).send("Something went wrong");
            console.log("error=>", err);
        }
    };
}

export default LawyerController;
