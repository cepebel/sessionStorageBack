import express from 'express'
import userRouter from './routes/user.routes'
import courseRoutes from './routes/course.routes'

const app = express()
app.use(express.json())
var cors = require('cors');
app.use(cors());

const PORT = 3142

app.get('/ping', (_req, res)=>{
    console.log('Se ha hecho ping!')
    const MESSAGE: string = 'Pong'
    res.send(MESSAGE)
})

app.use('/api/users', userRouter)

app.use('/api/courses', courseRoutes)

app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})