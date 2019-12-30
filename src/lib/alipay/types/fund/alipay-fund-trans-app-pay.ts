//https://docs.open.alipay.com/api_28/alipay.fund.trans.app.pay
//alipayFundTransAppPay: 'alipay.fund.trans.app.pay'

import * as base from '../../base';

export class Request extends base.Request {

    /**
     * 商户端的唯一订单号，对于同一笔转账请求，商户需保证该订单号唯一。
     * example: 2018062800001
     */
    out_biz_no: string;

    /**
     * 订单总金额，单位为元，精确到小数点后两位，取值范围[0.01,9999999999999.99]
     * example: 8.88
     */
    trans_amount: number;

    /**
     * 销售产品码，商家和支付宝签约的产品码。
    STD_RED_PACKET：现金红包
     * example: STD_RED_PACKET
     */
    product_code: string;

    /**
     * 描述特定的业务场景，可传值如下：
    PERSONAL_PAY: 发红包
     * example: PERSONAL_PAY
     */
    biz_scene: string;

    /**
     * 支付备注
     * example: 拼手气红包
     */
    remark?: string;

    /**
     * 支付订单的标题，用于在收银台和消费记录展示
     * example: 钉钉拼手气红包
     */
    order_title?: string;

    /**
     * 绝对超时时间，格式为yyyy-MM-dd HH:mm
     * example: 2018-03-23 19:15
     */
    time_expire?: string;

    /**
     * 退款超时时间，格式yyyy-MM-dd HH:mm。到指定时间后，系统会自动触发退款，并原路退回到付款账户。如果指定了退款时间，必须早于销售方案里设置的最晚退款时间。
     * example: 2018-11-08 10:00
     */
    refund_time_expire?: string;

    /**
     * JSON格式，传递业务扩展参数.
    业务扩展字段，JSON格式。支持如下属性：
    sub_biz_scene 子场景，必填，传REDPACKET
    payer_binded_alipay_id 创建红包的商户会员绑定的支付宝userId，必填
     * example: {"sub_biz_scene":"REDPACKET","payer_binded_alipay_uid:"2088302510459335"}
     */
    business_params?: string;

}


export class Response extends base.Response {
    /**
     * 商户端的唯一订单号
     * example: 201806300001
     */
    out_biz_no: string;

    /**
     * 该笔转账在支付宝系统内部的单据ID
     * example: 20180629110070001502040007320562
     */
    order_id?: string;

    /**
     * SUCCESS：转账成功；
    WAIT_PAY：转账订单等待支付；
    CLOSED：订单超时关闭，截止订单支付超时时间(time_expire)仍未支付，单据状态会变更为CLOSED；
     * example: SUCCESS
     */
    status?: string;

}
