import * as xml2js from 'xml2js';
import * as qs from 'query-string';
import * as https from 'https';
import * as crypto from 'crypto';
import { AxiosRequestConfig } from 'axios';
import * as md from 'node-forge/lib/md.all';
import * as hmac from 'node-forge/lib/hmac';

import * as utils from '../utils';
import { RequestLog, PayStatic } from '../base';

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

export class Request {
    /**
    * 公众账号ID
    * 微信分配的公众账号ID（企业号corpid即为此appId）
    * example: wx8888888888888888
    */
    appid?: string
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
    result_code?: string

    /**
     * 业务结果描述
     * 对业务结果的补充说明
     * example: OK
     */
    result_msg?: string;

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
export class WxPaySignOption {
    mch_id: string;
    appid: string;
    key: string;
}

export class WxPayBase extends WxPaySignOption {
    pfxPath?: string;
    pfx?: any;
    payNotifyUrl: string;
}

type SignOptions = {
    key?: string;
    encrypt?: string;
};
export class WxPayStatic extends PayStatic {
    static success = 'SUCCESS';
    static host = 'https://api.mch.weixin.qq.com';
    static sandboxHost = 'https://api.mch.weixin.qq.com/sandboxnew';
    //沙箱固定金额
    static sandboxFee = 101;

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
            pfx: string;
            passphrase: string;
        };
        notThrowErr?: boolean;
        originalResult?: boolean;
    }) {
        let log: RequestLog = {
            success: true
        };
        try {
            let url = (opt.host || this.getHost()) + opt.path;
            log.url = url;
            log.orginReq = opt.data;
            let _xml = xmlBuilder.buildObject({ xml: opt.data });
            let reqData: AxiosRequestConfig = {
                url: (opt.host || this.getHost()) + opt.path,
                method: opt.method as any,
                data: _xml,
            };
            log.req = _xml;
            if (opt.agent) {
                reqData.httpsAgent = new https.Agent({
                    pfx: opt.agent.pfx,
                    passphrase: opt.agent.passphrase
                });
            }
            let rs = await utils.request(reqData);
            let contentType: string = rs.headers['content-type'];
            // console.log(contentType);
            let isText = contentType.indexOf('text/') > -1;
            let data = rs.data;
            log.orginRes = data;
            let isXml = false;
            if (isText) {
                data = data.toString('utf-8');
                isXml = data.startsWith('<xml>');
            }
            if (!isXml || opt.originalResult)
                return data as T;
            let parseRs: Response = await this.parseXml(data);
            log.res = parseRs;

            if (!opt.notThrowErr) {
                this.errorHandler(parseRs);
            }

            return parseRs as any as T;
        } catch (e) {
            log.success = false;
            log.msg = e.message;
            throw e;
        } finally {
            this.requestLog && this.requestLog(log);
        }
    }

    static errorHandler(rs: Response) {
        if (rs.return_code !== WxPayStatic.success) {
            let err = new Error(rs.return_msg);
            if (rs.err_code)
                err['err_code'] = rs.err_code;
            throw err;
        }
        if (rs.result_code && rs.result_code !== WxPayStatic.success) {
            let err = new Error(rs.err_code_des);
            if (rs.err_code)
                err['err_code'] = rs.err_code;
            throw err;
        }
    }

    //沙箱获取key接口
    static async getsignkey(data: { mch_id: string, }, opt: SignOptions) {
        let signObj = {
            mch_id: data.mch_id,
            nonce_str: utils.randomString(),
        };
        signObj['sign'] = this.createSign(signObj, opt);
        let rs = await this.request<ResponseBase & {
            mch_id: string;
            sandbox_signkey: string;
        }>({ path: Path.getSignKey, data: signObj });
        this.errorHandler(rs as any);

        return rs;
    }

    static createSign(signObj: any, opt?: SignOptions) {
        opt = { ...opt };
        let signStr = this.stringify(signObj, opt.key);
        let sign = this.encrypt(signStr, opt.encrypt as any, opt.key);
        return sign;
    }

    static stringify(signObj, key) {
        let obj = utils.sortObject(signObj);
        let signStr = qs.stringify(obj, { encode: false });
        // console.log(signStr);
        signStr += '&key=' + key;
        return signStr;
    }

    static async getSignObj(data, opt: WxPaySignOption & { mch?: boolean }) {
        let key = opt.key;
        let obj = utils.clone(data) as Sign & {
            mch_id?: string; appid?: string;
        } & {
            mchid?: string; mch_appid?: string
        };

        let appid = obj.appid || opt.appid;
        delete obj.appid;
        if (!opt.mch) {
            obj.mch_id = opt.mch_id;
            obj.appid = appid;
        } else {
            obj.mchid = opt.mch_id;
            obj.mch_appid = appid;
        }
        if (this.sandbox) {
            let rs = await this.getsignkey({
                mch_id: opt.mch_id,
            }, {
                key
            });
            key = rs.sandbox_signkey;
        }
        obj.nonce_str = utils.randomString();
        obj.sign = this.createSign(obj, { key, encrypt: obj.sign_type });
        return obj;
    }

    static encrypt(str: string, type: string, key?: string) {
        let encrypt = md.md5;
        let isHmac = false;
        let hmac = /hmac-/;
        if (hmac.test(type)) {
            encrypt = hmac;
            isHmac = true;
            type = type.replace(hmac, '');
        }
        let en = encrypt.create();
        if (isHmac)
            en.start(type, key);
        en.update(str, 'utf8');
        return en.digest().toHex().toUpperCase();
    }

    static signVerify(str: string, sign: string, type: string, key?: string) {
        let newSign = this.encrypt(str, type, key);
        return newSign === sign;
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

export const AccountType = {
    基本账户: 'Basic',
    运营账户: 'Operation',
    手续费账户: 'Fees'
};