import * as base from './base';

export class Request {

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

export const error = {

    SYSTEMERROR: {
        code: 'SYSTEMERROR',
        desc: '接口返回错误',
        resolve: '请不要更换商户退款单号，请使用相同参数再次调用API。',
    },

    BIZERR_NEED_RETRY: {
        code: 'BIZERR_NEED_RETRY',
        desc: '退款业务流程错误，需要商户触发重试来解决',
        resolve: '请不要更换商户退款单号，请使用相同参数再次调用API。',
    },

    TRADE_OVERDUE: {
        code: 'TRADE_OVERDUE',
        desc: '订单已经超过退款期限',
        resolve: '请选择其他方式自行退款',
    },

    ERROR: {
        code: 'ERROR',
        desc: '业务错误',
        resolve: '该错误都会返回具体的错误原因，请根据实际返回做相应处理。',
    },

    USER_ACCOUNT_ABNORMAL: {
        code: 'USER_ACCOUNT_ABNORMAL',
        desc: '退款请求失败',
        resolve: '此状态代表退款申请失败，商户可自行处理退款。',
    },

    INVALID_REQ_TOO_MUCH: {
        code: 'INVALID_REQ_TOO_MUCH',
        desc: '无效请求过多',
        resolve: '请检查业务是否正常，确认业务正常后请在1分钟后再来重试',
    },

    NOTENOUGH: {
        code: 'NOTENOUGH',
        desc: '余额不足',
        resolve: '此状态代表退款申请失败，商户可根据具体的错误提示做相应的处理。',
    },

    INVALID_TRANSACTIONID: {
        code: 'INVALID_TRANSACTIONID',
        desc: '无效transaction_id',
        resolve: '请求参数错误，检查原交易号是否存在或发起支付交易接口返回失败',
    },

    PARAM_ERROR: {
        code: 'PARAM_ERROR',
        desc: '参数错误',
        resolve: '请求参数错误，请重新检查再调用退款申请',
    },

    APPID_NOT_EXIST: {
        code: 'APPID_NOT_EXIST',
        desc: 'APPID不存在',
        resolve: '请检查APPID是否正确',
    },

    MCHID_NOT_EXIST: {
        code: 'MCHID_NOT_EXIST',
        desc: 'MCHID不存在',
        resolve: '请检查MCHID是否正确',
    },

    ORDERNOTEXIST: {
        code: 'ORDERNOTEXIST',
        desc: '订单号不存在',
        resolve: '请检查你的订单号是否正确且是否已支付，未支付的订单不能发起退款',
    },

    REQUIRE_POST_METHOD: {
        code: 'REQUIRE_POST_METHOD',
        desc: '请使用post方法',
        resolve: '请检查请求参数是否通过post方法提交',
    },

    SIGNERROR: {
        code: 'SIGNERROR',
        desc: '签名错误',
        resolve: '请检查签名参数和方法是否都符合签名算法要求',
    },

    XML_FORMAT_ERROR: {
        code: 'XML_FORMAT_ERROR',
        desc: 'XML格式错误',
        resolve: '请检查XML参数格式是否正确',
    },

    FREQUENCY_LIMITED: {
        code: 'FREQUENCY_LIMITED',
        desc: '频率限制',
        resolve: '该笔退款未受理，请降低频率后重试',
    },

};