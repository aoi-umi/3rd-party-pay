import * as base from '../base';

export class Request extends base.Request {

    /**
     * 原支付请求的商户订单号,和支付宝交易号不能同时为空
     * example: 20150320010101001
     */
    out_trade_no: string;

    /**
     * 支付宝交易号，和商户订单号不能同时为空
     * example: 2014112611001004680073956707
     */
    trade_no: string;

}


export class Response extends base.Response {

    /**
     * 支付宝交易号;当发生交易关闭或交易退款时返回；
     * example: 2013112011001004330000121536
     */
    trade_no: string;

    /**
     * 商户订单号
     * example: 6823789339978248
     */
    out_trade_no: string;

    /**
     * 是否需要重试
     * example: N
     */
    retry_flag: string;

    /**
     * 本次撤销触发的交易动作,接口调用成功且交易存在时返回。可能的返回值：close：交易未支付，触发关闭交易动作，无退款；refund：交易已支付，触发交易退款动作；未返回：未查询到交易，或接口调用失败；
     * example: close
     */
    action: string;

    /**
     * 当撤销产生了退款时，返回退款时间；
    默认不返回该信息，需与支付宝约定后配置返回；
     * example: 2016-11-27 15:45:57
     */
    gmt_refund_pay: string;

    /**
     * 当撤销产生了退款时，返回的退款清算编号，用于清算对账使用；
    只在银行间联交易场景下返回该信息；
     * example: 2018101610032004620239146945
     */
    refund_settlement_id: string;

}

export const error = {

    'AQC.SYSTEM_ERROR': {
        code: 'AQC.SYSTEM_ERROR',
        desc: '系统错误',
        resolve: '请使用相同的参数再次调用',
    },

    'ACQ.INVALID_PARAMETER': {
        code: 'ACQ.INVALID_PARAMETER',
        desc: '参数无效',
        resolve: '请求参数有错，重新检查请求后，再调用撤销',
    },

    'ACQ.SELLER_BALANCE_NOT_ENOUGH': {
        code: 'ACQ.SELLER_BALANCE_NOT_ENOUGH',
        desc: '商户的支付宝账户中无足够的资金进行撤销',
        resolve: '商户支付宝账户充值后重新发起撤销即可',
    },

    'ACQ.REASON_TRADE_BEEN_FREEZEN': {
        code: 'ACQ.REASON_TRADE_BEEN_FREEZEN',
        desc: '当前交易被冻结，不允许进行撤销',
        resolve: '联系支付宝小二，确认该笔交易的具体情况',
    },

}