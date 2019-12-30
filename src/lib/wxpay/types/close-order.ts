import * as base from '../base';

export class Request extends base.Request {

    /**
     * 商户订单号
     * 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*@ ，且在同一个商户号下唯一。
     * example: 1217752501201407033233368018
     */
    out_trade_no: string;
}

export class Response extends base.Response {

}
