import { DataTypes, Sequelize } from "sequelize";
import { createToken, sha256 } from "./utils";

export const sequelize = new Sequelize({
    storage: "./db.sqlite",
    dialect: "sqlite"
})

export enum Allowance {
    Admin,
    User,
    Guest,
    Banned
}

export interface IUser {
    id: string,
    email: string,
    name: string,
    token: string,
    allowance: Allowance,
    balance: number
}
export interface IUserEdit {
    email: string,
    name: string,
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
    }
})


