import * as base from './base';

export class Request {

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

export const error = {

    SYSTEMERROR: {
        code: 'SYSTEMERROR',
        desc: '接口返回错误',
        resolve: '请立即调用被扫订单结果查询API，查询当前订单状态，并根据订单的状态决定下一步的操作。',
    },

    INVALID_TRANSACTIONID: {
        code: 'INVALID_TRANSACTIONID',
        desc: '无效transaction_id',
        resolve: '参数错误，请重新检查',
    },

    PARAM_ERROR: {
        code: 'PARAM_ERROR',
        desc: '参数错误',
        resolve: '请根据接口返回的详细信息检查您的程序',
    },

    REQUIRE_POST_METHOD: {
        code: 'REQUIRE_POST_METHOD',
        desc: '请使用post方法',
        resolve: '请检查请求参数是否通过post方法提交',
    },

    SIGNERROR: {
        code: 'SIGNERROR',
        desc: '签名错误',
        resolve: '请检查签名参数和方法是否都符合签名算法要求',
    },

    REVERSE_EXPIRE: {
        code: 'REVERSE_EXPIRE',
        desc: '订单无法撤销',
        resolve: '请检查需要撤销的订单是否超过可撤销有效期',
    },

    INVALID_REQUEST: {
        code: 'INVALID_REQUEST',
        desc: '无效请求',
        resolve: '请检查商户权限是否异常、重复请求支付、证书错误、频率限制等',
    },

    TRADE_ERROR: {
        code: 'TRADE_ERROR',
        desc: '订单错误',
        resolve: '请检查用户账号是否异常、被风控、是否符合规则限制等',
    },

    USERPAYING: {
        code: 'USERPAYING',
        desc: '用户支付中',
        resolve: '用户正在支付中的订单不允许撤销，请稍后再试',
    },

};