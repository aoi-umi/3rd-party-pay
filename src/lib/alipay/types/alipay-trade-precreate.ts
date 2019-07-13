import * as base from '../base';

export class Request extends base.Request {

    /**
     * 商户订单号,64个字符以内、只能包含字母、数字、下划线；需保证在商户端不重复
     * example: 20150320010101001
     */
    out_trade_no: string;

    /**
     * 卖家支付宝用户ID。 如果该值为空，则默认为商户签约账号对应的支付宝用户ID
     * example: 2088102146225135
     */
    seller_id: string;

    /**
     * 订单总金额，单位为元，精确到小数点后两位，取值范围[0.01,100000000] 如果同时传入了【打折金额】，【不可打折金额】，【订单总金额】三者，则必须满足如下条件：【订单总金额】=【打折金额】+【不可打折金额】
     * example: 88.88
     */
    total_amount: number;

    /**
     * 可打折金额. 参与优惠计算的金额，单位为元，精确到小数点后两位，取值范围[0.01,100000000] 如果该值未传入，但传入了【订单总金额】和【不可打折金额】，则该值默认为【订单总金额】-【不可打折金额】
     * example: 8.88
     */
    discountable_amount: number;

    /**
     * 订单标题
     * example: Iphone6 16G
     */
    subject: string;

    /**
     * 订单包含的商品列表信息.json格式. 其它说明详见：“商品明细说明”
     */
    goods_detail?: {

        /**
         * 商品的编号
         * example: apple-01
         */
        goods_id: string;

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
        goods_category: string;

        /**
         * 商品类目树，从商品类目根节点到叶子节点的类目id组成，类目id值使用|分割
         * example: 124868003|126232002|126252004
         */
        categories_tree: string;

        /**
         * 商品描述信息
         * example: 特价手机
         */
        body: string;

        /**
         * 商品的展示地址
         * example: http://www.alipay.com/xxx.jpg
         */
        show_url: string;
    }[];

    /**
     * 对交易或商品的描述
     * example: Iphone6 16G
     */
    body: string;

    /**
     * 销售产品码。如果签约的是当面付快捷版，则传OFFLINE_PAYMENT;其它支付宝当面付产品传FACE_TO_FACE_PAYMENT；不传默认使用FACE_TO_FACE_PAYMENT；
     * example: FACE_TO_FACE_PAYMENT
     */
    product_code: string;

    /**
     * 商户操作员编号
     * example: yx_001
     */
    operator_id: string;

    /**
     * 商户门店编号
     * example: NJ_001
     */
    store_id: string;

    /**
     * 禁用渠道，用户不可用指定渠道支付
    当有多个渠道时用“,”分隔
    注，与enable_pay_channels互斥
    渠道列表：https://docs.open.alipay.com/common/wifww7
     * example: pcredit,moneyFund,debitCardExpress
     */
    disable_pay_channels: string;

    /**
     * 可用渠道，用户只能在指定渠道范围内支付
    当有多个渠道时用“,”分隔
    注，与disable_pay_channels互斥
    渠道列表
     * example: pcredit,moneyFund,debitCardExpress
     */
    enable_pay_channels: string;

    /**
     * 商户机具终端编号
     * example: NJ_T_001
     */
    terminal_id: string;

    /**
     * 业务扩展参数
     */
    extend_params?: {

        /**
         * 系统商编号
        该参数作为系统商返佣数据提取的依据，请填写系统商签约协议的PID
         * example: 2088511833207846
         */
        sys_service_provider_id: string;

        /**
         * 行业数据回流信息, 详见：地铁支付接口参数补充说明
         * example: {\"scene_code\":\"metro_tradeorder\",\"channel\":\"xxxx\",\"scene_data\":{\"asset_name\":\"ALIPAY\"}}
         */
        industry_reflux_info: string;

        /**
         * 卡类型
         * example: S0JP0000
         */
        card_type: string;
    };

    /**
     * 该笔订单允许的最晚付款时间，逾期将关闭交易。取值范围：1m～15d。m-分钟，h-小时，d-天，1c-当天（1c-当天的情况下，无论交易何时创建，都在0点关闭）。 该参数数值不接受小数点， 如 1.5h，可转换为 90m。
     * example: 90m
     */
    timeout_express: string;

    /**
     * 描述结算信息，json格式，详见结算参数说明
     */
    settle_info?: {

        /**
         * 结算详细信息，json数组，目前只支持一条。
         */
        settle_detail_infos: {

            /**
             * 结算收款方的账户类型。cardAliasNo：结算收款方的银行卡编号;userId：表示是支付宝账号对应的支付宝唯一用户号;loginName：表示是支付宝登录号；
             * example: cardAliasNo
             */
            trans_in_type: string;

            /**
             * 结算收款方。当结算收款方类型是cardAliasNo时，本参数为用户在支付宝绑定的卡编号；结算收款方类型是userId时，本参数为用户的支付宝账号对应的支付宝唯一用户号，以2088开头的纯16位数字；当结算收款方类型是loginName时，本参数为用户的支付宝登录号
             * example: A0001
             */
            trans_in: string;

            /**
             * 结算汇总维度，按照这个维度汇总成批次结算，由商户指定。目前需要和结算收款方账户类型为cardAliasNo配合使用
             * example: A0001
             */
            summary_dimension: string;

            /**
             * 结算主体标识。当结算主体类型为SecondMerchant时，为二级商户的SecondMerchantID；当结算主体类型为Store时，为门店的外标。
             * example: 2088xxxxx;ST_0001
             */
            settle_entity_id: string;

            /**
             * 结算主体类型。
            二级商户:SecondMerchant;商户或者直连商户门店:Store
             * example: SecondMerchant、Store
             */
            settle_entity_type: string;

            /**
             * 结算的金额，单位为元。目前必须和交易金额相同
             * example: 0.1
             */
            amount: number;
        }[];
    }

    /**
     * 商户原始订单号，最大长度限制32位
     * example: 20161008001
     */
    merchant_order_no: string;

    /**
     * 商户传入业务信息，具体值要和支付宝约定，应用于安全，营销等参数直传场景，格式为json格式
     * example: {"data":"123"}
     */
    business_params?: {

        /**
         * 校园卡编号
         * example: 0000306634
         */
        campus_card: string;

        /**
         * 虚拟卡卡类型
         * example: T0HK0000
         */
        card_type: string;

        /**
         * 实际订单时间，在乘车码场景，传入的是用户刷码乘车时间
         * example: 2019-05-14 09:18:55
         */
        actual_order_time: string;
    }

    /**
     * 该笔订单允许的最晚付款时间，逾期将关闭交易，从生成二维码开始计时。取值范围：1m～15d。m-分钟，h-小时，d-天，1c-当天（1c-当天的情况下，无论交易何时创建，都在0点关闭）。 该参数数值不接受小数点， 如 1.5h，可转换为 90m。
     * example: 90m
     */
    qr_code_timeout_express: string;

}

export class Response extends base.Response {

    /**
     * 商户的订单号
     * example: 6823789339978248
     */
    out_trade_no: string;

    /**
     * 当前预下单请求生成的二维码码串，可以用二维码生成工具根据该码串值生成对应的二维码
     * example: https://qr.alipay.com/bavh4wjlxf12tper3a
     */
    qr_code: string;

}

export const error = {

    'ACQ.SYSTEM_ERROR': {
        code: 'ACQ.SYSTEM_ERROR',
        desc: '接口返回错误',
        resolve: '请立即调用查询订单API，查询当前订单的状态，并根据订单状态决定下一步的操作',
    },

    'ACQ.INVALID_PARAMETER': {
        code: 'ACQ.INVALID_PARAMETER',
        desc: '参数无效',
        resolve: '检查请求参数，修改后重新发起请求',
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
        desc: '订单总金额超过限额',
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
        resolve: '用户联系支付宝小二，确认买家状态为什么非法',
    },

    'ACQ.BUYER_PAYMENT_AMOUNT_DAY_LIMIT_ERROR': {
        code: 'ACQ.BUYER_PAYMENT_AMOUNT_DAY_LIMIT_ERROR',
        desc: '买家付款日限额超限',
        resolve: '更换买家进行支付',
    },

    'ACQ.BEYOND_PAY_RESTRICTION': {
        code: 'ACQ.BEYOND_PAY_RESTRICTION',
        desc: '商户收款额度超限',
        resolve: '联系支付宝小二提高限额',
    },

    'ACQ.BEYOND_PER_RECEIPT_RESTRICTION': {
        code: 'ACQ.BEYOND_PER_RECEIPT_RESTRICTION',
        desc: '商户收款金额超过月限额',
        resolve: '联系支付宝小二提高限额',
    },

    'ACQ.BUYER_PAYMENT_AMOUNT_MONTH_LIMIT_ERROR': {
        code: 'ACQ.BUYER_PAYMENT_AMOUNT_MONTH_LIMIT_ERROR',
        desc: '买家付款月额度超限',
        resolve: '让买家更换账号后，重新付款或者更换其它付款方式',
    },

    'ACQ.SELLER_BEEN_BLOCKED': {
        code: 'ACQ.SELLER_BEEN_BLOCKED',
        desc: '商家账号被冻结',
        resolve: '联系支付宝小二，解冻账号',
    },

    'ACQ.ERROR_BUYER_CERTIFY_LEVEL_LIMIT': {
        code: 'ACQ.ERROR_BUYER_CERTIFY_LEVEL_LIMIT',
        desc: '买家未通过人行认证',
        resolve: '让用户联系支付宝小二并更换其它付款方式',
    },

    'ACQ.INVALID_STORE_ID': {
        code: 'ACQ.INVALID_STORE_ID',
        desc: '商户门店编号无效',
        resolve: '检查传入的门店编号是否符合规则',
    },

}

export const notify = {

    'tradeStatus.TRADE_CLOSED': {
        code: 'tradeStatus.TRADE_CLOSED',
        desc: '交易关闭',
        enable: '0',
    },

    'tradeStatus.TRADE_FINISHED': {
        code: 'tradeStatus.TRADE_FINISHED',
        desc: '交易完结',
        enable: '0',
    },

    'tradeStatus.TRADE_SUCCESS': {
        code: 'tradeStatus.TRADE_SUCCESS',
        desc: '支付成功',
        enable: '1',
    },

    'tradeStatus.WAIT_BUYER_PAY': {
        code: 'tradeStatus.WAIT_BUYER_PAY',
        desc: '交易创建',
        enable: '0',
    },

}