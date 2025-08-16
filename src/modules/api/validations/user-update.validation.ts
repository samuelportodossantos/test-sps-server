import Joi from "joi";
import { VALID_EMAIL_REGEX, VALID_PASSWORD_REGEX } from "./validation.consts";

export function userUpdateValidation(data: any) {
    
    const scheme = Joi.object({
        id: Joi.number().required(),
        email: Joi.string().pattern(VALID_EMAIL_REGEX),
        name: Joi.string(),
        type: Joi.string(),
        password: Joi.string().pattern(VALID_PASSWORD_REGEX),
    })

    const { error, value } = scheme.validate(data)
    if (error) {
        throw new Error(`Invalid data for user update: ${error.message}`)
    }

    return value
}
