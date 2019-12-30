//https://docs.open.alipay.com/api_28/alipay.fund.trans.refund
//alipayFundTransRefund: 'alipay.fund.trans.refund'

import * as base from '../../base';

export class Request extends base.Request {

    /**
     * 发红包时支付宝返回的支付宝订单号order_id。
     * example: 20190703110075000006530004756875
     */
    order_id: string;

    /**
     * 标识一次资金退回请求，一笔资金退回失败后重新提交，要采用原来的资金退回单号。总退款金额不能超过用户实际支付金额。
     * example: 2018999960760005838333
     */
    out_request_no: string;

    /**
     * 需要退款的金额，该金额不能大于订单金额,单位为元，支持两位小数
     * example: 8.88
     */
    refund_amount: number;

    /**
     * 资金退回备注
     * example: 红包超时退回
     */
    remark?: string;

}

export class Response extends base.Response {

    /**
     * 退款的支付宝系统内部单据id
     * example: 2088000000300210312
     */
    refund_order_id: string;

    /**
     * 发红包时支付宝返回的支付宝订单号order_id。
     * example: 20881030507841230156
     */
    order_id: string;

    /**
     * 标识一次资金退回请求，一笔资金退回失败后重新提交，要采用原来的资金退回单号。总退款金额不能超过用户实际支付金额。
     * example: 2019063050784123
     */
    out_request_no: string;

    /**
     * SUCCESS：退款成功
     * example: SUCCESS
     */
    status: string;

    /**
     * 本次退款的金额，单位为元，支持两位小数
     * example: 8.88
     */
    refund_amount: string;

    /**
     * 退款资金退回
     * example: 2019-01-01 08:08:08
     */
    refund_date: string;

}