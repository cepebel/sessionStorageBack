import { UserRepository } from "../data/repositories/user.repository";
import { UserPojo as UserDto } from "../data/models/user.model";

export class UserService{
    _userRepository: UserRepository

    constructor(){
        this._userRepository = new UserRepository()
    }

    async addUser(user: UserDto) : Promise<string>{
        const userPromise = await this._userRepository.addUser(user).then(userId=>{
            return user.userId
        }).catch(error=>{
            console.error(error)
            throw error
        })
        return userPromise
    }

    async getAllUsers(): Promise<UserDto[]>{
        const usersPromise = await this._userRepository.getAllUsers().then(users=>{
            return users
        }).catch(error=>{
            console.error(error)
            throw error
        })
        return usersPromise
    }

    async getUserById(id: string): Promise<UserDto | undefined>{
        const userPromise = await this._userRepository.getUserById(id).then(user=>{
            return user
        }).catch(error=>{
            console.error(error)
            throw error
        })
        return userPromise
    }

    async getUserByEmail(email: string): Promise<UserDto|undefined>{
        const userPromise = await this._userRepository.getUserByEmail(email).then(user=>{
            return user
        }).catch(error=>{
            console.error(error)
            throw error
        })
        return userPromise
    }
}