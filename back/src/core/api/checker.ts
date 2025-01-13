import { DeviceTypes, IFilter } from "../database";
import { banList } from "../banlist";
import { reverse } from "dns/promises";
import whoiser from "whoiser";
import DeviceDetector, { DeviceDetectorResult, DeviceDetectorOptions } from "device-detector-js";
import { sha256 } from "../utils";

interface FilterInp {
    refererCF: string,
    urlCF: string,
    queryString: string,
    referer: string,
    userAgent: string,
    remoteAddr: string,
    CFConnectingIP: string,
    forwardedFor: string,
    trueClientIP: string
}


// const ip =
//     (this.req.headers["x-forwarded-for"] || "").split(",").pop() ||
//     this.req.connection?.remoteAddress ||
//     this.req.socket?.remoteAddress ||
//     this.req.connection?.socket?.remoteAddress ||
//     this.req.ip;

/**
 * Fingerprint
 * 
 * ua
 * accept
 * accept-languge
 * accept-encoding
 * ip
 * geo
 * 
 */

interface AcceptHeaders {
    accept: string,
    acceptLanguage: string,
    acceptEncoding: string
}
interface IPGeoParam {
    ip: string,
    geo: string
}
interface FPResult {
    fp: string,
    device: DeviceDetectorResult
}

export class Checker {

    private deviceDetector = new DeviceDetector({
        // versionTruncation: null
    })

    async fingerprint(ua: string, ip: IPGeoParam): Promise<FPResult> {
        const uap = this.deviceDetector.parse(ua)
        console.log(uap)
        let fp = sha256(JSON.stringify(uap)).toString("hex")

        return {
            fp,
            device: uap
        }
    }

    async filter(params: FilterInp, filter: IFilter): Promise<boolean> { // true - ok, false - block
        const ip = params.trueClientIP || params.CFConnectingIP || params.forwardedFor || params.remoteAddr
        const ua = params.userAgent

        const { fp, device } = await this.fingerprint(ua, { ip, geo: " " })

        if (device.bot) {
            return false
        }

        for (let _ip of banList.ips) {
            const r = new RegExp(_ip, "i") // Regular expression of ip
            if (ip.match(r)) {
                return false
            }
        }

        let hosts
        try {
            hosts = await reverse(ip)
        } catch (error) {
            hosts = []
        }

        const who = await whoiser(ip)

        const orgName = ((who.organisation && (who.organisation['org-name'] || who.organisation['OrgName'])) || who.descr).toLowerCase()

        for (let _ua of banList.words) {
            const r = new RegExp(_ua, "i") // Regular expression of User-agent
            if (orgName.match(r)) {
                return false
            }
            for (const h of hosts) {
                if (h.match(r)) {
                    return false
                }
            }
        }

        return true
    }
}

// let data = {
//     companyId,
//     refererCF: req.query.refererCF,
//     urlCF: req.query.urlCF,
//     QUERY_STRING: req.originalUrl.includes("?") ? req.originalUrl.split("?").at(-1) : "",
//     HTTP_REFERER: req.headers["referer"],
//     HTTP_USER_AGENT: req.headers["user-agent"],
//     REMOTE_ADDR: req.headers["remote-addr"],
//     CF_CONNECTING_IP: req.headers["cf-connecting-ip"],
//     X_FORWARDED_FOR: req.headers["x-forwarded-for"],
//     TRUE_CLIENT_IP: req.headers["true-client-ip"],
// }