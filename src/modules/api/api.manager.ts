import environment from "../config/environment"
import express, { Router, Express } from "express"
import cors from "cors"

export default class ApiManager {

    private app: Express = express()

    constructor() {
        this.app.use(cors())
        this.app.use(express.json())
        this.app.use(express.urlencoded({extended: true}))
    }

    useRouter(path: string, router: Router){
        this.app.use(path, router)
    }

    run() {
        this.app.listen(environment.api.port, () => console.log(`Running API at port ${environment.api.port}`))
    }
    
}