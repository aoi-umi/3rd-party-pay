# 3rd-party-pay

> import { wxpay, alipay } from "3rd-party-pay";

[微信支付文档](https://pay.weixin.qq.com/wiki/doc/api/index.html)

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
    console.log("wx", log);
  }
});

let wxpayInst = new wxpay.WxPay({
  mch_id: "商户号",
  key: "密钥",
  appid: "公众账号ID",
  pfxPath: "证书路径"
});

//统一下单
wxpayInst.unifiedOrder({
  body: "test",
  out_trade_no: "单号",
  total_fee: 1, //金额
  spbill_create_ip: "127.0.0.1",
  trade_type: wxpay.TradeType.Native,
  notify_url: "通知订单"
});

//查询订单
wxpayInst.orderQuery({ out_trade_no: "单号", transaction_id: "wx单号" });
```

[阿里支付文档](https://docs.open.alipay.com/api_1/alipay.trade.page.pay/)  
秘钥使用 PKCS8(JAVA适用) 格式

```ts
alipay.AliPayStatic.config({
  sandbox: true,
  host: "",
  sandboxHost: "",
  sign_type: "RSA2",
  requestLog: log => {
    console.log("ali", log);
  }
});

let alipayInst = new alipay.AliPay({
  app_id: "应用ID",
  notify_url: "通知地址",
  rsaPrivatePath: "rsa私钥",
  rsaPublicPath: "rsa公钥"
});

let url = alipayInst.pagePay(
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
//浏览器上打开url扫码支付
```
