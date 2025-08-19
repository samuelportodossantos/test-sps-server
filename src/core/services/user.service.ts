import environment from "../../modules/config/environment";
import { checkHashPassword, passwordToHash } from "../../modules/security/crypto";
import { DBInterface } from "../interfaces/db.interface";
import { Service } from "./service";
import jwt from "jsonwebtoken";

export class UserService extends Service{

    constructor(repository: DBInterface){
        super(repository);
    }

    public async authenticate(email: string, password: string): Promise<any> {
        const user = await this.repository.findByField('email', email)
        if (user && await checkHashPassword(password, user.password)) {
            const payload = { email: email };
            const token = jwt.sign(
                payload,
                String(environment.api.token.secretKey),
                { expiresIn: environment.api.token.jwtTTL as unknown as number }
            );
            return token;
        }
        return null;
    }

    public async createIfNotExists(user: any): Promise<any> {
        const registeredUser = await this.repository.findByField('email', user.email)
        if (registeredUser) {
            throw new Error(`User email(${user.email}) already registered, please choose other.`)
        }
        user.password = await passwordToHash(user.password)
        return await this.repository.insert(user)
    }

    public async updateIfNotExists(user: any): Promise<any> {
        const registeredUser = await this.repository.findByField('email', user.email)
        if (registeredUser && user.id !== registeredUser.id) {
            throw new Error(`User email(${user.email}) already registered, please choose other.`)
        }
        return await this.repository.update(user.id, user)
    }
    
}