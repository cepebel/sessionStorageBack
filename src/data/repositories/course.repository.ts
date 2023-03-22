import { connect } from './../config/course.db.config';
import { CoursePojo } from '../models/course.model';
import { UserCoursePojo } from '../models/user-course.model';
import { v4 as uuid } from 'uuid'

export class CourseRepository{
    _db : any = {}
    _courseRepository : any
    _joinRepository : any

    constructor(){
        this._db = connect()
        this._courseRepository = this._db.sequelize.getRepository(CoursePojo)
        this._joinRepository = this._db.sequelize.getRepository(UserCoursePojo)
    }

    async addCourse(newCourse: CoursePojo): Promise<string>{
        try{
            console.log('Añadiendo curso')
            newCourse.courseId = uuid()
            newCourse = await this._courseRepository.create(newCourse)
            return newCourse.id
        }catch(error){
            console.error(error)
            return '000BASIC'
        }
    }

    async getAllCourses(): Promise<CoursePojo[]>{
        try{
            return await this._courseRepository.findAll()
        }catch(error){
            console.error(error)
            return []
        }
    }

    async getCoursesById(idArray: string[]): Promise<CoursePojo[]>{
        try{
            return await this._courseRepository.findAll({where:{courseId:idArray}})
        }catch(error){
            console.error(error)
            return []
        }
    }

    async getCourseById(id: string): Promise<CoursePojo | undefined>{
        try{
            return await this._courseRepository.findByPk(id)
        } catch (error){
            console.error(error)
            return undefined
        }
    }

    async getJoinById(id: string): Promise<UserCoursePojo | undefined>{
        try{
            return await this._joinRepository.findByPk(id)
        } catch(error){
            console.error(error)
            return undefined
        }
    }

    async getAllJoins(): Promise<UserCoursePojo[]>{
        try{
            return await this._joinRepository.findAll()
        }catch(error){
            console.error(error)
            return []
        }
    }

    async getUserJoins(id: string): Promise<UserCoursePojo[]>{
        try{
            return await this._joinRepository.findAll({where:{userId:id}})
        }catch(error){
            console.error(error)
            return []
        }
    }

    async enroleCourse(newJoin: UserCoursePojo): Promise<string>{
        try{
            console.log('creating join')
            newJoin = await this._joinRepository.create(newJoin)
            return newJoin.id
        }catch(error){
            console.error(error)
            return 'failed-to-register'
        }
    }

    async withdrawCourse(joinToDelete: UserCoursePojo): Promise<string>{
        try{
            joinToDelete = await this._joinRepository.destroy(joinToDelete)
            return 'Successfully-withdrawn'
        }catch(error){
            console.error(error)
            return 'fail-to-withdraw-course-'+ joinToDelete.courseId
        }

    }

    async checkVacancies(courseId: string): Promise<number>{
        try{
            const course = await this._courseRepository.findByPk(courseId)
            return course.vacancies
        }catch(error){
            console.error(error)
            return -1
        }
    }

    async updateVacancies(courseId: string, newVacancies: number): Promise<boolean>{ 
        try{
            const course = await this._courseRepository.findByPk(courseId)
            await course.set({vacancies:newVacancies})
            await course.save()
            return true
        }catch(error){
            console.error(error)
            return false
        }
    }
}