import * as base from '../base';

export class Request extends base.Request {

    /**
     * 支付宝用户id
     * example: 2088302483540171
     */
    alipay_user_id: string;

    /**
     * 行业产品信息，咨询是，会从该产品对应的销售方案中获取相关垫资规则配置
     * example: CAR_OWNERS_PARKINGPAY
     */
    industry_product_code: string;

    /**
     * 子商户id
     * example: 2088102122458832
     */
    sub_merchant_id: string;

    /**
     * 子商户类型
     * example: PARTNER
     */
    sub_merchant_type: string;

}

export class Response extends base.Response {

    /**
     * true 代表当前时间点，用户允许垫资false 代表当前时间，用户不允许垫资
     * example: true
     */
    refer_result: boolean;

    /**
     * 待还订单列表，无论用户当前状态是否允许垫资，都会返回当前用户在商户下的待还订单信息
     */
    wait_repayment_order_infos: {

        /**
         * 垫资单id
         * example: 20190128002630010000170001187808
         */
        advance_order_id: string;

        /**
         * 买家的支付宝用户id
         * example: 2088302483540171
         */
        alipay_user_id: string;

        /**
         * 原始的业务单号，通常为支付宝交易号
         * example: 2018060821001001820554093702
         */
        orig_biz_order_id: string;

        /**
         * 通常为商户签约的收单产品码
         * example: GENERAL_WITHHOLDING
         */
        biz_product: string;

        /**
         * 垫资金额
         * example: 2.04
         */
        wait_repayment_amount: number;
    }

    /**
     * 用户剩余的总待还金额，无论当前用户是否允许垫资，都会返回改属性
     * example: 2.48
     */
    wait_repayment_amount: string;

    /**
     * 用户总的未还的垫资笔数，无论用户是否允许垫资，都会返回该属性
     * example: 6
     */
    wait_repayment_order_count: number;

    /**
     * 返回用户不准入原因
     * example: 用户不准入
     */
    result_message: string;

    /**
     * 用户被注销
     * example: USER_NOT_EXIST
     */
    result_code: string;

}

export const error = {

    SYSTEM_ERROR: {
        code: 'SYSTEM_ERROR',
        desc: '系统繁忙',
        resolve: '稍后重试',
    },

    USER_STAUTS_ERROR: {
        code: 'USER_STAUTS_ERROR',
        desc: '用户状态错误',
        resolve: '用户状态问题',
    },

    USER_NOT_EXIST: {
        code: 'USER_NOT_EXIST',
        desc: '用户已经注销',
        resolve: '用户已经注销',
    },

    BUYER_NOT_SUPPORT_ADVANCEPAY: {
        code: 'BUYER_NOT_SUPPORT_ADVANCEPAY',
        desc: '用户不允许垫资',
        resolve: '用户不允许垫资',
    },

}