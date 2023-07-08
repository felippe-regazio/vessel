import { VesselComponent as _VS } from 'vessel';

declare global {
  var VesselComponent: typeof _VS
  interface VesselComponent extends InstanceType<typeof VesselComponent> { }
}