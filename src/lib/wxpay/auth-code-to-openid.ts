import * as base from './base';

export class Request extends base.Request {

    /**
     * 授权码
     * 扫码支付授权码，设备读取用户微信中的条码或者二维码信息
     */
    auth_code: string;
}

export class Response extends base.Response {

    /**
     * 用户标识
     * 用户在商户appid下的唯一标识
     */
    openid: string

}