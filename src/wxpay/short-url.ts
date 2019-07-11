import * as base from './base';

export class Request extends base.Request {

    /**
     * URL链接
     * 需要转换的URL，签名用原串，传输需URLencode
     * example: weixin：//wxpay/bizpayurl?sign=XXXXX&appid=XXXXX&mch_id=XXXXX&product_id=XXXXXX&time_stamp=XXXXXX&nonce_str=XXXXX
     */
    long_url: string;

}

export class Response extends base.Response {

    /**
     * URL链接
     * 转换后的URL
     * example: weixin：//wxpay/s/XXXXXX
     */
    short_url: string;

}

export const error = {

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

    APPID_NOT_EXIST: {
        code: 'APPID_NOT_EXIST',
        desc: 'APPID不存在',
        resolve: '请检查APPID是否正确',
    },

    MCHID_NOT_EXIST: {
        code: 'MCHID_NOT_EXIST',
        desc: 'MCHID不存在',
        resolve: '请检查MCHID是否正确',
    },

    APPID_MCHID_NOT_MATCH: {
        code: 'APPID_MCHID_NOT_MATCH',
        desc: 'appid和mch_id不匹配',
        resolve: '请确认appid和mch_id是否匹配',
    },

    LACK_PARAMS: {
        code: 'LACK_PARAMS',
        desc: '缺少参数',
        resolve: '请检查参数是否齐全',
    },

    XML_FORMAT_ERROR: {
        code: 'XML_FORMAT_ERROR',
        desc: 'XML格式错误',
        resolve: '请检查XML参数格式是否正确',
    },

    POST_DATA_EMPTY: {
        code: 'POST_DATA_EMPTY',
        desc: 'post数据为空',
        resolve: '请检查post数据是否为空',
    },

};