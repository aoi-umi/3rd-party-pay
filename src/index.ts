import * as wxpay from './wxpay';
export * from './wxpay';

export function config(opt: {
    sandbox?: boolean;
}) {
    if (typeof opt.sandbox !== 'undefined') {
        wxpay.WxPayStatic.sandbox = opt.sandbox;
    }
}