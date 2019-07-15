import * as qs from 'query-string';
import * as crypto from 'crypto';

import * as utils from '../utils';
import { PayStatic, SignType, PayStaticConfig } from "../base";

export class RequestBase {

    /**
     * 支付宝分配给开发者的应用ID
     * example: 2014072300007148
     */
    app_id: string;

    /**
     * 接口名称
     * example: alipay.trade.page.pay
     */
    method: string;

    /**
     * 仅支持JSON
     * example: JSON
     */
    format?: string;

    /**
     * HTTP/HTTPS开头字符串
     * example: https://m.alipay.com/Gk8NF23
     */
    return_url?: string;

    /**
     * 请求使用的编码格式，如utf-8,gbk,gb2312等
     * example: utf-8
     */
    charset: string;

    /**
     * 商户生成签名字符串所使用的签名算法类型，目前支持RSA2和RSA，推荐使用RSA2
     * example: RSA2
     */
    sign_type: string;

    /**
     * 商户请求参数的签名串，详见签名
     * example: 详见示例
     */
    sign: string;

    /**
     * 发送请求的时间，格式"yyyy-MM-dd HH:mm:ss"
     * example: 2014-07-24 03:07:50
     */
    timestamp: string;

    /**
     * 调用的接口版本，固定为：1.0
     * example: 1.0
     */
    version: string;

    /**
     * 支付宝服务器主动通知商户服务器里指定的页面http/https路径。
     * example: http://api.test.alipay.net/atinterface/receive_notify.htm
     */
    notify_url?: string;

    /**
     * 详见应用授权概述
     */
    app_auth_token?: string;

    /**
     * 请求参数的集合，最大长度不限，除公共参数外所有请求参数都必须放在这个参数中传递，具体参照各产品快速接入文档
     */
    biz_content: string;

}

export class Request { }

export class Response {

    /**
     * 网关返回码,详见文档
     * example: 40004
     */
    code: string;

    /**
     * 网关返回码描述,详见文档
     * example: Business Failed
     */
    msg: string;

    /**
     * 业务返回码，参见具体的API接口文档
     * example: ACQ.TRADE_HAS_SUCCESS
     */
    sub_code?: string;

    /**
     * 业务返回码描述，参见具体的API接口文档
     * example: 交易已被支付
     */
    sub_msg?: string;

    /**
     * 签名,详见文档
     * example: DZXh8eeTuAHoYE3w1J+POiPhfDxOYBfUNn1lkeT/V7P4zJdyojWEa6IZs6Hz0yDW5Cp/viufUb5I0/V5WENS3OYR8zRedqo6D+fUTdLHdc+EFyCkiQhBxIzgngPdPdfp1PIS7BdhhzrsZHbRqb7o4k3Dxc+AAnFauu4V6Zdwczo=
     */
    sign: string;

}

export const Method = {
    //https://docs.open.alipay.com/api_1/alipay.trade.advance.consult
    alipayTradeAdvanceConsult: 'alipay.trade.advance.consult',

    //https://docs.open.alipay.com/api_1/alipay.trade.app.pay
    alipayTradeAppPay: 'alipay.trade.app.pay',

    //https://docs.open.alipay.com/api_1/alipay.trade.cancel
    alipayTradeCancel: 'alipay.trade.cancel',

    //https://docs.open.alipay.com/api_1/alipay.trade.close
    alipayTradeClose: 'alipay.trade.close',

    //https://docs.open.alipay.com/api_1/alipay.trade.create
    alipayTradeCreate: 'alipay.trade.create',

    //https://docs.open.alipay.com/api_1/alipay.trade.fastpay.refund.query
    alipayTradeFastpayRefundQuery: 'alipay.trade.fastpay.refund.query',

    //https://docs.open.alipay.com/api_1/alipay.trade.order.settle
    alipayTradeOrderSettle: 'alipay.trade.order.settle',

    //https://docs.open.alipay.com/api_1/alipay.trade.orderinfo.sync
    alipayTradeOrderinfoSync: 'alipay.trade.orderinfo.sync',

    //https://docs.open.alipay.com/api_1/alipay.trade.page.pay
    alipayTradePagePay: 'alipay.trade.page.pay',

    //https://docs.open.alipay.com/api_1/alipay.trade.page.refund
    alipayTradePageRefund: 'alipay.trade.page.refund',

    //https://docs.open.alipay.com/api_1/alipay.trade.pay
    alipayTradePay: 'alipay.trade.pay',

    //https://docs.open.alipay.com/api_1/alipay.trade.precreate
    alipayTradePrecreate: 'alipay.trade.precreate',

    //https://docs.open.alipay.com/api_1/alipay.trade.query
    alipayTradeQuery: 'alipay.trade.query',

    //https://docs.open.alipay.com/api_1/alipay.trade.refund
    alipayTradeRefund: 'alipay.trade.refund',

    //https://docs.open.alipay.com/api_1/alipay.trade.wap.pay
    alipayTradeWapPay: 'alipay.trade.wap.pay',
};

export class AliPayBase {
    app_id: string;
    sign_type?: string;
    rsaPrivatePath: string;
    rsaPublicPath: string;
}

export class AliPayStatic extends PayStatic {

    static host = 'https://openapi.alipay.com/gateway.do';
    static sandboxHost = 'https://openapi.alipaydev.com/gateway.do';
    static sign_type = SignType.RSA2;

    static config(opt: PayStaticConfig & { sign_type?: string }) {
        super.config(opt);
        if (opt.sign_type)
            this.sign_type = opt.sign_type;
    }
    static getSignObj(data, opt: {
        app_id: string;
        rsaPrivate: string;
        method: string;
        sign_type?: string;
        notify_url?: string;
        return_url?: string;
        withHost?: boolean;
    }) {
        let obj = {
            app_id: opt.app_id,
            sign_type: opt.sign_type || this.sign_type,
            notify_url: opt.notify_url,
            return_url: opt.return_url,
            format: 'JSON',
            charset: 'utf-8',
            timestamp: utils.dateFormat(),
            version: '1.0',
            biz_content: JSON.stringify(data),
            method: opt.method,
        };
        let sortObj = utils.sortObject(obj);
        // console.log(sortObj);
        let params = this.rsaSign(sortObj, opt.rsaPrivate, obj.sign_type);
        return (opt.withHost ? this.getHost() + '?' : '') + params;
    }

    static rsaSign(data: Object, privateKey: string, signType?: string) {
        let obj = utils.sortObject(data);
        let stringify = this.stringify(obj);
        let sign = this.encrypt(stringify.str, privateKey, signType);
        return stringify.encodeStr + '&sign=' + encodeURIComponent(sign);
    }

    static stringify(data) {
        let str = [];
        let encodeStr = [];
        Object.entries(data).forEach((ele => {
            str.push(ele[0] + '=' + ele[1]);
            encodeStr.push(ele[0] + '=' + encodeURIComponent(ele[1] as any));
        }));
        return {
            str: str.join('&'),
            encodeStr: encodeStr.join('&'),
        };
    }

    static encrypt(str, privateKey, signType?: string) {
        let sha;
        if (signType === SignType.RSA2) {
            sha = crypto.createSign('RSA-SHA256');
        } else {
            sha = crypto.createSign('RSA-SHA1');
        }
        sha.update(str, 'utf8');
        return sha.sign(privateKey, 'base64');
    }

    static signVerify(str, sign, publicKey, signType?: string) {
        let verify;
        if (signType === SignType.RSA2) {
            verify = crypto.createVerify('RSA-SHA256');
        } else {
            verify = crypto.createVerify('RSA-SHA1');
        }
        verify.update(str, 'utf8');
        return verify.verify(publicKey, sign, 'base64');
    }
}