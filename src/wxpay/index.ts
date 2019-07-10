
import * as utils from '../utils';

export * from './base';
import { WxPayStatic, WxPayBase, Path, SignType } from './base';
import * as microPay from './micro-pay';
import * as orderQuery from './order-query';
import * as reverse from './reverse';
import * as refund from './refund';
import * as refundQuery from './refund-query';
import * as downloadBill from './download-bill';
import * as downloadFundflow from './download-fundflow';
import * as authCodeToOpenid from './auth-code-to-openid';
import * as refundNotify from './refund-notify';


export class WxPay extends WxPayBase {
    constructor(opt: WxPayBase) {
        super();
        this.mch_id = opt.mch_id;
        this.appid = opt.appid;
        this.key = opt.key;
        this.pfxPath = opt.pfxPath;
    }

    private signOpt() {
        return { appid: this.appid, mch_id: this.mch_id, key: this.key };
    }

    private agentOpt() {
        return { pfxPath: this.pfxPath, passphrase: this.mch_id };
    }

    //#region 支付接口 

    async microPay(data: microPay.Request) {
        let obj = await WxPayStatic.getSignObj(data, this.signOpt());
        let rs = await WxPayStatic.request<microPay.Response>({ path: Path.microPay, data: obj });
        return rs;
    }

    async orderQuery(data: orderQuery.Request) {
        let obj = await WxPayStatic.getSignObj(data, this.signOpt());
        let rs = await WxPayStatic.request<orderQuery.Response>({ path: Path.orderQuery, data: obj });
        return rs;
    }

    async reverse(data: reverse.Request) {
        let obj = await WxPayStatic.getSignObj(data, this.signOpt());
        let rs = await WxPayStatic.request<reverse.Response>({ path: Path.reverse, data: obj, agent: this.agentOpt() });
        return rs;
    }

    async refund(data: refund.Request) {
        let obj = await WxPayStatic.getSignObj(data, this.signOpt());
        let rs = await WxPayStatic.request<refund.Response>({ path: Path.refund, data: obj, agent: this.agentOpt() });
        return rs;
    }

    async refundQuery(data: refundQuery.Request) {
        let obj = await WxPayStatic.getSignObj(data, this.signOpt());
        let rs = await WxPayStatic.request<refundQuery.Response>({ path: Path.refundQuery, data: obj });
        return rs;
    }

    async downloadBill(data: downloadBill.Request) {
        if (!data.bill_type)
            data.bill_type = downloadBill.billType.所有;
        let obj = await WxPayStatic.getSignObj(data, this.signOpt());
        let rs = await WxPayStatic.request<string>({ path: Path.downloadBill, data: obj, });
        return rs;
    }

    async downloadFundflow(data: downloadFundflow.Request) {
        data['sign_type'] = SignType.HMAC_SHA256;
        let obj = await WxPayStatic.getSignObj(data, this.signOpt());
        let rs = await WxPayStatic.request<string>({ path: Path.downloadFundflow, data: obj, agent: this.agentOpt() });
        return rs;
    }

    async authCodeToOpenid(data: authCodeToOpenid.Request) {
        let obj = await WxPayStatic.getSignObj(data, this.signOpt());
        let rs = await WxPayStatic.request<authCodeToOpenid.Response>({ path: Path.authCodeToOpenid, data: obj });
        return rs;
    }

    async refundNotify(req: string | refundNotify.Request, fn: (req: refundNotify.Request) => refundNotify.Response) {
        let data: refundNotify.Request;
        if (typeof req === 'string') {
            data = await WxPayStatic.parseXml(req);
        }
        let key = utils.encrypt(this.key, 'md5');
        console.log(key);
        let reqInfo = WxPayStatic.decrypt(key, data.req_info);
        let obj = await WxPayStatic.parseXml<refundNotify.Request>(reqInfo);
        let rs: refundNotify.Response
        try {
            rs = await fn(obj);
        } catch (e) {
            console.error(e);
            rs = {
                return_code: 'FAIL',
                return_msg: 'FAIL',
            };
        }
        if (!rs) {
            rs = {
                return_code: 'SUCCESS',
                return_msg: 'OK',
            };
        }
        return WxPayStatic.buildXml({ xml: rs });
    }

    //#endregion
}