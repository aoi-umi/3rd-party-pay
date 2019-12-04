
import * as paypal from 'paypal-rest-sdk';

import * as utils from '../utils';
import { PayPalBase, PayPalStatic } from './base';
export * from './base';

export class PayPal extends PayPalBase {
    constructor(opt: PayPalBase) {
        super();
        this.client_id = opt.client_id;
        this.client_secret = opt.client_secret;
        this.pay_return_url = opt.pay_return_url;
        this.pay_cancel_url = opt.pay_cancel_url;
    }

    private getCfg() {
        return {
            client_id: this.client_id,
            client_secret: this.client_secret,
        };
    }

    async create(data: paypal.Payment) {
        let d = utils.clone(data);
        d.redirect_urls = utils.extend({ return_url: this.pay_return_url, cancel_url: this.pay_cancel_url }, d.redirect_urls);
        let rs = await PayPalStatic.request({
            data: [d],
            cfg: this.getCfg(),
            method: 'create'
        });
        let match = rs.links.find(ele => ele.rel === 'approval_url');
        return match.href;
    }

    async execute(data: { id: string; args: paypal.payment.ExecuteRequest }) {
        let rs = await PayPalStatic.request({
            data: [data.id, data.args],
            cfg: this.getCfg(),
            method: 'execute'
        });
        return rs;
    }
}

export class PayPalV2 extends PayPalBase {
    constructor(opt: PayPalBase) {
        super();
        this.client_id = opt.client_id;
        this.client_secret = opt.client_secret;
        this.pay_return_url = opt.pay_return_url;
        this.pay_cancel_url = opt.pay_cancel_url;
    }

    private token = '';
    private tokenExpiresAt = 0;

    private async getToken() {
        if (this.tokenExpiresAt && this.tokenExpiresAt > Date.now())
            return this.token;
        let rs = await this.tokenCreate();
        this.token = rs.access_token;
        this.tokenExpiresAt = Date.now() + (rs.expires_in - 1) * 1000;
        return this.token;
    }

    private async tokenCreate() {
        return await PayPalStatic.requestV2({
            data: 'grant_type=client_credentials',
            path: '/v1/oauth2/token',
            axiosOpt: {
                headers: {
                    Authorization: 'Basic ' + Buffer.from(this.client_id + ':' + this.client_secret).toString('base64'),
                    'Content-Type': 'application/x-www-form-urlencoded'
                }
            }
        });
    }

    private async request(opt: {
        path: string;
        method?: string;
        data: any
    }) {
        let token = await this.getToken();
        return await PayPalStatic.requestV2({
            data: opt.data,
            path: opt.path,
            axiosOpt: {
                method: opt.method as any,
                headers: {
                    Authorization: 'Bearer ' + token,
                }
            }
        });
    }

    async orderCreate(data) {
        return this.request({
            data,
            path: '/v2/checkout/orders'
        });
    }
}