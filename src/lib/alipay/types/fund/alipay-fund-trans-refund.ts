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

export const error = {

    INVALID_PARAMETER: {
        code: 'INVALID_PARAMETER',
        desc: '参数有误参数有误',
        resolve: '参数异常',
    },

    SYSTEM_ERROR: {
        code: 'SYSTEM_ERROR',
        desc: '系统繁忙',
        resolve: '可能发生了网络或者系统异常，导致无法判定准确的转账结果。此时，商户不能直接当做退款成功或者失败处理，可以考虑采用相同的out_biz_no重发请求，或者通过调用“(alipay.fund.trans.order.query)”来查询该笔转账订单的最终状态。',
    },

    NO_ORDER_PERMISSION: {
        code: 'NO_ORDER_PERMISSION',
        desc: '不是当前商户的资金单据',
        resolve: '不是当前商户的资金单据，该商户无退款权限',
    },

    PRODUCT_NOT_ALLOW_REFUND: {
        code: 'PRODUCT_NOT_ALLOW_REFUND',
        desc: '该产品不允许退款',
        resolve: '该产品不允许退款',
    },

    ORDER_STATUS_ERROR: {
        code: 'ORDER_STATUS_ERROR',
        desc: '业务单据状态异常',
        resolve: '业务单据状态异常',
    },

    REFUND_MONEY_NOT_ENOUGH: {
        code: 'REFUND_MONEY_NOT_ENOUGH',
        desc: '可用金额为0或不足',
        resolve: '资金池可用金额为0或退款金额超过资金池里可使用的金额',
    },

    REFUND_INFO_INCONSISTENCY: {
        code: 'REFUND_INFO_INCONSISTENCY',
        desc: '不一致的请求',
        resolve: '检查该退款号是否已退过款或更换退款号重新发起请求',
    },

    ORDER_NOT_EXIST: {
        code: 'ORDER_NOT_EXIST',
        desc: '退款单据不存在',
        resolve: '退款单据不存在，请商户确认传入的退款订单号是否正确',
    },

    ORDER_STATUS_INVALID: {
        code: 'ORDER_STATUS_INVALID',
        desc: '原始单据状态异常，不可操作',
        resolve: '原始单据状态异常，不可操作，请查看原支付单的状态是否为正常状态',
    },

}