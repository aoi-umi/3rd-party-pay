import * as xml2js from 'xml2js';
import * as fs from 'fs';
import * as md5 from 'md5';
import * as qs from 'query-string';

import * as utils from '../utils';

const xmlBuilder = new xml2js.Builder({ headless: true });

export class Request {
    /**
    *公众账号ID
    *微信分配的公众账号ID（企业号corpid即为此appId）
    *example: wx8888888888888888
    */
    appid: string

    /**
     *商户号
     *微信支付分配的商户号
     *example: 1900000109
     */
    mch_id: string

    /**
     *随机字符串
     *随机字符串，不长于32位。推荐随机数生成算法
     *example: 5K8264ILTKCH16CQ2502SI8ZNMTM67VS
     */
    nonce_str?: string

    /**
     *签名
     *签名，详见签名生成算法
     *example: C380BEC2BFD727A4B6845133519F3AD6
     */
    sign?: string

    /**
     *签名类型
     *签名类型，目前支持HMAC-SHA256和MD5，默认为MD5
     *example: HMAC-SHA256
     */
    sign_type?: string
}

export class Response {
    /**
     *返回状态码
     *SUCCESS/FAIL 
     *此字段是接口通信情况标识，非交易成功与否的标识
     *example: SUCCESS
     */
    return_code: string

    /**
     *返回信息
     *当return_code为FAIL时返回信息为错误原因 ，例如 
     *签名失败 
     *参数格式校验错误
     *example: OK
     */
    return_msg: string

    /**
     *业务结果
     *SUCCESS/FAIL
     *example: SUCCESS
     */
    result_code: string

    /**
     *错误代码
     *详细参见错误列表
     *example: SYSTEMERROR
     */
    err_code?: string

    /**
     *错误代码描述
     *错误返回的信息描述
     *example: 系统错误
     */
    err_code_des?: string

    /**
     *公众账号ID
     *调用接口提交的公众账号ID
     *example: wx8888888888888888
     */
    appid: string

    /**
     *商户号
     *调用接口提交的商户号
     *example: 1900000109
     */
    mch_id: string

    /**
     *随机字符串
     *微信返回的随机字符串
     *example: 5K8264ILTKCH16CQ2502SI8ZNMTM67VS
     */
    nonce_str: string

    /**
     *签名
     *微信返回的签名，详见签名生成算法
     *example: C380BEC2BFD727A4B6845133519F3AD6
     */
    sign: string
}
export const Path = {
    getSignKey: '/pay/getsignkey',
    microPay: '/pay/micropay',
    orderQuery: '/pay/orderquery',
    downloadBill: '/pay/downloadbill',
}
export class WxPayBase {
    mch_id: string;
    appid: string;
    key: string;
    pfxPath: string;
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

    static async parseXml(xml: string) {
        let jsonBody = await utils.promisify(xml2js.parseString)(xml, { explicitArray: false });
        return jsonBody.xml;
    }

    static async request<T = any>(opt: {
        data: any;
        host?: string;
        path: string;
        method?: string;
        pfxPath?: string;
        mch_id?: string;
        notThrowErr?: boolean;
        originalResult?: boolean;
    }) {
        let _xml = xmlBuilder.buildObject({ xml: opt.data });
        let reqData: any = {
            url: (opt.host || this.getHost()) + opt.path,
            method: opt.method,
            data: _xml,
        };
        console.log('wxpay send data:\r\n', _xml);
        if (opt.pfxPath) {
            reqData.agentOptions = {
                pfx: fs.readFileSync(opt.pfxPath),
                passphrase: opt.mch_id
            }
        }
        let rs = await utils.request(reqData);
        // console.log(typeof rs.data)
        if (opt.originalResult)
            return rs.data as T;
        let str = rs.data.toString("utf-8");
        console.log('wxpay return data:\r\n', str);
        if (str.startsWith('<xml>')) {
            let xmlRs: Response = await this.parseXml(str);

            if (!opt.notThrowErr) {
                this.handleError(xmlRs);
            }

            return xmlRs as any as T;
        } else {
            return str;
        }
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

    static createSign(signObj: any, key?) {
        let obj = utils.sortObject(signObj);
        let signStr = qs.stringify(obj);
        signStr += '&key=' + key;
        let sign = md5(signStr).toUpperCase();
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
            if (obj[key] === undefined)
                delete obj[key];
        }
        obj.sign = this.createSign(obj, key);
        return obj;
    }
}