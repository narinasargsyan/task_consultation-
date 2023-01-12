import * as bcrypt from "bcrypt";
import Client from "../../db/models/clients";
import Consultation from "../../db/models/consultation"
const  authService = require("../services/auth.service");
import * as uuid from 'node-uuid'
const { ObjectID } = require('mongodb')
const moment = require('moment')
class ClientController {
    signUp = async (req, res) => {
        try {
            const { firstName, lastName, patronymic, phone, password} = req.body;
            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash(password, salt);
            await Client.create({
                firstName,
                lastName,
                patronymic,
                phone,
                password: hashedPassword,
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
            const isClientExists = await Client.findOne({ phone });
            if (!isClientExists) {
                res.status(400).send("Client not exists");
                return;
            }
            const validPassword = await bcrypt.compare(
                password,
                isClientExists.password
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

    record =  async (req, res) => {
        try {
           const { phone } = req.payload;
           const { lawyerId, date, startTime} = req.body;
            const start= moment(startTime)
            const end = new Date(start.valueOf() + (40 * 60 * 1000));
           const client = await Client.findOne({ phone });
            const overlappingConsultations = await Consultation.find({
                startTime: { $lt: end },
                endTime: { $gt: startTime },
            });

            if(overlappingConsultations.length){
                res.send('Consultation is exist')
            }else{
                await Consultation.create({
                    clientId: client._id,
                    lawyerId: uuid.v1(lawyerId),
                    date:date,
                    startTime:start,
                    endTime:end,
                });
                res.send("You are successfully record the consultation");
            }

        } catch (err) {
            res.status(400).send("Something went wrong");
            console.log("error=>", err);
        }
    };
}

export default ClientController;
