import * as xml2js from 'xml2js';
import * as fs from 'fs';
import * as qs from 'query-string';
import * as https from 'https';
import * as crypto from 'crypto';
import { AxiosRequestConfig } from 'axios';

import * as utils from '../utils';

const xmlBuilder = new xml2js.Builder({ headless: true });

export class Sign {

    /**
     * 随机字符串
     * 随机字符串，不长于32位。推荐随机数生成算法
     * example: 5K8264ILTKCH16CQ2502SI8ZNMTM67VS
     */
    nonce_str?: string

    /**
     * 签名
     * 签名，详见签名生成算法
     * example: C380BEC2BFD727A4B6845133519F3AD6
     */
    sign: string

    /**
     * 签名类型
     * 签名类型，目前支持HMAC-SHA256和MD5，默认为MD5
     * example: HMAC-SHA256
     */
    sign_type?: string
}

export class Request extends Sign {
    /**
    * 公众账号ID
    * 微信分配的公众账号ID（企业号corpid即为此appId）
    * example: wx8888888888888888
    */
    appid: string

    /**
     * 商户号
     * 微信支付分配的商户号
     * example: 1900000109
     */
    mch_id: string
}

export class ResponseBase {
    /**
     * 返回状态码
     * SUCCESS/FAIL 
     * 此字段是接口通信情况标识，非交易成功与否的标识
     * example: SUCCESS
     */
    return_code: string

    /**
     * 返回信息
     * 当return_code为FAIL时返回信息为错误原因 ，例如 
     * 签名失败 
     * 参数格式校验错误
     * example: OK
     */
    return_msg: string
}

export class SuccessResponse extends ResponseBase {

    /**
     * 业务结果
     * SUCCESS/FAIL
     * example: SUCCESS
     */
    result_code: string

    /**
     * 业务结果描述
     * 对业务结果的补充说明
     * example: OK
     */
    result_msg: string;

    /**
     * 错误代码
     * 详细参见错误列表
     * example: SYSTEMERROR
     */
    err_code?: string

    /**
     * 错误代码描述
     * 错误返回的信息描述
     * example: 系统错误
     */
    err_code_des?: string

    /**
     * 随机字符串
     * 微信返回的随机字符串
     * example: 5K8264ILTKCH16CQ2502SI8ZNMTM67VS
     */
    nonce_str: string

    /**
     * 签名
     * 微信返回的签名，详见签名生成算法
     * example: C380BEC2BFD727A4B6845133519F3AD6
     */
    sign: string
}

export class Response extends SuccessResponse {

    /**
     * 公众账号ID
     * 调用接口提交的公众账号ID
     * example: wx8888888888888888
     */
    appid: string

    /**
     * 商户号
     * 调用接口提交的商户号
     * example: 1900000109
     */
    mch_id: string
}

export class MchRequest extends Sign {

    /**
     * 商户账号appid
     * 申请商户号的appid或商户号绑定的appid
     * example: wx8888888888888888
     */
    mch_appid: string;

    /**
     * 商户号
     * 微信支付分配的商户号
     * example: 1900000109
     */
    mchid: string;
}

export class MchResponse extends SuccessResponse {
    /**
     * 商户appid
     * 申请商户号的appid或商户号绑定的appid（企业号corpid即为此appId）
     * example: wx8888888888888888
     */
    mch_appid: string;

    /**
     * 商户号
     * 微信支付分配的商户号
     * example: 1900000109
     */
    mchid: string;
}

export const Path = {
    //沙箱
    //https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=23_1
    getSignKey: '/pay/getsignkey',

    //#region 支付
    //https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_1
    unifiedOrder: '/pay/unifiedorder',

    //https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_2
    orderQuery: '/pay/orderquery',

    //https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_3
    closeOrder: '/pay/closeorder',

    //https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_4
    refund: '/secapi/pay/refund',

    //https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_5
    refundQuery: '/pay/refundquery',

    //https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_6
    downloadBill: '/pay/downloadbill',

    //https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_7
    //支付回调

    //https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_8
    report: '/payitil/report',

    //https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_9
    shortUrl: '/tools/shorturl',

    //https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_10
    microPay: '/pay/micropay',

    //https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_11
    reverse: '/secapi/pay/reverse',

    //https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_12
    //APP端调起支付的参数列表

    //https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_13
    authCodeToOpenid: '/tools/authcodetoopenid',

    //https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_14
    //同report

    //没15

    //https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_16
    //退款回调

    //https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_17
    batchQueryComment: '/billcommentsp/batchquerycomment',

    //https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_18
    downloadFundflow: '/pay/downloadfundflow',

    //#endregion

    //#region 企业付款 

    //https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_2
    transfers: '/mmpaymkttransfers/promotion/transfers',

    //https://pay.weixin.qq.com/wiki/doc/api/tools/mch_pay.php?chapter=14_3
    getTransferInfo: '/mmpaymkttransfers/gettransferinfo'

    //#endregion

};
export class WxPayBase {
    mch_id: string;
    appid: string;
    key: string;
    pfxPath?: string;
}
export class WxPayStatic {
    static sandbox = false;
    static success = 'SUCCESS';
    static host = 'https://api.mch.weixin.qq.com';
    static sandboxHost = 'https://api.mch.weixin.qq.com/sandboxnew';
    static getHost() {
        return !this.sandbox ? this.host : this.sandboxHost;
    }
    static buildXml(data, root = false) {
        return xmlBuilder.buildObject(root ? data : { xml: data });
    }

    static async parseXml<T = any>(xml: string, root = false) {
        let jsonBody = await utils.promisify(xml2js.parseString)(xml, { explicitArray: false });
        return (root ? jsonBody : jsonBody.xml) as T;
    }

    static async request<T = any>(opt: {
        data: any;
        host?: string;
        path: string;
        method?: string;
        agent?: {
            pfxPath: string;
            passphrase: string;
        };
        notThrowErr?: boolean;
        originalResult?: boolean;
    }) {
        let _xml = xmlBuilder.buildObject({ xml: opt.data });
        let reqData: AxiosRequestConfig = {
            url: (opt.host || this.getHost()) + opt.path,
            method: opt.method as any,
            data: _xml,
        };
        console.log('wxpay send data:\r\n', _xml);
        if (opt.agent) {
            reqData.httpsAgent = new https.Agent({
                pfx: fs.readFileSync(opt.agent.pfxPath),
                passphrase: opt.agent.passphrase
            });
        }
        let rs = await utils.request(reqData);
        let contentType: string = rs.headers['content-type'];
        // console.log(contentType);
        let isText = contentType.indexOf('text/') > -1;
        let data = rs.data;
        let isXml = false;
        if (isText) {
            data = data.toString('utf-8');
            isXml = data.startsWith('<xml>');
        }
        if (!isXml || opt.originalResult)
            return data as T;
        console.log('wxpay return data:\r\n', data);
        let xmlRs: Response = await this.parseXml(data);

        if (!opt.notThrowErr) {
            this.handleError(xmlRs);
        }

        return xmlRs as any as T;
    }

    static handleError(rs: Response) {
        if (rs.return_code !== WxPayStatic.success)
            throw new Error(rs.return_msg);
        if (rs.result_code && rs.result_code !== WxPayStatic.success) {
            throw new Error(rs.err_code_des);
        }
    }

    //沙箱获取key接口
    static async getsignkey(data: { mch_id: string; }) {
        let signObj = {
            mch_id: data.mch_id,
            nonce_str: utils.randomString(),
        };
        signObj['sign'] = this.createSign(signObj);
        let rs = await this.request<ResponseBase & {
            mch_id: string;
            sandbox_signkey: string;
        }>({ path: Path.getSignKey, data: signObj });

        if (rs.return_code !== this.success)
            throw new Error(rs.return_msg);

        return rs;
    }

    static createSign(signObj: any, opt?: {
        key?: string;
        encrypt?: string;
    }) {
        opt = { ...opt };
        let obj = utils.sortObject(signObj);
        let signStr = qs.stringify(obj, { encode: false });
        // console.log(signStr);
        signStr += '&key=' + opt.key;
        let sign = utils.encrypt(signStr, opt.encrypt as any, opt.key).toUpperCase();
        return sign;
    }

    static async getSignObj(signObj, opt: WxPayBase & { mch?: boolean }) {
        let key = opt.key;
        let obj = utils.clone(signObj);
        if (!opt.mch) {
            obj.mch_id = opt.mch_id;
            obj.appid = opt.appid;
        } else {
            obj.mchid = opt.mch_id;
            obj.mch_appid = opt.appid;
        }
        if (this.sandbox) {
            let rs = await this.getsignkey({
                mch_id: opt.mch_id,
            });
            key = rs.sandbox_signkey;
        }
        obj.nonce_str = utils.randomString();
        for (let key in obj) {
            if ([undefined, null, ''].includes(obj[key]))
                delete obj[key];
        }
        let encrypt = 'md5';
        if (obj.sign_type == SignType.HMAC_SHA256) {
            encrypt = 'sha256';
        }
        obj.sign = this.createSign(obj, { key, encrypt });
        return obj;
    }

    static decrypt(key, crypted, iv = '', to: crypto.HexBase64BinaryEncoding = 'hex') {
        crypted = new Buffer(crypted, 'base64').toString(to);
        let decipher = crypto.createDecipheriv('aes-256-ecb', key, iv);
        let decoded = decipher.update(crypted, to, 'utf8');
        decoded += decipher.final('utf8');
        return decoded;
    }
}

export const TradeType = {
    JsApi: 'JSAPI',
    Native: 'NATIVE',
    App: 'APP',
    H5: 'MWEB'
};

export const SignType = {
    MD5: 'MD5',
    HMAC_SHA256: 'HMAC-SHA256'
};

export const BillType = {
    所有: 'ALL',
    成功: 'SUCCESS',
    退款: 'REFUND',
    充值退款: 'RECHARGE_REFUND'
};

export const CheckName = {
    不校验: 'NO_CHECK',
    强校验: 'FORCE_CHECK',
};