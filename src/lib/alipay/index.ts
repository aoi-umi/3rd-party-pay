import * as fs from 'fs';

import * as utils from '../utils';
import { AliPayBase, AliPayStatic, Method, RequestBase } from './base';

export * from './base';
import * as pagePay from './types/alipay-trade-page-pay';

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

    private async notifyHandler(req, fn: (req) => any) {
        let rs: string;
        try {
            rs = await fn(req);
        } catch (e) {
            console.error(e);
            rs = 'failure';
        }
        if (!rs) {
            rs = 'success';
        }
        return rs;
    }

    async payNotifyHandler(req, fn: (req) => any) {
        return this.notifyHandler(req, async () => {
            await fn(req);
        });
    }
}