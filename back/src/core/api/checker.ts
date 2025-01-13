import { IFilter } from "../database";

interface FilterInp {
    refererCF: string,
    urlCF: string,
    queryString: string,
    referer: string,
    userAgent: string,
    remoteAddr: string,
    CFConnectingIP: string,
    forwardedFor: string,
    tryeClientIP: string
}

class Checker {
    async filter(params: FilterInp, filter: IFilter) {
        
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