import {NUMBER, STRING, DATE} from 'sequelize'
import {Table, Column, Model} from 'sequelize-typescript'

@Table({
    freezeTableName: true,
    schema: 'ejercicio-back',
    tableName: 'users'
})

export class UserPojo extends Model{
    @Column({
        type: STRING,
        primaryKey: true,
        field: 'userId'
    })
    userId!: string
    @Column({
        type: STRING,
        field: 'username'
    })
    username!: string
    @Column({
        type: STRING,
        field: 'password'
    })
    password!: string
    @Column({
        type: STRING,
        field: 'email'
    })
    email!: string
    @Column({
        type: NUMBER,
        field: 'budget'
    })
    budget: number
    @Column({
        type: DATE,
        field: 'createdAt'
    })
    createdAt: string
    @Column({
        type: DATE,
        field: 'updatedAt'
    })
    updatedAt : string

}