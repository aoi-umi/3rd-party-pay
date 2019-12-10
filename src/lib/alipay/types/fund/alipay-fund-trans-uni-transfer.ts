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

export const error = {

    INVALID_PARAMETER: {
        code: 'INVALID_PARAMETER',
        desc: '参数有误参数有误',
        resolve: '请根据入参说明检查请求参数合法性',
    },

    SYSTEM_ERROR: {
        code: 'SYSTEM_ERROR',
        desc: '系统繁忙',
        resolve: '请联系支付宝工程师排查',
    },

    EXCEED_LIMIT_SM_AMOUNT: {
        code: 'EXCEED_LIMIT_SM_AMOUNT',
        desc: '单笔额度超限',
        resolve: '请根据接入文档检查amount字段',
    },

    EXCEED_LIMIT_MM_AMOUNT: {
        code: 'EXCEED_LIMIT_MM_AMOUNT',
        desc: '月累计金额超限',
        resolve: '请根据接入文档说明检查本月请求总金额+本次请求金额是否超限。',
    },

    PAYCARD_UNABLE_PAYMENT: {
        code: 'PAYCARD_UNABLE_PAYMENT',
        desc: '付款账户余额支付功能不可用',
        resolve: '请付款账户登录支付宝账户开启余额支付功能。',
    },

    PAYER_STATUS_ERROR: {
        code: 'PAYER_STATUS_ERROR',
        desc: '付款方用户状态不正常',
        resolve: '请检查付款方是否进行了自助挂失，如果无，请联系支付宝客服检查用户状态是否正常。',
    },

    PAYER_CERTIFY_CHECK_FAIL: {
        code: 'PAYER_CERTIFY_CHECK_FAIL',
        desc: '付款方人行认证受限',
        resolve: '付款方请升级认证等级。',
    },

    PAYER_BALANCE_NOT_ENOUGH: {
        code: 'PAYER_BALANCE_NOT_ENOUGH',
        desc: '付款方余额不足',
        resolve: '支付时间点付款方余额不足，请向付款账户余额充值后再原请求重试。',
    },

    PAYER_USER_INFO_ERROR: {
        code: 'PAYER_USER_INFO_ERROR',
        desc: '付款用户姓名或其它信息不一致',
        resolve: '检查付款用户姓名payer_real_name与真实姓名一致性。',
    },

    PAYMENT_INFO_INCONSISTENCY: {
        code: 'PAYMENT_INFO_INCONSISTENCY',
        desc: '两次请求商户单号一样，但是参数不一致',
        resolve: '如果想重试前一次的请求，请用原参数重试，如果重新发送，请更换单号。',
    },

    CARD_BIN_ERROR: {
        code: 'CARD_BIN_ERROR',
        desc: '收款人银行账号不正确',
        resolve: '请确认收款人银行账号正确性，要求为借记卡卡号。',
    },

    PAYEE_CARD_INFO_ERROR: {
        code: 'PAYEE_CARD_INFO_ERROR',
        desc: '收款方卡信息错误',
        resolve: '请联系收款方确认卡号与姓名一致性。',
    },

    INST_PAY_UNABLE: {
        code: 'INST_PAY_UNABLE',
        desc: '资金流出能力不具备',
        resolve: '可能由于银行渠道在维护或无T0渠道，与联系支付宝客服确认。',
    },

    MEMO_REQUIRED_IN_TRANSFER_ERROR: {
        code: 'MEMO_REQUIRED_IN_TRANSFER_ERROR',
        desc: '根据监管部门的要求，单笔转账金额达到50000元时，需要填写付款理由',
        resolve: '请填写remark或memo字段。',
    },

    PERMIT_CHECK_PERM_IDENTITY_THEFT: {
        code: 'PERMIT_CHECK_PERM_IDENTITY_THEFT',
        desc: '您的账户存在身份冒用风险，请进行身份核实解除限制',
        resolve: '您的账户存在身份冒用风险，请进行身份核实解除限制',
    },

    REMARK_HAS_SENSITIVE_WORD: {
        code: 'REMARK_HAS_SENSITIVE_WORD',
        desc: '转账备注包含敏感词，请修改备注文案后重试',
        resolve: '转账备注包含敏感词，请修改备注文案后重试',
    },

    EXCEED_LIMIT_DM_AMOUNT: {
        code: 'EXCEED_LIMIT_DM_AMOUNT',
        desc: '日累计额度超限',
        resolve: '请根据接入文档说明检查本日请求总金额+本次请求金额是否超限。',
    },

    NO_ACCOUNT_RECEIVE_PERMISSION: {
        code: 'NO_ACCOUNT_RECEIVE_PERMISSION',
        desc: '没有该账户的收款权限',
        resolve: '请更改收款账号',
    },

    BALANCE_IS_NOT_ENOUGH: {
        code: 'BALANCE_IS_NOT_ENOUGH',
        desc: '付款方余额不足',
        resolve: '请更换付款方或者充值后再重试',
    },

    NO_ACCOUNT_PAYMENT_PERMISSION: {
        code: 'NO_ACCOUNT_PAYMENT_PERMISSION',
        desc: '没有该账户的支付权限',
        resolve: '请更换付款方再重试',
    },

    PAYER_NOT_EXIST: {
        code: 'PAYER_NOT_EXIST',
        desc: '付款方不存在',
        resolve: '请更换付款方再重试',
    },

    PRODUCT_NOT_SIGN: {
        code: 'PRODUCT_NOT_SIGN',
        desc: '产品未签约',
        resolve: '请签约产品之后再使用该接口',
    },

    PAYMENT_TIME_EXPIRE: {
        code: 'PAYMENT_TIME_EXPIRE',
        desc: '请求已过期',
        resolve: '请求单据已过期，重新发起一笔。',
    },

    PAYEE_NOT_EXIST: {
        code: 'PAYEE_NOT_EXIST',
        desc: '收款用户不存在',
        resolve: '请换收款方账号再重试。',
    },

    PAYEE_ACCOUNT_STATUS_ERROR: {
        code: 'PAYEE_ACCOUNT_STATUS_ERROR',
        desc: '收款方账号异常',
        resolve: '请换收款方账号再重试。',
    },

    PERMIT_NON_BANK_LIMIT_PAYEE: {
        code: 'PERMIT_NON_BANK_LIMIT_PAYEE',
        desc: '收款方未完善身份信息或未开立余额账户，无法收款',
        resolve: '根据监管部门的要求，收款方未完善身份信息或未开立余额账户，无法收款',
    },

    PAYEE_TRUSTEESHIP_ACC_OVER_LIMIT: {
        code: 'PAYEE_TRUSTEESHIP_ACC_OVER_LIMIT',
        desc: '收款方托管子户累计收款金额超限',
        resolve: '收款方托管子户累计收款金额超限，请绑定支付宝后完成收款。',
    },

    NO_PERMISSION_ACCOUNT: {
        code: 'NO_PERMISSION_ACCOUNT',
        desc: '无权限操作当前付款账号',
        resolve: '无权限操作当前付款账号',
    },

    TRUSTEESHIP_ACCOUNT_NOT_EXIST: {
        code: 'TRUSTEESHIP_ACCOUNT_NOT_EXIST',
        desc: '托管子户查询不存在',
        resolve: '托管子户查询不存在',
    },

    PAYEE_ACCOUNT_NOT_EXSIT: {
        code: 'PAYEE_ACCOUNT_NOT_EXSIT',
        desc: '收款账号不存在',
        resolve: '请检查收款方支付宝余额账号是否存在',
    },

    ORDER_NOT_EXIST: {
        code: 'ORDER_NOT_EXIST',
        desc: 'original_order_id错误 原单据不存在',
        resolve: 'original_order_id数据错误，原单据不存在',
    },

    PAYEE_USERINFO_STATUS_ERROR: {
        code: 'PAYEE_USERINFO_STATUS_ERROR',
        desc: '收款方用户状态不正常',
        resolve: '收款方用户状态不正常无法用于收款',
    },

    PAYMENT_MONEY_NOT_ENOUGH: {
        code: 'PAYMENT_MONEY_NOT_ENOUGH',
        desc: '可用金额为0或不足',
        resolve: '资金池领取金额为0或转账金额超过资金池里可使用的金额，比如红包领取 领取金额大于可领取的金额',
    },

    TRUSTEESHIP_RECIEVE_QUOTA_LIMIT: {
        code: 'TRUSTEESHIP_RECIEVE_QUOTA_LIMIT',
        desc: '收款方收款额度超限，请绑定支付宝账户',
        resolve: '收款方收款额度超限，请绑定支付宝账户。',
    },

    SECURITY_CHECK_FAILED: {
        code: 'SECURITY_CHECK_FAILED',
        desc: '本次请求有风险',
        resolve: '本次请求有风险导致失败',
    },

    NO_ORDER_PERMISSION: {
        code: 'NO_ORDER_PERMISSION',
        desc: 'orinal_order_id错误，不具有操作权限',
        resolve: 'orinal_order_id错误，不具有操作权限',
    },

    ORDER_STATUS_INVALID: {
        code: 'ORDER_STATUS_INVALID',
        desc: '原始单据状态异常，不可操作',
        resolve: 'orinal_order_id对应的原始单据状态异常，不可继续操作',
    },

    PERM_AML_NOT_REALNAME_REV: {
        code: 'PERM_AML_NOT_REALNAME_REV',
        desc: '根据监管部门的要求，需要收款用户补充身份信息才能继续操作',
        resolve: '请联系收款方登录支付宝站内或手机客户端补充身份信息',
    },

    USER_AGREEMENT_VERIFY_FAIL: {
        code: 'USER_AGREEMENT_VERIFY_FAIL',
        desc: '用户协议校验失败',
        resolve: '确认入参中协议号是否正确',
    },

    PAYER_NOT_EQUAL_PAYEE_ERROR: {
        code: 'PAYER_NOT_EQUAL_PAYEE_ERROR',
        desc: '托管场景提现收付款方账号不一致',
        resolve: '请检查收付款方账号是否一致',
    },

    EXCEED_LIMIT_DC_RECEIVED: {
        code: 'EXCEED_LIMIT_DC_RECEIVED',
        desc: '收款方单日收款笔数超限',
        resolve: '收款方向同一个付款用户每日只能收款固定的笔数，超限后请让用户第二天再收。',
    },

    PAYER_PERMLIMIT_CHECK_FAILURE: {
        code: 'PAYER_PERMLIMIT_CHECK_FAILURE',
        desc: '付款方限权校验不通过不允许支付',
        resolve: '付款方限权校验不通过不允许支付，联系支付宝客服检查付款方受限原因。',
    },

    PAYEE_ACC_OCUPIED: {
        code: 'PAYEE_ACC_OCUPIED',
        desc: '收款方登录号有多个支付宝账号，无法确认唯一收款账号',
        resolve: '收款方登录号有多个支付宝账号，无法确认唯一收款账号，请收款方变更登录号或提供其他支付宝账号进行收款。',
    },

    PAYER_PAYEE_CANNOT_SAME: {
        code: 'PAYER_PAYEE_CANNOT_SAME',
        desc: '收付款方不能相同',
        resolve: '收付款方不能是同一个人，请修改收付款方信息',
    },

    PERMIT_CHECK_PERM_LIMITED: {
        code: 'PERMIT_CHECK_PERM_LIMITED',
        desc: '根据监管部门的要求，请补全您的身份信息解除限制',
        resolve: '根据监管部门的要求，请补全您的身份信息解除限制',
    },

    RESOURCE_LIMIT_EXCEED: {
        code: 'RESOURCE_LIMIT_EXCEED',
        desc: '请求超过资源限制',
        resolve: '发起请求并发数超出支付宝处理能力，请降低请求并发',
    },

    INVALID_PAYER_ACCOUNT: {
        code: 'INVALID_PAYER_ACCOUNT',
        desc: '付款方不在设置的付款账户列表中',
        resolve: '请核对付款方是否在销售方案付款账户列表中',
    },

    EXCEED_LIMIT_DM_MAX_AMOUNT: {
        code: 'EXCEED_LIMIT_DM_MAX_AMOUNT',
        desc: '超出单日转账限额',
        resolve: '超出单日转账限额',
    },

    EXCEED_LIMIT_PERSONAL_SM_AMOUNT: {
        code: 'EXCEED_LIMIT_PERSONAL_SM_AMOUNT',
        desc: '超出转账给个人支付宝账户的单笔限额',
        resolve: '超出转账给个人支付宝账户的单笔限额',
    },

    EXCEED_LIMIT_UNRN_DM_AMOUNT: {
        code: 'EXCEED_LIMIT_UNRN_DM_AMOUNT',
        desc: '收款账户未实名，超出其单日收款限额',
        resolve: '收款账户未实名，超出其单日收款限额',
    },

    INVALID_CARDNO: {
        code: 'INVALID_CARDNO',
        desc: '无效的收款卡号',
        resolve: '无效的收款卡号，请确认',
    },

}