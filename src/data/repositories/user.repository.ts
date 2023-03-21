import { connect } from './../config/user.db.config';
import { UserPojo } from "../models/user.model";

export class UserRepository{
    _db : any = {}
    _userRepository : any

    constructor(){
        this._db = connect()
        this._userRepository = this._db.sequelize.getRepository(UserPojo)
    }

    async addUser(newUser: UserPojo): Promise<string>{
        try{
            newUser = await this._userRepository.create(newUser)
            return newUser.id
        }catch(error){
            console.error(error)
            return '-1'
        }
    }

    async getAllUsers(): Promise<UserPojo[]>{
        try{
            return await this._userRepository.findAll()
        }catch(error){
            console.error(error)
            return []
        }
    }

    async getUserById(id: string): Promise<UserPojo | undefined>{
        try{
            return await this._userRepository.findByPk(id)
        } catch (error){
            console.error(error)
            return undefined
        }
    }
}