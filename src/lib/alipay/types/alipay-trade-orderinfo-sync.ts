import * as base from '../base';

export class Request extends base.Request {

    /**
     * 支付宝交易号
     * example: 2018061021001004680073956707
     */
    trade_no: string;

    /**
     * 原始业务请求单号。如对某一次退款进行履约时，该字段传退款时的退款请求号
     * example: HZ01RF001
     */
    orig_request_no?: string;

    /**
     * 标识一笔交易多次请求，同一笔交易多次信息同步时需要保证唯一
     * example: HZ01RF001
     */
    out_request_no: string;

    /**
     * 交易信息同步对应的业务类型，具体值与支付宝约定；
    信用授权场景下传CREDIT_AUTH
    信用代扣场景下传CREDIT_DEDUCT
     * example: CREDIT_AUTH
     */
    biz_type: string;

    /**
     * 商户传入同步信息，具体值要和支付宝约定；用于芝麻信用租车、单次授权等信息同步场景，格式为json格式。
    状态枚举如下：
     * COMPLETE：同步用户已履约
    适用场景：发起扣款后，芝麻生成待履约记录，如果用户通过其他方式完成订单支付，请反馈该状态，芝麻将完结待履约记录对用户形成一条良好履约记录；
     * CLOSED： 同步履约已取消
    适用场景：发起扣款后，芝麻生成待履约记录，如果发现该笔扣款无效需要取消，请反馈该状态，芝麻将取消用户待履约记录；
     * VIOLATED： 用户已违约
    适用场景：如果用户在约定时间（具体根据行业约定，有一定宽限期）内未完成订单支付，反馈该状态，芝麻将对用户记录一条负面记录，请谨慎使用；
     * example: "{\"status\":\"COMPLETE\"}"
     */
    order_biz_info?: string;

}

export class Response extends base.Response {

    /**
     * 支付宝交易号
     * example: 20180610121001004680073956707
     */
    trade_no: string;

    /**
     * 商户订单号
     * example: 20180610010101001
     */
    out_trade_no: string;

    /**
     * 买家在支付宝的用户id
     * example: 2088101117955611
     */
    buyer_user_id: string;

}

export const error = {

    'ACQ.SYSTEM_ERROR': {
        code: 'ACQ.SYSTEM_ERROR',
        desc: '系统繁忙',
        resolve: '请隔一定时间后再次同步信息，如果多次调用依然报此错误码，请联系支付宝客服',
    },

    'ACQ.INVALID_PARAMETER': {
        code: 'ACQ.INVALID_PARAMETER',
        desc: '参数无效',
        resolve: '请求参数有错，重新检查请求后，再调用退款',
    },

    'ACQ.TRADE_NOT_EXIST': {
        code: 'ACQ.TRADE_NOT_EXIST',
        desc: '交易不存在',
        resolve: '检查请求中的交易号和商户订单号是否正确，确认后重新发起',
    },

    'ACQ.NOTIFY_STATUS_INVALID': {
        code: 'ACQ.NOTIFY_STATUS_INVALID',
        desc: '信息同步状态无效',
        resolve: '信息同步状态无效，请确认订单状态后再重试',
    },

}