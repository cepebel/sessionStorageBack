import { connect } from './../config/user.db.config';
import { UserDto } from '../../types';
import { UserPojo } from "../models/user.model";
import { v4 as uuid } from 'uuid'

export class UserRepository{
    _db : any = {}
    _userRepository : any

    constructor(){
        this._db = connect()
        this._userRepository = this._db.sequelize.getRepository(UserPojo)
    }

    async addUser(newUser: UserDto): Promise<string>{
        try{
            newUser.userId = uuid()
            newUser = await this._userRepository.create(newUser)
            return newUser.userId
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

    async getUserByEmail(userEmail: string): Promise<UserPojo|undefined>{
        try{
            return await this._userRepository.findOne({where: {email: userEmail}})
        }catch(error){
            console.error(error)
            return undefined
        }
    }
}