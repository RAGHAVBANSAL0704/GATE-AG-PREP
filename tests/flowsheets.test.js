import { describe, it } from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';

describe('AgriFlowsheetExplorer Integrity and Schematics Test Suite', () => {
  const content = fs.readFileSync('src/components/AgriFlowsheetExplorer.jsx', 'utf8');

  it('contains all 4 essential agricultural engineering flowsheets', () => {
    assert.ok(content.includes('Continuous Cross-Flow & Counter-Flow Grain Dryer'), 'Grain dryer flowsheet must be present');
    assert.ok(content.includes('Tractor Powertrain & Transmission Kinematics'), 'Tractor powertrain flowsheet must be present');
    assert.ok(content.includes('Tractor 3-Point Hitch Hydraulic Control System'), 'Hydraulic hitch flowsheet must be present');
    assert.ok(content.includes('Paddy Parboiling & Modern Rice Milling Flowsheet'), 'Rice milling flowsheet must be present');
  });

  it('contains interactive hotspots and SVG rendering elements', () => {
    assert.ok(content.includes('diagramType === \'dryer\''), 'Dryer SVG rendering must be present');
    assert.ok(content.includes('diagramType === \'tractor_power\''), 'Tractor power SVG rendering must be present');
    assert.ok(content.includes('diagramType === \'hydraulic_lift\''), 'Hydraulic lift SVG rendering must be present');
    assert.ok(content.includes('diagramType === \'paddy_milling\''), 'Paddy milling SVG rendering must be present');
    assert.ok(content.includes('hotspots.map'), 'Must render hotspot pins');
  });

  it('includes GATE high-yield exam points for all flowsheets', () => {
    assert.ok(content.includes('Moisture Ratio MR = (M - Me)/(Mo - Me)'), 'Must include MR formula');
    assert.ok(content.includes('Overall Transmission Ratio'), 'Must include powertrain formula');
    assert.ok(content.includes('Draft Control: Automatically maintains constant drawbar pull'), 'Must include 3P hitch control');
    assert.ok(content.includes('Gelatinization Temperature of Rice Starch'), 'Must include parboiling science');
  });
});
