export interface RequestLog {
    success?: boolean;
    url?: string;
    req?: any;
    orginReq?: any;
    res?: any;
    orginRes?: any;
    msg?: string;
}

export abstract class PayStatic {
    static sandbox = false;
    static host = '';
    static sandboxHost = '';

    static getHost() {
        return !this.sandbox ? this.host : this.sandboxHost;
    }

    static requestLog(log: RequestLog) {
        console.log(log);
    }
}

export const SignType = {
    RSA: 'RSA',
    RSA2: 'RSA2',
};
