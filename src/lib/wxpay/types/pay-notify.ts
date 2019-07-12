import * as base from '../base';

export class Request extends base.Response {

    /**
     * 设备号
     * 微信支付分配的终端设备号，
     * example: 013467007045764
     */
    device_info?: string;

    /**
     * 用户标识
     * 用户在商户appid下的唯一标识
     * example: wxd930ea5d5a258f4f
     */
    openid: string;

    /**
     * 是否关注公众账号
     * 用户是否关注公众账号，Y-关注，N-未关注
     * example: Y
     */
    is_subscribe: string;

    /**
     * 交易类型
     * JSAPI、NATIVE、APP
     * example: JSAPI
     */
    trade_type: string;

    /**
     * 付款银行
     * 银行类型，采用字符串类型的银行标识，银行类型见银行列表
     * example: CMC
     */
    bank_type: string;

    /**
     * 订单金额
     * 订单总金额，单位为分
     * example: 100
     */
    total_fee: number;

    /**
     * 应结订单金额
     * 应结订单金额=订单金额-非充值代金券金额，应结订单金额<=订单金额。
     * example: 100
     */
    settlement_total_fee?: number;

    /**
     * 货币种类
     * 货币类型，符合ISO4217标准的三位字母代码，默认人民币：CNY，其他值列表详见货币类型
     * example: CNY
     */
    fee_type?: string;

    /**
     * 现金支付金额
     * 现金支付金额订单现金支付金额，详见支付金额
     * example: 100
     */
    cash_fee: number;

    /**
     * 现金支付货币类型
     * 货币类型，符合ISO4217标准的三位字母代码，默认人民币：CNY，其他值列表详见货币类型
     * example: CNY
     */
    cash_fee_type?: string;

    /**
     * 总代金券金额
     * 代金券金额<=订单金额，订单金额-代金券金额=现金支付金额，详见支付金额
     * example: 10
     */
    coupon_fee?: number;

    /**
     * 代金券使用数量
     * 代金券使用数量
     * example: 1
     */
    coupon_count?: number;

    /**
     * 代金券类型
     * CASH--充值代金券 
     * NO_CASH---非充值代金券 
     * 并且订单使用了免充值券后有返回（取值：CASH、NO_CASH）。$n为下标,从0开始编号，举例：coupon_type_0
     * example: CASH
     */
    coupon_type_$n?: string;

    /**
     * 代金券ID
     * 代金券ID,$n为下标，从0开始编号
     * example: 10000
     */
    coupon_id_$n?: string;

    /**
     * 单个代金券支付金额
     * 单个代金券支付金额,$n为下标，从0开始编号
     * example: 100
     */
    coupon_fee_$n?: number;

    /**
     * 微信支付订单号
     * 微信支付订单号
     * example: 1217752501201407033233368018
     */
    transaction_id: string;

    /**
     * 商户订单号
     * 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*@ ，且在同一个商户号下唯一。
     * example: 1212321211201407033568112322
     */
    out_trade_no: string;

    /**
     * 商家数据包
     * 商家数据包，原样返回
     * example: 123456
     */
    attach?: string;

    /**
     * 支付完成时间
     * 支付完成时间，格式为yyyyMMddHHmmss，如2009年12月25日9点10分10秒表示为20091225091010。其他详见时间规则
     * example: 20141030133525
     */
    time_end: string;

}

export class Response extends base.ResponseBase {
}