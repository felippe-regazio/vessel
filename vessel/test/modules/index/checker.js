module.exports = function (VesselComponent, vessel, msg = '') {
  try {
    console.log(msg);
  
    if (!VesselComponent) {
      error('Vessel must export the VesselComponent class as "export class VesselComponent {...}" from src/index.ts');
    }
  
    if (!vessel) {
      error('Vessel must export a member called vessel as "export const vessel = { VesselComponent }" from src/index.ts for browser compatibility');
    }
  
    if (!vessel.VesselComponent) {
      error('The { vessel } exported member from src/index.ts must contain the VesselComponent class: "export const vessel = { VesselComponent }"');
    }
  
    if (vessel.VesselComponent !== VesselComponent ) {
      error('The "vessel.VesselComponent" and "VesselComponent" objects must be the same VesselComponent class on src/index.ts');
    }
  
    console.log('Done.\n')
  } catch (error) {
    console.error(error);
  }
}