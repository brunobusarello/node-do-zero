import { randomUUID } from "crypto";
import { sql } from "./db.js";

export class DatabasePostgres {
    async list(search){
        let video 

        if(search){
            video = await sql`select * from videos where title ilike ${'%' + search + '%'}`
        }
        else{
            video = await sql`select * from videos`
        }

        return video
    }

    async create(video){
        const videoID = randomUUID()
        const {title, description, duration} = video
        await sql`insert into videos (id, title, description, duration) values (${videoID}, ${title}, ${description}, ${duration})`
    }

    async update(videoID, content){
        const {title, description, duration} = content
        await sql`update videos set title=${title}, description=${description}, duration=${duration} where id=${videoID}`
    }

    async delete(videoID){
        await sql`delete from videos where id=${videoID}`
    }
}