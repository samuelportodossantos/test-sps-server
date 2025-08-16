import Joi from "joi";

export function userDeleteValidation(data: any) {

    const scheme = Joi.object({
        id: Joi.number().required()
    })

    const { error, value } = scheme.validate(data)
    if (error) {
        throw new Error(`Invalid data for user delete: ${error.message}`)
    }

    return value
}
