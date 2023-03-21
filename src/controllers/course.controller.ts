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
    }
}