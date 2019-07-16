import * as fs from 'fs';

import * as utils from '../utils';
import { RequestLog } from '../base';

import { AliPayBase, AliPayStatic, Method, RequestBase, NotifyType } from './base';
export * from './base';

import * as notify from './types/alipay-notify';
import * as appPay from './types/alipay-trade-app-pay';
import * as cancel from './types/alipay-trade-cancel';
import * as close from './types/alipay-trade-close';
import * as create from './types/alipay-trade-create';
import * as fastpayRefundQuery from './types/alipay-trade-fastpay-refund-query';
import * as orderSettle from './types/alipay-trade-order-settle';
import * as orderinfoSync from './types/alipay-trade-orderinfo-sync';
import * as pagePay from './types/alipay-trade-page-pay';
import * as pageRefund from './types/alipay-trade-page-refund';
import * as pay from './types/alipay-trade-pay';
import * as precreate from './types/alipay-trade-precreate';
import * as query from './types/alipay-trade-query';
import * as refund from './types/alipay-trade-refund';
import * as wapPay from './types/alipay-trade-wap-pay';


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

    private createResponseKey(method: string) {
        return method.replace(/\./g, '_') + '_response';
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

    private request<T = any>(data: any, pubReq: Partial<RequestBase>): Promise<T> {
        let opt = {
            ...this.getSignOpt(),
            ...pubReq,
        };
        let params = AliPayStatic.getSignObj(data, opt as any);
        return AliPayStatic.request({
            params: params,
            resDataKey: this.createResponseKey(opt.method),
        });
    }


    appPay(data: appPay.Request, pubReq: Partial<RequestBase>) {
        return AliPayStatic.getSignObj(data, {
            ...this.getSignOpt(),
            ...pubReq,
            method: Method.alipayTradeAppPay,
        });
    }

    async cancel(data: cancel.Request, pubReq: Partial<RequestBase>) {
        return this.request<cancel.Response>(data, {
            ...pubReq,
            method: Method.alipayTradeCancel,
        });
    }

    async close(data: close.Request, pubReq: Partial<RequestBase>) {
        return this.request<close.Response>(data, {
            ...pubReq,
            method: Method.alipayTradeClose,
        });
    }

    async create(data: create.Request, pubReq: Partial<RequestBase>) {
        return this.request<create.Response>(data, {
            ...pubReq,
            method: Method.alipayTradeCreate,
        });
    }

    async fastpayRefundQuery(data: fastpayRefundQuery.Request, pubReq: Partial<RequestBase>) {
        return this.request<fastpayRefundQuery.Response>(data, {
            ...pubReq,
            method: Method.alipayTradeFastpayRefundQuery,
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

    //方法名不存在
    private pageRefund(data: pageRefund.Request, pubReq: Partial<RequestBase>) {
        return AliPayStatic.getSignObj(data, {
            ...this.getSignOpt(),
            ...pubReq,
            method: Method.alipayTradePageRefund,
            withHost: true
        });
    }

    precreate(data: precreate.Request, pubReq: Partial<RequestBase>) {
        return AliPayStatic.getSignObj(data, {
            ...this.getSignOpt(),
            ...pubReq,
            method: Method.alipayTradePrecreate,
        });
    }

    async query(data: query.Request, pubReq: Partial<RequestBase>) {
        return this.request<query.Response>(data, {
            ...pubReq,
            method: Method.alipayTradeQuery,
        });
    }

    async refund(data: refund.Request, pubReq: Partial<RequestBase>) {
        return this.request<refund.Response>(data, {
            ...pubReq,
            method: Method.alipayTradeRefund,
        });
    }

    async orderSettle(data: orderSettle.Request, pubReq: Partial<RequestBase>) {
        return this.request<orderSettle.Response>(data, {
            ...pubReq,
            method: Method.alipayTradeOrderSettle,
        });
    }

    wapPay(data: wapPay.Request, pubReq: Partial<RequestBase>) {
        return AliPayStatic.getSignObj(data, {
            ...this.getSignOpt(),
            ...pubReq,
            method: Method.alipayTradeWapPay,
        });
    }
}