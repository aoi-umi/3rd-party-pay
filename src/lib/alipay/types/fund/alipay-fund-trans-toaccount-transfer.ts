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

export const error = {

    INVALID_PARAMETER: {
        code: 'INVALID_PARAMETER',
        desc: '参数有误。',
        resolve: '请检查入参：必填参数是否为空，长度超出规定限制长度 或 是否不符合格式。',
    },

    SYSTEM_ERROR: {
        code: 'SYSTEM_ERROR',
        desc: '系统繁忙',
        resolve: '可能发生了网络或者系统异常，导致无法判定准确的转账结果。此时，商户不能直接当做转账成功或者失败处理，可以考虑采用相同的out_biz_no重发请求，或者通过调用“(alipay.fund.trans.order.query)”来查询该笔转账订单的最终状态。',
    },

    PERMIT_CHECK_PERM_LIMITED: {
        code: 'PERMIT_CHECK_PERM_LIMITED',
        desc: '根据监管部门的要求，请补全您的身份信息解除限制',
        resolve: '根据监管部门的要求，请补全您的身份信息解除限制',
    },

    PAYCARD_UNABLE_PAYMENT: {
        code: 'PAYCARD_UNABLE_PAYMENT',
        desc: '付款账户余额支付功能不可用',
        resolve: '请登录支付宝站内或手机客户端开启付款账户余额支付功能。',
    },

    PAYEE_NOT_EXIST: {
        code: 'PAYEE_NOT_EXIST',
        desc: '收款账号不存在',
        resolve: '请检查payee_account, payee_type是否匹配，如匹配，请检查payee_account是否存在。如果传了payee_real_name，请检查payee_real_name是否与payee_account匹配。',
    },

    PAYER_DATA_INCOMPLETE: {
        code: 'PAYER_DATA_INCOMPLETE',
        desc: '根据监管部门的要求，需要付款用户补充身份信息才能继续操作',
        resolve: '根据监管部门的要求，需要付款用户登录支付宝站内或手机客户端补充身份信息才能继续操作',
    },

    PERM_AML_NOT_REALNAME_REV: {
        code: 'PERM_AML_NOT_REALNAME_REV',
        desc: '根据监管部门的要求，需要收款用户补充身份信息才能继续操作',
        resolve: '请联系收款方登录支付宝站内或手机客户端补充身份信息',
    },

    PAYER_STATUS_ERROR: {
        code: 'PAYER_STATUS_ERROR',
        desc: '付款方用户状态不正常',
        resolve: '请检查付款方是否进行了自助挂失，如果无，请联系支付宝客服检查用户状态是否正常。',
    },

    PAYEE_USER_INFO_ERROR: {
        code: 'PAYEE_USER_INFO_ERROR',
        desc: '支付宝账号和姓名不匹配，请确认姓名是否正确',
        resolve: '请联系收款方确认收款用户姓名正确性。',
    },

    PAYER_USER_INFO_ERROR: {
        code: 'PAYER_USER_INFO_ERROR',
        desc: '付款用户姓名或其它信息不一致',
        resolve: '请检查接口传递的付款方用户姓名正确性。',
    },

    PAYER_BALANCE_NOT_ENOUGH: {
        code: 'PAYER_BALANCE_NOT_ENOUGH',
        desc: '付款方余额不足',
        resolve: '支付时间点付款方余额不足，请保持付款账户余额充足。',
    },

    PAYMENT_INFO_INCONSISTENCY: {
        code: 'PAYMENT_INFO_INCONSISTENCY',
        desc: '两次请求商户单号一样，但是参数不一致',
        resolve: '如果想重试前一次的请求，请用原参数重试，如果重新发送，请更换单号。',
    },

    CERT_MISS_TRANS_LIMIT: {
        code: 'CERT_MISS_TRANS_LIMIT',
        desc: '您的付款金额已达单笔1万元或月累计5万元，根据监管部门的要求，需要付款用户补充身份信息才能继续操作',
        resolve: '您的付款金额已达单笔1万元或月累计5万元，根据监管部门的要求，需要付款用户登录支付宝站内或手机客户端补充身份信息才能继续操作。',
    },

    CERT_MISS_ACC_LIMIT: {
        code: 'CERT_MISS_ACC_LIMIT',
        desc: '您连续10天余额账户的资金都超过5000元，根据监管部门的要求，需要付款用户补充身份信息才能继续操作',
        resolve: '您连续10天余额账户的资金都超过5000元，根据监管部门的要求，需要付款用户登录支付宝站内或手机客户端补充身份信息才能继续操作。',
    },

    PAYEE_ACC_OCUPIED: {
        code: 'PAYEE_ACC_OCUPIED',
        desc: '该手机号对应多个支付宝账户，请传入收款方姓名确定正确的收款账号',
        resolve: '如果未传入payee_real_name，请传递payee_real_name；如果传递了payee_real_name，是因为收款登录号对应多个账户且账户名相同，请联系收款方更换登录号。',
    },

    MEMO_REQUIRED_IN_TRANSFER_ERROR: {
        code: 'MEMO_REQUIRED_IN_TRANSFER_ERROR',
        desc: '根据监管部门的要求，单笔转账金额达到50000元时，需要填写付款理由',
        resolve: '请检查remark是否为空。',
    },

    PERMIT_NON_BANK_LIMIT_PAYEE: {
        code: 'PERMIT_NON_BANK_LIMIT_PAYEE',
        desc: '根据监管部门的要求，对方未完善身份信息或未开立余额账户，无法收款',
        resolve: '请联系收款方登录支付宝站内或手机客户端完善身份信息后，重试。',
    },

    PERMIT_PAYER_LOWEST_FORBIDDEN: {
        code: 'PERMIT_PAYER_LOWEST_FORBIDDEN',
        desc: '根据监管部门要求，付款方身份信息完整程度较低，余额支付额度受限',
        resolve: '请付款方登录支付宝站内或手机客户端检查自己的支付额度，建议付款方尽快登录支付宝站内善身份信息提升额度。',
    },

    PERMIT_PAYER_FORBIDDEN: {
        code: 'PERMIT_PAYER_FORBIDDEN',
        desc: '根据监管部门要求，付款方余额支付额度受限',
        resolve: '请付款方登录支付宝站内或手机客户端检查自己的支付额度。',
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

    ACCOUNT_NOT_EXIST: {
        code: 'ACCOUNT_NOT_EXIST',
        desc: '根据监管部门的要求，请补全你的身份信息，开立余额账户',
        resolve: '请付款方登录支付宝站内或手机客户端补全身份信息。',
    },

    PAYER_CERT_EXPIRED: {
        code: 'PAYER_CERT_EXPIRED',
        desc: '根据监管部门的要求，需要付款用户更新身份信息才能继续操作',
        resolve: '根据监管部门的要求，需要付款用户登录支付宝站内或手机客户端更新身份信息才能继续操作。',
    },

    EXCEED_LIMIT_PERSONAL_SM_AMOUNT: {
        code: 'EXCEED_LIMIT_PERSONAL_SM_AMOUNT',
        desc: '转账给个人支付宝账户单笔最多5万元',
        resolve: '转账给个人支付宝账户单笔最多5万元。',
    },

    EXCEED_LIMIT_ENT_SM_AMOUNT: {
        code: 'EXCEED_LIMIT_ENT_SM_AMOUNT',
        desc: '转账给企业支付宝账户单笔最多10万元',
        resolve: '转账给企业支付宝账户单笔最多10万元。',
    },

    EXCEED_LIMIT_SM_MIN_AMOUNT: {
        code: 'EXCEED_LIMIT_SM_MIN_AMOUNT',
        desc: '单笔最低转账金额0.1元',
        resolve: '请修改转账金额。',
    },

    EXCEED_LIMIT_DM_MAX_AMOUNT: {
        code: 'EXCEED_LIMIT_DM_MAX_AMOUNT',
        desc: '单日最多可转100万元',
        resolve: '单日最多可转100万元。',
    },

    EXCEED_LIMIT_UNRN_DM_AMOUNT: {
        code: 'EXCEED_LIMIT_UNRN_DM_AMOUNT',
        desc: '收款账户未实名，单日最多可收款1000元',
        resolve: '收款账户未实名，单日最多可收款1000元。',
    },

    PAYER_PAYEE_CANNOT_SAME: {
        code: 'PAYER_PAYEE_CANNOT_SAME',
        desc: '收付款方不能相同',
        resolve: '请检查一下收款方信息填写是否为付款方本人',
    },

    SYNC_SECURITY_CHECK_FAILED: {
        code: 'SYNC_SECURITY_CHECK_FAILED',
        desc: '当前操作存在风险，请停止操作，如有疑问请咨询客服',
        resolve: '当前操作存在风险，请停止操作，如有疑问请咨询客服',
    },

    TRANSFER_ERROR: {
        code: 'TRANSFER_ERROR',
        desc: '转账失败',
        resolve: '转账失败，请调用查询接口确认具体的失败原因。',
    },

};