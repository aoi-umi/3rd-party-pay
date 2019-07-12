import * as base from '../base';

export class Request extends base.Request {

    /**
     * 商户订单号,64个字符以内、可包含字母、数字、下划线；需保证在商户端不重复
     * example: 20150320010101001
     */
    out_trade_no: string;

    /**
     * 支付场景
    条码支付，取值：bar_code
    声波支付，取值：wave_code
     * example: bar_code
     */
    scene: string;

    /**
     * 支付授权码，25~30开头的长度为16~24位的数字，实际字符串长度以开发者获取的付款码长度为准
     * example: 28763443825664394
     */
    auth_code: string;

    /**
     * 销售产品码
     * example: FACE_TO_FACE_PAYMENT
     */
    product_code: string;

    /**
     * 订单标题
     * example: Iphone6 16G
     */
    subject: string;

    /**
     * 买家的支付宝用户id，如果为空，会从传入了码值信息中获取买家ID
     * example: 2088202954065786
     */
    buyer_id: string;

    /**
     * 如果该值为空，则默认为商户签约账号对应的支付宝用户ID
     * example: 2088102146225135
     */
    seller_id: string;

    /**
     * 订单总金额，单位为元，精确到小数点后两位，取值范围[0.01,100000000]
    如果同时传入【可打折金额】和【不可打折金额】，该参数可以不用传入；
    如果同时传入了【可打折金额】，【不可打折金额】，【订单总金额】三者，则必须满足如下条件：【订单总金额】=【可打折金额】+【不可打折金额】
     * example: 88.88
     */
    total_amount: number;

    /**
     * 标价币种,  total_amount 对应的币种单位。支持英镑：GBP、港币：HKD、美元：USD、新加坡元：SGD、日元：JPY、加拿大元：CAD、澳元：AUD、欧元：EUR、新西兰元：NZD、韩元：KRW、泰铢：THB、瑞士法郎：CHF、瑞典克朗：SEK、丹麦克朗：DKK、挪威克朗：NOK、马来西亚林吉特：MYR、印尼卢比：IDR、菲律宾比索：PHP、毛里求斯卢比：MUR、以色列新谢克尔：ILS、斯里兰卡卢比：LKR、俄罗斯卢布：RUB、阿联酋迪拉姆：AED、捷克克朗：CZK、南非兰特：ZAR、人民币：CNY
     * example: USD
     */
    trans_currency: string;

    /**
     * 商户指定的结算币种，支持英镑：GBP、港币：HKD、美元：USD、新加坡元：SGD、日元：JPY、加拿大元：CAD、澳元：AUD、欧元：EUR、新西兰元：NZD、韩元：KRW、泰铢：THB、瑞士法郎：CHF、瑞典克朗：SEK、丹麦克朗：DKK、挪威克朗：NOK、马来西亚林吉特：MYR、印尼卢比：IDR、菲律宾比索：PHP、毛里求斯卢比：MUR、以色列新谢克尔：ILS、斯里兰卡卢比：LKR、俄罗斯卢布：RUB、阿联酋迪拉姆：AED、捷克克朗：CZK、南非兰特：ZAR、人民币：CNY
     * example: USD
     */
    settle_currency: string;

    /**
     * 参与优惠计算的金额，单位为元，精确到小数点后两位，取值范围[0.01,100000000]。
    如果该值未传入，但传入了【订单总金额】和【不可打折金额】，则该值默认为【订单总金额】-【不可打折金额】
     * example: 8.88
     */
    discountable_amount: number;

    /**
     * 订单描述
     * example: Iphone6 16G
     */
    body: string;

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
    }[]

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
    }

    /**
     * 该笔订单允许的最晚付款时间，逾期将关闭交易。取值范围：1m～15d。m-分钟，h-小时，d-天，1c-当天（1c-当天的情况下，无论交易何时创建，都在0点关闭）。 该参数数值不接受小数点， 如 1.5h，可转换为 90m
     * example: 90m
     */
    timeout_express: string;

    /**
     * 预授权确认模式，授权转交易请求中传入，适用于预授权转交易业务使用，目前只支持PRE_AUTH(预授权产品码)
    COMPLETE：转交易支付完成结束预授权，解冻剩余金额; NOT_COMPLETE：转交易支付完成不结束预授权，不解冻剩余金额
     * example: COMPLETE：转交易支付完成结束预授权;NOT_COMPLETE：转交易支付完成不结束预授权
     */
    auth_confirm_mode: string;

    /**
     * 商户传入终端设备相关信息，具体值要和支付宝约定
     * example: {"key":"value"}
     */
    terminal_params: string;

    /**
     * 优惠明细参数，通过此属性补充营销参数
     */
    promo_params?: {

        /**
         * 存在延迟扣款这一类的场景，用这个时间表明用户发生交易的时间，比如说，在公交地铁场景，用户刷码出站的时间，和商户上送交易的时间是不一样的。
         * example: 2018-09-25 22:47:33
         */
        actual_order_time: string;
    }

    /**
     * 支付模式类型,若值为ENJOY_PAY_V2表示当前交易允许走先享后付2.0垫资
     * example: ENJOY_PAY_V2
     */
    advance_payment_type: string;

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
     * 买家支付宝账号
     * example: 159****5620
     */
    buyer_logon_id: string;

    /**
     * 结算币种订单金额
     * example: 88.88
     */
    settle_amount: string;

    /**
     * 支付币种
     * example: CNY
     */
    pay_currency: string;

    /**
     * 支付币种订单金额
     * example: 580.04
     */
    pay_amount: string;

    /**
     * 结算币种兑换标价币种汇率
     * example: 1
     */
    settle_trans_rate: string;

    /**
     * 标价币种兑换支付币种汇率
     * example: 6.5261
     */
    trans_pay_rate: string;

    /**
     * 交易金额
     * example: 120.88
     */
    total_amount: number;

    /**
     * 标价币种, total_amount对应的币种单位。目前支持英镑：GBP、港币：HKD、美元：USD、新加坡元：SGD、日元：JPY、加拿大元：CAD、澳元：AUD、欧元：EUR、新西兰元：NZD、韩元：KRW、泰铢：THB、瑞士法郎：CHF、瑞典克朗：SEK、丹麦克朗：DKK、挪威克朗：NOK、马来西亚林吉特：MYR、印尼卢比：IDR、菲律宾比索：PHP、毛里求斯卢比：MUR、以色列新谢克尔：ILS、斯里兰卡卢比：LKR、俄罗斯卢布：RUB、阿联酋迪拉姆：AED、捷克克朗：CZK、南非兰特：ZAR、人民币：CNY
     * example: USD
     */
    trans_currency: string;

    /**
     * 商户指定的结算币种，目前支持英镑：GBP、港币：HKD、美元：USD、新加坡元：SGD、日元：JPY、加拿大元：CAD、澳元：AUD、欧元：EUR、新西兰元：NZD、韩元：KRW、泰铢：THB、瑞士法郎：CHF、瑞典克朗：SEK、丹麦克朗：DKK、挪威克朗：NOK、马来西亚林吉特：MYR、印尼卢比：IDR、菲律宾比索：PHP、毛里求斯卢比：MUR、以色列新谢克尔：ILS、斯里兰卡卢比：LKR、俄罗斯卢布：RUB、阿联酋迪拉姆：AED、捷克克朗：CZK、南非兰特：ZAR、人民币：CNY
     * example: USD
     */
    settle_currency: string;

    /**
     * 实收金额
     * example: 88.88
     */
    receipt_amount: string;

    /**
     * 买家付款的金额
     * example: 8.88
     */
    buyer_pay_amount: number;

    /**
     * 使用集分宝付款的金额
     * example: 8.12
     */
    point_amount: number;

    /**
     * 交易中可给用户开具发票的金额
     * example: 12.50
     */
    invoice_amount: number;

    /**
     * 交易支付时间
     * example: 2014-11-27 15:45:57
     */
    gmt_payment: string;

    /**
     * 交易支付使用的资金渠道
     */
    fund_bill_list: {

        /**
         * 交易使用的资金渠道，详见 支付渠道列表
         * example: ALIPAYACCOUNT
         */
        fund_channel: string;

        /**
         * 银行卡支付时的银行代码
         * example: CEB
         */
        bank_code: string;

        /**
         * 该支付工具类型所使用的金额
         * example: 10
         */
        amount: number;

        /**
         * 渠道实际付款金额
         * example: 11.21
         */
        real_amount: number;
    }

    /**
     * 支付宝卡余额
     * example: 98.23
     */
    card_balance: number;

    /**
     * 发生支付交易的商户门店名称
     * example: 证大五道口店
     */
    store_name: string;

    /**
     * 买家在支付宝的用户id
     * example: 2088101117955611
     */
    buyer_user_id: string;

    /**
     * 本次交易支付所使用的单品券优惠的商品优惠信息
     * example: [{"goods_id":"STANDARD1026181538","goods_name":"雪碧","discount_amount":"100.00","voucher_id":"2015102600073002039000002D5O"}]
     */
    discount_goods_detail: string;

    /**
     * 本交易支付时使用的所有优惠券信息
     */
    voucher_detail_list?: {

        /**
         * 券id
         * example: 2015102600073002039000002D5O
         */
        id: string;

        /**
         * 券名称
         * example: XX超市5折优惠
         */
        name: string;

        /**
         * 当前有三种类型：
        ALIPAY_FIX_VOUCHER - 全场代金券
        ALIPAY_DISCOUNT_VOUCHER - 折扣券
        ALIPAY_ITEM_VOUCHER - 单品优惠
        注：不排除将来新增其他类型的可能，商家接入时注意兼容性避免硬编码
         * example: ALIPAY_FIX_VOUCHER
         */
        type: string;

        /**
         * 优惠券面额，它应该会等于商家出资加上其他出资方出资
         * example: 10.00
         */
        amount: number;

        /**
         * 商家出资（特指发起交易的商家出资金额）
         * example: 9.00
         */
        merchant_contribute: number;

        /**
         * 其他出资方出资金额，可能是支付宝，可能是品牌商，或者其他方，也可能是他们的一起出资
         * example: 1.00
         */
        other_contribute: number;

        /**
         * 优惠券备注信息
         * example: 学生专用优惠
         */
        memo: string;

        /**
         * 券模板id
         * example: 20171030000730015359000EMZP0
         */
        template_id: string;

        /**
         * 如果使用的这张券是用户购买的，则该字段代表用户在购买这张券时用户实际付款的金额
         * example: 2.01
         */
        purchase_buyer_contribute: number;

        /**
         * 如果使用的这张券是用户购买的，则该字段代表用户在购买这张券时商户优惠的金额
         * example: 1.03
         */
        purchase_merchant_contribute: number;

        /**
         * 如果使用的这张券是用户购买的，则该字段代表用户在购买这张券时平台优惠的金额
         * example: 0.82
         */
        purchase_ant_contribute: number;
    }

    /**
     * 先享后付2.0垫资金额,不返回表示没有走垫资，非空表示垫资支付的金额
     * example: 88.8
     */
    advance_amount: string;

    /**
     * 预授权支付模式，该参数仅在信用预授权支付场景下返回。信用预授权支付：CREDIT_PREAUTH_PAY
     * example: CREDIT_PREAUTH_PAY
     */
    auth_trade_pay_mode: string;

    /**
     * 该笔交易针对收款方的收费金额；
    默认不返回该信息，需与支付宝约定后配置返回；
     * example: 8.88
     */
    charge_amount: string;

    /**
     * 费率活动标识，当交易享受活动优惠费率时，返回该活动的标识；
    默认不返回该信息，需与支付宝约定后配置返回；
    可能的返回值列表：
    蓝海活动标识：bluesea_1
     * example: bluesea_1
     */
    charge_flags: string;

    /**
     * 支付清算编号，用于清算对账使用；
    只在银行间联交易场景下返回该信息；
     * example: 2018101610032004620239146945
     */
    settlement_id: string;

    /**
     * 商户传入业务信息，具体值要和支付宝约定
    将商户传入信息分发给相应系统，应用于安全，营销等参数直传场景
    格式为json格式
     * example: {"data":"123"}
     */
    business_params: string;

    /**
     * 买家用户类型。CORPORATE:企业用户；PRIVATE:个人用户。
     * example: PRIVATE
     */
    buyer_user_type: string;

    /**
     * 商家优惠金额
     * example: 88.88
     */
    mdiscount_amount: string;

    /**
     * 平台优惠金额
     * example: 88.88
     */
    discount_amount: string;

    /**
     * 买家名称；
    买家为个人用户时为买家姓名，买家为企业用户时为企业名称；
    默认不返回该信息，需与支付宝约定后配置返回；
     * example: 菜鸟网络有限公司
     */
    buyer_user_name: string;

}

export const error = {

    'ACQ.SYSTEM_ERROR': {
        code: 'ACQ.SYSTEM_ERROR',
        desc: '接口返回错误',
        resolve: '请立即调用查询订单API，查询当前订单的状态，并根据订单状态决定下一步的操作，如果多次调用依然报此错误码，请联系支付宝客服',
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
        resolve: '联系支付宝小二（联系支付宝文档右边的客服头像或到支持中心咨询），确认APP_ID的状态',
    },

    'ACQ.TOTAL_FEE_EXCEED': {
        code: 'ACQ.TOTAL_FEE_EXCEED',
        desc: '订单总金额超过限额',
        resolve: '修改订单金额再发起请求',
    },

    'ACQ.PAYMENT_AUTH_CODE_INVALID': {
        code: 'ACQ.PAYMENT_AUTH_CODE_INVALID',
        desc: '支付授权码无效',
        resolve: '用户刷新条码后，重新扫码发起请求',
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

    'ACQ.BUYER_BANKCARD_BALANCE_NOT_ENOUGH': {
        code: 'ACQ.BUYER_BANKCARD_BALANCE_NOT_ENOUGH',
        desc: '用户银行卡余额不足',
        resolve: '建议买家更换支付宝进行支付或者更换其它付款方式',
    },

    'ACQ.ERROR_BALANCE_PAYMENT_DISABLE': {
        code: 'ACQ.ERROR_BALANCE_PAYMENT_DISABLE',
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
        resolve: '用户联系支付宝小二（联系支付宝文档右边的客服头像或到支持中心咨询），确认买家状态为什么非法',
    },

    'ACQ.PULL_MOBILE_CASHIER_FAIL': {
        code: 'ACQ.PULL_MOBILE_CASHIER_FAIL',
        desc: '唤起移动收银台失败',
        resolve: '用户刷新条码后，重新扫码发起请求',
    },

    'ACQ.MOBILE_PAYMENT_SWITCH_OFF': {
        code: 'ACQ.MOBILE_PAYMENT_SWITCH_OFF',
        desc: '用户的无线支付开关关闭',
        resolve: '用户在PC上打开无线支付开关后，再重新发起支付',
    },

    'ACQ.PAYMENT_FAIL': {
        code: 'ACQ.PAYMENT_FAIL',
        desc: '支付失败',
        resolve: '用户刷新条码后，重新发起请求，如果重试一次后仍未成功，更换其它方式付款',
    },

    'ACQ.BUYER_PAYMENT_AMOUNT_DAY_LIMIT_ERROR': {
        code: 'ACQ.BUYER_PAYMENT_AMOUNT_DAY_LIMIT_ERROR',
        desc: '买家付款日限额超限',
        resolve: '更换买家进行支付',
    },

    'ACQ.BEYOND_PAY_RESTRICTION': {
        code: 'ACQ.BEYOND_PAY_RESTRICTION',
        desc: '商户收款额度超限',
        resolve: '联系支付宝小二提高限额（联系电话：0571-88158090）',
    },

    'ACQ.BEYOND_PER_RECEIPT_RESTRICTION': {
        code: 'ACQ.BEYOND_PER_RECEIPT_RESTRICTION',
        desc: '商户收款金额超过月限额',
        resolve: '联系支付宝小二提高限额（联系电话：0571-88158090）',
    },

    'ACQ.BUYER_PAYMENT_AMOUNT_MONTH_LIMIT_ERROR': {
        code: 'ACQ.BUYER_PAYMENT_AMOUNT_MONTH_LIMIT_ERROR',
        desc: '买家付款月额度超限',
        resolve: '让买家更换账号后，重新付款或者更换其它付款方式',
    },

    'ACQ.SELLER_BEEN_BLOCKED': {
        code: 'ACQ.SELLER_BEEN_BLOCKED',
        desc: '商家账号被冻结',
        resolve: '联系支付宝小二，解冻账号（联系电话：95188）',
    },

    'ACQ.ERROR_BUYER_CERTIFY_LEVEL_LIMIT': {
        code: 'ACQ.ERROR_BUYER_CERTIFY_LEVEL_LIMIT',
        desc: '买家未通过人行认证',
        resolve: '让用户联系支付宝小二并更换其它付款方式（联系电话：95188）',
    },

    'ACQ.PAYMENT_REQUEST_HAS_RISK': {
        code: 'ACQ.PAYMENT_REQUEST_HAS_RISK',
        desc: '支付有风险',
        resolve: '更换其它付款方式',
    },

    'ACQ.NO_PAYMENT_INSTRUMENTS_AVAILABLE': {
        code: 'ACQ.NO_PAYMENT_INSTRUMENTS_AVAILABLE',
        desc: '没用可用的支付工具',
        resolve: '更换其它付款方式',
    },

    'ACQ.USER_FACE_PAYMENT_SWITCH_OFF': {
        code: 'ACQ.USER_FACE_PAYMENT_SWITCH_OFF',
        desc: '用户当面付付款开关关闭',
        resolve: '让用户在手机上打开当面付付款开关',
    },

    'ACQ.INVALID_STORE_ID': {
        code: 'ACQ.INVALID_STORE_ID',
        desc: '商户门店编号无效',
        resolve: '检查传入的门店编号是否有效',
    },

    'ACQ.SUB_MERCHANT_CREATE_FAIL': {
        code: 'ACQ.SUB_MERCHANT_CREATE_FAIL',
        desc: '二级商户创建失败',
        resolve: '检查上送的二级商户信息是否有效',
    },

    'ACQ.SUB_MERCHANT_TYPE_INVALID': {
        code: 'ACQ.SUB_MERCHANT_TYPE_INVALID',
        desc: '二级商户类型非法',
        resolve: '检查上传的二级商户类型是否有效',
    },

    'ACQ.AGREEMENT_NOT_EXIST': {
        code: 'ACQ.AGREEMENT_NOT_EXIST',
        desc: '用户协议不存在',
        resolve: '确认代扣业务传入的协议号对应的协议是否已解约',
    },

    'ACQ.AGREEMENT_INVALID': {
        code: 'ACQ.AGREEMENT_INVALID',
        desc: '用户协议失效',
        resolve: '代扣业务传入的协议号对应的用户协议已经失效，需要用户重新签约',
    },

    'ACQ.AGREEMENT_STATUS_NOT_NORMAL': {
        code: 'ACQ.AGREEMENT_STATUS_NOT_NORMAL',
        desc: '用户协议状态非NORMAL',
        resolve: '代扣业务用户协议状态非正常状态，需要用户解约后重新签约',
    },

    'ACQ.MERCHANT_AGREEMENT_NOT_EXIST': {
        code: 'ACQ.MERCHANT_AGREEMENT_NOT_EXIST',
        desc: '商户协议不存在',
        resolve: '确认商户与支付宝是否已签约',
    },

    'ACQ.MERCHANT_AGREEMENT_INVALID': {
        code: 'ACQ.MERCHANT_AGREEMENT_INVALID',
        desc: '商户协议已失效',
        resolve: '商户与支付宝合同已失效，需要重新签约',
    },

    'ACQ.MERCHANT_STATUS_NOT_NORMAL': {
        code: 'ACQ.MERCHANT_STATUS_NOT_NORMAL',
        desc: '商户协议状态非正常状态',
        resolve: '商户与支付宝的合同非正常状态，需要重新签商户合同',
    },

    'ACQ.CARD_USER_NOT_MATCH': {
        code: 'ACQ.CARD_USER_NOT_MATCH',
        desc: '脱机记录用户信息不匹配',
        resolve: '请检查传入的进展出站记录是否正确',
    },

    'ACQ.CARD_TYPE_ERROR': {
        code: 'ACQ.CARD_TYPE_ERROR',
        desc: '卡类型错误',
        resolve: '检查传入的卡类型',
    },

    'ACQ.CERT_EXPIRED': {
        code: 'ACQ.CERT_EXPIRED',
        desc: '凭证过期',
        resolve: '凭证已经过期',
    },

    'ACQ.AMOUNT_OR_CURRENCY_ERROR': {
        code: 'ACQ.AMOUNT_OR_CURRENCY_ERROR',
        desc: '订单金额或币种信息错误',
        resolve: '检查订单传入的金额信息是否有误，或者是不是当前币种未签约',
    },

    'ACQ.CURRENCY_NOT_SUPPORT': {
        code: 'ACQ.CURRENCY_NOT_SUPPORT',
        desc: '订单币种不支持',
        resolve: '请检查是否签约对应的币种',
    },

    'ACQ.MERCHANT_UNSUPPORT_ADVANCE': {
        code: 'ACQ.MERCHANT_UNSUPPORT_ADVANCE',
        desc: '先享后付2.0准入失败,商户不支持垫资支付产品',
        resolve: '先享后付2.0准入失败,商户不支持垫资支付产品',
    },

    'ACQ.BUYER_UNSUPPORT_ADVANCE': {
        code: 'ACQ.BUYER_UNSUPPORT_ADVANCE',
        desc: '先享后付2.0准入失败,买家不满足垫资条件',
        resolve: '先享后付2.0准入失败,买家不满足垫资条件',
    },

    'ACQ.ORDER_UNSUPPORT_ADVANCE': {
        code: 'ACQ.ORDER_UNSUPPORT_ADVANCE',
        desc: '订单不支持先享后付垫资',
        resolve: '订单不支持先享后付垫资',
    },

    'ACQ.CYCLE_PAY_DATE_NOT_MATCH': {
        code: 'ACQ.CYCLE_PAY_DATE_NOT_MATCH',
        desc: '扣款日期不在签约时的允许范围之内',
        resolve: '对于周期扣款产品，签约时会约定扣款的周期。如果发起扣款的日期不符合约定的周期，则不允许扣款。请重新检查扣款日期，在符合约定的日期发起扣款。',
    },

    'ACQ.CYCLE_PAY_SINGLE_FEE_EXCEED': {
        code: 'ACQ.CYCLE_PAY_SINGLE_FEE_EXCEED',
        desc: '周期扣款的单笔金额超过签约时限制',
        resolve: '对于周期扣款产品，签约时会约定单笔扣款的最大金额。如果发起扣款的金额大于约定上限，则不允许扣款。请在允许的金额范围内扣款。',
    },

    'ACQ.CYCLE_PAY_TOTAL_FEE_EXCEED': {
        code: 'ACQ.CYCLE_PAY_TOTAL_FEE_EXCEED',
        desc: '周期扣款的累计金额超过签约时限制',
        resolve: '对于周期扣款产品，签约时可以约定多次扣款的累计金额限制。如果发起扣款的累计金额大于约定上限，则不允许扣款。请在允许的金额范围内扣款。',
    },

    'ACQ.CYCLE_PAY_TOTAL_TIMES_EXCEED': {
        code: 'ACQ.CYCLE_PAY_TOTAL_TIMES_EXCEED',
        desc: '周期扣款的总次数超过签约时限制',
        resolve: '对于周期扣款产品，签约时可以约定多次扣款的总次数限制。如果发起扣款的总次数大于约定上限，则不允许扣款。请在允许的次数范围内扣款',
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