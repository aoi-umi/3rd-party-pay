import * as base from '../../base';

export class Request extends base.Request {

    /**
     * 商户订单号,64个字符以内、可包含字母、数字、下划线；需保证在商户端不重复
     * example: 20150320010101001
     */
    out_trade_no: string;

    /**
     * 销售产品码，与支付宝签约的产品码名称。
    注：目前仅支持FAST_INSTANT_TRADE_PAY
     * example: FAST_INSTANT_TRADE_PAY
     */
    product_code?: string;

    /**
     * 订单总金额，单位为元，精确到小数点后两位，取值范围[0.01,100000000]。
     * example: 88.88
     */
    total_amount: number;

    /**
     * 订单标题
     * example: Iphone6 16G
     */
    subject: string;

    /**
     * 商品描述信息
     * example: 特价手机
     */
    body?: string;

    /**
     * 绝对超时时间，格式为yyyy-MM-dd HH:mm:ss
     * example: 2016-12-31 10:05:01
     */
    time_expire?: string;

    /**
     * 订单包含的商品列表信息，json格式，其它说明详见商品明细说明
     */
    goods_detail?: {

        /**
         * 商品的编号
         * example: apple-01
         */
        goods_id: string;

        /**
         * 支付宝定义的统一商品编号
         * example: 20010001
         */
        alipay_goods_id?: string;

        /**
         * 商品名称
         * example: ipad
         */
        goods_name: string;

        /**
         * 商品数量
         * example: 1
         */
        quantity: number;

        /**
         * 商品单价，单位为元
         * example: 2000
         */
        price: number;

        /**
         * 商品类目
         * example: 34543238
         */
        goods_category?: string;

        /**
         * 商品类目树，从商品类目根节点到叶子节点的类目id组成，类目id值使用|分割
         * example: 124868003|126232002|126252004
         */
        categories_tree?: string;

        /**
         * 商品的展示地址
         * example: http://www.alipay.com/xxx.jpg
         */
        show_url?: string;
    }[];

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
     * 商品主类型 :0-虚拟类商品,1-实物类商品
    注：虚拟类商品不支持使用花呗渠道
     * example: 0
     */
    goods_type?: string;

    /**
     * 该笔订单允许的最晚付款时间，逾期将关闭交易。取值范围：1m～15d。m-分钟，h-小时，d-天，1c-当天（1c-当天的情况下，无论交易何时创建，都在0点关闭）。 该参数数值不接受小数点， 如 1.5h，可转换为 90m
     * example: 90m
     */
    timeout_express?: string;

    /**
     * 签约营销参数，此值为json格式；具体的key需与营销约定
     * example: {"key","value"}
     */
    promo_params?: string;

    /**
     * 描述分账信息，json格式，详见分账参数说明
     */
    royalty_info?: {

        /**
         * 分账类型
        卖家的分账类型，目前只支持传入ROYALTY（普通分账类型）。
         * example: ROYALTY
         */
        royalty_type?: string;

        /**
         * 分账明细的信息，可以描述多条分账指令，json数组。
         */
        royalty_detail_infos: {

            /**
             * 分账序列号，表示分账执行的顺序，必须为正整数
             * example: 1
             */
            serial_no?: number;

            /**
             * 结算收款方的账户类型。cardAliasNo：结算收款方的银行卡编号;userId：表示是支付宝账号对应的支付宝唯一用户号;loginName：表示是支付宝登录号；
             * example: cardAliasNo
             */
            trans_in_type?: string;

            /**
             * 分账批次号
            分账批次号。
            目前需要和转入账号类型为bankIndex配合使用。
             * example: 123
             */
            batch_no: string;

            /**
             * 商户分账的外部关联号，用于关联到每一笔分账信息，商户需保证其唯一性。
            如果为空，该值则默认为“商户网站唯一订单号+分账序列号”
             * example: 20131124001
             */
            out_relation_id?: string;

            /**
             * 要分账的账户类型。
            目前只支持userId：支付宝账号对应的支付宝唯一用户号。
            默认值为userId。
             * example: userId
             */
            trans_out_type: string;

            /**
             * 如果转出账号类型为userId，本参数为要分账的支付宝账号对应的支付宝唯一用户号。以2088开头的纯16位数字。
             * example: 2088101126765726
             */
            trans_out: string;

            /**
             * 结算收款方。当结算收款方类型是cardAliasNo时，本参数为用户在支付宝绑定的卡编号；结算收款方类型是userId时，本参数为用户的支付宝账号对应的支付宝唯一用户号，以2088开头的纯16位数字；当结算收款方类型是loginName时，本参数为用户的支付宝登录号
             * example: A0001
             */
            trans_in: string;

            /**
             * 结算的金额，单位为元。目前必须和交易金额相同
             * example: 0.1
             */
            amount: number;

            /**
             * 分账描述信息
             * example: 分账测试1
             */
            desc?: string;

            /**
             * 分账的比例，值为20代表按20%的比例分账
             * example: 100
             */
            amount_percentage: string;
        }[]
    }

    /**
     * 间连受理商户信息体，当前只对特殊银行机构特定场景下使用此字段
     */
    sub_merchant?: {

        /**
         * 间连受理商户的支付宝商户编号，通过间连商户入驻后得到。间连业务下必传，并且需要按规范传递受理商户编号。
         * example: 19023454
         */
        merchant_id: string;

        /**
         * 商户id类型，
         * example: alipay: 支付宝分配的间连商户编号, merchant: 商户端的间连商户编号
         */
        merchant_type?: string;
    }

    /**
     * 商户原始订单号，最大长度限制32位
     * example: 20161008001
     */
    merchant_order_no?: string;

    /**
     * 可用渠道,用户只能在指定渠道范围内支付，多个渠道以逗号分割
    注，与disable_pay_channels互斥
    渠道列表：https://docs.open.alipay.com/common/wifww7
     * example: pcredit,moneyFund,debitCardExpress
     */
    enable_pay_channels?: string;

    /**
     * 商户门店编号
     * example: NJ_001
     */
    store_id?: string;

    /**
     * 禁用渠道,用户不可用指定渠道支付，多个渠道以逗号分割
    注，与enable_pay_channels互斥
    渠道列表：https://docs.open.alipay.com/common/wifww7
     * example: pcredit,moneyFund,debitCardExpress
     */
    disable_pay_channels?: string;

    /**
     * PC扫码支付的方式，支持前置模式和
     * 跳转模式。
    前置模式是将二维码前置到商户
    的订单确认页的模式。需要商户在
    自己的页面中以 iframe 方式请求
    支付宝页面。具体分为以下几种：
    0：订单码-简约前置模式，对应 iframe 宽度不能小于600px，高度不能小于300px；
    1：订单码-前置模式，对应iframe 宽度不能小于 300px，高度不能小于600px；
    3：订单码-迷你前置模式，对应 iframe 宽度不能小于 75px，高度不能小于75px；
    4：订单码-可定义宽度的嵌入式二维码，商户可根据需要设定二维码的大小。
     * 跳转模式下，用户的扫码界面是由支付宝生成的，不在商户的域名下。
    2：订单码-跳转模式
     * example: 1
     */
    qr_pay_mode?: string;

    /**
     * 商户自定义二维码宽度
    注：qr_pay_mode=4时该参数生效
     * example: 100
     */
    qrcode_width?: number;

    /**
     * 描述结算信息，json格式，详见结算参数说明
     */
    settle_info?: {

        /**
         * 结算详细信息，json数组，目前只支持一条。
         */
        settle_detail_infos: {

            /**
             * 结算汇总维度，按照这个维度汇总成批次结算，由商户指定。目前需要和结算收款方账户类型为cardAliasNo配合使用
             * example: A0001
             */
            summary_dimension?: string;

            /**
             * 结算主体标识。当结算主体类型为SecondMerchant时，为二级商户的SecondMerchantID；当结算主体类型为Store时，为门店的外标。
             * example: 2088xxxxx;ST_0001
             */
            settle_entity_id?: string;

            /**
             * 结算主体类型。
            二级商户:SecondMerchant;商户或者直连商户门店:Store
             * example: SecondMerchant、Store
             */
            settle_entity_type?: string;



            /**
             * 结算的金额，单位为元。目前必须和交易金额相同
             * example: 0.1
             */
            amount: number;
        }[]
    }

    /**
     * 开票信息
     */
    invoice_info?: {

        /**
         * 开票关键信息
         */
        key_info: {

            /**
             * 该交易是否支持开票
             * example: true
             */
            is_support_invoice: boolean;

            /**
             * 开票商户名称：商户品牌简称|商户门店简称
             * example: ABC|003
             */
            invoice_merchant_name: string;

            /**
             * 税号
             * example: 1464888883494
             */
            tax_num: string;
        }

        /**
         * 开票内容
        注：json数组格式
         * example: [{"code":"100294400","name":"服饰","num":"2","sumPrice":"200.00","taxRate":"6%"}]
         */
        details: string;
    }

    /**
     * 签约参数，支付后签约场景使用
     */
    agreement_sign_params?: {

        /**
         * 个人签约产品码，商户和支付宝签约时确定。
         * example: GENERAL_WITHHOLDING_P
         */
        personal_product_code: string;

        /**
         * 协议签约场景，商户和支付宝签约时确定。
        当传入商户签约号external_agreement_no时，场景不能为默认值DEFAULT|DEFAULT。
         * example: INDUSTRY|CARRENTAL
         */
        sign_scene?: string;

        /**
         * 商户签约号，代扣协议中标示用户的唯一签约号（确保在商户系统中唯一）。
        格式规则：支持大写小写字母和数字，最长32位。
        商户系统按需传入，如果同一用户在同一产品码、同一签约场景下，签订了多份代扣协议，那么需要指定并传入该值。
         * example: test
         */
        external_agreement_no?: string;

        /**
         * 用户在商户网站的登录账号，用于在签约页面展示，如果为空，则不展示
         * example: 13852852877
         */
        external_logon_id?: string;

        /**
         * 当前用户签约请求的协议有效周期。
        整形数字加上时间单位的协议有效期，从发起签约请求的时间开始算起。
        目前支持的时间单位：
        1. d：天
        2. m：月
        如果未传入，默认为长期有效。
         * example: 2m
         */
        sign_validity_period?: string;

        /**
         * 签约第三方主体类型。对于三方协议，表示当前用户和哪一类的第三方主体进行签约。
        取值范围：
        1. PARTNER（平台商户）;
        2. MERCHANT（集团商户），集团下子商户可共享用户签约内容;
        默认为PARTNER。
         * example: PARTNER
         */
        third_party_type?: string;

        /**
         * 商户在芝麻端申请的appId
         * example: 1001164
         */
        buckle_app_id?: string;

        /**
         * 商户在芝麻端申请的merchantId
         * example: 268820000000414397785
         */
        buckle_merchant_id?: string;

        /**
         * 签约营销参数，此值为json格式；具体的key需与营销约定
         * example: {"key","value"}
         */
        promo_params?: string;
    }

    /**
     * 请求后页面的集成方式。
    取值范围：
    1. ALIAPP：支付宝钱包内
    2. PCWEB：PC端访问
    默认值为PCWEB。
     * example: PCWEB
     */
    integration_type?: string;

    /**
     * 请求来源地址。如果使用ALIAPP的集成方式，用户中途取消支付会返回该地址。
     * example: https://
     */
    request_from_url?: string;

    /**
     * 商户传入业务信息，具体值要和支付宝约定，应用于安全，营销等参数直传场景，格式为json格式
     * example: {"data":"123"}
     */
    business_params?: string;

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

}

export class Response extends base.Response {

    /**
     * 支付宝交易号
     * example: 2013112011001004330000121536
     */
    trade_no: string;

    /**
     * 商户订单号
     * example: 6823789339978248
     */
    out_trade_no: string;

    /**
     * 收款支付宝账号对应的支付宝唯一用户号。
    以2088开头的纯16位数字
     * example: 2088111111116894
     */
    seller_id: string;

    /**
     * 交易金额
     * example: 128.00
     */
    total_amount: number;

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
        resolve: '请立即调用查询订单API，查询当前订单的状态，并根据订单状态决定下一步的操作，如果多次调用依然报此错误码，请联系支付宝客服。',
    },

    'ACQ.INVALID_PARAMETER': {
        code: 'ACQ.INVALID_PARAMETER',
        desc: '参数无效',
        resolve: '检查请求参数，修改后重新发起请求',
    },

    'ACQ.ACCESS_FORBIDDEN': {
        code: 'ACQ.ACCESS_FORBIDDEN',
        desc: '无权限使用接口',
        resolve: '未签约条码支付或者合同已到期',
    },

    'ACQ.EXIST_FORBIDDEN_WORD': {
        code: 'ACQ.EXIST_FORBIDDEN_WORD',
        desc: '订单信息中包含违禁词',
        resolve: '修改订单信息后，重新发起请求',
    },

    'ACQ.PARTNER_ERROR': {
        code: 'ACQ.PARTNER_ERROR',
        desc: '应用APP_ID填写错误',
        resolve: '联系支付宝小二<a href="https://support.open.alipay.com/alipay/support/index.htm">点这里</a>，确认APP_ID的状态',
    },

    'ACQ.TOTAL_FEE_EXCEED': {
        code: 'ACQ.TOTAL_FEE_EXCEED',
        desc: '订单总金额不在允许范围内',
        resolve: '修改订单金额再发起请求',
    },

    'ACQ.CONTEXT_INCONSISTENT': {
        code: 'ACQ.CONTEXT_INCONSISTENT',
        desc: '交易信息被篡改',
        resolve: '更换商家订单号后，重新发起请求',
    },

    'ACQ.TRADE_HAS_SUCCESS': {
        code: 'ACQ.TRADE_HAS_SUCCESS',
        desc: '交易已被支付',
        resolve: '确认该笔交易信息是否为当前买家的，如果是则认为交易付款成功，如果不是则更换商家订单号后，重新发起请求',
    },

    'ACQ.TRADE_HAS_CLOSE': {
        code: 'ACQ.TRADE_HAS_CLOSE',
        desc: '交易已经关闭',
        resolve: '更换商家订单号后，重新发起请求',
    },

    'ACQ.BUYER_BALANCE_NOT_ENOUGH': {
        code: 'ACQ.BUYER_BALANCE_NOT_ENOUGH',
        desc: '买家余额不足',
        resolve: '买家绑定新的银行卡或者支付宝余额有钱后再发起支付',
    },

    'ACQ.BUYER_BANKCARD_BALANCE_NOT_E': {
        code: 'ACQ.BUYER_BANKCARD_BALANCE_NOT_E',
        desc: '用户银行卡余额不足',
        resolve: '建议买家更换支付宝进行支付或者更换其它付款方式',
    },

    'ACQ.ERROR_BALANCE_PAYMENT_DISABL': {
        code: 'ACQ.ERROR_BALANCE_PAYMENT_DISABL',
        desc: '余额支付功能关闭',
        resolve: '用户打开余额支付开关后，再重新进行支付',
    },

    'ACQ.BUYER_SELLER_EQUAL': {
        code: 'ACQ.BUYER_SELLER_EQUAL',
        desc: '买卖家不能相同',
        resolve: '更换买家重新付款',
    },

    'ACQ.TRADE_BUYER_NOT_MATCH': {
        code: 'ACQ.TRADE_BUYER_NOT_MATCH',
        desc: '交易买家不匹配',
        resolve: '更换商家订单号后，重新发起请求',
    },

    'ACQ.BUYER_ENABLE_STATUS_FORBID': {
        code: 'ACQ.BUYER_ENABLE_STATUS_FORBID',
        desc: '买家状态非法',
        resolve: '用户联系支付宝小二<a href="https://support.open.alipay.com/alipay/support/index.htm">点这里</a>，确认买家状态为什么非法',
    },

    'ACQ.PAYMENT_FAIL': {
        code: 'ACQ.PAYMENT_FAIL',
        desc: '支付失败',
        resolve: '用户刷新条码后，重新发起请求，如果重试一次后仍未成功，更换其它方式付款',
    },

    'ACQ.BUYER_PAYMENT_AMOUNT_DAY_LIM': {
        code: 'ACQ.BUYER_PAYMENT_AMOUNT_DAY_LIM',
        desc: '买家付款日限额超限',
        resolve: '更换买家进行支付',
    },

    'ACQ.BUYER_PAYMENT_AMOUNT_MONTH_L': {
        code: 'ACQ.BUYER_PAYMENT_AMOUNT_MONTH_L',
        desc: '买家付款月额度超限',
        resolve: '买家更换账号后，重新付款或者更换其它付款方式',
    },

    'ACQ.ERROR_BUYER_CERTIFY_LEVEL_LI': {
        code: 'ACQ.ERROR_BUYER_CERTIFY_LEVEL_LI',
        desc: '买家未通过人行认证',
        resolve: '用户联系支付宝小二<a href="https://support.open.alipay.com/alipay/support/index.htm">点这里</a>',
    },

    'ACQ.PAYMENT_REQUEST_HAS_RISK': {
        code: 'ACQ.PAYMENT_REQUEST_HAS_RISK',
        desc: '支付有风险',
        resolve: '更换其它付款方式',
    },

    'ACQ.NO_PAYMENT_INSTRUMENTS_AVAIL': {
        code: 'ACQ.NO_PAYMENT_INSTRUMENTS_AVAIL',
        desc: '没用可用的支付工具',
        resolve: '更换其它付款方式',
    },

    'ACQ.ILLEGAL_SIGN_VALIDTY_PERIOD': {
        code: 'ACQ.ILLEGAL_SIGN_VALIDTY_PERIOD',
        desc: '无效的签约有效期',
        resolve: '更改接口中传入的签约有效期',
    },

    'ACQ.MERCHANT_AGREEMENT_NOT_EXIST': {
        code: 'ACQ.MERCHANT_AGREEMENT_NOT_EXIST',
        desc: '商户协议不存在',
        resolve: '建议商户与支付宝确认签约代扣合同',
    },

}

export const notify = {

    'tradeStatus.WAIT_BUYER_PAY': {
        code: 'tradeStatus.WAIT_BUYER_PAY',
        desc: '交易创建',
        enable: '0',
    },

}