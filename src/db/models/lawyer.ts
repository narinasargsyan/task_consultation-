import mongoose from 'mongoose';
const uuid = require('node-uuid');
const lawyerSchema = new mongoose.Schema(
    {
        _id: { type: String, default: uuid.v1 },
        firstName: { type: String, required: true },
        lastName: { type: String, required: true },
        patronymic: { type: String, required: true },
        password: { type: String, required: true },
        laws : { type: String, enum:['family law', 'civil law', 'worker law'], default: 'worker law' }
    },
    {
        timestamps: true,
    }
);
const Lawyer = mongoose.model('Lawyer', lawyerSchema);
export default Lawyer;
