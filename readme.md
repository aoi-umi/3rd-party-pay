# 3rd-party-pay

> import { wxpay, alipay } from "3rd-party-pay";

> 可选配置

```ts
wxpay.WxPayStatic.config({
  //沙箱
  sandbox: false,
  //微信支付host
  host: "",
  //沙箱host
  sandboxHost: "",
  //记录请求
  requestLog: log => {
    console.log(log);
  }
});
```

```ts
let wxpayInst = new wxpay.WxPay({
  mch_id: "商户号",
  key: "密钥",
  appid: "公众账号ID",
  pfxPath: "证书路径"
});
```

[微信支付文档](https://pay.weixin.qq.com/wiki/doc/api/index.html)

> wxpayInst.orderQuery({ transaction_id: "单号" });

```ts
let alipayInst = new alipay.WxPay({
  app_id: "应用ID",
  rsaPrivatePath: "rsa私钥",
  rsaPublicPath: "rsa公钥"
});
```

[阿里支付文档](https://docs.open.alipay.com/api_1/alipay.trade.page.pay/)

```ts
alipayInst.pagePay(
  {
    out_trade_no: "单号",
    subject: "测试",
    total_amount: 0.01,
    body: "测试",
    timeout_express: "30m"
  },
  {
    notify_url: "通知地址"
  }
);
```
