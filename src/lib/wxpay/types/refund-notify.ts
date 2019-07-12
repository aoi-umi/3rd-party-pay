import * as base from '../base';

export class Request {

    /**
     * 返回状态码
     * SUCCESS/FAIL 
     * 此字段是通信标识，非交易标识，交易是否成功需要查看trade_state来判断
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

    /**
     * 公众账号ID
     * 微信分配的公众账号ID（企业号corpid即为此appId）
     * example: wx8888888888888888
     */
    appid: string

    /**
     * 退款的商户号
     * 微信支付分配的商户号
     * example: 1900000109
     */
    mch_id: string

    /**
     * 随机字符串
     * 随机字符串，不长于32位。推荐随机数生成算法
     * example: 5K8264ILTKCH16CQ2502SI8ZNMTM67VS
     */
    nonce_str: string

    /**
     * 加密信息
     * 加密信息请用商户秘钥进行解密，详见解密方式
     * example: 
     */
    req_info: RequestInfo

}

export class RequestInfo {

    /**
     * 微信订单号
     * 微信订单号
     * example: 1217752501201407033233368018
     */
    transaction_id: string

    /**
     * 商户订单号
     * 商户系统内部的订单号
     * example: 1217752501201407033233368018
     */
    out_trade_no: string

    /**
     * 微信退款单号
     * 微信退款单号
     * example: 1217752501201407033233368018
     */
    refund_id: string

    /**
     * 商户退款单号
     * 商户退款单号
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
     * 应结订单金额
     * 当该订单有使用非充值券时，返回此字段。应结订单金额=订单金额-非充值代金券金额，应结订单金额<=订单金额。
     * example: 100
     */
    settlement_total_fee?: number

    /**
     * 申请退款金额
     * 退款总金额,单位为分
     * example: 100
     */
    refund_fee: number

    /**
     * 退款金额
     * 退款金额=申请退款金额-非充值代金券退款金额，退款金额<=申请退款金额
     * example: 100
     */
    settlement_refund_fee: number

    /**
     * 退款状态
     * SUCCESS-退款成功
     * CHANGE-退款异常
     * REFUNDCLOSE—退款关闭
     * example: SUCCESS
     */
    refund_status: string

    /**
     * 退款成功时间
     * 资金退款至用户帐号的时间，格式2017-12-15 09:46:01
     * example: 2017-12-15 09:46:01
     */
    success_time?: string

    /**
     * 退款入账账户
     * 取当前退款单的退款入账方
     * 1）退回银行卡：
     * {银行名称}{卡类型}{卡尾号}
     * 2）退回支付用户零钱:
     * 支付用户零钱
     * 3）退还商户:
     * 商户基本账户
     * 商户结算银行账户
     * 4）退回支付用户零钱通:
     * 支付用户零钱通
     * example: 招商银行信用卡0403
     */
    refund_recv_accout: string

    /**
     * 退款资金来源
     * REFUND_SOURCE_RECHARGE_FUNDS 可用余额退款/基本账户
     * REFUND_SOURCE_UNSETTLED_FUNDS 未结算资金退款
     * example: REFUND_SOURCE_RECHARGE_FUNDS
     */
    refund_account: string

    /**
     * 退款发起来源
     * API接口
     * VENDOR_PLATFORM商户平台
     * example: API
     */
    refund_request_source: string

}

export class Response extends base.ResponseBase {

}