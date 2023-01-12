const  moment =  require('moment');
import cron from "cron";
import Client from '../../db/models/clients'
import Lawyer from '../../db/models/lawyer'
import consultation from '../../db/models/consultation'
import * as winston from "winston";
const logger = winston.createLogger({
    transports: [
        new winston.transports.File({ filename: "reminders.log" })
    ]
});

const sendReminders = async (consultation) => {
    try {
        const client = await Client.findById(consultation.clientId);
        if (!client) {
            throw new Error(`Client not found for consultation: ${consultation._id}`);
        }
        const lawyer = await Lawyer.findById(consultation.lawyerId);
        if (!lawyer) {
            throw new Error(`Lawyer not found for consultation: ${consultation._id}`);
        }
        const reminderDate = moment(consultation.startTime).subtract(1,'d');
        logger.info(`${reminderDate} | Привет ${client.firstName}. Напоминаем о консультации с юристом ${lawyer.firstName} завтра в ${consultation.startTime.format()}.`);
    } catch (err) {
        logger.error(err.message);
    }
};
const sendRemindersTwoHours = async (consultation) => {
    try{
        const client = await Client.findById(consultation.clientId);
        if (!client) {
            throw new Error(`Client not found for consultation: ${consultation._id}`);
        }
        const lawyer = await Lawyer.findById(consultation.lawyerId);
        if (!lawyer) {
            throw new Error(`Lawyer not found for consultation: ${consultation._id}`);
        }
        logger.info(`${consultation.startTime} | Привет ${client.firstName}. Через 2 часа у вас консультация с юристом ${lawyer.firstName}.`);
    } catch (err) {
        logger.error(err.message);
    }
};

const reminderJob = new cron.CronJob("*/1 * * * *", async() => {
    try{
        console.log('START reminderJob')
        const currentDate = moment();
        const oneDay = moment.duration(1, 'days');
        const query = {
            startTime: { $gte: currentDate, $lt: currentDate.clone().add(oneDay) }
        };
        const consults = await consultation.find(query);
        for (let consultation of consults) {
            await sendReminders(consultation);
        }
    } catch (e) {
        console.log('Failed reminderJob', e)
    }


});

const reminderTwoHoursJob = new cron.CronJob("*/1 * * * *", async() => {
    try {
        console.log('START reminderTwoHoursJob')
        const currentDate = moment();
        const from = currentDate;
        const to = currentDate.clone().add(2, 'hour')

        console.log('from', from, 'to', to)

        const query = {
            startTime: { $gte: from, $lt:  to}
        };
        const consults = await consultation.find(query)
        console.log('consults', consults)
        for (let consultation of consults) {
            await sendRemindersTwoHours(consultation);
        }
        console.log('Finish reminderTwoHoursJob')
    } catch (e) {
        console.log('Failed reminderTwoHoursJob', e)
    }
});
export default  { reminderJob, reminderTwoHoursJob }
