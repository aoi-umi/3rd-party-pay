import * as xml2js from 'xml2js';
import * as fs from 'fs';
import * as qs from 'query-string';
import * as https from 'https';
import * as crypto from 'crypto';
import { AxiosRequestConfig } from 'axios';

import * as utils from '../utils';

const xmlBuilder = new xml2js.Builder({ headless: true });

export class Request {
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
    sign?: string

    /**
     * 签名类型
     * 签名类型，目前支持HMAC-SHA256和MD5，默认为MD5
     * example: HMAC-SHA256
     */
    sign_type?: string
}

export class Response {
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

    /**
     * 业务结果
     * SUCCESS/FAIL
     * example: SUCCESS
     */
    result_code: string

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
export const Path = {
    getSignKey: '/pay/getsignkey',

    //支付
    microPay: '/pay/micropay',
    orderQuery: '/pay/orderquery',
    reverse: '/secapi/pay/reverse',
    refund: '/secapi/pay/refund',
    refundQuery: '/pay/refundquery',
    downloadBill: '/pay/downloadbill',
    downloadFundflow: '/pay/downloadfundflow',
    report: '/payitil/report',
    authCodeToOpenid: '/tools/authcodetoopenid',

    //
}
export class WxPayBase {
    mch_id: string;
    appid: string;
    key: string;
    pfxPath?: string;
}
export class WxPayStatic {
    static sandbox = false;
    static success = 'SUCCESS';
    static getHost() {
        return !this.sandbox ? 'https://api.mch.weixin.qq.com' : 'https://api.mch.weixin.qq.com/sandboxnew';
    }
    static buildXml(data) {
        return xmlBuilder.buildObject({ xml: data });
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
            })
        }
        let rs = await utils.request(reqData);
        let contentType: string = rs.headers['content-type'];
        let isText = contentType.indexOf('text/plain') > -1;
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

    //#region 调用接口 
    //沙箱获取key接口
    static async getsignkey(data: { mch_id: string; }) {
        let signObj = {
            mch_id: data.mch_id,
            nonce_str: utils.randomString(),
        };
        signObj['sign'] = this.createSign(signObj);
        let resData = await this.request({ path: Path.getSignKey, data: signObj });
        return resData;
    }
    //#endregion

    static createSign(signObj: any, opt?: {
        key?: string;
        encrypt?: string;
    }) {
        opt = { ...opt };
        let obj = utils.sortObject(signObj);
        let signStr = qs.stringify(obj, { encode: false });
        signStr += '&key=' + opt.key;
        let sign = utils.encrypt(signStr, opt.encrypt as any, opt.key).toUpperCase();
        return sign;
    }

    static async getSignObj(signObj, opt: WxPayBase) {
        let key = opt.key;
        let obj = utils.clone(signObj);
        obj.mch_id = opt.mch_id;
        obj.appid = opt.appid;
        if (this.sandbox) {
            let rs = await this.getsignkey({
                mch_id: signObj.mch_id,
            });
            if (rs.return_code !== this.success)
                throw new Error(rs.return_msg);
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