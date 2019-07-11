# 3rd-party-pay

```ts
import * as pay from "3rd-party-pay";

let wxpay = new pay.WxPay({
  mch_id: "商户号",
  key: "密钥",
  appid: "公众账号ID",
  pfxPath: "证书路径"
});

```

[微信支付文档](https://pay.weixin.qq.com/wiki/doc/api/index.html)

> wxpay.orderQuery({ transaction_id: "单号" });
