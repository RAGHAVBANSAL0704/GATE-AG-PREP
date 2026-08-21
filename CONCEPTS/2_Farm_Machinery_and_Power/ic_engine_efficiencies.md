# IC Engine Efficiencies and Power Parameters

Section: Farm Power and Machinery
Topic: Sources of Farm Power — IC Engines
Importance: High (2-3 Marks in GATE AG)

## Key Concepts & Summary
Internal Combustion (IC) Engines convert chemical energy of fuel into mechanical work. Understanding the relationship between Indicated Power (IP), Brake Power (BP), Friction Power (FP), and Mechanical Efficiency ($\eta_{mech}$) is essential for solving GATE numericals.

## Essential Formulas
- **Indicated Power (IP)**:
  $$IP = \frac{P_{m} \cdot L \cdot A \cdot N \cdot n}{60000} \quad \text{[kW]}$$
  Where $P_m$ is mean effective pressure (kPa or $\text{N/m}^2$), $L$ is stroke length (m), $A$ is piston area ($\text{m}^2$), $N$ is RPM (working strokes per min), and $n$ is number of cylinders.
  *Note for 4-stroke engine: $N = \text{RPM} / 2$; for 2-stroke engine: $N = \text{RPM}$.*

- **Brake Power (BP)**:
  $$BP = \frac{2\pi \cdot N \cdot T}{60000} = \frac{2\pi \cdot N \cdot (W - S) \cdot R}{60000} \quad \text{[kW]}$$

- **Friction Power (FP)**:
  $$FP = IP - BP$$

- **Mechanical Efficiency ($\eta_{mech}$)**:
  $$\eta_{mech} = \frac{BP}{IP} \times 100\%$$

- **Brake Thermal Efficiency ($\eta_{bt}$)**:
  $$\eta_{bt} = \frac{BP}{m_f \cdot CV} \times 100\%$$
  Where $m_f$ is fuel consumption rate ($\text{kg/s}$) and $CV$ is calorific value ($\text{kJ/kg}$).

- **Specific Fuel Consumption (SFC)**:
  $$SFC = \frac{m_f}{BP} \quad \text{[kg / kW}\cdot\text{h]}$$

## Key Takeaways & Exam Tips
1. Always convert fuel consumption to $\text{kg/s}$ and $CV$ to $\text{kJ/kg}$ before applying the thermal efficiency formula.
2. For 4-stroke engines, power stroke occurs once every 2 crankshaft revolutions ($N = \text{rpm}/2$).
3. Weight transfer on tractor chassis increases tractive efficiency on rear drive wheels.
