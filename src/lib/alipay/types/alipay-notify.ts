
export class Request {

    /**
     * 通知时间
     * 通知的发送时间。格式为yyyy-MM-dd HH:mm:ss
     * example: 2011-12-27 06:30:30
     */
    notify_time: string;

    /**
     * 通知类型
     * 通知的类型
     * example: trade_status_sync
     */
    notify_type: string;

    /**
     * 通知校验ID
     * 通知校验ID
     * example: ac05099524730693a8b330c5ecf72da9786
     */
    notify_id: string;

    /**
     * 签名类型
     * 商户生成签名字符串所使用的签名算法类型，目前支持RSA2和RSA，推荐使用RSA2
     * example: RSA2
     */
    sign_type: string;

    /**
     * 签名
     * 请参考异步返回结果的验签
     * example: 601510b7970e52cc63db0f44997cf70e
     */
    sign: string;

    /**
     * 支付宝交易号
     * 支付宝交易凭证号
     * example: 2013112011001004330000121536
     */
    trade_no: string;

    /**
     * 开发者的app_id
     * 支付宝分配给开发者的应用Id
     * example: 2014072300007148
     */
    app_id: string;

    /**
     * 商户订单号
     * 原支付请求的商户订单号
     * example: 6823789339978248
     */
    out_trade_no: string;

    /**
     * 商户业务号
     * 商户业务ID，主要是退款通知中返回退款申请的流水号
     * example: HZRF001
     */
    out_biz_no?: string;

    /**
     * 买家支付宝用户号
     * 买家支付宝账号对应的支付宝唯一用户号。以2088开头的纯16位数字
     * example: 2088102122524333
     */
    buyer_id?: string;

    /**
     * 买家支付宝账号
     * 买家支付宝账号
     * example: 15901825620
     */
    buyer_logon_id?: string;

    /**
     * 卖家支付宝用户号
     * 卖家支付宝用户号
     * example: 2088101106499364
     */
    seller_id?: string;

    /**
     * 卖家支付宝账号
     * 卖家支付宝账号
     * example: zhuzhanghu@alitest.com
     */
    seller_email?: string;

    /**
     * 交易状态
     * 交易目前所处的状态
     * example: TRADE_CLOSED
     */
    trade_status?: string;

    /**
     * 订单金额
     * 本次交易支付的订单金额，单位为人民币（元）
     * example: 20
     */
    total_amount?: number;

    /**
     * 实收金额
     * 商家在交易中实际收到的款项，单位为元
     * example: 15
     */
    receipt_amount?: number;

    /**
     * 开票金额
     * 用户在交易中支付的可开发票的金额
     * example: 10.00
     */
    invoice_amount?: number;

    /**
     * 付款金额
     * 用户在交易中支付的金额
     * example: 13.88
     */
    buyer_pay_amount?: number;

    /**
     * 集分宝金额
     * 使用集分宝支付的金额
     * example: 12.00
     */
    point_amount?: number;

    /**
     * 总退款金额
     * 退款通知中，返回总退款金额，单位为元，支持两位小数
     * example: 2.58
     */
    refund_fee?: number;

    /**
     * 实际退款金额
     * 商户实际退款给用户的金额，单位为元，支持两位小数
     * example: 2.08
     */
    send_back_fee?: number;

    /**
     * 订单标题
     * 商品的标题/交易标题/订单标题/订单关键字等，是请求时对应的参数，原样通知回来
     * example: 当面付交易
     */
    subject?: string;

    /**
     * 商品描述
     * 该订单的备注、描述、明细等。对应请求时的body参数，原样通知回来
     * example: 当面付交易内容
     */
    body?: string;

    /**
     * 交易创建时间
     * 该笔交易创建的时间。格式为yyyy-MM-dd HH:mm:ss
     * example: 2015-04-27 15:45:57
     */
    gmt_create?: string;

    /**
     * 交易付款时间
     * 该笔交易的买家付款时间。格式为yyyy-MM-dd HH:mm:ss
     * example: 2015-04-27 15:45:57
     */
    gmt_payment?: string;

    /**
     * 交易退款时间
     * 该笔交易的退款时间。格式为yyyy-MM-dd HH:mm:ss.S
     * example: 2015-04-28 15:45:57.320
     */
    gmt_refund?: string;

    /**
     * 交易结束时间
     * 该笔交易结束时间。格式为yyyy-MM-dd HH:mm:ss
     * example: 2015-04-29 15:45:57
     */
    gmt_close?: string;

    /**
     * 支付金额信息
     * 支付成功的各个渠道金额信息，详见资金明细信息说明
     * example: [{"amount":"15.00","fundChannel":"ALIPAYACCOUNT"}]
     */
    fund_bill_list?: {

        /**
         * 支付渠道
         * 支付渠道，参见下面的“支付渠道说明”。
         * example: ALIPAYACCOUNT
         */
        fundChannel?: string;

        /**
         * 支付金额
         * 使用指定支付渠道支付的金额，单位为元。
         * example: 15.00
         */
        amount?: string;

    }[];

}