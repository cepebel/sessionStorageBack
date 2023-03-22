import { CourseRepository } from "../data/repositories/course.repository";
import { CoursePojo } from "../data/models/course.model";
import { CourseDto } from "../types";
import { UserCoursePojo  } from '../data/models/user-course.model';
import { JoinDto } from "../types";

export class CourseService{
    _courseRepository: CourseRepository

    constructor(){
        this._courseRepository = new CourseRepository()
    }

    async addCourse(course: CourseDto): Promise<string>{
        const dbcourse: CoursePojo = course as CoursePojo
        const coursePromise = await this._courseRepository.addCourse(dbcourse).then(courseId=>{
            return courseId
        }).catch(error=>{
            console.error(error)
            throw error
        })
        return coursePromise
    }

    async getAllCourses(): Promise<CourseDto[]>{
        const coursesPromise = await this._courseRepository.getAllCourses().then(courses=>{
            return courses
        }).catch(error=>{
            console.error(error)
            throw error
        })
        return coursesPromise
    }

    async getCourseById(id:string): Promise<CourseDto | undefined>{
        const coursePromise = await this._courseRepository.getCourseById(id).then(course=>{
            return course
        }).catch(error=>{
            console.error(error)
            throw error
        })
        return coursePromise
    }

    async getJoinById(id: string): Promise<JoinDto | undefined>{
        const joinPromise = await this._courseRepository.getJoinById(id).then(join=>{
            return join
        }).catch(error=>{
            console.error(error)
            throw error
        })
        return joinPromise
    }

    async getUserJoins(id:string): Promise<JoinDto[]>{
        const joinsPromise = await this._courseRepository.getUserJoins(id).then(joins=>{
            return joins
        }).catch(error=>{
            console.error(error)
            throw error
        })
        return joinsPromise
    }

    async getUserCourses(id:string): Promise<CourseDto[]| undefined>{
        let userJoins = await this.getUserJoins(id)
        if(userJoins.length>0){
            let coursesIdArray = []
            for(let i=0; i<userJoins.length; i++){
                coursesIdArray.push(userJoins[i].courseId)
            }
            const coursesPromise = await this._courseRepository.getCoursesById(coursesIdArray)
            return coursesPromise
        }
        else{
            return undefined
        }
    }
    
    async getAllJoins(): Promise<JoinDto[]>{
        const allJoinsPromise = await this._courseRepository.getAllJoins().then(joins=>{
            return joins
        }).catch(error=>{
            console.error(error)
            throw error
        })
        return allJoinsPromise
    }

    async withdrawCourse(joinToDelete: JoinDto): Promise<string>{
        const dbjoinToDelete: UserCoursePojo = joinToDelete as UserCoursePojo
        const deletePromise = await this._courseRepository.withdrawCourse(dbjoinToDelete).then(message=>{
            return message
        }).catch(error=>{
            console.error(error)
            throw error
        })
        return deletePromise
    }

    async checkVacancies(courseId: string): Promise<number>{
        const vacanciesPromise = await this._courseRepository.checkVacancies(courseId).then(vacancies=>{
            return vacancies
        }).catch(error=>{
            console.error(error)
            throw error
        })
        return vacanciesPromise
    }

    async updateVacancies(courseId: string, newVacancies: number): Promise<boolean>{
        const updatePromise = await this._courseRepository.updateVacancies(courseId, newVacancies).then(result=>{
            return result
        }).catch(error=>{
            console.error(error)
            throw error
        })
        return updatePromise
    }

    async enroleCourse(userId: string, courseId: string): Promise<string | undefined>{
        let joinByIdResult = await this.getJoinById(userId+courseId)
        if(joinByIdResult!=undefined){
            console.log('estoy aquí! hola')
            return undefined
        }
        else{
            let vacancies = await this.checkVacancies(courseId)
            console.log(vacancies)
            if(vacancies>0){
                console.log('Suerte! quedan plazas')
                const join: JoinDto = new JoinDto(userId, courseId)
                const dbjoin: UserCoursePojo = join as UserCoursePojo
                const enrolePromise = await this._courseRepository.enroleCourse(dbjoin).then(joinId=>{
                return joinId
            }).catch(error=>{
                console.error(error)
                throw error
            })
                const newVacs = vacancies-1
                await this.updateVacancies(courseId, newVacs)
                return enrolePromise
            }
            else{
                return 'no-spot-avaliable'
            }
            
        }

    }

}