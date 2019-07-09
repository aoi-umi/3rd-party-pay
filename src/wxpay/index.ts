
export * from './base';
import orderQuery from './order-query';
import { WxPayStatic } from './base';
class WxPayBase {
    mch_id: string;
    appid: string;
    key: string;
    pfxPath: string;
}

export class WxPay extends WxPayBase {
    constructor(opt: WxPayBase) {
        super();
        this.mch_id = opt.mch_id;
        this.appid = opt.appid;
        this.key = opt.key;
        this.pfxPath = opt.pfxPath;
    }

    requestOpt() {
        return { mch_id: this.mch_id, key: this.key };
    }

    async orderQuery(data: { out_trade_no?: string; transaction_id?: string }) {
        let rs = await orderQuery({
            appid: this.appid,
            mch_id: this.mch_id,
            out_trade_no: data.out_trade_no,
            transaction_id: data.transaction_id
        }, this.requestOpt());
        if (rs.return_code !== WxPayStatic.success)
            throw new Error(rs.return_msg);
        if (rs.result_code !== WxPayStatic.success) {
            throw new Error(rs.err_code_des);
        }
    }
}