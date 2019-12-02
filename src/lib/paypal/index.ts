
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