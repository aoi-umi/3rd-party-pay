import { PayStatic, RequestLog } from "../base";
import * as paypal from "paypal-rest-sdk";
import { ConfigureOptions } from "paypal-rest-sdk";
import { AxiosRequestConfig } from "axios";

import * as utils from '../utils';

export class PayPalBase {
    client_id: string;
    client_secret: string;
    pay_return_url: string;
    pay_cancel_url: string;
}

type Response = {};

export class PayPalStatic extends PayStatic {
    static host = 'https://api.paypal.com';
    static sandboxHost = 'https://api.sandbox.paypal.com';
    static async request<T = any>(opt: {
        data: any[];
        host?: string;
        method?: string;
        // notThrowErr?: boolean;
        resDataKey?: string;
        originalResult?: boolean;
        cfg: Partial<ConfigureOptions>
        axiosOpt?: AxiosRequestConfig;
    }) {
        let log: RequestLog = {
            success: true
        };
        try {
            log.req = log.orginReq = opt.data;
            log.url = opt.method;
            let cfg = utils.clone(opt.cfg);
            cfg.mode = PayPalStatic.sandbox ? 'sandbox' : 'live';
            let rs = await utils.promisify(paypal.payment[opt.method], paypal.payment)(...opt.data, cfg);

            let data = rs;
            log.orginRes = { ...data };
            if (opt.originalResult)
                return data as T;
            data = opt.resDataKey ? data[opt.resDataKey] : data;
            log.res = data;

            // if (!opt.notThrowErr) {
            //     this.errorHandler(data);
            // }

            return data as any as T;
        } catch (e) {
            log.success = false;
            log.msg = e.message;
            throw e;
        } finally {
            this.requestLog && this.requestLog(log);
        }
    }

    static async requestV2<T = any>(opt: {
        data: any;
        host?: string;
        path?: string;
        // notThrowErr?: boolean;
        resDataKey?: string;
        originalResult?: boolean;
        // cfg: Partial<ConfigureOptions>
        axiosOpt?: AxiosRequestConfig;
    }) {
        let log: RequestLog = {
            success: true
        };
        try {
            log.req = log.orginReq = opt.data;
            let url = log.url = (opt.host || this.getHost()) + opt.path;
            let rs = await utils.request({
                url,
                ...opt.axiosOpt,
                data: opt.data
            });

            let data = rs.data;
            log.orginRes = { ...data };
            if (opt.originalResult)
                return data as T;
            data = opt.resDataKey ? data[opt.resDataKey] : data;
            log.res = data;

            // if (!opt.notThrowErr) {
            //     this.errorHandler(data);
            // }

            return data as any as T;
        } catch (e) {
            log.success = false;
            log.msg = e.message;
            throw e;
        } finally {
            this.requestLog && this.requestLog(log);
        }
    }

    static errorHandler(rs: Response) {

    }
}