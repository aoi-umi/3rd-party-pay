import * as base from './base';

export class Request {

    /**
     * 资金账单日期
     * 下载对账单的日期，格式：20140603
     * example: 20140603
     */
    bill_date: string

    /**
     * 资金账户类型
     * 账单的资金来源账户： 
     * Basic  基本账户 
     * Operation 运营账户 
     * Fees 手续费账户
     * example: Basic
     */
    account_type: string

    /**
     * 压缩账单
     * 非必传参数，固定值：GZIP，返回格式为.gzip的压缩包账单。不传则默认为数据流形式。
     * example: GZIP
     */
    tar_type?: string

}

export class Response extends base.Response {
}

export const AccountType = {
    基本账户: 'Basic',
    运营账户: 'Operation',
    手续费账户: 'Fees'
};