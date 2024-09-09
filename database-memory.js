import { randomUUID } from "crypto"

export class DatabaseMemory {
    #videos = new Map()

    list(){
        return Array.from(this.#videos)
            .map((videoArray) => {
                const id = videoArray[0]
                const content = videoArray[1]

                return {
                    id,
                    ...content,
                }
            })
    }

    create(values){
        const videoID = randomUUID()

        this.#videos.set(videoID, values)
    }

    update(videoID, video){
        this.#videos.set(videoID, video)
    }

    delete(videoID){
        this.#videos.delete(videoID)
    }
}