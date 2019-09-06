export interface RequestLog {
    success?: boolean;
    url?: string;
    req?: any;
    orginReq?: any;
    res?: any;
    orginRes?: any;
    msg?: string;
}

export type PayStaticConfig = {
    sandbox?: boolean;
    host?: string;
    sandboxHost?: string;
    requestLog: (log: RequestLog) => any;
};

export abstract class PayStatic {
    static sandbox = false;
    static host = '';
    static sandboxHost = '';

    static getHost() {
        return !this.sandbox ? this.host : this.sandboxHost;
    }

    static requestLog(log: RequestLog) {
        console.log(JSON.stringify(log));
    }

    static config(opt: PayStaticConfig) {
        if (typeof opt.sandbox !== 'undefined') {
            this.sandbox = opt.sandbox;
        }
        if (opt.host)
            this.host = opt.host;
        if (opt.sandboxHost)
            this.sandboxHost = opt.sandboxHost;
        if (opt.requestLog)
            this.requestLog = opt.requestLog;
    }
}

export const SignType = {
    RSA: 'RSA',
    RSA2: 'RSA2',
};
