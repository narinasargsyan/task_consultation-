import mongoose from 'mongoose';
const uuid = require('node-uuid');
const clientSchema = new mongoose.Schema(
    {
        _id: { type: String, default: uuid.v1 },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        patronymic: { type: String, required: true },
        phone: { type: String, required: true },
        password: { type: String, required: true },
    },
    {
        timestamps: true,
    }
);
const Client = mongoose.model('Client', clientSchema);
export default Client;
