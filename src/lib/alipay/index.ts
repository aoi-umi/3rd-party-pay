import * as fs from 'fs';

import * as utils from '../utils';
import { RequestLog } from '../base';

import { AliPayBase, AliPayStatic, Method, RequestBase, NotifyType } from './base';
export * from './base';

import * as notify from './types/notify';
import * as cancel from './types/alipay-trade-cancel';
import * as pagePay from './types/alipay-trade-page-pay';
import * as pay from './types/alipay-trade-pay';


export class AliPay extends AliPayBase {
    rsaPrivate: string;
    rsaPublic: string;
    constructor(opt: AliPayBase) {
        super();
        this.app_id = opt.app_id;
        this.sign_type = opt.sign_type;
        this.rsaPrivatePath = opt.rsaPrivatePath;
        this.rsaPublicPath = opt.rsaPublicPath;
        this.rsaPrivate = fs.readFileSync(this.rsaPrivatePath, 'utf-8');
        this.rsaPublic = fs.readFileSync(this.rsaPublicPath, 'utf-8');
    }

    getSignOpt() {
        return {
            app_id: this.app_id,
            sign_type: this.sign_type,
            rsaPrivate: this.rsaPrivate,
            rsaPublic: this.rsaPublic,
        };
    }

    private async notifyHandler(req, fn: (req) => any) {
        let rs: string;
        let log: RequestLog = {
            success: true,
            orginReq: req,
            req: req,
        };
        try {
            let { sign, sign_type, ...rest } = req;
            let str = AliPayStatic.stringify(utils.sortObject(rest)).str;
            let verify = AliPayStatic.signVerify(str, sign, this.rsaPublic, sign_type);
            if (!verify) {
                throw new Error('校验签名不正确');
            }
            rs = await fn(req);
        } catch (e) {
            console.error(e);
            log.success = false;
            rs = 'failure';
        }
        if (!rs) {
            rs = 'success';
        }
        log.res = log.orginRes = rs;
        AliPayStatic.requestLog && AliPayStatic.requestLog(log);
        return rs;
    }

    async payNotifyHandler(req: notify.Request, fn: (req: notify.Request) => any) {
        return this.notifyHandler(req, async () => {
            if (req.fund_bill_list)
                req.fund_bill_list = JSON.parse(req.fund_bill_list as any);
            await fn(req);
        });
    }

    async cancel(data: cancel.Request, pubReq: Partial<RequestBase>) {
        let params = AliPayStatic.getSignObj(data, {
            ...this.getSignOpt(),
            ...pubReq,
            method: Method.alipayTradeCancel,
        });
        return AliPayStatic.request<cancel.Response>({
            path: '?' + params,
            method: 'get',
            resDataKey: 'alipay_trade_cancel_response'
        });
    }

    pagePay(data: pagePay.Request, pubReq: Partial<RequestBase>) {
        return AliPayStatic.getSignObj({
            product_code: 'FAST_INSTANT_TRADE_PAY',
            ...data
        }, {
                ...this.getSignOpt(),
                ...pubReq,
                method: Method.alipayTradePagePay,
                withHost: true
            });
    }
}