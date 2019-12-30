import * as base from '../base';

export class Request extends base.Request {

    /**
     * 微信订单号
     * 微信的订单号，优先使用
     * example: 1217752501201407033233368018
     */
    transaction_id?: string

    /**
     * 商户订单号
     * 商户系统内部的订单号,transaction_id、out_trade_no二选一，如果同时存在优先级：transaction_id> out_trade_no
     * example: 1217752501201407033233368018
     */
    out_trade_no?: string
}

export class Response extends base.Response {

    /**
     * 是否重调
     * 是否需要继续调用撤销，Y-需要，N-不需要
     * example: Y
     */
    recall: string

}
