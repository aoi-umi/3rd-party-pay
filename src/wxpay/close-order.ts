import * as base from './base';

export class Request {

    /**
     * 商户订单号
     * 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*@ ，且在同一个商户号下唯一。
     * example: 1217752501201407033233368018
     */
    out_trade_no: string;
}

export class Response extends base.Response {

}

export const error = {

    ORDERPAID: {
        code: 'ORDERPAID',
        desc: '订单已支付',
        resolve: '订单已支付，不能发起关单，请当作已支付的正常交易',
    },

    SYSTEMERROR: {
        code: 'SYSTEMERROR',
        desc: '系统错误',
        resolve: '系统异常，请重新调用该API',
    },

    ORDERCLOSED: {
        code: 'ORDERCLOSED',
        desc: '订单已关闭',
        resolve: '订单已关闭，无需继续调用',
    },

    SIGNERROR: {
        code: 'SIGNERROR',
        desc: '签名错误',
        resolve: '请检查签名参数和方法是否都符合签名算法要求',
    },

    REQUIRE_POST_METHOD: {
        code: 'REQUIRE_POST_METHOD',
        desc: '请使用post方法',
        resolve: '请检查请求参数是否通过post方法提交',
    },

    XML_FORMAT_ERROR: {
        code: 'XML_FORMAT_ERROR',
        desc: 'XML格式错误',
        resolve: '请检查XML参数格式是否正确',
    },

}