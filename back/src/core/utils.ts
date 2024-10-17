import crypto from "node:crypto"

export function sha256(str): Buffer {
    return crypto.createHash("sha256").update(str).digest()
}

export function createToken(): string {
    return sha256(crypto.randomBytes(32)).toString("hex").replace(/(.{16})(.{16})(.{16})(.{16})/, "$1-$2-$3-$4")
}

