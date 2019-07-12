# 3rd-party-pay

> import * as pay from "3rd-party-pay";

> 可选配置
```ts
pay.config({
    wxpay: {
        //沙箱
        sandbox: false,
        //微信支付host
        host: '',
        //沙箱host
        sandboxHost: '',
        //记录请求
        requestLog: (log) => {
            console.log(log);
        }
    }
});
```

```ts
const { wxpay } = pay;
let wxpayInst = new wxpay.WxPay({
  mch_id: "商户号",
  key: "密钥",
  appid: "公众账号ID",
  pfxPath: "证书路径"
});

```

[微信支付文档](https://pay.weixin.qq.com/wiki/doc/api/index.html)

> wxpayInst.orderQuery({ transaction_id: "单号" });
