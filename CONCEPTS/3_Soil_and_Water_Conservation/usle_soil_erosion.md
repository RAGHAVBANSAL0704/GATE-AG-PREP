# Universal Soil Loss Equation (USLE)

Section: Soil and Water Conservation Engineering
Topic: Soil Erosion & Conservation Engineering
Importance: High (2 Marks in GATE AG)

## Key Concepts & Summary
The Universal Soil Loss Equation (USLE) is an empirical model developed by Wischmeier and Smith (1978) to estimate long-term average annual soil loss caused by sheet and rill erosion.

## Essential Formula
$$A = R \cdot K \cdot L \cdot S \cdot C \cdot P$$

Where:
- **$A$**: Computed average annual soil loss per unit area ($\text{tonnes / ha / year}$).
- **$R$**: Rainfall and runoff erosivity factor ($\text{MJ}\cdot\text{mm / ha}\cdot\text{h}\cdot\text{year}$).
- **$K$**: Soil erodibility factor ($\text{tonnes}\cdot\text{ha}\cdot\text{h / ha}\cdot\text{MJ}\cdot\text{mm}$).
- **$L$**: Topographic slope-length factor (dimensionless ratio).
- **$S$**: Topographic slope-steepness factor (dimensionless ratio).
- **$C$**: Cover and crop management factor ($0 \le C \le 1$).
- **$P$**: Conservation support practice factor ($0 \le P \le 1$, $P = 1$ for up-and-down slope tillage without conservation practice).

## Topographic Factor ($LS$)
Combined slope length ($L$) and steepness ($S$) factor formula:
$$LS = \left( \frac{\lambda}{22.13} \right)^m \left( 65.41 \sin^2\theta + 4.56 \sin\theta + 0.065 \right)$$
Where $\lambda$ is slope length (m), $\theta$ is slope angle, and $m$ is exponent ($0.5$ for slopes $\ge 5\%$).

## Exam Tips
1. Note that $L$, $S$, $C$, and $P$ are dimensionless factors! Only $A$, $R$, and $K$ carry dimensional units.
2. If conservation practices like contour bunding or strip cropping are used, $P < 1.0$. If no practice is used, $P = 1.0$.
