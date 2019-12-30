import * as base from '../../base';

export class Request extends base.Request {

    /**
     * 该交易在支付宝系统中的交易流水号。最短 16 位，最长 64 位。和out_trade_no不能同时为空，如果同时传了 out_trade_no和 trade_no，则以 trade_no为准。
     * example: 2013112611001004680073956707
     */
    trade_no?: string;

    /**
     * 订单支付时传入的商户订单号,和支付宝交易号不能同时为空。 trade_no,out_trade_no如果同时存在优先取trade_no
     * example: HZ0120131127001
     */
    out_trade_no?: string;

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
