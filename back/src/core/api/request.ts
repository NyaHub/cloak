import { IRequest, DRequest } from "../database";

export class RequestController {
    async create(tuuid: string, request: IRequest): Promise<IRequest> {
        if (tuuid != request.ThreadId && request.ThreadId) throw Error("Which id use?!")

        let req = await DRequest.create({
            ...request
        })

        return req.dataValues
    }

    async edit(tuuid: string, request: IRequest): Promise<IRequest> {
        if (tuuid != request.ThreadId && request.ThreadId) throw Error("Which id use?!")
        await DRequest.update(request, { where: { id: request.id, ThreadId: request.ThreadId } })
        let req = await DRequest.findByPk(request.id)

        return req.dataValues
    }

    async delete(tuuid: string, ruuid: string): Promise<boolean> {
        await DRequest.destroy({ where: { id: ruuid, ThreadId: tuuid } })
        return true
    }

    async get(tuuid: string, ruuid: string): Promise<IRequest> {
        let req = await DRequest.findOne({ where: { ThreadId: tuuid, id: ruuid } })

        return req.dataValues
    }

    async getAll(tuuid: string): Promise<IRequest[]> {
        let reqs = (await DRequest.findAll({ where: { ThreadId: tuuid } })).map(r => r.dataValues)
        return reqs
    }
}