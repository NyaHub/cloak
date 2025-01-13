import { Blacklist, DefaultUser, IUser, User } from "../database";

export class BWListController {
    async getBlack(luid: string) {
        return (await Blacklist.findOne({ where: { id: luid } })).dataValues
    }
    async getBlackAll(uuid: string) {
        return (await Blacklist.findAll({ where: { UserId: uuid } })).map(e => e.dataValues)
    }
    async getWhite(uuid: string, user: IUser) {
        if (uuid === user.id) {
            return user.whitelist
        }
        return (await User.findByPk(uuid)).dataValues.whitelist
    }
    async editBlack(list: string, luid: string) {
        await Blacklist.update({
            list
        }, { where: { id: luid } })
        return await this.getBlack(luid)
    }
    async editWhite(list: string, uuid: string) {
        await User.update({
            whitelist: list
        }, { where: { id: uuid } })
        return await this.getWhite(uuid, DefaultUser)
    }
    async createBlack(uuid: string) {
        return (await Blacklist.create({
            UserId: uuid,
            list: ""
        })).dataValues
    }
    async deleteBlack(luid: string) {
        await Blacklist.destroy({ where: { id: luid } })
        return true
    }
}