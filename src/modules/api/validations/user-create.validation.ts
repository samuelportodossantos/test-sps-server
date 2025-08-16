import Joi from "joi";
import { VALID_EMAIL_REGEX, VALID_PASSWORD_REGEX } from "./validation.consts";

export function userCreateValidation(data: any) {

    const scheme = Joi.object({
        email: Joi.string().pattern(VALID_EMAIL_REGEX).required(),
        name: Joi.string().required(),
        type: Joi.string().required(),
        password: Joi.string().pattern(VALID_PASSWORD_REGEX).required(),
    })

    const { error, value } = scheme.validate(data)
    if (error) {
        throw new Error(`Invalid data for user creation: ${error.message}`)
    }

    return value
}
