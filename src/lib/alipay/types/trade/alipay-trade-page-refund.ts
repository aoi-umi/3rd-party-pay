import * as base from '../../base';

export class Request extends base.Request {

    /**
     * 支付宝交易号，和商户订单号不能同时为空
     * example: 2014112611001004680073956707
     */
    trade_no?: string;

    /**
     * 订单支付时传入的商户订单号,不能和 trade_no同时为空。
     * example: 20150320010101001
     */
    out_trade_no?: string;

    /**
     * 标识一次退款请求，同一笔交易多次退款需要保证唯一。
     * example: HZ01RF001
     */
    out_request_no: string;

    /**
     * 需要退款的金额，该金额不能大于订单金额,单位为元，支持两位小数。
     * example: 200.12
     */
    refund_amount: number;

    /**
     * 退款场景。信用退款传CREDIT_REFUND；
     * example: CREDIT_REFUND
     */
    biz_type?: string;

    /**
     * 退款的原因说明
     * example: 正常退款
     */
    refund_reason?: string;

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
     * 业务扩展参数
     */
    extend_params?: {

        /**
         * 信用服务ID
         * example: 2019031400000000000000369900
         */
        credit_service_id?: string;

        /**
         * 芝麻外部类目
         * example: REFUND
         */
        credit_category_id?: string;
    }

}


export class Response extends base.Response {

    /**
     * 支付宝交易号
     * example: 2014112611001004680073956707
     */
    trade_no: string;

    /**
     * 商户订单号
     * example: 20150320010101001
     */
    out_trade_no: string;

    /**
     * 退款请求号
     * example: HZ01RF001
     */
    out_request_no: string;

    /**
     * 本次退款请求金额
     * example: 200.12
     */
    refund_amount: number;

}