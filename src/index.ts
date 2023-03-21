import express from 'express'

const app = express()
app.use(express.json())

const PORT = 3142

app.get('/ping', (_req, res)=>{
    console.log('Se ha hecho ping!')
    const MESSAGE: string = 'Pong'
    res.send(MESSAGE)
})

app.listen(PORT, () =>{
    console.log(`Servidor escuchando en el puerto ${PORT}`)
})