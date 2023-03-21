import {NUMBER, STRING, DATE} from 'sequelize'
import {Table, Column, Model} from 'sequelize-typescript'

@Table({
    freezeTableName: true,
    schema: 'ejercicio-back',
    tableName: 'user-course'
})

export class UserCoursePojo extends Model{
    @Column({
        type:STRING,
        primaryKey: true,
        field: 'joinId'
    })
    joinId!: string
    @Column({
        type: STRING,
        field: 'userId'
    })
    userId: string
    @Column({
        type: STRING,
        field: 'courseId'
    })
    courseId: string
   

}