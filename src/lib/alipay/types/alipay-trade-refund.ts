import * as base from '../base';

export class Request extends base.Request {

    /**
     * 订单支付时传入的商户订单号,不能和 trade_no同时为空。
     * example: 20150320010101001
     */
    out_trade_no?: string;

    /**
     * 支付宝交易号，和商户订单号不能同时为空
     * example: 2014112611001004680073956707
     */
    trade_no?: string;

    /**
     * 需要退款的金额，该金额不能大于订单金额,单位为元，支持两位小数
     * example: 200.12
     */
    refund_amount: number;

    /**
     * 订单退款币种信息
     * example: USD
     */
    refund_currency?: string;

    /**
     * 退款的原因说明
     * example: 正常退款
     */
    refund_reason?: string;

    /**
     * 标识一次退款请求，同一笔交易多次退款需要保证唯一，如需部分退款，则此参数必传。
     * example: HZ01RF001
     */
    out_request_no?: string;

    /**
     * 商户的操作员编号
     * example: OP001
     */
    operator_id?: string;

    /**
     * 商户的门店编号
     * example: NJ_S_001
     */
    store_id?: string;

    /**
     * 商户的终端编号
     * example: NJ_T_001
     */
    terminal_id?: string;

    /**
     * 退款包含的商品列表信息，Json格式。
    其它说明详见：“商品明细说明”
     */
    goods_detail?: {

        /**
         * 商品的编号
         * example: apple-01
         */
        goods_id: string;

        /**
         * 支付宝定义的统一商品编号
         * example: 20010001
         */
        alipay_goods_id?: string;

        /**
         * 商品名称
         * example: ipad
         */
        goods_name: string;

        /**
         * 商品数量
         * example: 1
         */
        quantity: number;

        /**
         * 商品单价，单位为元
         * example: 2000
         */
        price: number;

        /**
         * 商品类目
         * example: 34543238
         */
        goods_category?: string;

        /**
         * 商品类目树，从商品类目根节点到叶子节点的类目id组成，类目id值使用|分割
         * example: 124868003|126232002|126252004
         */
        categories_tree?: string;

        /**
         * 商品描述信息
         * example: 特价手机
         */
        body?: string;

        /**
         * 商品的展示地址
         * example: http://www.alipay.com/xxx.jpg
         */
        show_url?: string;
    }[];

    /**
     * 退分账明细信息
     */
    refund_royalty_parameters?: {

        /**
         * 分账类型.
        普通分账为：transfer;
        补差为：replenish;
        为空默认为分账transfer;
         * example: transfer
         */
        royalty_type?: string;

        /**
         * 支出方账户。如果支出方账户类型为userId，本参数为支出方的支付宝账号对应的支付宝唯一用户号，以2088开头的纯16位数字；如果支出方类型为loginName，本参数为支出方的支付宝登录号；
         * example: 2088101126765726
         */
        trans_out?: string;

        /**
         * 支出方账户类型。userId表示是支付宝账号对应的支付宝唯一用户号;loginName表示是支付宝登录号；
         * example: userId
         */
        trans_out_type?: string;

        /**
         * 收入方账户类型。userId表示是支付宝账号对应的支付宝唯一用户号;cardAliasNo表示是卡编号;loginName表示是支付宝登录号；
         * example: userId
         */
        trans_in_type?: string;

        /**
         * 收入方账户。如果收入方账户类型为userId，本参数为收入方的支付宝账号对应的支付宝唯一用户号，以2088开头的纯16位数字；如果收入方类型为cardAliasNo，本参数为收入方在支付宝绑定的卡编号；如果收入方类型为loginName，本参数为收入方的支付宝登录号；
         * example: 2088101126708402
         */
        trans_in: string;

        /**
         * 分账的金额，单位为元
         * example: 0.1
         */
        amount?: number;

        /**
         * 分账信息中分账百分比。取值范围为大于0，少于或等于100的整数。
         * example: 100
         */
        amount_percentage?: number;

        /**
         * 分账描述
         * example: 分账给2088101126708402
         */
        desc?: string;
    }[];

    /**
     * 银行间联模式下有用，其它场景请不要使用；
    双联通过该参数指定需要退款的交易所属收单机构的pid;
     * example: 2088101117952222
     */
    org_pid?: string;

}

export class Response extends base.Response {

    /**
     * 2013112011001004330000121536
     * example: 支付宝交易号
     */
    trade_no: string;

    /**
     * 商户订单号
     * example: 6823789339978248
     */
    out_trade_no: string;

    /**
     * 用户的登录id
     * example: 159****5620
     */
    buyer_logon_id: string;

    /**
     * 本次退款是否发生了资金变化
     * example: Y
     */
    fund_change: string;

    /**
     * 退款总金额
     * example: 88.88
     */
    refund_fee: number;

    /**
     * 退款币种信息
     * example: USD
     */
    refund_currency: string;

    /**
     * 退款支付时间
     * example: 2014-11-27 15:45:57
     */
    gmt_refund_pay: string;

    /**
     * 退款使用的资金渠道
     */
    refund_detail_item_list?: {

        /**
         * 交易使用的资金渠道，详见 支付渠道列表
         * example: ALIPAYACCOUNT
         */
        fund_channel: string;

        /**
         * 银行卡支付时的银行代码
         * example: CEB
         */
        bank_code: string;

        /**
         * 该支付工具类型所使用的金额
         * example: 10
         */
        amount: number;

        /**
         * 渠道实际付款金额
         * example: 11.21
         */
        real_amount: number;

        /**
         * 渠道所使用的资金类型,目前只在资金渠道(fund_channel)是银行卡渠道(BANKCARD)的情况下才返回该信息(DEBIT_CARD:借记卡,CREDIT_CARD:信用卡,MIXED_CARD:借贷合一卡)
         * example: DEBIT_CARD
         */
        fund_type: string;
    }

    /**
     * 交易在支付时候的门店名称
     * example: 望湘园联洋店
     */
    store_name: string;

    /**
     * 买家在支付宝的用户id
     * example: 2088101117955611
     */
    buyer_user_id: string;

    /**
     * 退回的前置资产列表
     */
    refund_preset_paytool_list?: {

        /**
         * 前置资产金额
         * example: 12.21
         */
        amount: number;

        /**
         * 前置资产类型编码，和收单支付传入的preset_pay_tool里面的类型编码保持一致。
         * example: 盒马礼品卡:HEMA；抓猫猫红包:T_CAT_COUPON
         */
        assert_type_code: string;
    }

    /**
     * 退款清算编号，用于清算对账使用；
    只在银行间联交易场景下返回该信息；
     * example: 2018101610032004620239146945
     */
    refund_settlement_id: string;

    /**
     * 本次退款金额中买家退款金额
     * example: 88.88
     */
    present_refund_buyer_amount: string;

    /**
     * 本次退款金额中平台优惠退款金额
     * example: 88.88
     */
    present_refund_discount_amount: string;

    /**
     * 本次退款金额中商家优惠退款金额
     * example: 88.88
     */
    present_refund_mdiscount_amount: string;

}

export const error = {

    'ACQ.SYSTEM_ERROR': {
        code: 'ACQ.SYSTEM_ERROR',
        desc: '系统错误',
        resolve: '请使用相同的参数再次调用',
    },

    'ACQ.INVALID_PARAMETER': {
        code: 'ACQ.INVALID_PARAMETER',
        desc: '参数无效',
        resolve: '请求参数有错，重新检查请求后，再调用退款',
    },

    'ACQ.SELLER_BALANCE_NOT_ENOUGH': {
        code: 'ACQ.SELLER_BALANCE_NOT_ENOUGH',
        desc: '卖家余额不足',
        resolve: '商户支付宝账户充值后重新发起退款即可',
    },

    'ACQ.REFUND_AMT_NOT_EQUAL_TOTAL': {
        code: 'ACQ.REFUND_AMT_NOT_EQUAL_TOTAL',
        desc: '退款金额超限',
        resolve: '检查退款金额是否正确，重新修改请求后，重新发起退款',
    },

    'ACQ.REASON_TRADE_BEEN_FREEZEN': {
        code: 'ACQ.REASON_TRADE_BEEN_FREEZEN',
        desc: '请求退款的交易被冻结',
        resolve: '联系支付宝小二，确认该笔交易的具体情况',
    },

    'ACQ.TRADE_NOT_EXIST': {
        code: 'ACQ.TRADE_NOT_EXIST',
        desc: '交易不存在',
        resolve: '检查请求中的交易号和商户订单号是否正确，确认后重新发起',
    },

    'ACQ.TRADE_HAS_FINISHED': {
        code: 'ACQ.TRADE_HAS_FINISHED',
        desc: '交易已完结',
        resolve: '该交易已完结，不允许进行退款，确认请求的退款的交易信息是否正确',
    },

    'ACQ.TRADE_STATUS_ERROR': {
        code: 'ACQ.TRADE_STATUS_ERROR',
        desc: '交易状态非法',
        resolve: '查询交易，确认交易是否已经付款',
    },

    'ACQ.DISCORDANT_REPEAT_REQUEST': {
        code: 'ACQ.DISCORDANT_REPEAT_REQUEST',
        desc: '不一致的请求',
        resolve: '检查该退款号是否已退过款或更换退款号重新发起请求',
    },

    'ACQ.REASON_TRADE_REFUND_FEE_ERR': {
        code: 'ACQ.REASON_TRADE_REFUND_FEE_ERR',
        desc: '退款金额无效',
        resolve: '检查退款请求的金额是否正确',
    },

    'ACQ.TRADE_NOT_ALLOW_REFUND': {
        code: 'ACQ.TRADE_NOT_ALLOW_REFUND',
        desc: '当前交易不允许退款',
        resolve: '检查当前交易的状态是否为交易成功状态以及签约的退款属性是否允许退款，确认后，重新发起请求',
    },

    'ACQ.REFUND_FEE_ERROR': {
        code: 'ACQ.REFUND_FEE_ERROR',
        desc: '交易退款金额有误',
        resolve: '请检查传入的退款金额是否正确',
    },

}