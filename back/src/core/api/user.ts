import { Allowance, IUser, IUserEdit, User } from "../database";
import { Session } from "../session";
import { createToken } from "../utils";

export class UserController {
    async registerFromAdmin(email: string): Promise<IUser> {
        const user = await User.create({
            email
        })

        return user.dataValues
    }

    async login(token: string, session: Session): Promise<IUser> {
        const user = await User.findOne({
            where: {
                token
            }
        })

        await session.setData({
            uuid: user.dataValues.id
        })

        return user.dataValues
    }

    async get(uuid: string, user: IUser): Promise<IUser> {
        if (uuid === user.id) {
            return user
        }

        let id = uuid || user.id

        const u = await User.findByPk(id)

        return u.dataValues
    }

    async edit(uuid: string, user: IUser, creator: IUser): Promise<IUser> {
        let id = uuid || user.id
        let ed
        if (creator.allowance > Allowance.Admin) {
            ed = {
                email: user.email,
                name: user.name
            }
        } else {
            ed = {
                email: user.email,
                name: user.name,
                token: user.token,
                allowance: user.allowance,
                balance: user.balance
            }
        }
        await User.update(ed, { where: { id } })
        const u = await User.findByPk(id)

        return u.dataValues
    }

    generateToken(): string {
        return createToken()
    }

    async delete(uuid: string, user: IUser): Promise<boolean> {
        let id = uuid || user.id
        await User.destroy({
            where: {
                id
            }
        })

        return true
    }

    async allowance(uuid: string, allowance: Allowance): Promise<IUser> {
        let u = await User.update({
            allowance
        }, {
            where: {
                id: uuid
            }
        })

        return (await User.findByPk(uuid)).dataValues
    }
}