import * as base from '../../base';

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
