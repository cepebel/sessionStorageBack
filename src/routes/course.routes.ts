import express from 'express'
import { courseController } from '../controllers/course.controller'

const router = express.Router()
router.post('/add', courseController.addCourse)
router.get('/all', courseController.getAllCourses)
router.get('/get/:id', courseController.getCourseById)
router.get('/get/join/:id', courseController.getJoinById)
router.get('/get/join/all', courseController.getAllJoins)
router.get('/get/join/user/:id', courseController.getUserJoins)
router.get('/get/courses/user/:id', courseController.getUserCourses)
router.post('/withdraw', courseController.withdrawCourse)
router.get('/getVacancies/:id', courseController.checkVacancies)
router.post('/updateVacancies', courseController.updateVacancies)
router.post('/enrole', courseController.enroleCourse)


export default router
module.exports = router