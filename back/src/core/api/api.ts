import { NextFunction, Router, Response } from "express"
import { AuthRequest, session } from "../session"
import { UserController } from "./user"
import { Allowance } from "../database"
import { ThreadController } from "./thread"
import { RequestController } from "./request"

export class API {
    public router

    constructor() {
        this.router = Router()

        this.enableAccRoutes()
        this.enableRequestRoutes()
        this.enableThreadRoutes()
    }

    enableAccRoutes() {
        const UserCtrl = new UserController()
        this.router.post("/acc/register", [this.allowance(Allowance.Guest), this.request(UserCtrl, UserCtrl.registerFromAdmin, [
            "body.email"
        ])])
        this.router.post("/acc/login", [this.request(UserCtrl, UserCtrl.login, [
            "body.token",
            "session."
        ])])
        this.router.post("/acc/allowance/:uuid", [this.allowance(Allowance.Admin, false), this.request(UserCtrl, UserCtrl.allowance, [
            "params.uuid",
            "body.allowance"
        ])])
        this.router.get("/acc/newtoken", [this.allowance(Allowance.User, false), this.request(UserCtrl, UserCtrl.generateToken, [])])

        this.router.get("/acc/all", [this.allowance(Allowance.Admin), this.request(UserCtrl, UserCtrl.getUsers, [])])

        this.router.get("/acc/:uuid", [this.allowance(Allowance.Admin, true), this.request(UserCtrl, UserCtrl.get, [
            "params.uuid",
            "session.cUser"
        ])])
        this.router.get("/acc/", [this.allowance(Allowance.Banned, true), this.request(UserCtrl, UserCtrl.get, [
            "params.uuid",
            "session.cUser"
        ])])
        this.router.put("/acc/:uuid", [this.allowance(Allowance.Admin, true), this.request(UserCtrl, UserCtrl.edit, [
            "params.uuid",
            "body.user",
            "session.cUser"
        ])])
        this.router.put("/acc/", [this.allowance(Allowance.User, true), this.request(UserCtrl, UserCtrl.edit, [
            "params.uuid",
            "body.user",
            "session.cUser"
        ])])
        this.router.delete("/acc/:uuid", [this.allowance(Allowance.Admin, true), this.request(UserCtrl, UserCtrl.delete, [
            "params.uuid",
            "body.user"
        ])])
        this.router.delete("/acc/", [this.allowance(Allowance.User, true), this.request(UserCtrl, UserCtrl.delete, [
            "params.uuid",
            "body.user"
        ])])
    }

    enableThreadRoutes() {
        const ThreadCtrl = new ThreadController()


        this.router.get("/thread/", [this.allowance(Allowance.User), this.request(ThreadCtrl, ThreadCtrl.getAll, [
            "session.cUser"
        ])])
        this.router.post("/thread/", [this.allowance(Allowance.User), this.request(ThreadCtrl, ThreadCtrl.create, [
            "body.thread",
            "session.cUser"
        ])])
        this.router.put("/thread/:tuuid", [this.allowance(Allowance.User), this.request(ThreadCtrl, ThreadCtrl.edit, [
            "params.tuuid",
            "body.thread",
            "session.cUser"
        ])])
        this.router.delete("/thread/:tuuid", [this.allowance(Allowance.User), this.request(ThreadCtrl, ThreadCtrl.delete, [
            "params.tuuid",
            "session.cUser"
        ])])
        this.router.get("/thread/:tuuid", [this.allowance(Allowance.User), this.request(ThreadCtrl, ThreadCtrl.get, [
            "params.tuuid",
            "session.cUser"
        ])])
    }

    enableRequestRoutes() {
        const ReqCtrl = new RequestController()


        this.router.get("/thread/:tuuid/req/", [this.allowance(Allowance.User), this.request(ReqCtrl, ReqCtrl.getAll, [
            "params.tuuid"
        ])])
        this.router.post("/thread/:tuuid/req/", [this.allowance(Allowance.User), this.request(ReqCtrl, ReqCtrl.create, [
            "params.tuuid",
            "body.request"
        ])])
        this.router.put("/thread/:tuuid/req/", [this.allowance(Allowance.User), this.request(ReqCtrl, ReqCtrl.edit, [
            "params.tuuid",
            "body.request"
        ])])
        this.router.delete("/thread/:tuuid/req/:ruuid", [this.allowance(Allowance.User), this.request(ReqCtrl, ReqCtrl.delete, [
            "params.tuuid",
            "params.ruuid"
        ])])
        this.router.get("/thread/:tuuid/req/:ruuid", [this.allowance(Allowance.User), this.request(ReqCtrl, ReqCtrl.get, [
            "params.tuuid",
            "params.ruuid"
        ])])
    }

    request(ctrl: any, logic: Function, params: string[]) {
        return async function (req: AuthRequest, res: Response, next: NextFunction) {
            try {

                let argmap = []

                for (let p of params) {
                    let t = p.split(".")
                    if (t[0] === "body") {
                        if (t[1])
                            argmap.push(req.body.data[t[1]])
                        else
                            argmap.push(req.body.data)
                        continue
                    }
                    if (t[0]) {
                        if (t[1]) {
                            argmap.push(req[t[0]][t[1]])
                        } else {
                            argmap.push(req[t[0]])
                        }
                    } else {
                        argmap.push(undefined)
                    }
                }

                const r = await logic.apply(ctrl, argmap)

                res.send({
                    status: 0,
                    message: "",
                    data: r
                })
            } catch (error) {
                res.send({
                    status: 1,
                    message: error.message
                })
                console.log(error)
            }
        }
    }

    allowance(minAllowance: Allowance, self: boolean = false) {
        return async function (req: AuthRequest, res: Response, next: NextFunction) {
            console.log(minAllowance, self, req.session.cUser, req.session.isAuth, req.path)
            if (self && req.session.isAuth && req.session.cUser.id === req.params?.uuid) {
                return next()
            }
            if (req.session.cUser.allowance > minAllowance) {
                return res.send({
                    status: 1,
                    message: "Low allowance level!"
                })
            }
            next()
        }
    }
}