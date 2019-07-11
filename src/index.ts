import * as wxpay from './wxpay';
export * from './wxpay';

export function config(opt: {
    sandbox?: boolean;
    host?: string;
    sandboxHost?: string;

}) {
    if (typeof opt.sandbox !== 'undefined') {
        wxpay.WxPayStatic.sandbox = opt.sandbox;
    }
    if (opt.host)
        wxpay.WxPayStatic.host = opt.host;
    if (opt.sandboxHost)
        wxpay.WxPayStatic.sandboxHost = opt.sandboxHost;
}