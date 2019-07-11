import * as base from './base';

export class Request extends base.Request {

    /**
     * 开始时间
     * 按用户评论时间批量拉取的起始时间，格式为yyyyMMddHHmmss
     * example: 20170724000000
     */
    begin_time: string

    /**
     * 结束时间
     * 按用户评论时间批量拉取的结束时间，格式为yyyyMMddHHmmss
     * example: 20170725000000
     */
    end_time: string

    /**
     * 位移
     * 指定从某条记录的下一条开始返回记录。接口调用成功时，会返回本次查询最后一条数据的offset。商户需要翻页时，应该把本次调用返回的offset 作为下次调用的入参。注意offset是评论数据在微信支付后台保存的索引，未必是连续的
     * example: 0
     */
    offset: number

    /**
     * 条数
     * 一次拉取的条数, 最大值是200，默认是200
     * example: 100
     */
    limit?: number

}

export class Response extends base.Response {

}