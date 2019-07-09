
export * from './base';
import { WxPayStatic, WxPayBase, Path } from './base';
import * as microPay from './micro-pay';
import * as orderQuery from './order-query';
import * as downloadBill from './download-bill';


export class WxPay extends WxPayBase {
    constructor(opt: WxPayBase) {
        super();
        this.mch_id = opt.mch_id;
        this.appid = opt.appid;
        this.key = opt.key;
        this.pfxPath = opt.pfxPath;
    }

    requestOpt() {
        return { appid: this.appid, mch_id: this.mch_id, key: this.key, pfxPath: this.pfxPath };
    }

    async microPay(data: microPay.Request) {
        let obj = await WxPayStatic.getSignObj(data, this.requestOpt());
        let rs = await WxPayStatic.request<microPay.Response>({ path: Path.microPay, data: obj });
        return rs;
    }

    async orderQuery(data: orderQuery.Request) {
        let obj = await WxPayStatic.getSignObj(data, this.requestOpt());
        let rs = await WxPayStatic.request<orderQuery.Response>({ path: Path.orderQuery, data: obj });
        return rs;
    }

    async downloadBill(data: downloadBill.Request) {
        if (!data.bill_type)
            data.bill_type = downloadBill.billType.所有;
        let obj = await WxPayStatic.getSignObj(data, this.requestOpt());
        let rs = await WxPayStatic.request<string>({ path: Path.downloadBill, data: obj, });
        return rs;
    }
}