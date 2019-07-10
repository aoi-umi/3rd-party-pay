//https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_13&index=9

import * as base from './base';

export class Request {

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