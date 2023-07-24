import { VesselComponent as _VS } from 'vessel';

declare global {
  const VesselComponent: typeof _VS
  interface VesselComponent extends InstanceType<typeof VesselComponent> { }
}