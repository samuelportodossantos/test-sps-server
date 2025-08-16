import Joi from "joi";

export function userListValidation(data: any) {

    const scheme = Joi.object({
        page: Joi.number().default(1),
    })

    const { error, value } = scheme.validate(data)
    if (error) {
        throw new Error(`Invalid data for user list: ${error.message}`)
    }

    return value
}
