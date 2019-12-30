//https://docs.open.alipay.com/api_28/alipay.fund.trans.common.query
//alipayFundTransCommonQuery: 'alipay.fund.trans.common.query'

import * as base from '../../base';

export class Request extends base.Request {

    /**
     * 销售产品码，商家和支付宝签约的产品码，如果传递了out_biz_no则该字段为必传。可传值如下：
    STD_RED_PACKET：现金红包
    TRANS_ACCOUNT_NO_PWD：单笔无密转账
     * example: STD_RED_PACKET
     */
    product_code?: string;

    /**
     * 描述特定的业务场景，如果传递了out_biz_no则该字段为必传。可取的业务场景如下：
    PERSONAL_PAY：C2C现金红包-发红包；
    PERSONAL_COLLECTION：C2C现金红包-领红包；
    REFUND：C2C现金红包-红包退回；
    DIRECT_TRANSFER：B2C现金红包、单笔无密转账
     * example: PERSONAL_PAY
     */
    biz_scene?: string;

    /**
     * 商户转账唯一订单号：发起转账来源方定义的转账单据ID。
    本参数和支付宝转账单据号、支付宝支付资金流水号三者不能同时为空。
    当本参数和支付宝转账单据号、支付宝支付资金流水号同时提供时，将用支付宝支付资金流水号进行查询，忽略本参数；
    当本参数和支付宝转账单据号同时提供时，将用支付宝转账单据号进行查询，忽略本参数；
     * example: 201808080001
     */
    out_biz_no?: string;

    /**
     * 支付宝转账单据号：
    本参数和商户转账唯一订单号、支付宝支付资金流水号三者不能同时为空。
    当本参数和商户转账唯一订单号、支付宝支付资金流水号三者同时提供时，将用支付宝支付资金流水号进行查询，忽略其余两者；
    当本参数和支付宝支付资金流水号同时提供时，将用支付宝支付资金流水号进行查询，忽略本参数。
    当本参数和商户转账唯一订单号同时提供时，将用本参数进行查询，忽略商户转账唯一订单号。
     * example: 20190801110070000006380000250621
     */
    order_id?: string;

    /**
     * 支付宝支付资金流水号：
    本参数和支付宝转账单据号、商户转账唯一订单号三者不能同时为空。
    当本参数和支付宝转账单据号、商户转账唯一订单号同时提供时，将用本参数进行查询，忽略本参数；
    当本参数和支付宝转账单据号同时提供时，将用本参数进行查询，忽略支付宝转账单据号；
    当本参数和商户转账唯一订单号同时提供时，将用本参数进行查询，忽略商户转账唯一订单号；
     * example: 20190801110070001506380000251556
     */
    pay_fund_order_id?: string;

}


export class Response extends base.Response {

    /**
     * 支付宝转账单据号，查询失败不返回。
     * example: 20190801110070000006380000250621
     */
    order_id: string;

    /**
     * 支付宝支付资金流水号，转账失败不返回。
     * example: 20190801110070001506380000251556
     */
    pay_fund_order_id?: string;

    /**
     * 商户订单号
     * example: 201808080001
     */
    out_biz_no: string;

    /**
     * 付款金额，收银台场景下付款成功后的支付金额，订单状态为SUCCESS才返回，其他状态不返回。
     * example: 付款金额，单位为元，精确到小数点后两位：32.00
     */
    trans_amount?: number;

    /**
     * 转账单据状态。可能出现的状态如下：	SUCCESS：转账成功；	WAIT_PAY：等待支付；        CLOSED：订单超时关闭alipay.fund.trans.app.pay涉及的状态： WAIT_PAY、SUCCESS、CLOSEDalipay.fund.trans.uni.transfer、alipay.fund.trans.refund涉及的状态：SUCCESS
     * example: SUCCESS
     */
    status: string;

    /**
     * 支付时间，格式为yyyy-MM-dd HH:mm:ss，转账失败不返回。
     * example: 2013-01-01 08:08:08
     */
    pay_date?: string;

    /**
     * 预计到账时间，转账到银行卡专用，格式为yyyy-MM-dd HH:mm:ss，转账受理失败不返回。
    注意：
    此参数为预计时间，可能与实际到账时间有较大误差，不能作为实际到账时间使用，仅供参考用途。
     * example: 2013-01-01 08:08:08
     */
    arrival_time_end?: string;

    /**
     * 预计收费金额（元），转账到银行卡专用，数字格式，精确到小数点后2位，转账失败或转账受理失败不返回。
     * example: 0.02
     */
    order_fee?: string;

    /**
     * 查询到的订单状态为FAIL失败或REFUND退票时，返回错误代码
     * example: PAYEE_CARD_INFO_ERROR
     */
    error_code?: string;

    /**
     * 查询到的订单状态为FAIL失败或REFUND退票时，返回具体的原因。
     * example: 收款方银行卡信息有误
     */
    fail_reason?: string;

    /**
     * 商户查询代扣订单信息时返回其在代扣请求中传入的账单属性
     * example: {"bizDesc":"代扣账单属性","bizNos":"M{529316162343612472}","billSource":"账房","bizOrigNo":"529316162343612472","reqSystem":"PointCenter"}
     */
    deduct_bill_info?: string;

    /**
     * 商户在查询代发订单信息时返回其在代发请求中传入的账单属性。
     * example: {"bizDesc":"代扣账单属性","bizNos":"M{529316162343612472}","billSource":"账房","bizOrigNo":"529316162343612472","reqSystem":"PointCenter"}
     */
    transfer_bill_info?: string;

}