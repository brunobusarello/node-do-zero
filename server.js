import { fastify } from 'fastify'
import { DatabasePostgres } from './database-postgres.js'
import cors from '@fastify/cors'
import path from 'path'
import { fileURLToPath } from 'url'
import fastifyStatic from '@fastify/static'
//import { DatabaseMemory} from './database-memory.js'

const server = fastify({ logger: true })
//const dataBase = new DatabaseMemory
const dataBase = new DatabasePostgres

// Obter __dirname com ES Modules
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Registrar o plugin fastify-static para servir arquivos estáticos
server.register(fastifyStatic, {
  root: path.join(__dirname, 'public'),
  prefix: '/front/', // Prefixo opcional
});

server.register(cors, {
    origin: '*' // Permitir todas as origens
})

server.get('/videos', async(request, reply) => {
    const search = request.query.search

    const video = await dataBase.list(search)

    reply.sendFile('videos.html')

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
    port: process.env.PORT ?? 3000
})