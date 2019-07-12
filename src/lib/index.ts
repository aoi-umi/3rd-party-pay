import { RequestLog } from './base';
import * as _wxpay from './wxpay';
import * as _alipay from './alipay';

export const wxpay = _wxpay;
export const alipay = _alipay;

export function config(opt: {
    wxpay?: {
        sandbox?: boolean;
        host?: string;
        sandboxHost?: string;
        requestLog: (log: RequestLog) => any;
    },
    alipay?: {

    }
}) {
    let wxpayOpt = opt.wxpay;
    if (wxpayOpt) {
        if (typeof wxpayOpt.sandbox !== 'undefined') {
            _wxpay.WxPayStatic.sandbox = wxpayOpt.sandbox;
        }
        if (wxpayOpt.host)
            _wxpay.WxPayStatic.host = wxpayOpt.host;
        if (wxpayOpt.sandboxHost)
            _wxpay.WxPayStatic.sandboxHost = wxpayOpt.sandboxHost;
        if (wxpayOpt.requestLog)
            _wxpay.WxPayStatic.requestLog = wxpayOpt.requestLog;
    }
}

