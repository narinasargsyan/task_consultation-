import mongoose from 'mongoose';
const uuid = require('node-uuid');
const Schema = mongoose.Schema;
const consultationSchema = new mongoose.Schema(
    {
        _id: { type: String, default: uuid.v1 },
        clientId: { type: String,default:uuid.v1, ref: 'Client'},
        lawyerId: { type: String,default:uuid.v1, ref: 'Lawyer'},
        startTime: { type: Date, required: true },
        endTime: { type: Date, required: true },
    },
    {
        timestamps: true,
    }
);
const Consultation = mongoose.model('Consultation', consultationSchema);
export default Consultation;
