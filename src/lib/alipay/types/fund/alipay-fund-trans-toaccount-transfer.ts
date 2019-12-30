import * as base from '../../base';

export class Request extends base.Request {

    /**
     * 商户转账唯一订单号。发起转账来源方定义的转账单据ID，用于将转账回执通知给来源方。
    不同来源方给出的ID可以重复，同一个来源方必须保证其ID的唯一性。
    只支持半角英文、数字，及“-”、“_”。
     * example: 3142321423432
     */
    out_biz_no: string;

    /**
     * 收款方账户类型。可取值：
    1、ALIPAY_USERID：支付宝账号对应的支付宝唯一用户号。以2088开头的16位纯数字组成。
    2、ALIPAY_LOGONID：支付宝登录号，支持邮箱和手机号格式。
     * example: ALIPAY_LOGONID
     */
    payee_type: string;

    /**
     * 收款方账户。与payee_type配合使用。付款方和收款方不能是同一个账户。
     * example: abc@sina.com
     */
    payee_account: string;

    /**
     * 转账金额，单位：元。
    只支持2位小数，小数点前最大支持13位，金额必须大于等于0.1元。 
    最大转账金额以实际签约的限额为准。
     * example: 12.23
     */
    amount: string;

    /**
     * 付款方姓名（最长支持100个英文/50个汉字）。显示在收款方的账单详情页。如果该字段不传，则默认显示付款方的支付宝认证姓名或单位名称。
     * example: 上海交通卡退款
     */
    payer_show_name?: string;

    /**
     * 收款方真实姓名（最长支持100个英文/50个汉字）。
    如果本参数不为空，则会校验该账户在支付宝登记的实名是否与收款方真实姓名一致。
     * example: 张三
     */
    payee_real_name?: string;

    /**
     * 转账备注（支持200个英文/100个汉字）。
    当付款方为企业账户，且转账金额达到（大于等于）50000元，remark不能为空。收款方可见，会展示在收款用户的收支详情中。
     * example: 转账备注
     */
    remark?: string;

}

export class Response extends base.Response {

    /**
     * 商户转账唯一订单号：发起转账来源方定义的转账单据号。请求时对应的参数，原样返回。
     * example: 3142321423432
     */
    out_biz_no: string;

    /**
     * 支付宝转账单据号，成功一定返回，失败可能不返回也可能返回。
     * example: 20160627110070001502260006780837
     */
    order_id?: string;

    /**
     * 支付时间：格式为yyyy-MM-dd HH:mm:ss，仅转账成功返回。
     * example: 2013-01-01 08:08:08
     */
    pay_date?: string;

}
