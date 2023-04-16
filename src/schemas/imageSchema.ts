import Joi from "joi"

export const imageSchema = Joi.object({
    url: Joi.string().required()
})