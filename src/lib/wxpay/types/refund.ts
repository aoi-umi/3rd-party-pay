import * as base from '../base';

export class Request extends base.Request {

    /**
     * 微信订单号
     * 微信生成的订单号，在支付通知中有返回
     * example: 1217752501201407033233368018
     */
    transaction_id?: string

    /**
     * 商户订单号
     * 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*@ ，且在同一个商户号下唯一。
     * example: 33368018
     */
    out_trade_no?: string

    /**
     * 商户退款单号
     * 商户系统内部的退款单号，商户系统内部唯一，只能是数字、大小写字母_-|*@ ，同一退款单号多次请求只退一笔。
     * example: 1217752501201407033233368018
     */
    out_refund_no: string

    /**
     * 订单金额
     * 订单总金额，单位为分，只能为整数，详见支付金额
     * example: 100
     */
    total_fee: number

    /**
     * 退款金额
     * 退款总金额，订单总金额，单位为分，只能为整数，详见支付金额
     * example: 100
     */
    refund_fee: number

    /**
     * 退款货币种类
     * 退款货币类型，需与支付一致，或者不填。符合ISO 4217标准的三位字母代码，默认人民币：CNY，其他值列表详见货币类型
     * example: CNY
     */
    refund_fee_type?: string

    /**
     * 退款原因
     * 若商户传入，会在下发给用户的退款消息中体现退款原因
     * 注意：若订单退款金额≤1元，且属于部分退款，则不会在退款消息中体现退款原因
     * example: 商品已售完
     */
    refund_desc?: string

    /**
     * 退款资金来源
     * 仅针对老资金流商户使用
     * REFUND_SOURCE_UNSETTLED_FUNDS---未结算资金退款（默认使用未结算资金退款）
     * REFUND_SOURCE_RECHARGE_FUNDS---可用余额退款
     * example: REFUND_SOURCE_RECHARGE_FUNDS
     */
    refund_account?: string

    /**
     * 退款结果通知url
     * 异步接收微信支付退款结果通知的回调地址，通知URL必须为外网可访问的url，不允许带参数
     * 如果参数中传了notify_url，则商户平台上配置的回调地址将不会生效。
     * example: https://weixin.qq.com/notify/
     */
    notify_url?: string

}

export class Response extends base.Response {

    /**
     * 微信订单号
     * 微信订单号
     * example: 4007752501201407033233368018
     */
    transaction_id: string

    /**
     * 商户订单号
     * 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*@ ，且在同一个商户号下唯一。
     * example: 33368018
     */
    out_trade_no: string

    /**
     * 商户退款单号
     * 商户系统内部的退款单号，商户系统内部唯一，只能是数字、大小写字母_-|*@ ，同一退款单号多次请求只退一笔。
     * example: 121775250
     */
    out_refund_no: string

    /**
     * 微信退款单号
     * 微信退款单号
     * example: 2007752501201407033233368018
     */
    refund_id: string

    /**
     * 退款金额
     * 退款总金额,单位为分,可以做部分退款
     * example: 100
     */
    refund_fee: number

    /**
     * 应结退款金额
     * 去掉非充值代金券退款金额后的退款金额，退款金额=申请退款金额-非充值代金券退款金额，退款金额<=申请退款金额
     * example: 100
     */
    settlement_refund_fee?: number

    /**
     * 标价金额
     * 订单总金额，单位为分，只能为整数，详见支付金额
     * example: 100
     */
    total_fee: number

    /**
     * 应结订单金额
     * 去掉非充值代金券金额后的订单总金额，应结订单金额=订单金额-非充值代金券金额，应结订单金额<=订单金额。
     * example: 100
     */
    settlement_total_fee?: number

    /**
     * 标价币种
     * 订单金额货币类型，符合ISO 4217标准的三位字母代码，默认人民币：CNY，其他值列表详见货币类型
     * example: CNY
     */
    fee_type?: string

    /**
     * 现金支付金额
     * 现金支付金额，单位为分，只能为整数，详见支付金额
     * example: 100
     */
    cash_fee: number

    /**
     * 现金支付币种
     * 货币类型，符合ISO 4217标准的三位字母代码，默认人民币：CNY，其他值列表详见货币类型
     * example: CNY
     */
    cash_fee_type?: string

    /**
     * 现金退款金额
     * 现金退款金额，单位为分，只能为整数，详见支付金额
     * example: 100
     */
    cash_refund_fee?: number

    /**
     * 代金券类型
     * CASH--充值代金券 
     * NO_CASH---非充值代金券 
     * 订单使用代金券时有返回（取值：CASH、NO_CASH）。$n为下标,从0开始编号，举例：coupon_type_0
     * example: CASH
     */
    coupon_type_$n?: string

    /**
     * 代金券退款总金额
     * 代金券退款金额<=退款金额，退款金额-代金券或立减优惠退款金额为现金，说明详见代金券或立减优惠
     * example: 100
     */
    coupon_refund_fee?: number

    /**
     * 单个代金券退款金额
     * 代金券退款金额<=退款金额，退款金额-代金券或立减优惠退款金额为现金，说明详见代金券或立减优惠
     * example: 100
     */
    coupon_refund_fee_$n?: number

    /**
     * 退款代金券使用数量
     * 退款代金券使用数量
     * example: 1
     */
    coupon_refund_count?: number

    /**
     * 退款代金券ID
     * 退款代金券ID, $n为下标，从0开始编号
     * example: 10000
     */
    coupon_refund_id_$n?: string

}
