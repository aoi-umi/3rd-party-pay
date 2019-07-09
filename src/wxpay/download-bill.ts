//https://pay.weixin.qq.com/wiki/doc/api/micropay.php?chapter=9_6

import * as base from './base';

export class Request {

    /**
     *对账单日期
     *下载对账单的日期，格式：20140603
     *example: 20140603
     */
    bill_date: string

    /**
     *账单类型
     *ALL（默认值），返回当日所有订单信息（不含充值退款订单）
     *SUCCESS，返回当日成功支付的订单（不含充值退款订单） 
     *REFUND，返回当日退款订单（不含充值退款订单） 
     *RECHARGE_REFUND，返回当日充值退款订单
     *example: ALL
     */
    bill_type?: string

    /**
     *压缩账单
     *非必传参数，固定值：GZIP，返回格式为.gzip的压缩包账单。不传则默认为数据流形式。
     *example: GZIP
     */
    tar_type?: string

}

export class Response extends base.Response { }

export const billType = {
    所有: 'ALL',
    成功: 'SUCCESS',
    退款: 'REFUND',
    充值退款: 'RECHARGE_REFUND'
};