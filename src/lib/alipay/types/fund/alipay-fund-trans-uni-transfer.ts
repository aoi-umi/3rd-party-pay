//https://docs.open.alipay.com/api_28/alipay.fund.trans.uni.transfer
//alipayFundTransUniTransfer: 'alipay.fund.trans.uni.transfer'

import * as base from '../../base';

export class Request extends base.Request {

    /**
     * 商户端的唯一订单号，对于同一笔转账请求，商户需保证该订单号唯一。
     * example: 201806300001
     */
    out_biz_no: string;

    /**
     * 订单总金额，单位为元，精确到小数点后两位，STD_RED_PACKET产品取值范围[0.01,100000000]；TRANS_ACCOUNT_NO_PWD产品取值范围[0.1,100000000]
     * example: 23.00
     */
    trans_amount: number;

    /**
     * 业务产品码，收发现金红包固定为：STD_RED_PACKET；单笔无密转账到支付宝账户固定为：TRANS_ACCOUNT_NO_PWD；单笔无密转账到银行卡固定为：TRANS_BANKCARD_NO_PWD
     * example: STD_RED_PACKET
     */
    product_code: string;

    /**
     * 描述特定的业务场景，可传的参数如下：PERSONAL_COLLECTION：C2C现金红包-领红包；DIRECT_TRANSFER：B2C现金红包、单笔无密转账到支付宝/银行卡
     * example: PERSONAL_COLLECTION
     */
    biz_scene?: string;

    /**
     * 转账业务的标题，用于在支付宝用户的账单里显示
     * example: 营销红包
     */
    order_title?: string;

    /**
     * 原支付宝业务单号。C2C现金红包-红包领取时，传红包支付时返回的支付宝单号；B2C现金红包、单笔无密转账到支付宝/银行卡不需要该参数。
     * example: 20190620110075000006640000063056
     */
    original_order_id?: string;

    /**
     * 收款方信息
     */
    payee_info: {
        //Participant
        
        /**
         * 参与方的唯一标识
         * example: 2088123412341234
         */
        identity: string;

        /**
         * 参与方的标识类型，目前支持如下类型：
        1、ALIPAY_USER_ID 支付宝的会员ID
        2、ALIPAY_LOGON_ID：支付宝登录号，支持邮箱和手机号格式
         * example: ALIPAY_USER_ID
         */
        identity_type: string;

        /**
         * 参与方真实姓名，如果非空，将校验收款支付宝账号姓名一致性。当identity_type=ALIPAY_LOGON_ID时，本字段必填。
         * example: 黄龙国际有限公司
         */
        name?: string;
    }

    /**
     * 业务备注
     * example: 红包领取
     */
    remark?: string;

    /**
     * 转账业务请求的扩展参数，支持传入的扩展参数如下：1、sub_biz_scene 子业务场景，红包业务必传，取值REDPACKET，C2C现金红包、B2C现金红包均需传入；2、withdraw_timeliness为转账到银行卡的预期到账时间，可选（不传入则默认为T1），T0表示预期T+0到账，T1表示预期T+1到账，到账时效受银行机构处理影响，支付宝无法保证一定是T0或者T1到账；
     * example: {"withdraw_timeliness":"T0","sub_biz_scene":"REDPACKET"}
     */
    business_params?: string;

}

export class Response extends base.Response {

    /**
     * 商户订单号
     * example: 201808080001
     */
    out_biz_no: string;

    /**
     * 支付宝转账订单号
     * example: 20190801110070000006380000250621
     */
    order_id: string;

    /**
     * 支付宝支付资金流水号
     * example: 20190801110070001506380000251556
     */
    pay_fund_order_id?: string;

    /**
     * 转账单据状态。
    SUCCESS：成功（对转账到银行卡的单据, 该状态可能变为退票[REFUND]状态）；
    FAIL：失败（具体失败原因请参见error_code以及fail_reason返回值）；
    DEALING：处理中；
    REFUND：退票；
     * example: SUCCESS
     */
    status?: string;

    /**
     * 订单支付时间，格式为yyyy-MM-dd HH:mm:ss
     * example: 2019-08-21 00:00:00
     */
    trans_date: string;

}
