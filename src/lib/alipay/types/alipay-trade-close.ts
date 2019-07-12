import * as base from '../base';

export class Request extends base.Request {

    /**
     * 该交易在支付宝系统中的交易流水号。最短 16 位，最长 64 位。和out_trade_no不能同时为空，如果同时传了 out_trade_no和 trade_no，则以 trade_no为准。
     * example: 2013112611001004680073956707
     */
    trade_no: string;

    /**
     * 订单支付时传入的商户订单号,和支付宝交易号不能同时为空。 trade_no,out_trade_no如果同时存在优先取trade_no
     * example: HZ0120131127001
     */
    out_trade_no: string;

    /**
     * 卖家端自定义的的操作员 ID
     * example: YX01
     */
    operator_id: string;

}

export class Response extends base.Response {

    /**
     * 支付宝交易号
     * example: 2013112111001004500000675971
     */
    trade_no: string;

    /**
     * 创建交易传入的商户订单号
     * example: YX_001
     */
    out_trade_no: string;

}

export const error = {

    'ACQ.SYSTEM_ERROR': {
        code: 'ACQ.SYSTEM_ERROR',
        desc: '系统异常',
        resolve: '重新发起请求',
    },

    'ACQ.TRADE_NOT_EXIST': {
        code: 'ACQ.TRADE_NOT_EXIST',
        desc: '交易不存在',
        resolve: '检查传入的交易号和外部订单号是否正确，修改后再重新发起',
    },

    'ACQ.TRADE_STATUS_ERROR': {
        code: 'ACQ.TRADE_STATUS_ERROR',
        desc: '交易状态不合法',
        resolve: '检查当前交易的状态是不是等待买家付付款，只有等待买家付款状态下才能发起交易关闭。',
    },

    'ACQ.INVALID_PARAMETER': {
        code: 'ACQ.INVALID_PARAMETER',
        desc: '参数无效',
        resolve: '检查请求参数，修改后重新发起请求',
    },

}

export const notify = {

    'tradeStatus.TRADE_SUCCESS': {
        code: 'tradeStatus.TRADE_SUCCESS',
        desc: '交易成功',
        enable: '0',
    },

}