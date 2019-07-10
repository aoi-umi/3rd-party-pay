//https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_2

import * as base from './base';

export class Request {
    /**
     *微信订单号
     *微信的订单号，建议优先使用
     *example: 1009660380201506130728806387
     */
    transaction_id?: string

    /**
     *商户订单号
     *商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*@ ，且在同一个商户号下唯一。 详见商户订单号
     *example: 20150806125346
     */
    out_trade_no?: string
}

export class Response extends base.Response {

    /**
     *设备号
     *微信支付分配的终端设备号
     *example: 013467007045764
     */
    device_info?: string

    /**
     *用户标识
     *用户在商户appid下的唯一标识
     *example: oUpF8uMuAJO_M2pxb1Q9zNjWeS6o
     */
    openid: string

    /**
     *是否关注公众账号
     *用户是否关注公众账号，Y-关注，N-未关注
     *example: Y
     */
    is_subscribe: string

    /**
     *交易类型
     *调用接口提交的交易类型，取值如下：JSAPI，NATIVE，APP，MICROPAY，详细说明见参数规定
     *example: JSAPI
     */
    trade_type: string

    /**
     *交易状态
     *SUCCESS—支付成功 
     *REFUND—转入退款 
     *NOTPAY—未支付 
     *CLOSED—已关闭 
     *REVOKED—已撤销（付款码支付） 
     *USERPAYING--用户支付中（付款码支付） 
     *PAYERROR--支付失败(其他原因，如银行返回失败)
     *支付状态机请见下单API页面
     *example: SUCCESS
     */
    trade_state: string

    /**
     *付款银行
     *银行类型，采用字符串类型的银行标识
     *example: CMC
     */
    bank_type: string

    /**
     *标价金额
     *订单总金额，单位为分
     *example: 100
     */
    total_fee: number

    /**
     *应结订单金额
     *当订单使用了免充值型优惠券后返回该参数，应结订单金额=订单金额-免充值优惠券金额。
     *example: 100
     */
    settlement_total_fee?: number

    /**
     *标价币种
     *货币类型，符合ISO 4217标准的三位字母代码，默认人民币：CNY，其他值列表详见货币类型
     *example: CNY
     */
    fee_type?: string

    /**
     *现金支付金额
     *现金支付金额订单现金支付金额，详见支付金额
     *example: 100
     */
    cash_fee: number

    /**
     *现金支付币种
     *货币类型，符合ISO 4217标准的三位字母代码，默认人民币：CNY，其他值列表详见货币类型
     *example: CNY
     */
    cash_fee_type?: string

    /**
     *代金券金额
     *“代金券”金额<=订单金额，订单金额-“代金券”金额=现金支付金额，详见支付金额
     *example: 100
     */
    coupon_fee?: number

    /**
     *代金券使用数量
     *代金券使用数量
     *example: 1
     */
    coupon_count?: number

    /**
     *代金券类型
     *CASH--充值代金券 
     *NO_CASH---非充值优惠券 
     *开通免充值券功能，并且订单使用了优惠券后有返回（取值：CASH、NO_CASH）。$n为下标,从0开始编号，举例：coupon_type_$0
     *example: CASH
     */
    coupon_type_$n?: string

    /**
     *代金券ID
     *代金券ID, $n为下标，从0开始编号
     *example: 10000
     */
    coupon_id_$n?: string

    /**
     *单个代金券支付金额
     *单个代金券支付金额, $n为下标，从0开始编号
     *example: 100
     */
    coupon_fee_$n?: number

    /**
     *微信支付订单号
     *微信支付订单号
     *example: 1009660380201506130728806387
     */
    transaction_id: string

    /**
     *商户订单号
     *商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*@ ，且在同一个商户号下唯一。
     *example: 20150806125346
     */
    out_trade_no: string

    /**
     *附加数据
     *附加数据，原样返回
     *example: 深圳分店
     */
    attach?: string

    /**
     *支付完成时间
     *订单支付时间，格式为yyyyMMddHHmmss，如2009年12月25日9点10分10秒表示为20091225091010。其他详见时间规则
     *example: 20141030133525
     */
    time_end: string

    /**
     *交易状态描述
     *对当前查询订单状态的描述和下一步操作的指引
     *example: 支付失败，请重新下单支付
     */
    trade_state_desc: string

}

export const error = {

    ORDERNOTEXIST: {
        code: 'ORDERNOTEXIST',
        desc: '此交易订单号不存在',
        resolve: '该API只能查提交支付交易返回成功的订单，请商户检查需要查询的订单号是否正确',
        payStatus: '',
    },

    SYSTEMERROR: {
        code: 'SYSTEMERROR',
        desc: '系统错误',
        resolve: '系统异常，请再调用发起查询',
        payStatus: '',
    },

};