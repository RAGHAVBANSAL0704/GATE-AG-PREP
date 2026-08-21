# Psychrometrics & Grain Drying Principles

Section: Agricultural Process Engineering
Topic: Processing Operations — Psychrometrics & Drying
Importance: High (2 Marks in GATE AG)

## Key Concepts & Summary
Psychrometrics is the study of moist air thermodynamic properties. Grain drying involves simultaneous heat and mass transfer where moisture migrates from the interior of grain to the surface and evaporates into air.

## Important Definitions & Moisture Bases
- **Dry Basis Moisture Content ($M_{db}$)**:
  $$M_{db} = \frac{m_w}{m_d} \times 100\%$$
  Where $m_w$ is mass of water and $m_d$ is mass of dry matter.

- **Wet Basis Moisture Content ($M_{wb}$)**:
  $$M_{wb} = \frac{m_w}{m_w + m_d} \times 100\%$$

- **Inter-conversion Formulas**:
  $$M_{db} = \frac{M_{wb}}{100 - M_{wb}} \times 100$$
  $$M_{wb} = \frac{M_{db}}{100 + M_{db}} \times 100$$

## Thin Layer Drying Equation (Lewis Model)
$$\frac{M - M_e}{M_0 - M_e} = \exp(-k \cdot t)$$
Where:
- $M$: Moisture content at time $t$
- $M_0$: Initial moisture content
- $M_e$: Equilibrium moisture content (EMC)
- $k$: Drying constant ($\text{hr}^{-1}$)
- $t$: Drying time ($\text{hr}$)

## Exam Tips
1. Dry matter mass ($m_d$) remains constant during drying operations! Use $m_{d1} = m_{d2}$ to solve grain weight loss problems quickly:
   $$W_1 (1 - M_{wb1}) = W_2 (1 - M_{wb2})$$
2. Always check whether given moisture content is on Wet Basis or Dry Basis before applying formulas.
