import { UserService} from "../services/user.service"
const userService: UserService = new UserService()

export const userController = {
    addUser : (req: any, res: any) =>{
        try{
            const newUser = req.body
            userService.addUser(newUser).then(result =>{
                res.json(result)
            })
        }catch(error){
            console.error(error)
            res.sendStatus(500)
        }
    },
    getAllUser: (_req: any, res:any) =>{
        userService.getAllUsers()
        .then(result => res.json(result))
        .catch(error => {
            console.error(error)
            res.sendStatus(500)
        })
    },
    getUserById : (req: any, res: any) =>{
        try{
            const userId = req.params.id // añadir '+' fuerza a que el valor que se devuelva sea un número
            userService.getUserById(userId).then(result =>{
                res.json(result)
            })
        }catch(error){
            console.error(error)
            res.sendStatus(500)
        }
    },
    getUserByEmail: (req: any, res: any) =>{
        try{
            const userEmail = req.params.email
            userService.getUserByEmail(userEmail).then(result=>{
                res.json(result)
            })
        }catch(error){
            console.error(error)
            res.sendStatus(500)
        }
    }

}