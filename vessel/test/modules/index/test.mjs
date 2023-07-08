import Vessel from '../../../lib/index.js';
import check from './checker.js';
const { VesselComponent, vessel } = Vessel;

check(VesselComponent, vessel, '\nTesting if Vessel is correctly exposed as a CommonJS Module.');