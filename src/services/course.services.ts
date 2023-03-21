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

    async updateVacancies(courseId: string, newVacancies: number){
        const updatePromise = await this._courseRepository.updateVacancies(courseId, newVacancies).catch(error=>{
            console.error(error)
            throw error
        })
    }

    async enroleCourse(userId: string, courseId: string): Promise<string | undefined>{
        if(!!this.getJoinById(userId+courseId)){
            return undefined
        }
        else{
            let vacancies = await this.checkVacancies(courseId)
            if(vacancies>0){
                const join: JoinDto = new JoinDto(userId, courseId)
                const dbjoin: UserCoursePojo = join as UserCoursePojo
                const enrolePromise = await this._courseRepository.enroleCourse(dbjoin).then(joinId=>{
                    const newVacs = vacancies-1
                    this.updateVacancies(courseId, newVacs)
                    return joinId
            }).catch(error=>{
                console.error(error)
                throw error
            })
                return enrolePromise
            }
            else{
                return 'no-spot-avaliable'
            }
            
        }

    }

}