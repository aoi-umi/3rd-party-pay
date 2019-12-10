//https://docs.open.alipay.com/api_28/alipay.fund.trans.order.query
//alipayFundTransOrderQuery: 'alipay.fund.trans.order.query'

import * as base from '../../base';

export class Request extends base.Request {

    /**
     * 商户转账唯一订单号：发起转账来源方定义的转账单据ID。
    和支付宝转账单据号不能同时为空。当和支付宝转账单据号同时提供时，将用支付宝转账单据号进行查询，忽略本参数。
     * example: 3142321423432
     */
    out_biz_no?: string;

    /**
     * 支付宝转账单据号：和商户转账唯一订单号不能同时为空。当和商户转账唯一订单号同时提供时，将用本参数进行查询，忽略商户转账唯一订单号。
     * example: 20160627110070001502260006780837
     */
    order_id?: string;

}

export class Response extends base.Response {

    /**
     * 支付宝转账单据号，查询失败不返回。
     * example: 2912381923
     */
    order_id?: string;

    /**
     * 转账单据状态。
     * SUCCESS：成功（配合"单笔转账到银行账户接口"产品使用时, 同一笔单据多次查询有可能从成功变成退票状态）；
     * FAIL：失败（具体失败原因请参见error_code以及fail_reason返回值）；
     * INIT：等待处理；
     * DEALING：处理中；
     * REFUND：退票（仅配合"单笔转账到银行账户接口"产品使用时会涉及, 具体退票原因请参见fail_reason返回值）；
     * UNKNOWN：状态未知。
     * example: FAIL
     */
    status?: string;

    /**
     * 支付时间，格式为yyyy-MM-dd HH:mm:ss，转账失败不返回。
     * example: 2013-01-01 08:08:08
     */
    pay_date?: string;

    /**
     * 预计到账时间，转账到银行卡专用，格式为yyyy-MM-dd HH:mm:ss，转账受理失败不返回。
     * 注意：
    此参数为预计时间，可能与实际到账时间有较大误差，不能作为实际到账时间使用，仅供参考用途。
     * example: 2013-01-01 08:08:08
     */
    arrival_time_end?: string;

    /**
     * 预计收费金额（元），转账到银行卡专用，数字格式，精确到小数点后2位，转账失败或转账受理失败不返回。
     * example: 0.02
     */
    order_fee?: string;

    /**
     * 查询到的订单状态为FAIL失败或REFUND退票时，返回具体的原因。
     * example: 单笔额度超限
     */
    fail_reason?: string;

    /**
     * 发起转账来源方定义的转账单据号。 
    该参数的赋值均以查询结果中 的 out_biz_no 为准。 
    如果查询失败，不返回该参数。
     * example: 3142321423432
     */
    out_biz_no?: string;

    /**
     * 查询失败时，本参数为错误代 码。
     * 查询成功不返回。 对于退票订单，不返回该参数。
     * example: EXCEED_LIMIT_SM_AMOUNT
     */
    error_code?: string;

}

export const error = {

    ORDER_NOT_EXIST: {
        code: 'ORDER_NOT_EXIST',
        desc: '转账订单不存在',
        resolve: '转账订单不存在的原因,可能是转账还在处理中,也可能是转账处理失败,导致转账订单没有落地。商户首先需要检查该订单号是否确实是自己发起的, 如果确认是自己发起的转账订单,请不要直接当作转账失败处理,请隔几分钟再尝 试查询,或者通过相同的 out_biz_no 再次发起转账。如果误把还在转账处理中的订单直接当转账失败处理,商户自行承担因此而产生的所有损失。',
    },

    NO_ORDER_PERMISSION: {
        code: 'NO_ORDER_PERMISSION',
        desc: '商家没有该笔订单的操作权限',
        resolve: '请重新检查一下查询条件是否正确。商户只允许查询自己发起的转账订单,如果查询的转账订单不属于该商户就会报该错误。',
    },

    INVALID_PARAMETER: {
        code: 'INVALID_PARAMETER',
        desc: '参数有误。',
        resolve: '请检查请求参数的长度正确性和合法性，out_biz_no与order_id不能同时为空',
    },

    ILLEGAL_ACCOUNT_STATUS_EXCEPTION: {
        code: 'ILLEGAL_ACCOUNT_STATUS_EXCEPTION',
        desc: '账户状态异常',
        resolve: '请检查一下账户状态是否正常，如果账户不正常请联系支付宝小二。联系方式：https://support.open.alipay.com/alipay/support/index.htm',
    },

    SYSTEM_ERROR: {
        code: 'SYSTEM_ERROR',
        desc: '系统繁忙',
        resolve: '支付宝系统繁忙或者处理超时，请稍后重试。',
    },

    ORDER_ID_INVALID: {
        code: 'ORDER_ID_INVALID',
        desc: '非法的支付宝转账单据号',
        resolve: '当请求参数order_id不为空时，检查长度是否符合要求。当前order_id长度仅支持30或32位。',
    },

}