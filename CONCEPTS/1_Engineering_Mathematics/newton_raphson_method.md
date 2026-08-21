# Newton-Raphson Method for Numerical Equations

Section: Engineering Mathematics
Topic: Numerical Methods
Importance: High (1-2 Marks in GATE AG)

## Key Concepts & Summary
The Newton-Raphson method is a powerful iterative technique for finding root approximations of real-valued functions $f(x) = 0$.

## Iteration Formula
$$x_{n+1} = x_n - \frac{f(x_n)}{f'(x_n)}$$

## Order of Convergence & Criteria
- **Order of Convergence**: Quadratic (Order $2$). The error at step $n+1$ is proportional to the square of the error at step $n$:
  $$\epsilon_{n+1} \approx C \cdot \epsilon_n^2$$
- **Condition for Convergence**: Method converges provided $f'(x) \ne 0$ near the root and $|f(x) \cdot f''(x)| < |f'(x)|^2$.

## Key Exam Pitfalls
1. If $f'(x_n) = 0$, the tangent is horizontal and Newton-Raphson fails (division by zero).
2. For multiple roots, convergence drops from quadratic (Order 2) to linear (Order 1).
