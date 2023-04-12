import Joi from "joi";

export const telegramSchema = Joi.object({
    telegramId: Joi.number().required()
})