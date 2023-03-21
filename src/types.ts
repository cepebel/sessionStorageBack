export class UserDto{
    userId: string
    username: string
    password: string
    email: string
    budget: number
    createdAt: string
    updatedAt: string
}
export class CourseDto{
    courseId: string
    courseName: string
    courseDescription: string
    courseType: string
    etsCredits: number
    semester: number
    vacancies: number
}
export class JoinDto{
    joinId: string
    courseId: string
    userId: string

    constructor(newUserId: string, newCourseId: string){
        this.joinId = newUserId+newCourseId
        this.courseId = newCourseId
        this.userId = newUserId
    }
}