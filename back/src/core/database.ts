import { DataTypes, Sequelize } from "sequelize";
import { createToken, sha256 } from "./utils";

export const sequelize = new Sequelize({
    storage: "./db.sqlite",
    dialect: "sqlite"
})

export enum Allowance {
    System = -1,
    Admin,
    User,
    Guest,
    Banned
}
export enum DeviceTypes {
    DESKTOP,
    MOBILE,
    TABLET,
    TV,
    OTHER
}
export enum PageLoadType {
    LOAD,
    REDIRECT,
    IFRAME
}

export interface IUser {
    id: string,
    email: string,
    name: string,
    token: string,
    allowance: Allowance,
    balance: number,
    whitelist: string,
    createdAt: string,
    updatedAt: string
}
export interface IUserEdit {
    email: string,
    name: string,
}
export interface IPageParams {
    route: string,
    load: PageLoadType
}
export interface IFilter {
    cloak: boolean,
    vpn: boolean,
    ipv6: boolean,
    clicks: boolean,
    geo: string[],
    geoBlock: boolean,
    devices: DeviceTypes[],
    devicesBlock: boolean,
    referer: string[],
    referrBlock: boolean,
    refererEmpty: boolean,
    UTM: string[],
    UTMBlock: boolean,
    blacklist: string // id of blacklist from database
}
export interface IRequest {
    id: string,
    ip: string,
    geo: string,
    isp: string,
    referer: string,
    device: string,
    ua: string,
    page: string,
    filtered: boolean,
    createdAt: string,
    ThreadId: string
}
export interface IThread {
    id: string,
    name: string,
    whitePage: IPageParams,
    offerPage: IPageParams,
    filters: IFilter,
    status: boolean,
    createdAt: string,
    updatedAt: string,
    UserId: string
}

export const DefaultUser: IUser = {
    id: "",
    email: "",
    name: "Guest",
    token: "",
    allowance: Allowance.Guest,
    balance: 0,
    whitelist: "",
    createdAt: "",
    updatedAt: ""
}

export const DefaultPageParams: IPageParams = {
    route: "/",
    load: PageLoadType.LOAD
}
export const DefaultFilters: IFilter = {
    cloak: true,
    vpn: true,
    ipv6: true,
    clicks: false,
    geo: [],
    geoBlock: false,
    devices: [],
    devicesBlock: false,
    referer: [],
    referrBlock: false,
    refererEmpty: false,
    UTM: [],
    UTMBlock: false,
    blacklist: "",
}

export const User = sequelize.define("User", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true
    },
    email: {
        type: DataTypes.STRING,
        validate: {
            isEmail: true
        },
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        defaultValue: sha256(Math.random().toString()).toString("hex")
    },
    token: {
        type: DataTypes.STRING,
        defaultValue: createToken(),
        unique: true
    },
    allowance: {
        type: DataTypes.INTEGER,
        defaultValue: Allowance.User,
    },
    balance: {
        type: DataTypes.FLOAT,
        defaultValue: 0
    },
    whitelist: {
        type: DataTypes.TEXT,
        defaultValue: ""
    }
}, {
    timestamps: true
})
export const Thread = sequelize.define("Thread", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true
    },
    name: {
        type: DataTypes.STRING,
        defaultValue: sha256(Math.random().toString()).toString("hex")
    },
    whitePage: {
        type: DataTypes.JSON,
        defaultValue: DefaultPageParams
    },
    offerPage: {
        type: DataTypes.JSON,
        defaultValue: DefaultPageParams
    },
    filters: {
        type: DataTypes.JSON,
        defaultValue: DefaultFilters
    },
    status: {
        type: DataTypes.BOOLEAN,
        defaultValue: true
    }
}, {
    timestamps: true
})
export const DRequest = sequelize.define("Request", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true
    },
    ip: DataTypes.STRING,
    geo: DataTypes.STRING,
    isp: DataTypes.STRING,
    referer: DataTypes.STRING,
    device: DataTypes.STRING,
    ua: DataTypes.STRING,
    page: DataTypes.STRING,
    filtered: DataTypes.BOOLEAN
}, {
    timestamps: true,
    updatedAt: false
})
export const Blacklist = sequelize.define("Blacklist", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true
    },
    list: DataTypes.TEXT
})

export const Notifications = sequelize.define("Notifications", {
    id: {
        primaryKey: true,
        type: DataTypes.UUID,
        defaultValue: DataTypes.UUIDV4,
        allowNull: false,
        unique: true
    },
    name: DataTypes.STRING,
    text: DataTypes.STRING,
    to: DataTypes.UUID,
    readed: DataTypes.JSON
})

User.hasMany(Thread)
User.hasMany(Blacklist)

Thread.belongsTo(User)
Thread.hasMany(DRequest)

Blacklist.belongsTo(User)

DRequest.belongsTo(Thread)