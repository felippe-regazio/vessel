import { WC as _WC } from 'vessel/vessel/src';

declare global {
  var WC: typeof _WC
  interface WC extends InstanceType<typeof WC> { }
}