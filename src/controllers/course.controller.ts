import { CourseService } from "../services/course.services";
const courseService: CourseService = new CourseService()

export const courseController = {
    addCourse: (req: any, res: any) =>{
        try{
            const newCourse = req.body
            courseService.addCourse(newCourse).then(result=>{
                res.json(result)
            })
        }catch(error){
            console.error(error)
            res.sendStatus(500)
        }
    },
    getAllCourses: (_req: any, res: any) =>{
        courseService.getAllCourses()
        .then(result => res.json(result))
        .catch(error => {
            console.error(error)
            res.sendStatus(500)
        })
    },
    getCourseById: (req: any, res:any) =>{
        try{
            const id = req.params.id
            courseService.getCourseById(id).then(result=>{
                res.json(result)
            })
        }catch(error){
            console.error(error)
            res.sendStatus(500)
        }
    },
    getJoinById: (req: any, res:any) =>{
        try{
            const id = req.params.id
            courseService.getJoinById(id).then(result=>{
                res.json(result)
            })
        }catch(error){
            console.error(error)
            res.sendStatus(500)
        }
    },
    getAllJoins:(_req: any, res: any) =>{
        courseService.getAllJoins()
        .then(result=> res.json(result))
        .catch(error =>{
            console.error(error)
            res.sendStatus(500)
        })
    },
    getUserJoins:(req:any, res:any)=>{
        try{
            const id = req.params.id
            courseService.getUserJoins(id).then(result=>{
                res.json(result)
            })
        }catch(error){
            console.error(error)
            res.sendStatus(500)
        }
    },
    getUserCourses:(req:any, res:any)=>{
        try{
            const id = req.params.id
            courseService.getUserCourses(id).then(result=>{
                res.json(result)
            })
        }catch(error){
            console.error(error)
            res.sendStatus(500)
        }
    },
    withdrawCourse: (req: any, res: any) =>{
        try{
            const course = req.body
            courseService.withdrawCourse(course).then(result=>{
                res = result
            })
        }catch(error){
            console.error(error)
            res.sendStatus(500)
        }
    },
    checkVacancies: (req: any, res: any)=>{
        try{
            const courseId = req.params.id
            courseService.checkVacancies(courseId).then(result=>{
                res = result
            })
        }catch(error){
            console.error(error)
            res.sendStatus(500)
        }
    },
    updateVacancies: (req: any, res: any)=>{
        try{
            const {courseId, vacancies} = req.body
            courseService.updateVacancies(courseId, vacancies).then(result=>{
                res=result
            })
        }catch(error){
            console.error(error)
        }
        
    },
    enroleCourse: (req: any, res:any)=>{
        try{
            const {userId, courseId} = req.body
            courseService.enroleCourse(userId, courseId).then(result=>{
                res.json(result)
            })
        }catch(error){
            console.error(error)
        }
    }
    

}