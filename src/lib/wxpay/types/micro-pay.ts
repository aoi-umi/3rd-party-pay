import * as base from '../base';

export class Request extends base.Request {
    /**
     * 设备号
     * 终端设备号(商户自定义，如门店编号)
     * example: 013467007045764
     */
    device_info?: string

    /**
     * 商品描述
     * 商品简单描述，该字段须严格按照规范传递，具体请见参数规定
     * example: image形象店-深圳腾大- QQ公仔
     */
    body: string

    /**
     * 商品详情
     * 单品优惠功能字段，需要接入详见单品优惠详细说明
     * example: 
     */
    detail?: string

    /**
     * 附加数据
     * 附加数据，在查询API和支付通知中原样返回，该字段主要用于商户携带订单的自定义数据
     * example: 说明
     */
    attach?: string

    /**
     * 商户订单号
     * 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*且在同一个商户号下唯一。详见商户订单号
     * example: 1217752501201407033233368018
     */
    out_trade_no: string

    /**
     * 订单金额
     * 订单总金额，单位为分，只能为整数，详见支付金额
     * example: 888
     */
    total_fee: number

    /**
     * 货币类型
     * 符合ISO4217标准的三位字母代码，默认人民币：CNY，详见货币类型
     * example: CNY
     */
    fee_type?: string

    /**
     * 终端IP
     * 支持IPV4和IPV6两种格式的IP地址。调用微信支付API的机器IP
     * example: 8.8.8.8
     */
    spbill_create_ip: string

    /**
     * 订单优惠标记
     * 订单优惠标记，代金券或立减优惠功能的参数，详见代金券或立减优惠
     * example: 1234
     */
    goods_tag?: string

    /**
     * 指定支付方式
     * no_credit--指定不能使用信用卡支付
     * example: no_credit
     */
    limit_pay?: string

    /**
     * 交易起始时间
     * 订单生成时间，格式为yyyyMMddHHmmss，如2009年12月25日9点10分10秒表示为20091225091010。其他详见时间规则
     * example: 20091225091010
     */
    time_start?: string

    /**
     * 交易结束时间
     * 订单失效时间，格式为yyyyMMddHHmmss，如2009年12月27日9点10分10秒表示为20091227091010。注意：最短失效时间间隔需大于1分钟
     * example: 20091227091010
     */
    time_expire?: string

    /**
     * 电子发票入口开放标识
     * Y，传入Y时，支付成功消息和支付详情页将出现开票入口。需要在微信支付商户平台或微信公众平台开通电子发票功能，传此字段才可生效
     * example: Y
     */
    receipt?: string

    /**
     * 授权码
     * 扫码支付授权码，设备读取用户微信中的条码或者二维码信息  （注：用户付款码条形码规则：18位纯数字，以10、11、12、13、14、15开头）
     * example: 120061098828009406
     */
    auth_code: string

    /**
     * +场景信息
     * 该字段用于上报场景信息，目前支持上报实际门店信息。该字段为JSON对象数据，对象格式为{"store_info":{"id": "门店ID","name": "名称","area_code": "编码","address": "地址" }} ，字段详细说明请点击行前的+展开
     * example: {"store_info" : {"id": "SZTX001","name": "腾大餐厅","area_code": "440305","address": "科技园中一路腾讯大厦" }}
     */
    scene_info?: string

    /**
     * 门店id
     * 门店唯一标识
     * example: SZTX001
     */
    id?: string

    /**
     * 门店名称
     * 门店名称
     * example: 腾讯大厦腾大餐厅
     */
    name?: string

    /**
     * 门店行政区划码
     * 门店所在地行政区划码，详细见《最新县及县以上行政区划代码》
     * example: 440305
     */
    area_code?: string

    /**
     * 门店详细地址
     * 门店详细地址
     * example: 科技园中一路腾讯大厦
     */
    address?: string

}

export class Response extends base.Response {
    /**
     * 设备号
     * 调用接口提交的终端设备号，
     * example: 013467007045764
     */
    device_info?: string


    /**
     * 用户标识
     * 用户在商户appid 下的唯一标识
     * example: Y
     */
    openid: string

    /**
     * 是否关注公众账号
     * 用户是否关注公众账号，仅在公众账号类型支付有效，取值范围：Y或N;Y-关注;N-未关注
     * example: Y
     */
    is_subscribe: string

    /**
     * 交易类型
     * MICROPAY 付款码支付
     * example: MICROPAY
     */
    trade_type: string

    /**
     * 付款银行
     * 银行类型，采用字符串类型的银行标识，详见银行类型
     * example: CMC
     */
    bank_type: string

    /**
     * 货币类型
     * 符合ISO 4217标准的三位字母代码，默认人民币：CNY，详见货币类型
     * example: CNY
     */
    fee_type?: string

    /**
     * 订单金额
     * 订单总金额，单位为分，只能为整数，详见支付金额
     * example: 888
     */
    total_fee: number

    /**
     * 应结订单金额
     * 当订单使用了免充值型优惠券后返回该参数，应结订单金额=订单金额-免充值优惠券金额。
     * example: 100
     */
    settlement_total_fee?: number

    /**
     * 代金券金额
     * “代金券”金额<=订单金额，订单金额-“代金券”金额=现金支付金额，详见支付金额
     * example: 100
     */
    coupon_fee?: number

    /**
     * 现金支付货币类型
     * 符合ISO 4217标准的三位字母代码，默认人民币：CNY，其他值列表详见货币类型
     * example: CNY
     */
    cash_fee_type?: string;

    /**
     * 现金支付金额
     * 订单现金支付金额，详见支付金额
     * example: 100
     */
    cash_fee: number;

    /**
     * 微信支付订单号
     * 微信支付订单号
     * example: 1217752501201407033233368018
     */
    transaction_id: string

    /**
     * 商户订单号
     * 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|*且在同一个商户号下唯一。
     * example: 1217752501201407033233368018
     */
    out_trade_no: string

    /**
     * 商家数据包
     * 商家数据包，原样返回
     * example: 123456
     */
    attach?: string

    /**
     * 支付完成时间
     * 订单生成时间，格式为yyyyMMddHHmmss，如2009年12月25日9点10分10秒表示为20091225091010。详见时间规则
     * example: 20141030133525
     */
    time_end: string

    /**
     * 营销详情
     * 新增返回，单品优惠功能字段，需要接入请见详细说明
     * example: 示例见下文
     */
    promotion_detail?: string
}

