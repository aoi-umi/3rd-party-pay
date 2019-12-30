import * as base from '../../base';

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
    product_code?: string;

    /**
     * 订单标题
     * example: Iphone6 16G
     */
    subject: string;

    /**
     * 买家的支付宝用户id，如果为空，会从传入了码值信息中获取买家ID
     * example: 2088202954065786
     */
    buyer_id?: string;

    /**
     * 如果该值为空，则默认为商户签约账号对应的支付宝用户ID
     * example: 2088102146225135
     */
    seller_id?: string;

    /**
     * 订单总金额，单位为元，精确到小数点后两位，取值范围[0.01,100000000]
    如果同时传入【可打折金额】和【不可打折金额】，该参数可以不用传入；
    如果同时传入了【可打折金额】，【不可打折金额】，【订单总金额】三者，则必须满足如下条件：【订单总金额】=【可打折金额】+【不可打折金额】
     * example: 88.88
     */
    total_amount?: number;

    /**
     * 标价币种,  total_amount 对应的币种单位。支持英镑：GBP、港币：HKD、美元：USD、新加坡元：SGD、日元：JPY、加拿大元：CAD、澳元：AUD、欧元：EUR、新西兰元：NZD、韩元：KRW、泰铢：THB、瑞士法郎：CHF、瑞典克朗：SEK、丹麦克朗：DKK、挪威克朗：NOK、马来西亚林吉特：MYR、印尼卢比：IDR、菲律宾比索：PHP、毛里求斯卢比：MUR、以色列新谢克尔：ILS、斯里兰卡卢比：LKR、俄罗斯卢布：RUB、阿联酋迪拉姆：AED、捷克克朗：CZK、南非兰特：ZAR、人民币：CNY
     * example: USD
     */
    trans_currency?: string;

    /**
     * 商户指定的结算币种，支持英镑：GBP、港币：HKD、美元：USD、新加坡元：SGD、日元：JPY、加拿大元：CAD、澳元：AUD、欧元：EUR、新西兰元：NZD、韩元：KRW、泰铢：THB、瑞士法郎：CHF、瑞典克朗：SEK、丹麦克朗：DKK、挪威克朗：NOK、马来西亚林吉特：MYR、印尼卢比：IDR、菲律宾比索：PHP、毛里求斯卢比：MUR、以色列新谢克尔：ILS、斯里兰卡卢比：LKR、俄罗斯卢布：RUB、阿联酋迪拉姆：AED、捷克克朗：CZK、南非兰特：ZAR、人民币：CNY
     * example: USD
     */
    settle_currency?: string;

    /**
     * 参与优惠计算的金额，单位为元，精确到小数点后两位，取值范围[0.01,100000000]。
    如果该值未传入，但传入了【订单总金额】和【不可打折金额】，则该值默认为【订单总金额】-【不可打折金额】
     * example: 8.88
     */
    discountable_amount?: number;

    /**
     * 订单描述
     * example: Iphone6 16G
     */
    body?: string;

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
        goods_category?: string;

        /**
         * 商品类目树，从商品类目根节点到叶子节点的类目id组成，类目id值使用|分割
         * example: 124868003|126232002|126252004
         */
        categories_tree?: string;

        /**
         * 商品描述信息
         * example: 特价手机
         */
        body?: string;

        /**
         * 商品的展示地址
         * example: http://www.alipay.com/xxx.jpg
         */
        show_url?: string;
    }[]

    /**
     * 商户操作员编号
     * example: yx_001
     */
    operator_id?: string;

    /**
     * 商户门店编号
     * example: NJ_001
     */
    store_id?: string;

    /**
     * 商户机具终端编号
     * example: NJ_T_001
     */
    terminal_id?: string;

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
     * 该笔订单允许的最晚付款时间，逾期将关闭交易。取值范围：1m～15d。m-分钟，h-小时，d-天，1c-当天（1c-当天的情况下，无论交易何时创建，都在0点关闭）。 该参数数值不接受小数点， 如 1.5h，可转换为 90m
     * example: 90m
     */
    timeout_express?: string;

    /**
     * 预授权确认模式，授权转交易请求中传入，适用于预授权转交易业务使用，目前只支持PRE_AUTH(预授权产品码)
    COMPLETE：转交易支付完成结束预授权，解冻剩余金额; NOT_COMPLETE：转交易支付完成不结束预授权，不解冻剩余金额
     * example: COMPLETE：转交易支付完成结束预授权;NOT_COMPLETE：转交易支付完成不结束预授权
     */
    auth_confirm_mode?: string;

    /**
     * 商户传入终端设备相关信息，具体值要和支付宝约定
     * example: {"key":"value"}
     */
    terminal_params?: string;

    /**
     * 优惠明细参数，通过此属性补充营销参数
     */
    promo_params?: {

        /**
         * 存在延迟扣款这一类的场景，用这个时间表明用户发生交易的时间，比如说，在公交地铁场景，用户刷码出站的时间，和商户上送交易的时间是不一样的。
         * example: 2018-09-25 22:47:33
         */
        actual_order_time?: string;
    }

    /**
     * 支付模式类型,若值为ENJOY_PAY_V2表示当前交易允许走先享后付2.0垫资
     * example: ENJOY_PAY_V2
     */
    advance_payment_type?: string;

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
    settle_amount?: string;

    /**
     * 支付币种
     * example: CNY
     */
    pay_currency?: string;

    /**
     * 支付币种订单金额
     * example: 580.04
     */
    pay_amount?: string;

    /**
     * 结算币种兑换标价币种汇率
     * example: 1
     */
    settle_trans_rate?: string;

    /**
     * 标价币种兑换支付币种汇率
     * example: 6.5261
     */
    trans_pay_rate?: string;

    /**
     * 交易金额
     * example: 120.88
     */
    total_amount: number;

    /**
     * 标价币种, total_amount对应的币种单位。目前支持英镑：GBP、港币：HKD、美元：USD、新加坡元：SGD、日元：JPY、加拿大元：CAD、澳元：AUD、欧元：EUR、新西兰元：NZD、韩元：KRW、泰铢：THB、瑞士法郎：CHF、瑞典克朗：SEK、丹麦克朗：DKK、挪威克朗：NOK、马来西亚林吉特：MYR、印尼卢比：IDR、菲律宾比索：PHP、毛里求斯卢比：MUR、以色列新谢克尔：ILS、斯里兰卡卢比：LKR、俄罗斯卢布：RUB、阿联酋迪拉姆：AED、捷克克朗：CZK、南非兰特：ZAR、人民币：CNY
     * example: USD
     */
    trans_currency?: string;

    /**
     * 商户指定的结算币种，目前支持英镑：GBP、港币：HKD、美元：USD、新加坡元：SGD、日元：JPY、加拿大元：CAD、澳元：AUD、欧元：EUR、新西兰元：NZD、韩元：KRW、泰铢：THB、瑞士法郎：CHF、瑞典克朗：SEK、丹麦克朗：DKK、挪威克朗：NOK、马来西亚林吉特：MYR、印尼卢比：IDR、菲律宾比索：PHP、毛里求斯卢比：MUR、以色列新谢克尔：ILS、斯里兰卡卢比：LKR、俄罗斯卢布：RUB、阿联酋迪拉姆：AED、捷克克朗：CZK、南非兰特：ZAR、人民币：CNY
     * example: USD
     */
    settle_currency?: string;

    /**
     * 实收金额
     * example: 88.88
     */
    receipt_amount: string;

    /**
     * 买家付款的金额
     * example: 8.88
     */
    buyer_pay_amount?: number;

    /**
     * 使用集分宝付款的金额
     * example: 8.12
     */
    point_amount?: number;

    /**
     * 交易中可给用户开具发票的金额
     * example: 12.50
     */
    invoice_amount?: number;

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
        bank_code?: string;

        /**
         * 该支付工具类型所使用的金额
         * example: 10
         */
        amount: number;

        /**
         * 渠道实际付款金额
         * example: 11.21
         */
        real_amount?: number;
    }

    /**
     * 支付宝卡余额
     * example: 98.23
     */
    card_balance?: number;

    /**
     * 发生支付交易的商户门店名称
     * example: 证大五道口店
     */
    store_name?: string;

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
        merchant_contribute?: number;

        /**
         * 其他出资方出资金额，可能是支付宝，可能是品牌商，或者其他方，也可能是他们的一起出资
         * example: 1.00
         */
        other_contribute?: number;

        /**
         * 优惠券备注信息
         * example: 学生专用优惠
         */
        memo?: string;

        /**
         * 券模板id
         * example: 20171030000730015359000EMZP0
         */
        template_id?: string;

        /**
         * 如果使用的这张券是用户购买的，则该字段代表用户在购买这张券时用户实际付款的金额
         * example: 2.01
         */
        purchase_buyer_contribute?: number;

        /**
         * 如果使用的这张券是用户购买的，则该字段代表用户在购买这张券时商户优惠的金额
         * example: 1.03
         */
        purchase_merchant_contribute?: number;

        /**
         * 如果使用的这张券是用户购买的，则该字段代表用户在购买这张券时平台优惠的金额
         * example: 0.82
         */
        purchase_ant_contribute?: number;
    }

    /**
     * 先享后付2.0垫资金额,不返回表示没有走垫资，非空表示垫资支付的金额
     * example: 88.8
     */
    advance_amount?: string;

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
    charge_amount?: string;

    /**
     * 费率活动标识，当交易享受活动优惠费率时，返回该活动的标识；
    默认不返回该信息，需与支付宝约定后配置返回；
    可能的返回值列表：
    蓝海活动标识：bluesea_1
     * example: bluesea_1
     */
    charge_flags?: string;

    /**
     * 支付清算编号，用于清算对账使用；
    只在银行间联交易场景下返回该信息；
     * example: 2018101610032004620239146945
     */
    settlement_id?: string;

    /**
     * 商户传入业务信息，具体值要和支付宝约定
    将商户传入信息分发给相应系统，应用于安全，营销等参数直传场景
    格式为json格式
     * example: {"data":"123"}
     */
    business_params?: string;

    /**
     * 买家用户类型。CORPORATE:企业用户；PRIVATE:个人用户。
     * example: PRIVATE
     */
    buyer_user_type?: string;

    /**
     * 商家优惠金额
     * example: 88.88
     */
    mdiscount_amount?: string;

    /**
     * 平台优惠金额
     * example: 88.88
     */
    discount_amount?: string;

    /**
     * 买家名称；
    买家为个人用户时为买家姓名，买家为企业用户时为企业名称；
    默认不返回该信息，需与支付宝约定后配置返回；
     * example: 菜鸟网络有限公司
     */
    buyer_user_name?: string;

}
