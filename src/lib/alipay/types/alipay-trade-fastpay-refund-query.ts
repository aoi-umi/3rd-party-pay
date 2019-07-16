import * as base from '../base';

export class Request extends base.Request {

    /**
     * 支付宝交易号，和商户订单号不能同时为空
     * example: 20150320010101001
     */
    trade_no?: string;

    /**
     * 订单支付时传入的商户订单号,和支付宝交易号不能同时为空。 trade_no,out_trade_no如果同时存在优先取trade_no
     * example: 2014112611001004680073956707
     */
    out_trade_no?: string;

    /**
     * 请求退款接口时，传入的退款请求号，如果在退款请求时未传入，则该值为创建交易时的外部交易号
     * example: 2014112611001004680073956707
     */
    out_request_no: string;

    /**
     * 银行间联模式下有用，其它场景请不要使用；
    双联通过该参数指定需要查询的交易所属收单机构的pid;
     * example: 2088101117952222
     */
    org_pid?: string;

}


export class Response {

    /**
     * 支付宝交易号
     * example: 2014112611001004680073956707
     */
    trade_no: string;

    /**
     * 创建交易传入的商户订单号
     * example: 20150320010101001
     */
    out_trade_no: string;

    /**
     * 本笔退款对应的退款请求号
     * example: 20150320010101001
     */
    out_request_no: string;

    /**
     * 发起退款时，传入的退款原因
     * example: 用户退款请求
     */
    refund_reason: string;

    /**
     * 该笔退款所对应的交易的订单金额
     * example: 100.20
     */
    total_amount: number;

    /**
     * 退分账金额
     * example: 10
     */
    refund_amount: number;

    /**
     * 退分账明细信息
     */
    refund_royaltys?: {

        /**
         * 分账类型.
        普通分账为：transfer;
        补差为：replenish;
        为空默认为分账transfer;
         * example: transfer
         */
        royalty_type: string;

        /**
         * 退分账结果码
         * example: SUCCESS
         */
        result_code: string;

        /**
         * 转出人支付宝账号对应用户ID
         * example: 2088102210397302
         */
        trans_out: string;

        /**
         * 转出人支付宝账号
         * example: alipay-test03@alipay.com
         */
        trans_out_email: string;
    }

    /**
     * 转入人支付宝账号对应用户ID
     * example: 2088102210397302
     */
    trans_in: string;

    /**
     * 转入人支付宝账号
     * example: zen_gwen@hotmail.com
     */
    trans_in_email: string;

    /**
     * 退款时间；
    默认不返回该信息，需与支付宝约定后配置返回；
     * example: 2014-11-27 15:45:57
     */
    gmt_refund_pay: string;

    /**
     * 本次退款使用的资金渠道；
    默认不返回该信息，需与支付宝约定后配置返回；
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
     * 本次商户实际退回金额；
    默认不返回该信息，需与支付宝约定后配置返回；
     * example: 88
     */
    send_back_fee: string;

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
        resolve: '重新发起请求',
    },

    'ACQ.INVALID_PARAMETER': {
        code: 'ACQ.INVALID_PARAMETER',
        desc: '参数无效',
        resolve: '检查请求参数，修改后重新发起请求',
    },

    TRADE_NOT_EXIST: {
        code: 'TRADE_NOT_EXIST',
        desc: '查询退款的交易不存在',
        resolve: '确认交易号是否为正确的支付宝交易号，修改后重新查询',
    },

}