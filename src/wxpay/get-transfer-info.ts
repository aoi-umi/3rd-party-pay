import * as base from './base';

export class Request {

    /**
     * 商户订单号
     * 商户调用企业付款API时使用的商户订单号
     * example: 10000098201411111234567890
     */
    partner_trade_no: string;

}

export class Response extends base.Response {    

    /**
     * 商户单号
     * 商户使用查询API填写的单号的原路返回.
     * example: 10000098201411111234567890
     */
    partner_trade_no: string;    

    /**
     * 付款单号
     * 调用企业付款API时，微信系统内部产生的单号
     * example: 1000000000201503283103439304
     */
    detail_id: string;

    /**
     * 转账状态
     * SUCCESS:转账成功 FAILED:转账失败 PROCESSING:处理中
     * example: SUCCESS
     */
    status: string;

    /**
     * 失败原因
     * 如果失败则有失败原因
     * example: 余额不足
     */
    reason?: string;

    /**
     * 收款用户openid
     * 转账的openid
     * example: oxTWIuGaIt6gTKsQRLau2M0yL16E
     */
    openid: string;

    /**
     * 收款用户姓名
     * 收款用户姓名
     * example: 马华
     */
    transfer_name?: string;

    /**
     * 付款金额
     * 付款金额单位为“分”
     * example: 5000
     */
    payment_amount: number;

    /**
     * 转账时间
     * 发起转账的时间
     * example: 2015-04-21 20:00:00
     */
    transfer_time: string;

    /**
     * 付款成功时间
     * 企业付款成功时间
     * example: 2015-04-21 20:01:00
     */
    payment_time: string;

    /**
     * 企业付款备注
     * 企业付款备注
     * example: 车险理赔
     */
    desc: string;

}

export const error = {

    CA_ERROR: {
        code: 'CA_ERROR',
        desc: '请求未携带证书，或请求携带的证书出错',
        resolve: '到商户平台下载证书，请求带上证书后重试',
    },

    SIGN_ERROR: {
        code: 'SIGN_ERROR',
        desc: '商户签名错误',
        resolve: '按文档要求重新生成签名后再重试',
    },

    FREQ_LIMIT: {
        code: 'FREQ_LIMIT',
        desc: '受频率限制',
        resolve: '请对请求做频率控制',
    },

    XML_ERROR: {
        code: 'XML_ERROR',
        desc: '请求的xml格式错误，或者post的数据为空',
        resolve: '检查请求串，确认无误后重试',
    },

    PARAM_ERROR: {
        code: 'PARAM_ERROR',
        desc: '参数错误',
        resolve: '请查看err_code_des，修改设置错误的参数',
    },

    SYSTEMERROR: {
        code: 'SYSTEMERROR',
        desc: '系统繁忙，请再试',
        resolve: '系统繁忙',
    },

    NOT_FOUND: {
        code: 'NOT_FOUND',
        desc: '1、指定单号数据不存在 2、指定单号数据不存在，单据查询超过有效期',
        resolve: '1、查询单号对应的数据不存在，请使用正确的商户订单号查询;2、如需查询超过有效期的单据，请登录到商户平台进行查询',
    },

};