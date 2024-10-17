import { NextFunction, Router, Response } from "express"
import { AuthRequest, session } from "../session"
import { UserController } from "./user"
import { Allowance } from "../database"

export class API {
    public router

    constructor() {
        this.router = Router()
        const UserCtrl = new UserController()
        this.router.post("/register", [this.allowance(Allowance.Admin), this.request(UserCtrl, UserCtrl.registerFromAdmin, [
            "body.email"
        ])])
        this.router.post("/login", [this.request(UserCtrl, UserCtrl.login, [
            "body.token",
            "session."
        ])])
        this.router.get("/acc/:uuid", [this.allowance(Allowance.Admin, true), this.request(UserCtrl, UserCtrl.get, [
            "params.uuid",
            "session.cUser"
        ])])
        this.router.get("/acc/", [this.allowance(Allowance.Admin, true), this.request(UserCtrl, UserCtrl.get, [
            "params.uuid",
            "session.cUser"
        ])])
        this.router.put("/acc/:uuid", [this.allowance(Allowance.Admin, true), this.request(UserCtrl, UserCtrl.edit, [
            "params.uuid",
            "body.user",
            "session.cUser"
        ])])
        this.router.put("/acc/", [this.allowance(Allowance.Admin, true), this.request(UserCtrl, UserCtrl.edit, [
            "params.uuid",
            "body.user",
            "session.cUser"
        ])])
        this.router.delete("/acc/:uuid", [this.allowance(Allowance.Admin, true), this.request(UserCtrl, UserCtrl.delete, [
            "params.uuid",
            "body.user"
        ])])
        this.router.delete("/acc/", [this.allowance(Allowance.Admin, true), this.request(UserCtrl, UserCtrl.delete, [
            "params.uuid",
            "body.user"
        ])])
        this.router.post("/acc/allowance/:uuid", [this.allowance(Allowance.Admin, false), this.request(UserCtrl, UserCtrl.allowance, [
            "params.uuid",
            "body.allowance"
        ])])
        this.router.get("/acc/newtoken", [this.allowance(Allowance.User, false), this.request(UserCtrl, UserCtrl.allowance, [])])
    }

    request(ctrl: any, logic: Function, params: string[]) {
        return async function (req: AuthRequest, res: Response, next: NextFunction) {
            try {

                let argmap = []

                for (let p of params) {
                    let t = p.split(".")
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
            }
        }
    }

    allowance(minAllowance: Allowance, self: boolean = false) {
        return async function (req: AuthRequest, res: Response, next: NextFunction) {
            if (self && req.session.isAuth && req.session.cUser.id === req.params?.uuid) {
                return next()
            }
            if (!req.session.isAuth || req.session.cUser.allowance > minAllowance) {
                return res.send({
                    status: 1,
                    message: "Low allowance level!"
                })
            }
            next()
        }
    }
}