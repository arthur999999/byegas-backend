import Joi from "joi";

export const alarmSchema = Joi.object({
    id: Joi.number().required(),
    valueGas: Joi.number().required(),
    inGwei: Joi.boolean().required()
})