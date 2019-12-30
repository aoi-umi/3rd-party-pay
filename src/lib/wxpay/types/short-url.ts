import * as base from '../base';

export class Request extends base.Request {

    /**
     * URL链接
     * 需要转换的URL，签名用原串，传输需URLencode
     * example: weixin：//wxpay/bizpayurl?sign=XXXXX&appid=XXXXX&mch_id=XXXXX&product_id=XXXXXX&time_stamp=XXXXXX&nonce_str=XXXXX
     */
    long_url: string;

}

export class Response extends base.Response {

    /**
     * URL链接
     * 转换后的URL
     * example: weixin：//wxpay/s/XXXXXX
     */
    short_url: string;

}
