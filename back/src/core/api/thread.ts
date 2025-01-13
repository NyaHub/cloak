import { Blacklist, IFilter, IPageParams, IThread, IUser, PageLoadType, Thread, Allowance } from "../database";

export class ThreadController {

    checkPage(page: IPageParams): IPageParams {
        page.route ? 0 : (page.route = "/")
        Object.values(PageLoadType).includes(page.load) ? 0 : (page.load = PageLoadType.LOAD)
        return page
    }

    async checkFilter(filter: IFilter): Promise<IFilter> {
        filter.cloak = !!filter.cloak;
        filter.vpn = !!filter.vpn;
        filter.ipv6 = !!filter.ipv6;
        filter.clicks = !!filter.clicks;
        filter.UTMBlock = !!filter.UTMBlock;
        filter.referrBlock = !!filter.referrBlock;
        filter.geoBlock = !!filter.geoBlock;
        filter.devicesBlock = !!filter.devicesBlock;
        filter.refererEmpty = !!filter.refererEmpty;

        filter.geo instanceof Array ? 0 : (filter.geo = []);
        filter.devices instanceof Array ? 0 : (filter.devices = []);
        filter.referer instanceof Array ? 0 : (filter.referer = []);
        filter.UTM instanceof Array ? 0 : filter.UTM = [];

        (await Blacklist.findByPk(filter.blacklist)) ? 0 : filter.blacklist = null;

        return filter
    }

    async create(thread: IThread, creator: IUser): Promise<IThread> {
        if (creator.id != thread.UserId && creator.allowance > Allowance.Admin) throw Error("Low allowance level!")
        if (!thread.UserId) throw Error("No UserId!")
        let th = await Thread.create({
            name: thread.name,
            whitePage: this.checkPage(thread.whitePage),
            offerPage: this.checkPage(thread.offerPage),
            filters: await this.checkFilter(thread.filters),
            status: !!thread.status,
            UserId: thread.UserId
        })

        return th.dataValues
    }

    async edit(tuuid: string, thread: IThread, editor: IUser): Promise<IThread> {
        if (editor.id != thread.UserId && editor.allowance > Allowance.Admin) throw Error("Low allowance level!");
        if (!thread.UserId) throw Error("No UserId!");
        if (tuuid != thread.id && thread.id) throw Error("Which id use?!")
        await Thread.update({
            name: thread.name,
            whitePage: this.checkPage(thread.whitePage),
            offerPage: this.checkPage(thread.offerPage),
            filters: await this.checkFilter(thread.filters),
            status: !!thread.status,
            UserId: thread.UserId
        }, {
            where: {
                id: tuuid
            }
        })

        let th = await Thread.findByPk(tuuid)

        return th.dataValues
    }

    async delete(tuuid: string, deleter: IUser): Promise<boolean> {
        let th = await Thread.findByPk(tuuid)
        if (th.dataValues.UserId != deleter.id && deleter.allowance > Allowance.Admin) throw Error("Low allowance level!")
        await th.destroy()
        return true
    }

    async get(tuuid: string, user: IUser): Promise<IThread> {
        let th = await Thread.findByPk(tuuid)
        if (th.dataValues.UserId != user.id && user.allowance > Allowance.Admin) throw Error("Low allowance level!")

        return th.dataValues
    }

    async getAll(user: IUser): Promise<IThread[]> {
        let th = (await Thread.findAll({ where: { UserId: user.id } })).map(t => t.dataValues)

        return th
    }
}