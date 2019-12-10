import * as base from '../../base';

export class Request extends base.Request {

    /**
     * 该笔订单允许的最晚付款时间，逾期将关闭交易。取值范围：1m～15d。m-分钟，h-小时，d-天，1c-当天（1c-当天的情况下，无论交易何时创建，都在0点关闭）。 该参数数值不接受小数点， 如 1.5h，可转换为 90m。
     * example: 90m
     */
    timeout_express?: string;

    /**
     * 订单总金额，单位为元，精确到小数点后两位，取值范围[0.01,100000000]
     * example: 9.00
     */
    total_amount: string;

    /**
     * 销售产品码，商家和支付宝签约的产品码
     * example: QUICK_MSECURITY_PAY
     */
    product_code?: string;

    /**
     * 对一笔交易的具体描述信息。如果是多种商品，请将商品描述字符串累加传给body。
     * example: Iphone6 16G
     */
    body?: string;

    /**
     * 商品的标题/交易标题/订单标题/订单关键字等。
     * example: 大乐透
     */
    subject: string;

    /**
     * 商户网站唯一订单号
     * example: 70501111111S001111119
     */
    out_trade_no: string;

    /**
     * 绝对超时时间，格式为yyyy-MM-dd HH:mm。
     * example: 2016-12-31 10:05
     */
    time_expire?: string;

    /**
     * 商品主类型 :0-虚拟类商品,1-实物类商品
     * example: 0
     */
    goods_type?: string;

    /**
     * 优惠参数
    注：仅与支付宝协商后可用
     * example: {"storeIdType":"1"}
     */
    promo_params?: string;

    /**
     * 公用回传参数，如果请求时传递了该参数，则返回给商户时会回传该参数。支付宝只会在同步返回（包括跳转回商户网站）和异步通知时将该参数原样返回。本参数必须进行UrlEncode之后才可以发送给支付宝。
     * example: merchantBizType%3d3C%26merchantBizNo%3d2016010101111
     */
    passback_params?: string;

    /**
     * 业务扩展参数
     */
    extend_params?: {

        /**
         * 系统商编号
        该参数作为系统商返佣数据提取的依据，请填写系统商签约协议的PID
         * example: 2088511833207846
         */
        sys_service_provider_id?: string;

        /**
         * 使用花呗分期要进行的分期数
         * example: 3
         */
        hb_fq_num?: string;

        /**
         * 使用花呗分期需要卖家承担的手续费比例的百分值，传入100代表100%
         * example: 100
         */
        hb_fq_seller_percent?: string;

        /**
         * 行业数据回流信息, 详见：地铁支付接口参数补充说明
         * example: {\"scene_code\":\"metro_tradeorder\",\"channel\":\"xxxx\",\"scene_data\":{\"asset_name\":\"ALIPAY\"}}
         */
        industry_reflux_info?: string;

        /**
         * 卡类型
         * example: S0JP0000
         */
        card_type?: string;
    }

    /**
 * 商户原始订单号，最大长度限制32位
 * example: 20161008001
 */
    merchant_order_no?: string;

    /**
     * 可用渠道，用户只能在指定渠道范围内支付
    当有多个渠道时用“,”分隔
    注，与disable_pay_channels互斥
     * example: pcredit,moneyFund,debitCardExpress
     */
    enable_pay_channels?: string;

    /**
     * 商户门店编号
     * example: NJ_001
     */
    store_id?: string;

    /**
     * 指定渠道，目前仅支持传入pcredit
    若由于用户原因渠道不可用，用户可选择是否用其他渠道支付。
    注：该参数不可与花呗分期参数同时传入
     * example: pcredit
     */
    specified_channel?: string;

    /**
     * 禁用渠道，用户不可用指定渠道支付
    当有多个渠道时用“,”分隔
    注，与enable_pay_channels互斥
     * example: pcredit,moneyFund,debitCardExpress
     */
    disable_pay_channels?: string;

    /**
     * 外部指定买家
     */
    ext_user_info?: {

        /**
 * 姓名
 * 注： need_check_info=T时该参数才有效
 * example: 李明
 */
        name?: string;

        /**
         * 手机号
        注：该参数暂不校验
         * example: 16587658765
         */
        mobile?: string;

        /**
         * 身份证：IDENTITY_CARD、护照：PASSPORT、军官证：OFFICER_CARD、士兵证：SOLDIER_CARD、户口本：HOKOU等。如有其它类型需要支持，请与蚂蚁金服工作人员联系。
         * 注： need_check_info=T时该参数才有效
         * example: IDENTITY_CARD
         */
        cert_type?: string;

        /**
         * 证件号
         * 注：need_check_info=T时该参数才有效
         * example: 362334768769238881
         */
        cert_no?: string;

        /**
         * 允许的最小买家年龄，买家年龄必须大于等于所传数值 
        注：
        1. need_check_info=T时该参数才有效
        2. min_age为整数，必须大于等于0
         * example: 18
         */
        min_age?: string;

        /**
         * 是否强制校验付款人身份信息
        T:强制校验，F：不强制
         * example: F
         */
        fix_buyer?: string;

        /**
         * 是否强制校验身份信息
        T:强制校验，F：不强制
         * example: F
         */
        need_check_info?: string;
    }

    /**
     * 商户传入业务信息，具体值要和支付宝约定，应用于安全，营销等参数直传场景，格式为json格式
     * example: {"data":"123"}
     */
    business_params?: string;

}

export class Response extends base.Response {

    /**
     * 商户网站唯一订单号
     * example: 70501111111S001111119
     */
    out_trade_no: string;

    /**
     * 该交易在支付宝系统中的交易流水号。
     * example: 2014112400001000340011111118
     */
    trade_no: string;

    /**
     * 该笔订单的资金总额，单位为RMB-Yuan。取值范围为[0.01，100000000.00]，精确到小数点后两位。
     * example: 9.00
     */
    total_amount: string;

    /**
     * 收款支付宝账号对应的支付宝唯一用户号。
    以2088开头的纯16位数字
     * example: 2088111111116894
     */
    seller_id: string;

    /**
     * 商户原始订单号，最大长度限制32位
     * example: 20161008001
     */
    merchant_order_no: string;

}

export const error = {

    'ACQ.SYSTEM_ERROR': {
        code: 'ACQ.SYSTEM_ERROR',
        desc: '接口返回错误',
        resolve: '请立即调用查询订单API，查询当前订单的状态，并根据订单状态决定下一步的操作',
    },

    'ACQ.ACCESS_FORBIDDEN': {
        code: 'ACQ.ACCESS_FORBIDDEN',
        desc: '无权限使用接口',
        resolve: '联系支付宝小二签约',
    },

    'ACQ.EXIST_FORBIDDEN_WORD': {
        code: 'ACQ.EXIST_FORBIDDEN_WORD',
        desc: '订单信息中包含违禁词',
        resolve: '修改订单信息后，重新发起请求',
    },

    'ACQ.PARTNER_ERROR': {
        code: 'ACQ.PARTNER_ERROR',
        desc: '应用APP_ID填写错误',
        resolve: '联系支付宝小二，确认APP_ID的状态',
    },

    'ACQ.TOTAL_FEE_EXCEED': {
        code: 'ACQ.TOTAL_FEE_EXCEED',
        desc: '订单总金额不在允许范围内',
        resolve: '修改订单金额再发起请求',
    },

    'ACQ.BUYER_SELLER_EQUAL': {
        code: 'ACQ.BUYER_SELLER_EQUAL',
        desc: '买卖家不能相同',
        resolve: '更换买家重新付款',
    },

    'ACQ.BUYER_ENABLE_STATUS_FORBID': {
        code: 'ACQ.BUYER_ENABLE_STATUS_FORBID',
        desc: '买家状态非法',
        resolve: '用户联系支付宝小二，确认买家状态为什么非法',
    },

    'ACQ.SELLER_BEEN_BLOCKED': {
        code: 'ACQ.SELLER_BEEN_BLOCKED',
        desc: '商家账号被冻结',
        resolve: '联系支付宝小二，解冻账号',
    },

    'ACQ.INVALID_PARAMETER': {
        code: 'ACQ.INVALID_PARAMETER',
        desc: '参数无效',
        resolve: '若存在参数无效具体错误信息描述，请参考描述检查请求参数后，重新发起',
    },

    'ACQ.TRADE_HAS_CLOSE': {
        code: 'ACQ.TRADE_HAS_CLOSE',
        desc: '交易已经关闭',
        resolve: '确认该笔交易信息是否为当前买家的已存订单，如果是则认为交易已经关闭，如果不是则更换商家订单号后，重新发起请求',
    },

    'ACQ.CONTEXT_INCONSISTENT': {
        code: 'ACQ.CONTEXT_INCONSISTENT',
        desc: '交易信息被篡改',
        resolve: '确认该笔交易信息是否为当前买家的已存订单，如果是则认为本次请求参数与已存交易不一致，如果不是则更换商家订单号后，重新发起请求',
    },

    'ACQ.TRADE_BUYER_NOT_MATCH': {
        code: 'ACQ.TRADE_BUYER_NOT_MATCH',
        desc: '交易买家不匹配',
        resolve: '该笔交易已经在支付宝端创建，但请求买家与已存交易中的买家不一致。请商户确认本次请求是否与已存交易有关，若为同一笔交易，则只能用原始买家付款，若无关更换商家订单号后，重新发起请求',
    },

    'ACQ.TRADE_HAS_SUCCESS': {
        code: 'ACQ.TRADE_HAS_SUCCESS',
        desc: '交易已被支付',
        resolve: '确认该笔交易信息是否为当前买家的，如果是则认为交易付款成功，如果不是则更换商家订单号后，重新发起请求',
    },

}

export const notify = {

    'tradeStatus.WAIT_BUYER_PAY': {
        code: 'tradeStatus.WAIT_BUYER_PAY',
        desc: '交易创建',
        enable: '0',
    },

}