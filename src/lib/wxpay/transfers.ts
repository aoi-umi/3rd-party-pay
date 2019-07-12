import * as base from './base';

export class Request extends base.Request {

    /**
     * 设备号
     * 微信支付分配的终端设备号
     * example: 013467007045764
     */
    device_info?: string;

    /**
     * 商户订单号
     * 商户订单号，需保持唯一性
     * (只能是字母或者数字，不能包含有其他字符)
     * example: 10000098201411111234567890
     */
    partner_trade_no: string;

    /**
     * 用户openid
     * 商户appid下，某用户的openid
     * example: oxTWIuGaIt6gTKsQRLau2M0yL16E
     */
    openid: string;

    /**
     * 校验用户姓名选项
     * NO_CHECK：不校验真实姓名 
     * FORCE_CHECK：强校验真实姓名
     * example: FORCE_CHECK
     */
    check_name: string;

    /**
     * 收款用户姓名
     * 收款用户真实姓名。 
     * 如果check_name设置为FORCE_CHECK，则必填用户真实姓名
     * example: 王小王
     */
    re_user_name?: string;

    /**
     * 金额
     * 企业付款金额，单位为分
     * example: 10099
     */
    amount: number;

    /**
     * 企业付款备注
     * 企业付款备注，必填。注意：备注中的敏感词会被转成字符*
     * example: 理赔
     */
    desc: string;

    /**
     * Ip地址
     * 该IP同在商户平台设置的IP白名单中的IP没有关联，该IP可传用户端或者服务端的IP。
     * example: 192.168.0.1
     */
    spbill_create_ip: string;

}

export class Response extends base.Response {

    /**
     * 设备号
     * 微信支付分配的终端设备号，
     * example: 013467007045764
     */
    device_info?: string;

    /**
     * 商户订单号
     * 商户订单号，需保持历史全局唯一性(只能是字母或者数字，不能包含有其他字符)
     * example: 1217752501201407033233368018
     */
    partner_trade_no: string;

    /**
     * 微信付款单号
     * 企业付款成功，返回的微信付款单号
     * example: 1007752501201407033233368018
     */
    payment_no: string;

    /**
     * 付款成功时间
     * 企业付款成功时间
     * example: 2015-05-19 15：26：59
     */
    payment_time: string;

}

export const error = {

    NO_AUTH: {
        code: 'NO_AUTH',
        desc: '没有该接口权限',
        resolve: '请根据具体的错误返回描述做对应处理，如返回描述不够明确，请参考此处的错误原因做排查。',
    },

    AMOUNT_LIMIT: {
        code: 'AMOUNT_LIMIT',
        desc: '金额超限',
        resolve: '目前最低付款金额为1元，最高10万元，请确认是否付款金额超限。',
    },

    PARAM_ERROR: {
        code: 'PARAM_ERROR',
        desc: '参数错误',
        resolve: '请参照原因检查您的请求参数是否正确。',
    },

    OPENID_ERROR: {
        code: 'OPENID_ERROR',
        desc: 'Openid错误',
        resolve: 'Openid与appid是有一一映射关系的，请确保正确使用。',
    },

    SEND_FAILED: {
        code: 'SEND_FAILED',
        desc: '付款错误',
        resolve: '请查单确认付款结果，以查单结果为准。',
    },

    NOTENOUGH: {
        code: 'NOTENOUGH',
        desc: '余额不足',
        resolve: '如果要继续付款必须使用原商户订单号重试。',
    },

    SYSTEMERROR: {
        code: 'SYSTEMERROR',
        desc: '系统繁忙，请稍后再试。',
        resolve: '请先调用查询接口，查看此次付款结果，如结果为不明确状态（如订单号不存在），请务必使用原商户订单号进行重试。',
    },

    NAME_MISMATCH: {
        code: 'NAME_MISMATCH',
        desc: '姓名校验出错',
        resolve: '如果要继续付款必须使用原商户订单号重试。',
    },

    SIGN_ERROR: {
        code: 'SIGN_ERROR',
        desc: '签名错误',
        resolve: '请检查您的请求参数和签名密钥KEY是否正确，如果要继续付款必须使用原商户订单号重试。',
    },

    XML_ERROR: {
        code: 'XML_ERROR',
        desc: 'Post内容出错',
        resolve: '格式问题，请检查请求格式是否正确。',
    },

    FATAL_ERROR: {
        code: 'FATAL_ERROR',
        desc: '两次请求参数不一致',
        resolve: '重入必须保证所有参数值都不变。',
    },

    FREQ_LIMIT: {
        code: 'FREQ_LIMIT',
        desc: '超过频率限制，请稍后再试。',
        resolve: '调用接口过于频繁，请稍后再试，如果要继续付款必须使用原商户订单号重试。',
    },

    MONEY_LIMIT: {
        code: 'MONEY_LIMIT',
        desc: '已经达到今日付款总额上限/已达到付款给此用户额度上限',
        resolve: '付款额度已经超限，请参考接口使用条件，如果要继续付款必须使用原商户订单号重试。',
    },

    CA_ERROR: {
        code: 'CA_ERROR',
        desc: '商户API证书校验出错',
        resolve: '您使用的调用证书有误，请确认是否使用了正确的证书，可以前往商户平台重新下载，证书需与商户号对应，如果要继续付款必须使用原商户订单号重试。',
    },

    V2_ACCOUNT_SIMPLE_BAN: {
        code: 'V2_ACCOUNT_SIMPLE_BAN',
        desc: '无法给非实名用户付款',
        resolve: '不支持给非实名用户付款，如果要继续付款必须使用原商户订单号重试。',
    },

    PARAM_IS_NOT_UTF8: {
        code: 'PARAM_IS_NOT_UTF8',
        desc: '请求参数中包含非utf8编码字符',
        resolve: '微信接口使用编码是UTF-8，请确认，如果要继续付款必须使用原商户订单号重试。',
    },

    SENDNUM_LIMIT: {
        code: 'SENDNUM_LIMIT',
        desc: '该用户今日付款次数超过限制,如有需要请登录微信支付商户平台更改API安全配置',
        resolve: '向用户付款的次数超限了，请参考接口使用条件，如果要继续付款必须使用原商户订单号重试。',
    },

    RECV_ACCOUNT_NOT_ALLOWED: {
        code: 'RECV_ACCOUNT_NOT_ALLOWED',
        desc: '收款账户不在收款账户列表',
        resolve: '请登陆商户平台，查看产品中心企业付款到零钱的产品配置',
    },

    PAY_CHANNEL_NOT_ALLOWED: {
        code: 'PAY_CHANNEL_NOT_ALLOWED',
        desc: '本商户号未配置API发起能力',
        resolve: '请登陆商户平台，查看产品中心企业付款到零钱的产品配置',
    },

};
