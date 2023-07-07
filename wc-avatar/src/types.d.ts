import { WC as _WC } from 'wc-kernel';

declare global {
  var WC: typeof _WC
  interface WC extends InstanceType<typeof WC> { }
}