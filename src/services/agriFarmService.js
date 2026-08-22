const LOCAL_STORAGE_FARM_KEY = 'gate_ag_farm_state';

export const INITIAL_FARM_STATE = {
  machinery: [
    { id: 'm1', name: '2WD Utility Tractor (35 HP)', icon: '🚜', level: 1, maxLevel: 5, cost: 100, spec: 'Basic tillage & hauling', unlocked: true },
    { id: 'm2', name: '4WD Heavy Duty Tractor (75 HP)', icon: '⚙️', level: 0, maxLevel: 5, cost: 300, spec: 'Deep subsoiling & heavy draft', unlocked: false },
    { id: 'm3', name: 'Self-Propelled Combine Harvester', icon: '🌾', level: 0, maxLevel: 5, cost: 600, spec: 'Multi-crop harvesting & threshing', unlocked: false },
    { id: 'm4', name: 'Pneumatic Precision Seed Drill', icon: '🛠️', level: 0, maxLevel: 5, cost: 1000, spec: 'Zero-till precision metering', unlocked: false },
    { id: 'm5', name: 'Laser-Guided Precision Land Leveler', icon: '📐', level: 0, maxLevel: 5, cost: 1500, spec: 'Sub-centimeter field grade leveling', unlocked: false },
    { id: 'm6', name: 'AI Autonomous Electric Tractor (150 HP)', icon: '🤖', level: 0, maxLevel: 5, cost: 2000, spec: 'GPS-guided zero-emission tillage', unlocked: false }
  ],
  irrigation: [
    { id: 'i1', name: 'Surface Furrow Irrigation', icon: '💧', level: 1, maxLevel: 5, cost: 100, spec: 'Gravity water distribution', unlocked: true },
    { id: 'i2', name: 'Sub-surface Drip Drip Net', icon: '🪴', level: 0, maxLevel: 5, cost: 250, spec: '95% water application efficiency', unlocked: false },
    { id: 'i3', name: 'Solar PV Drip Pump (2 HP)', icon: '☀️', level: 0, maxLevel: 5, cost: 500, spec: 'Renewable drip automation', unlocked: false },
    { id: 'i4', name: 'Automated Center Pivot Sprinkler', icon: '🎯', level: 0, maxLevel: 5, cost: 900, spec: 'Large acreage uniform spray', unlocked: false },
    { id: 'i5', name: 'UAV Quadcopter Precision Sprayer', icon: '🚁', level: 0, maxLevel: 5, cost: 1600, spec: 'Variable rate ultra-low volume spray', unlocked: false },
    { id: 'i6', name: 'Solar Microgrid & Smart Fertigation', icon: '⚡', level: 0, maxLevel: 5, cost: 1800, spec: 'Automated IoT nutrient injection', unlocked: false }
  ],
  processing: [
    { id: 'p1', name: 'Natural Sun Drying Floor', icon: '☀️', level: 1, maxLevel: 5, cost: 100, spec: 'Open yard grain drying', unlocked: true },
    { id: 'p2', name: 'Recirculating Batch Grain Dryer', icon: '🌾', level: 0, maxLevel: 5, cost: 350, spec: 'Heated air psychrometric drying', unlocked: false },
    { id: 'p3', name: 'Milk HTST Heat Exchanger', icon: '🥛', level: 0, maxLevel: 5, cost: 700, spec: '72°C pasteurization plates', unlocked: false },
    { id: 'p4', name: 'Rotary Atomizer Spray Dryer', icon: '🏭', level: 0, maxLevel: 5, cost: 1200, spec: 'High speed dairy powder tower', unlocked: false },
    { id: 'p5', name: 'Continuous Freeze Dryer Unit', icon: '❄️', level: 0, maxLevel: 5, cost: 1700, spec: 'Lyophilization for premium produce', unlocked: false },
    { id: 'p6', name: 'Supercritical CO2 Fluid Extractor', icon: '⚗️', level: 0, maxLevel: 5, cost: 2200, spec: 'Solventless essential oil extraction', unlocked: false }
  ]
};

export function getFarmState() {
  try {
    const saved = localStorage.getItem(LOCAL_STORAGE_FARM_KEY);
    if (saved) {
      const parsed = JSON.parse(saved);
      // Ensure new high-tier items are merged cleanly
      return {
        machinery: INITIAL_FARM_STATE.machinery.map(initItem => {
          const found = parsed.machinery?.find(i => i.id === initItem.id);
          return found || initItem;
        }),
        irrigation: INITIAL_FARM_STATE.irrigation.map(initItem => {
          const found = parsed.irrigation?.find(i => i.id === initItem.id);
          return found || initItem;
        }),
        processing: INITIAL_FARM_STATE.processing.map(initItem => {
          const found = parsed.processing?.find(i => i.id === initItem.id);
          return found || initItem;
        })
      };
    }
  } catch (e) {}
  return INITIAL_FARM_STATE;
}

export function saveFarmState(state) {
  try {
    localStorage.setItem(LOCAL_STORAGE_FARM_KEY, JSON.stringify(state));
  } catch (e) {}
}

export function upgradeFarmItem(category, itemId, currentXP) {
  const farm = getFarmState();
  const list = farm[category];
  if (!list) return { success: false, message: 'Invalid category' };

  const itemIdx = list.findIndex(i => i.id === itemId);
  if (itemIdx === -1) return { success: false, message: 'Item not found' };

  const item = list[itemIdx];
  const cost = item.cost * (item.level + 1);

  if (currentXP < cost) {
    return { success: false, message: `Insufficient Break XP! Need ${cost} XP (You have ${currentXP} XP).` };
  }

  if (item.level >= item.maxLevel) {
    return { success: false, message: 'Item already at maximum level!' };
  }

  item.level += 1;
  item.unlocked = true;
  saveFarmState(farm);

  return { 
    success: true, 
    farm, 
    deductedXP: cost,
    message: `🎉 Upgraded ${item.name} to Level ${item.level}!` 
  };
}
