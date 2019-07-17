import * as base from '../base';

export class Request extends base.Request {

    /**
     * 结算请求流水号 开发者自行生成并保证唯一性
     * example: 20160727001
     */
    out_request_no: string;

    /**
     * 支付宝订单号
     * example: 2014030411001007850000672009
     */
    trade_no: string;

    /**
     * 分账明细信息
     */
    royalty_parameters: {

        /**
         * 分账类型.
        普通分账为：transfer;
        补差为：replenish;
        为空默认为分账transfer;
         * example: transfer
         */
        royalty_type?: string;

        /**
         * 支出方账户。如果支出方账户类型为userId，本参数为支出方的支付宝账号对应的支付宝唯一用户号，以2088开头的纯16位数字；如果支出方类型为loginName，本参数为支出方的支付宝登录号；
         * example: 2088101126765726
         */
        trans_out?: string;

        /**
         * 支出方账户类型。userId表示是支付宝账号对应的支付宝唯一用户号;loginName表示是支付宝登录号；
         * example: userId
         */
        trans_out_type?: string;

        /**
         * 收入方账户类型。userId表示是支付宝账号对应的支付宝唯一用户号;cardAliasNo表示是卡编号;loginName表示是支付宝登录号；
         * example: userId
         */
        trans_in_type?: string;

        /**
         * 收入方账户。如果收入方账户类型为userId，本参数为收入方的支付宝账号对应的支付宝唯一用户号，以2088开头的纯16位数字；如果收入方类型为cardAliasNo，本参数为收入方在支付宝绑定的卡编号；如果收入方类型为loginName，本参数为收入方的支付宝登录号；
         * example: 2088101126708402
         */
        trans_in: string;

        /**
         * 分账的金额，单位为元
         * example: 0.1
         */
        amount?: number;

        /**
         * 分账描述
         * example: 分账给2088101126708402
         */
        desc?: string;
    }[];

    /**
     * 操作员id
     * example: A0001
     */
    operator_id?: string;

}


export class Response extends base.Response {

    /**
     * 支付宝交易号
     * example: 2015070921001004130000127422
     */
    trade_no: string;

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

    'ACQ.TRADE_NOT_EXIST': {
        code: 'ACQ.TRADE_NOT_EXIST',
        desc: '交易不存在',
        resolve: '修改交易号后，重新发起请求',
    },

    'ACQ.TRADE_STATUS_ERROR': {
        code: 'ACQ.TRADE_STATUS_ERROR',
        desc: '交易状态不合法',
        resolve: '必须为交易成功状态才允许进行分账，请检查交易状态',
    },

    'ACQ.PARTNER_ERROR': {
        code: 'ACQ.PARTNER_ERROR',
        desc: '应用APP_ID填写错误',
        resolve: '请确认APP_ID的状态，如有疑问可到<a href="https://support.open.alipay.com/alipay/support/index.htm">支持中心</a>提问',
    },

    'ACQ.DISCORDANT_REPEAT_REQUEST': {
        code: 'ACQ.DISCORDANT_REPEAT_REQUEST',
        desc: '请求被篡改',
        resolve: '与已有请求的请求流水相同，但明细信息不同，请检查请求参数后重新发起请求',
    },

    'ACQ.TRADE_SETTLE_ERROR': {
        code: 'ACQ.TRADE_SETTLE_ERROR',
        desc: '分账处理失败',
        resolve: '检查分账明细后，重新发起请求',
    },

}

export const notify = {

    'tradeStatus.TRADE_SUCCESS': {
        code: 'tradeStatus.TRADE_SUCCESS',
        desc: '支付成功',
        enable: '1',
    },

}