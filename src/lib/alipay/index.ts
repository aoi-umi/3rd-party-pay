import * as fs from 'fs';

import * as utils from '../utils';
import { AliPayBase } from './base';

export * from './base';

export class AliPay extends AliPayBase {
    rsaPrivate: string;
    rsaPublic: string;
    constructor(opt: AliPayBase) {
        super();
        this.app_id = opt.app_id;
        this.rsaPrivatePath = opt.rsaPrivatePath;
        this.rsaPublicPath = opt.rsaPublicPath;
        this.rsaPrivate = fs.readFileSync(this.rsaPrivatePath, 'utf-8');
        this.rsaPublic = fs.readFileSync(this.rsaPublicPath, 'utf-8');
    }
}