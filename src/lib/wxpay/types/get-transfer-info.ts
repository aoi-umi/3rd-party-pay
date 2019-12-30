import * as base from '../base';

export class Request extends base.Request {

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
