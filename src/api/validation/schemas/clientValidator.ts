export const ClientValidator = {
    schema: {
        firstName: { type: 'string' },
        lastName: { type: 'string' },
        patronymic: { type: 'string' },
        phone: { type: 'string' },
        password: { type: "string", min: 8, max: 15 },
    },
};
