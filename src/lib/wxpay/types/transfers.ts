import * as base from '../base';

export class Request extends base.Request {

    /**
     * 设备号
     * 微信支付分配的终端设备号
     * example: 013467007045764
     */
    device_info?: string;

    /**
     * 商户订单号
     * 商户订单号，需保持唯一性
     * (只能是字母或者数字，不能包含有其他字符)
     * example: 10000098201411111234567890
     */
    partner_trade_no: string;

    /**
     * 用户openid
     * 商户appid下，某用户的openid
     * example: oxTWIuGaIt6gTKsQRLau2M0yL16E
     */
    openid: string;

    /**
     * 校验用户姓名选项
     * NO_CHECK：不校验真实姓名 
     * FORCE_CHECK：强校验真实姓名
     * example: FORCE_CHECK
     */
    check_name: string;

    /**
     * 收款用户姓名
     * 收款用户真实姓名。 
     * 如果check_name设置为FORCE_CHECK，则必填用户真实姓名
     * example: 王小王
     */
    re_user_name?: string;

    /**
     * 金额
     * 企业付款金额，单位为分
     * example: 10099
     */
    amount: number;

    /**
     * 企业付款备注
     * 企业付款备注，必填。注意：备注中的敏感词会被转成字符*
     * example: 理赔
     */
    desc: string;

    /**
     * Ip地址
     * 该IP同在商户平台设置的IP白名单中的IP没有关联，该IP可传用户端或者服务端的IP。
     * example: 192.168.0.1
     */
    spbill_create_ip: string;

}

export class Response extends base.Response {

    /**
     * 设备号
     * 微信支付分配的终端设备号，
     * example: 013467007045764
     */
    device_info?: string;

    /**
     * 商户订单号
     * 商户订单号，需保持历史全局唯一性(只能是字母或者数字，不能包含有其他字符)
     * example: 1217752501201407033233368018
     */
    partner_trade_no: string;

    /**
     * 微信付款单号
     * 企业付款成功，返回的微信付款单号
     * example: 1007752501201407033233368018
     */
    payment_no: string;

    /**
     * 付款成功时间
     * 企业付款成功时间
     * example: 2015-05-19 15：26：59
     */
    payment_time: string;

}

