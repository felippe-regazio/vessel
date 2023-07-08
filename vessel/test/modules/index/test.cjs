const { VesselComponent, vessel } = require('../../../lib/index.js');
const check = require('./checker.js');

check(VesselComponent, vessel, '\nTesting if Vessel is correctly exposed as a EcmaScript Module.');