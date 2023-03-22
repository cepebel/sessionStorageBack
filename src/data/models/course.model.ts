import {NUMBER, STRING, DATE, INTEGER} from 'sequelize'
import {Table, Column, Model, CreatedAt} from 'sequelize-typescript'

@Table({
    freezeTableName: true,
    schema: 'ejercicio-back',
    tableName: 'courses',
    createdAt: false,
    updatedAt: false

})

export class CoursePojo extends Model{
    @Column({
        type: STRING,
        primaryKey: true,
        field: 'courseId'
    })
    courseId!: string
    @Column({
        type: STRING,
        field: 'courseName'
    })
    courseName!: string
    @Column({
        type: STRING,
        field: 'courseDescription'
    })
    courseDescription!: string
    @Column({
        type: STRING,
        field: 'courseType',
        values: ['Sci', 'Tec', 'Art', 'Fic', 'Lit', 'Hum']
    })
    courseType: string
    @Column({
        type: INTEGER,
        field: 'ETS'
    })
    etsCredits!: number
    @Column({
        type: INTEGER,
        field: 'semester'
    })
    semester: number
    @Column({
        type: INTEGER,
        field: 'vacancies'
    })
    vacancies: number
 

}