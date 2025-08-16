import ApiManager from "./modules/api/api.manager"
import authRoutes from "./modules/api/routes/authenticate.routes"
import userRoutes from "./modules/api/routes/user.routes"

(async()=>{
  
  const api = new ApiManager()
  api.useRouter('/users', userRoutes)
  api.useRouter('/auth', authRoutes)
  api.run()

})()