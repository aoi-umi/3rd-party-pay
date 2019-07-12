import * as wxpay from './wxpay';
import { RequestLog } from './wxpay';
export * from './wxpay';

export function config(opt: {
    wxpay?: {
        sandbox?: boolean;
        host?: string;
        sandboxHost?: string;
        requestLog: (log: RequestLog) => any;
    }
}) {
    let wxpayOpt = opt.wxpay;
    if (wxpayOpt) {
        if (typeof wxpayOpt.sandbox !== 'undefined') {
            wxpay.WxPayStatic.sandbox = wxpayOpt.sandbox;
        }
        if (wxpayOpt.host)
            wxpay.WxPayStatic.host = wxpayOpt.host;
        if (wxpayOpt.sandboxHost)
            wxpay.WxPayStatic.sandboxHost = wxpayOpt.sandboxHost;
        if (wxpayOpt.requestLog)
            wxpay.WxPayStatic.requestLog = wxpayOpt.requestLog;
    }
}