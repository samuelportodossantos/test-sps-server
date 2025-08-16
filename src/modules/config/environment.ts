import { configDotenv } from "dotenv"
import Joi = require("joi")

configDotenv()

interface Environment {
    api: {
        port: number;
        token: {
           secretKey: string;
            jwtTTL: string;
        }
    };
    defaultUser: {
        email: string;
        password: string;
    };
}

const scheme = Joi.object({
    api: {
        port: Joi.number().default(3000),
        token: {
            secretKey: Joi.string().required(),
            jwtTTL: Joi.string().default('1h')
        }
    },
    defaultUser: {
        email: Joi.string(),
        password: Joi.string()
    }
})
const toValidate = {
    api: {
        port: process.env.API_PORT,
        token: {
            secretKey: process.env.JWT_SECRET_KEY,
            jwtTTL: process.env.JWT_TTL
        }
    },
    defaultUser: {
        email: process.env.DEFAULT_USER,
        password: process.env.DEFAULT_PASSWORD
    }
}
const { error, value: environment } = scheme.validate(toValidate)

if (error) {
    throw new Error(`Invalid environment variables: ${error.message}`)
}

export default environment as Environment