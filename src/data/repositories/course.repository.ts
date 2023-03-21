import { connect } from './../config/user.db.config';
import { CoursePojo } from '../models/course.model';
import { UserCoursePojo } from '../models/user-course.model';

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

    async enroleCourse(newJoin: UserCoursePojo): Promise<string>{
        try{
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
            return  await this._courseRepository.findByPk(courseId).vacancies
        }catch(error){
            console.error(error)
            return -1
        }
    }

    async updateVacancies(courseId: string, newVacancies: number){ 
        try{
            const course = await this._courseRepository.findByPk(courseId).set({vacancies:newVacancies})
            await course.save()
        }catch(error){
            console.error(error)
        }
    }
}