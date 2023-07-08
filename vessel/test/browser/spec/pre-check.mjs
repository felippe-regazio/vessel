import { Tester } from '../tester/index.mjs';

const $t = new Tester();

$t.it('Check the library structure', () => {
  $t.assert('Vessel must export the VesselComponent class as "export class VesselComponent {...}" from src/index.ts', () => {
    return !!VesselComponent;
  });

  $t.assert('Vessel must export a member called vessel as "export const vessel = { VesselComponent }" from src/index.ts for browser compatibility', () => {        
    return !!vessel;
  });

  $t.assert('The { vessel } exported member from src/index.ts must contain the VesselComponent class: "export const vessel = { VesselComponent }"', () => {        
    return !!vessel.VesselComponent;
  });

  $t.assert('The "vessel.VesselComponent" and "VesselComponent" objects must be the same VesselComponent class on src/index.ts', () => {        
    return vessel.VesselComponent === VesselComponent;
  });
});
