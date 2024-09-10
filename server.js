import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'
//import { DatabaseMemory} from './database-memory.js'

const server = fastify()
//const dataBase = new DatabaseMemory
const dataBase = new DatabasePostgres

server.register(require('@fastify/cors'), { 
    origin: '*' // Permitir todas as origens
});

server.get('/videos', async(request, reply) => {
    const search = request.query.search

    const video = await dataBase.list(search)

    return video
})

server.post('/videos', async(request, reply) =>{
    const { title, description, duration} = request.body
    
    await dataBase.create({
        title,
        description,
        duration
    })

    return reply.status(201).send()
})

server.put('/videos/:id', async(request, reply) => {
    const videoID = request.params.id
    const { title, description, duration } = request.body

    await dataBase.update(videoID, {
        title,
        description,
        duration
    })

    return reply.status(204).send()
})

server.delete('/videos/:id', async(request, reply) => {
    const videoID = request.params.id

    await dataBase.delete(videoID)

    return reply.status(204).send()
})

server.listen({
    host: '0.0.0.0',
    port: process.env.PORT ?? 3333
})