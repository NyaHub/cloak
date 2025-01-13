import { getPublic, generatePrivate, verify, sign } from "eccrypto"
import { NextFunction, Request, Response } from "express"
import { sha256 } from "./utils"
import { Allowance, DefaultUser, IUser, User } from "./database"
import { Model } from "sequelize"


export interface AuthRequest extends Request {
    session: Session
}

interface JWTdata {
    uuid: string
}

export class Session {
    private privateKey: Buffer
    private publicKey: Buffer
    public name: string = "session"
    public errors: string[] = []
    private _data: JWTdata
    public res: Response
    public isAuth: boolean = false
    public cUser: IUser
    private authToken: string = ""

    get authtoken() {
        return this.authToken
    }

    get data() {
        return this._data
    }

    async setData(v: JWTdata) {
        this._data = v
        this.isAuth = true
        await this.sign()
    }

    static getPrivateKey(): string {
        return generatePrivate().toString("hex")
    }



    constructor(pk: string, name: string) {
        if (!pk) {
            throw Error("No private key for session")
        }

        this.name = name

        this.privateKey = Buffer.from(pk, "hex")
        this.publicKey = getPublic(this.privateKey)
    }

    async sign() {
        const data = Buffer.from(JSON.stringify(this._data)).toString("base64")
        const hash = sha256(JSON.stringify(this._data))
        let sig = (await sign(this.privateKey, hash)).toString("base64")
        this.authToken = `${data}.${sig}`
        this.res.cookie(this.name, this.authToken)
    }

    async verify(token: string): Promise<boolean> {
        let [data, sig] = token.split(".").map(e => Buffer.from(e, "base64"))
        const hash = sha256(data)
        try {
            await verify(this.publicKey, hash, sig)
            this._data = JSON.parse(data.toString())
            return true
        } catch (e) {
            return false
        }
    }
}
export function session(pk: string, name: string) {
    return async function express(req: AuthRequest, res: Response, next: NextFunction) {

        const sess = new Session(pk, name)

        sess.res = res

        req.session = sess

        const token: string = req?.body?.authToken || req.cookies[name] || req.headers["authorization"]

        console.log(token)

        if (!token || !await sess.verify(token)) {

            sess.cUser = DefaultUser

            return next()
        }

        try {
            sess.cUser = (await User.findByPk(sess.data.uuid)).dataValues
            sess.isAuth = true
        } catch (error) {
            sess.cUser = DefaultUser
            console.log(error.message)
        }

        next()
    }
}