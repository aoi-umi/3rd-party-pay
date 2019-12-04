import * as fs from 'fs';

import * as utils from '../utils';
import { RequestLog } from '../base';
export * from './base';
import { WxPayStatic, WxPayBase, Path, SignType, BillType, ResponseBase } from './base';
//#region 支付接口 
import * as unifiedOrder from './types/unified-order';
import * as orderQuery from './types/order-query';
import * as closeOrder from './types/close-order';
import * as refund from './types/refund';
import * as refundQuery from './types/refund-query';
import * as downloadBill from './types/download-bill';
import * as payNotify from './types/pay-notify';
import * as shortUrl from './types/short-url';
import * as microPay from './types/micro-pay';
import * as reverse from './types/reverse';
import * as authCodeToOpenid from './types/auth-code-to-openid';
import * as refundNotify from './types/refund-notify';
import * as batchQueryComment from './types/batch-query-comment';
import * as downloadFundflow from './types/download-fundflow';
//#endregion

//#region 企业付款 

import * as transfers from './types/transfers';
import * as getTransferInfo from './types/get-transfer-info';
//#endregion

export class WxPay extends WxPayBase {
    constructor(opt: WxPayBase) {
        super();
        this.mch_id = opt.mch_id;
        this.appid = opt.appid;
        this.key = opt.key;
        this.pfxPath = opt.pfxPath;
        this.payNotifyUrl = opt.payNotifyUrl;
        this.pfx = fs.readFileSync(this.pfxPath);
    }

    private signOpt() {
        return { appid: this.appid, mch_id: this.mch_id, key: this.key };
    }

    private agentOpt() {
        return { pfx: this.pfx, passphrase: this.mch_id };
    }

    //#region 支付接口 

    async unifiedOrder(data: unifiedOrder.Request) {
        let obj = await WxPayStatic.getSignObj(utils.extend({ notify_url: this.payNotifyUrl }, data), this.signOpt());
        let rs = await WxPayStatic.request<unifiedOrder.Response>({ path: Path.unifiedOrder, data: obj });
        return rs;
    }

    async orderQuery(data: orderQuery.Request) {
        let obj = await WxPayStatic.getSignObj(data, this.signOpt());
        let rs = await WxPayStatic.request<orderQuery.Response>({ path: Path.orderQuery, data: obj });
        return rs;
    }

    async closeOrder(data: closeOrder.Request) {
        let obj = await WxPayStatic.getSignObj(data, this.signOpt());
        let rs = await WxPayStatic.request<closeOrder.Response>({ path: Path.orderQuery, data: obj });
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
        let obj = await WxPayStatic.getSignObj({
            bill_type: BillType.所有,
            ...data,
        }, this.signOpt());
        let rs = await WxPayStatic.request<string>({ path: Path.downloadBill, data: obj, });
        return rs;
    }

    private async notifyHandler(req, fn: (req) => any) {
        let rs: ResponseBase;
        let log: RequestLog = {
            success: true,
            orginReq: req,
        };
        try {
            if (typeof req === 'string') {
                req = await WxPayStatic.parseXml(req);
            }
            log.req = req;
            let { sign, ...rest } = req;
            let verify = WxPayStatic.signVerify(WxPayStatic.stringify(rest, this.key), sign, rest.sign_type, this.key);
            if (!verify) {
                throw new Error('校验签名不正确');
            }
            rs = await fn(req);
        } catch (e) {
            console.log(req);
            console.error(e);
            log.success = false;
            log.msg = e.message;
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
        log.orginRes = rs;
        let xmlRs = WxPayStatic.buildXml(rs);
        log.res = xmlRs;
        WxPayStatic.requestLog && WxPayStatic.requestLog(log);
        return xmlRs;
    }

    async payNotifyHandler(req: string | payNotify.Request, fn: (req: payNotify.Request) => (payNotify.Response | void) | Promise<payNotify.Response | void>) {
        return this.notifyHandler(req, async (data) => {
            return await fn(data);
        });
    }

    //不知道咋用,现在Native返回的就是短链接?
    async shortUrl(data: shortUrl.Request) {
        let obj = await WxPayStatic.getSignObj(data, this.signOpt());
        let rs = await WxPayStatic.request<shortUrl.Response>({ path: Path.shortUrl, data: obj });
        return rs;
    }

    async microPay(data: microPay.Request) {
        let obj = await WxPayStatic.getSignObj(data, this.signOpt());
        let rs = await WxPayStatic.request<microPay.Response>({ path: Path.microPay, data: obj });
        return rs;
    }

    async reverse(data: reverse.Request) {
        let obj = await WxPayStatic.getSignObj(data, this.signOpt());
        let rs = await WxPayStatic.request<reverse.Response>({ path: Path.reverse, data: obj, agent: this.agentOpt() });
        return rs;
    }

    async authCodeToOpenid(data: authCodeToOpenid.Request) {
        let obj = await WxPayStatic.getSignObj(data, this.signOpt());
        let rs = await WxPayStatic.request<authCodeToOpenid.Response>({ path: Path.authCodeToOpenid, data: obj });
        return rs;
    }

    //todo
    //report

    async refundNotifyHandler(req: string | refundNotify.Request, fn: (req: refundNotify.Request) => refundNotify.Response) {
        return this.notifyHandler(req, async (data) => {
            let key = WxPayStatic.encrypt(this.key, 'md5');
            let reqInfo = WxPayStatic.decrypt(key, data.req_info);
            let parse = await WxPayStatic.parseXml<{ root: refundNotify.RequestInfo }>(reqInfo, true);
            data.req_info = parse.root;
            return await fn(data);
        });
    }

    async batchQueryComment(data: batchQueryComment.Request) {
        let obj = await WxPayStatic.getSignObj({
            sign_type: SignType.HMAC_SHA256,
            limit: 200,
            ...data,
        }, this.signOpt());
        let rs = await WxPayStatic.request<batchQueryComment.Response>({ path: Path.batchQueryComment, data: obj, agent: this.agentOpt() });
        return rs;
    }

    async downloadFundflow(data: downloadFundflow.Request) {
        let obj = await WxPayStatic.getSignObj({
            sign_type: SignType.HMAC_SHA256,
            ...data,
        }, this.signOpt());
        let rs = await WxPayStatic.request<string>({ path: Path.downloadFundflow, data: obj, agent: this.agentOpt() });
        return rs;
    }

    //#endregion

    //#region 企业付款 

    async transfers(data: transfers.Request) {
        let obj = await WxPayStatic.getSignObj(data, {
            ...this.signOpt(),
            mch: true,
        });
        let rs = await WxPayStatic.request<transfers.Response>({ path: Path.transfers, data: obj, agent: this.agentOpt() });
        return rs;
    }

    async getTransferInfo(data: getTransferInfo.Request) {
        let obj = await WxPayStatic.getSignObj(data, this.signOpt());
        let rs = await WxPayStatic.request<getTransferInfo.Response>({ path: Path.getTransferInfo, data: obj, agent: this.agentOpt() });
        return rs;
    }

    //#endregion
}