//https://pay.weixin.qq.com/wiki/doc/api/jsapi.php?chapter=9_1

import * as base from './base';

export class Request {

    /**
     * 设备号
     * 自定义参数，可以为终端设备号(门店号或收银设备ID)，PC网页或公众号内支付可以传"WEB"
     * example: 013467007045764
     */
    device_info?: string;

    /**
     * 商品描述
     * 商品简单描述，该字段请按照规范传递，具体请见参数规定
     * example: 腾讯充值中心-QQ会员充值
     */
    body: string;

    /**
     * 商品详情
     * 商品详细描述，对于使用单品优惠的商户，该字段必须按照规范上传，详见“单品优惠参数说明”
     */
    detail?: string;

    /**
     * 附加数据
     * 附加数据，在查询API和支付通知中原样返回，可作为自定义参数使用。
     * example: 深圳分店
     */
    attach?: string;

    /**
     * 商户订单号
     * 商户系统内部订单号，要求32个字符内，只能是数字、大小写字母_-|* 且在同一个商户号下唯一。详见商户订单号
     * example: 20150806125346
     */
    out_trade_no: string;

    /**
     * 标价币种
     * 符合ISO 4217标准的三位字母代码，默认人民币：CNY，详细列表请参见货币类型
     * example: CNY
     */
    fee_type?: string;

    /**
     * 标价金额
     * 订单总金额，单位为分，详见支付金额
     * example: 88
     */
    total_fee: number;

    /**
     * 终端IP
     * 支持IPV4和IPV6两种格式的IP地址。用户的客户端IP
     * example: 123.12.12.123
     */
    spbill_create_ip: string;

    /**
     * 交易起始时间
     * 订单生成时间，格式为yyyyMMddHHmmss，如2009年12月25日9点10分10秒表示为20091225091010。其他详见时间规则
     * example: 20091225091010
     */
    time_start?: string;

    /**
     * 交易结束时间
     * 订单失效时间，格式为yyyyMMddHHmmss，如2009年12月27日9点10分10秒表示为20091227091010。订单失效时间是针对订单号而言的，由于在请求支付的时候有一个必传参数prepay_id只有两小时的有效期，所以在重入时间超过2小时的时候需要重新请求下单接口获取新的prepay_id。其他详见时间规则建议：最短失效时间间隔大于1分钟
     * example: 20091227091010
     */
    time_expire?: string;

    /**
     * 订单优惠标记
     * 订单优惠标记，使用代金券或立减优惠功能时需要的参数，说明详见代金券或立减优惠
     * example: WXG
     */
    goods_tag?: string;

    /**
     * 通知地址
     * 异步接收微信支付结果通知的回调地址，通知url必须为外网可访问的url，不能携带参数。
     * example: http://www.weixin.qq.com/wxpay/pay.php
     */
    notify_url: string;

    /**
     * 交易类型
     * JSAPI -JSAPI支付
     * NATIVE -Native支付
     * APP -APP支付
     * 说明详见参数规定
     * example: JSAPI
     */
    trade_type: string;

    /**
     * 商品ID
     * trade_type=NATIVE时，此参数必传。此参数为二维码中包含的商品ID，商户自行定义。
     * example: 12235413214070356458058
     */
    product_id?: string;

    /**
     * 指定支付方式
     * 上传此参数no_credit--可限制用户不能使用信用卡支付
     * example: no_credit
     */
    limit_pay?: string;

    /**
     * 用户标识
     * trade_type=JSAPI时（即JSAPI支付），此参数必传，此参数为微信用户在商户对应appid下的唯一标识。openid如何获取，可参考【获取openid】。企业号请使用【企业号OAuth2.0接口】获取企业号内成员userid，再调用【企业号userid转openid接口】进行转换
     * example: oUpF8uMuAJO_M2pxb1Q9zNjWeS6o
     */
    openid?: string;

    /**
     * 电子发票入口开放标识
     * Y，传入Y时，支付成功消息和支付详情页将出现开票入口。需要在微信支付商户平台或微信公众平台开通电子发票功能，传此字段才可生效
     * example: Y
     */
    receipt?: string;

    /**
     * +场景信息
     * 该字段常用于线下活动时的场景信息上报，支持上报实际门店信息，商户也可以按需求自己上报相关信息。该字段为JSON对象数据，对象格式为{"store_info":{"id": "门店ID","name": "名称","area_code": "编码","address": "地址" }} ，字段详细说明请点击行前的+展开
     * example: {"store_info" : {"id": "SZTX001","name": "腾大餐厅","area_code": "440305","address": "科技园中一路腾讯大厦" }}
     */
    scene_info?: string;

    /**
     * 门店id
     * 门店编号，由商户自定义
     * example: SZTX001
     */
    id?: string;

    /**
     * 门店名称
     * 门店名称 ，由商户自定义
     * example: 腾讯大厦腾大餐厅
     */
    name?: string;

    /**
     * 门店行政区划码
     * 门店所在地行政区划码，详细见《最新县及县以上行政区划代码》
     * example: 440305
     */
    area_code?: string;

    /**
     * 门店详细地址
     * 门店详细地址 ，由商户自定义
     * example: 科技园中一路腾讯大厦
     */
    address?: string;

}

export class Response extends base.Response {

    /**
     * 设备号
     * 自定义参数，可以为请求支付的终端设备号等
     * example: 013467007045764
     */
    device_info?: string;

    /**
     * 交易类型
     * JSAPI -JSAPI支付
     * NATIVE -Native支付
     * APP -APP支付
     * 说明详见参数规定
     * example: JSAPI
     */
    trade_type: string;

    /**
     * 预支付交易会话标识
     * 微信生成的预支付会话标识，用于后续接口调用中使用，该值有效期为2小时
     * example: wx201410272009395522657a690389285100
     */
    prepay_id: string;

    /**
     * 二维码链接
     * trade_type=NATIVE时有返回，此url用于生成支付二维码，然后提供给用户进行扫码支付。
     * 注意：code_url的值并非固定，使用时按照URL格式转成二维码即可
     * example: weixin://wxpay/bizpayurl/up?pr=NwY5Mz9&groupid=00
     */
    code_url?: string;

}

export const error = {

    INVALID_REQUEST: {
        code: 'INVALID_REQUEST',
        desc: '参数错误',
        resolve: '订单重入时，要求参数值与原请求一致，请确认参数问题',
    },

    NOAUTH: {
        code: 'NOAUTH',
        desc: '商户无此接口权限',
        resolve: '请商户前往申请此接口权限',
    },

    NOTENOUGH: {
        code: 'NOTENOUGH',
        desc: '余额不足',
        resolve: '用户帐号余额不足，请用户充值或更换支付卡后再支付',
    },

    ORDERPAID: {
        code: 'ORDERPAID',
        desc: '商户订单已支付',
        resolve: '商户订单已支付，无需更多操作',
    },

    ORDERCLOSED: {
        code: 'ORDERCLOSED',
        desc: '订单已关闭',
        resolve: '当前订单已关闭，请重新下单',
    },

    SYSTEMERROR: {
        code: 'SYSTEMERROR',
        desc: '系统错误',
        resolve: '系统异常，请用相同参数重新调用',
    },

    APPID_NOT_EXIST: {
        code: 'APPID_NOT_EXIST',
        desc: 'APPID不存在',
        resolve: '请检查APPID是否正确',
    },

    MCHID_NOT_EXIST: {
        code: 'MCHID_NOT_EXIST',
        desc: 'MCHID不存在',
        resolve: '请检查MCHID是否正确',
    },

    APPID_MCHID_NOT_MATCH: {
        code: 'APPID_MCHID_NOT_MATCH',
        desc: 'appid和mch_id不匹配',
        resolve: '请确认appid和mch_id是否匹配',
    },

    LACK_PARAMS: {
        code: 'LACK_PARAMS',
        desc: '缺少参数',
        resolve: '请检查参数是否齐全',
    },

    OUT_TRADE_NO_USED: {
        code: 'OUT_TRADE_NO_USED',
        desc: '商户订单号重复',
        resolve: '请核实商户订单号是否重复提交',
    },

    SIGNERROR: {
        code: 'SIGNERROR',
        desc: '签名错误',
        resolve: '请检查签名参数和方法是否都符合签名算法要求',
    },

    XML_FORMAT_ERROR: {
        code: 'XML_FORMAT_ERROR',
        desc: 'XML格式错误',
        resolve: '请检查XML参数格式是否正确',
    },

    REQUIRE_POST_METHOD: {
        code: 'REQUIRE_POST_METHOD',
        desc: '请使用post方法',
        resolve: '请检查请求参数是否通过post方法提交',
    },

    POST_DATA_EMPTY: {
        code: 'POST_DATA_EMPTY',
        desc: 'post数据为空',
        resolve: '请检查post数据是否为空',
    },

    NOT_UTF8: {
        code: 'NOT_UTF8',
        desc: '编码格式错误',
        resolve: '请使用UTF-8编码格式',
    },

}