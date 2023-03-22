import { Sequelize } from "sequelize-typescript";
import { CoursePojo } from "../models/course.model";
import { UserCoursePojo } from "../models/user-course.model";

export const connect = () =>{
    const DB_HOSTNAME = 'localhost'
    const DB_PORT = 5432
    const DB_NAME = 'postgres'
    const DB_USERNAME = 'postgres'
    const DB_PASSWORD = 'd3cj'
    const DB_SCHEMA  = 'ejercicio-back'
    const DB_DIALECT: any = 'postgres' // En realidad es un db dialect y no un string

    const sequelize = new Sequelize(DB_NAME, DB_USERNAME, DB_PASSWORD, {
        host: DB_HOSTNAME, 
        dialect: DB_DIALECT, 
        port: DB_PORT, 
        schema: DB_SCHEMA,
        repositoryMode: true,
        pool: {
            max: 10,
            min: 0,
            acquire: 20000,
            idle: 5000
        }
    })

    sequelize.addModels([CoursePojo, UserCoursePojo])
    const db : any = {}
    db.Sequelize = Sequelize // Conexion con la librería de sequelize.
    db.sequelize = sequelize // Conexión con los parámetros de conexión.

    return db
}