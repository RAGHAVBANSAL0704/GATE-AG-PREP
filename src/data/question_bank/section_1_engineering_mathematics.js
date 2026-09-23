export default [
  {
    "id": "QB_EM_LA_001",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Matrices and determinants",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "If $A$ is a $3 \\times 3$ real skew-symmetric matrix, then the determinant of $A$ is always equal to:",
    "options": {
      "A": "1",
      "B": "-1",
      "C": "0",
      "D": "Any positive real number"
    },
    "correct_answer": "C",
    "solution": "For any skew-symmetric matrix $A$ of order $n$, $A^T = -A$.\nTaking determinants on both sides:\n$$\\det(A^T) = \\det(-A) = (-1)^n \\det(A)$$\nSince $\\det(A^T) = \\det(A)$ and here $n = 3$ is odd:\n$$\\det(A) = -\\det(A) \\implies 2\\det(A) = 0 \\implies \\det(A) = 0$$\nTherefore, the determinant of any odd-order skew-symmetric matrix is always $0$.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_LA_002",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Matrices and determinants",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Let $A$ be a $3 \\times 3$ invertible real matrix with $\\det(A) = 4$. The determinant of the matrix $2 \\operatorname{adj}(A)$ is ________ (answer in integer).",
    "correct_answer": "128",
    "numerical_range": {
      "min": 128,
      "max": 128
    },
    "solution": "For an $n \\times n$ matrix $A$ and a scalar $k$:\n$$\\det(k B) = k^n \\det(B)$$\nHere $B = \\operatorname{adj}(A)$ and $n = 3$, so:\n$$\\det(2 \\operatorname{adj}(A)) = 2^3 \\det(\\operatorname{adj}(A)) = 8 \\det(\\operatorname{adj}(A))$$\nUsing the standard identity $\\det(\\operatorname{adj}(A)) = (\\det(A))^{n-1}$ for $n = 3$:\n$$\\det(\\operatorname{adj}(A)) = (\\det(A))^{3-1} = 4^2 = 16$$\nSubstituting this back:\n$$\\det(2 \\operatorname{adj}(A)) = 8 \\times 16 = 128$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_LA_003",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Matrices and determinants",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements is/are TRUE for an idempotent matrix $A$ (where $A^2 = A$) of order $n$?",
    "options": {
      "A": "The only possible eigenvalues of $A$ are $0$ and $1$",
      "B": "The matrix $I - A$ is also an idempotent matrix",
      "C": "The trace of matrix $A$ is equal to the rank of matrix $A$",
      "D": "If $A$ is invertible, then $A$ must be the identity matrix $I$"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "Let $A$ be an idempotent matrix ($A^2 = A$):\n1. If $\\lambda$ is an eigenvalue with eigenvector $x \\ne 0$, then $Ax = \\lambda x \\implies A^2 x = \\lambda^2 x$. Since $A^2 = A$, $\\lambda^2 = \\lambda \\implies \\lambda(\\lambda - 1) = 0$, so $\\lambda \\in \\{0, 1\\}$ (A is true).\n2. $(I - A)^2 = I - 2A + A^2 = I - 2A + A = I - A$, so $I - A$ is idempotent (B is true).\n3. Any idempotent matrix is diagonalizable, and since its eigenvalues are 0 or 1, $\\operatorname{trace}(A) = \\sum \\lambda_i = \\operatorname{rank}(A)$ (C is true).\n4. If $A$ is invertible, multiplying $A^2 = A$ by $A^{-1}$ yields $A = I$ (D is true).",
    "difficulty": "Hard",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_LA_004",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Linear and orthogonal transformations",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements is/are TRUE for every real orthogonal matrix $Q$ of order $n$?",
    "options": {
      "A": "$Q^T Q = Q Q^T = I$",
      "B": "$|\\det(Q)| = 1$",
      "C": "The inverse of $Q$ is equal to its transpose ($Q^{-1} = Q^T$)",
      "D": "All eigenvalues of $Q$ have an absolute magnitude of $1$"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "For any real orthogonal matrix $Q$:\n1. By definition, $Q^T Q = I \\implies Q^{-1} = Q^T$ (A and C are true).\n2. Taking determinants: $\\det(Q^T Q) = [\\det(Q)]^2 = 1 \\implies \\det(Q) = \\pm 1$, so $|\\det(Q)| = 1$ (B is true).\n3. If $\\lambda$ is an eigenvalue with eigenvector $x$: $Qx = \\lambda x \\implies x^H Q^T Q x = |\\lambda|^2 x^H x$. Since $Q^T Q = I$, $|\\lambda|^2 = 1 \\implies |\\lambda| = 1$ (D is true).",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_LA_005",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Linear and orthogonal transformations",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "question": "Let $Q$ be a $3 \\times 3$ real orthogonal matrix. The determinant of the matrix $(Q^T Q + 3I)$ is ________ (answer in integer).",
    "correct_answer": "64",
    "numerical_range": {
      "min": 64,
      "max": 64
    },
    "solution": "For any real orthogonal matrix $Q$, we have $Q^T Q = I$.\nTherefore:\n$$Q^T Q + 3I = I + 3I = 4I$$\nTaking the determinant for a $3 \\times 3$ matrix:\n$$\\det(4I) = 4^3 \\det(I) = 64 \\times 1 = 64$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_LA_006",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Linear and orthogonal transformations",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "The linear transformation $T: \\mathbb{R}^2 \\to \\mathbb{R}^2$ that reflects every vector about the line $y = x$ has the standard matrix representation:",
    "options": {
      "A": "$\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$",
      "B": "$\\begin{pmatrix} 0 & -1 \\\\ -1 & 0 \\end{pmatrix}$",
      "C": "$\\begin{pmatrix} 1 & 0 \\\\ 0 & -1 \\end{pmatrix}$",
      "D": "$\\begin{pmatrix} -1 & 0 \\\\ 0 & 1 \\end{pmatrix}$"
    },
    "correct_answer": "A",
    "solution": "Under reflection across the line $y = x$:\n1. The basis vector $e_1 = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}$ transforms to $T(e_1) = \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix}$.\n2. The basis vector $e_2 = \\begin{pmatrix} 0 \\\\ 1 \\end{pmatrix}$ transforms to $T(e_2) = \\begin{pmatrix} 1 \\\\ 0 \\end{pmatrix}$.\nThe standard matrix is formed by these column vectors:\n$$[T] = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$$\nNotice that $[T]^T [T] = I$ and $\\det([T]) = -1$, which confirms it is an orthogonal reflection.",
    "difficulty": "Moderate",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_LA_007",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Cayley–Hamilton theorem",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "Given the matrix $A = \\begin{pmatrix} 1 & 2 \\\\ 3 & 4 \\end{pmatrix}$. Using the Cayley–Hamilton theorem, the matrix expression $A^2 - 5A$ is equal to:",
    "options": {
      "A": "$-2I$",
      "B": "$2I$",
      "C": "$5I$",
      "D": "$-5I$"
    },
    "correct_answer": "B",
    "solution": "The characteristic equation of $A$ is:\n$$\\det(A - \\lambda I) = (1 - \\lambda)(4 - \\lambda) - 6 = \\lambda^2 - 5\\lambda - 2 = 0$$\nBy the Cayley–Hamilton theorem, every square matrix satisfies its own characteristic equation:\n$$A^2 - 5A - 2I = 0$$\nRearranging terms:\n$$A^2 - 5A = 2I$$\nTherefore, option B is correct.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_LA_008",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Cayley–Hamilton theorem",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "For the matrix $A = \\begin{pmatrix} 2 & 1 \\\\ 0 & 3 \\end{pmatrix}$, the trace of the matrix $A^3$ is ________ (answer in integer).",
    "correct_answer": "35",
    "numerical_range": {
      "min": 35,
      "max": 35
    },
    "solution": "Matrix $A$ is upper triangular, so its eigenvalues are the diagonal elements:\n$$\\lambda_1 = 2, \\quad \\lambda_2 = 3$$\nBy the spectral mapping theorem, the eigenvalues of $A^3$ are:\n$$\\lambda_1^3 = 2^3 = 8, \\quad \\lambda_2^3 = 3^3 = 27$$\nThe trace of a matrix is the sum of its eigenvalues:\n$$\\operatorname{trace}(A^3) = \\lambda_1^3 + \\lambda_2^3 = 8 + 27 = 35$$",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_LA_009",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Cayley–Hamilton theorem",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The Cayley–Hamilton theorem asserts that every square matrix satisfies its own:",
    "options": {
      "A": "Characteristic equation",
      "B": "Minimal polynomial only if symmetric",
      "C": "Diagonal Jordan form",
      "D": "Determinantal inverse"
    },
    "correct_answer": "A",
    "solution": "The Cayley–Hamilton theorem states that if $p(\\lambda) = \\det(A - \\lambda I) = 0$ is the characteristic equation of an $n \\times n$ matrix $A$, then substituting matrix $A$ into $p$ yields $p(A) = 0$, the zero matrix. Thus, every square matrix satisfies its own characteristic equation.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_LA_010",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Eigen values and Eigen vectors",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "For the matrix $A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$, the maximum eigenvalue is equal to ________ (answer in integer).",
    "correct_answer": "3",
    "numerical_range": {
      "min": 3,
      "max": 3
    },
    "solution": "The characteristic equation of matrix $A$ is given by:\n$$\\det(A - \\lambda I) = 0$$\n$$\\begin{vmatrix} 2 - \\lambda & 1 \\\\ 1 & 2 - \\lambda \\end{vmatrix} = (2-\\lambda)^2 - 1 = 0$$\n$$\\lambda^2 - 4\\lambda + 3 = 0 \\implies (\\lambda - 3)(\\lambda - 1) = 0$$\nThe eigenvalues are $\\lambda_1 = 3$ and $\\lambda_2 = 1$. The maximum eigenvalue is $3$.",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_LA_011",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Eigen values and Eigen vectors",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A $3 \\times 3$ real matrix $A$ has trace equal to $10$ and determinant equal to $24$. If one of the eigenvalues of $A$ is $2$, the sum of the other two eigenvalues is ________ (answer in integer).",
    "correct_answer": "8",
    "numerical_range": {
      "min": 8,
      "max": 8
    },
    "solution": "Let the eigenvalues of $A$ be $\\lambda_1, \\lambda_2, \\lambda_3$.\nWe know that the sum of the eigenvalues equals the trace:\n$$\\lambda_1 + \\lambda_2 + \\lambda_3 = \\operatorname{trace}(A) = 10$$\nGiven that $\\lambda_1 = 2$:\n$$2 + \\lambda_2 + \\lambda_3 = 10 \\implies \\lambda_2 + \\lambda_3 = 8$$\n(We can also verify: $\\lambda_1 \\lambda_2 \\lambda_3 = \\det(A) = 24 \\implies 2(\\lambda_2 \\lambda_3) = 24 \\implies \\lambda_2 \\lambda_3 = 12$. The roots are $4$ and $6$, and indeed $4 + 6 = 8$).",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_LA_012",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Eigen values and Eigen vectors",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "For any real symmetric matrix $A$, which of the following statements is/are always TRUE?",
    "options": {
      "A": "All eigenvalues of $A$ are real numbers",
      "B": "Eigenvectors corresponding to distinct eigenvalues are mutually orthogonal",
      "C": "$A$ is always orthogonally diagonalizable",
      "D": "The determinant of $A$ is equal to the product of its eigenvalues"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "By the Spectral Theorem for real symmetric matrices:\n1. All eigenvalues of a real symmetric matrix are strictly real (A is true).\n2. If $Ax_1 = \\lambda_1 x_1$ and $Ax_2 = \\lambda_2 x_2$ with $\\lambda_1 \\ne \\lambda_2$, then $(\\lambda_1 - \\lambda_2)(x_1^T x_2) = 0 \\implies x_1^T x_2 = 0$, meaning eigenvectors are orthogonal (B is true).\n3. There exists an orthogonal matrix $Q$ such that $Q^T A Q = D$, where $D$ is diagonal (C is true).\n4. The determinant of any square matrix is the product of its eigenvalues: $\\det(A) = \\prod \\lambda_i$ (D is true).",
    "difficulty": "Hard",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_LA_013",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Solutions of linear equations",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "For a system of linear equations $Ax = b$, where $A$ is an $m \\times n$ matrix with rank $r$, which of the following statements is/are correct?",
    "options": {
      "A": "If $\\operatorname{rank}(A) = \\operatorname{rank}([A|b]) = n$, the system has a unique solution",
      "B": "If $\\operatorname{rank}(A) < \\operatorname{rank}([A|b])$, the system is inconsistent and has no solution",
      "C": "If $\\operatorname{rank}(A) = \\operatorname{rank}([A|b]) < n$, the system has infinitely many solutions",
      "D": "A homogeneous system $Ax = 0$ always has at least one solution (the trivial solution)"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "By the Rouché–Capelli theorem:\n1. A system $Ax = b$ is consistent if and only if $\\operatorname{rank}(A) = \\operatorname{rank}([A|b])$.\n2. If consistent and rank $r = n$ (number of unknowns), there is a unique solution (A is true).\n3. If $\\operatorname{rank}(A) < \\operatorname{rank}([A|b])$, no solution exists (B is true).\n4. If consistent and $r < n$, there are $(n-r)$ linearly independent free variables, producing infinitely many solutions (C is true).\n5. For a homogeneous system $Ax=0$, $x=0$ is always a solution (trivial), so it is always consistent (D is true).",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_LA_014",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Solutions of linear equations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Consider the system of linear equations: $x + y + z = 6$, $x + 2y + 3z = 10$, and $x + 2y + kz = \\mu$. If the system has infinitely many solutions, the value of $k$ must be equal to ________ (answer in integer).",
    "correct_answer": "3",
    "numerical_range": {
      "min": 3,
      "max": 3
    },
    "solution": "Form the augmented matrix $[A|b]$:\n$$\\begin{pmatrix} 1 & 1 & 1 & 6 \\\\ 1 & 2 & 3 & 10 \\\\ 1 & 2 & k & \\mu \\end{pmatrix}$$\nApplying elementary row operations $R_2 \\to R_2 - R_1$ and $R_3 \\to R_3 - R_1$:\n$$\\begin{pmatrix} 1 & 1 & 1 & 6 \\\\ 0 & 1 & 2 & 4 \\\\ 0 & 1 & k-1 & \\mu-6 \\end{pmatrix}$$\nNow apply $R_3 \\to R_3 - R_2$:\n$$\\begin{pmatrix} 1 & 1 & 1 & 6 \\\\ 0 & 1 & 2 & 4 \\\\ 0 & 0 & k-3 & \\mu-10 \\end{pmatrix}$$\nFor the system to have infinitely many solutions, we must have $\\operatorname{rank}(A) = \\operatorname{rank}([A|b]) < 3$.\nThis requires the entire last row to be all zeros:\n$$k - 3 = 0 \\implies k = 3$$\n$$\\mu - 10 = 0 \\implies \\mu = 10$$\nHence, the required value of $k$ is $3$.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_LA_015",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Solutions of linear equations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "A homogeneous system of linear equations $Ax = 0$ has $4$ equations and $6$ unknowns. If the rank of the coefficient matrix $A$ is $3$, the number of linearly independent solutions is:",
    "options": {
      "A": "1",
      "B": "2",
      "C": "3",
      "D": "4"
    },
    "correct_answer": "C",
    "solution": "By the Rank-Nullity Theorem:\n$$\\operatorname{rank}(A) + \\operatorname{nullity}(A) = n$$\nwhere $n$ is the number of unknowns (columns of $A$).\nHere $n = 6$ and $\\operatorname{rank}(A) = 3$:\n$$\\operatorname{nullity}(A) = n - \\operatorname{rank}(A) = 6 - 3 = 3$$\nThe nullity of $A$ represents the dimension of the solution space, which is the number of linearly independent solutions. Therefore, the answer is $3$.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_CALC_001",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Limit, continuity and differentiability",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "question": "The value of the limit $\\lim_{x \\to 0} \\frac{\\sin(3x) - 3x}{x^3}$ is equal to ________ (round off to 1 decimal place).",
    "correct_answer": "-4.5",
    "numerical_range": {
      "min": -4.6,
      "max": -4.4
    },
    "solution": "Using Taylor series expansion of $\\sin(u) = u - \\frac{u^3}{6} + O(u^5)$ with $u = 3x$:\n$$\\sin(3x) = 3x - \\frac{(3x)^3}{6} + O(x^5) = 3x - \\frac{27x^3}{6} + O(x^5) = 3x - \\frac{9}{2}x^3 + O(x^5)$$\nSubtracting $3x$:\n$$\\sin(3x) - 3x = -\\frac{9}{2}x^3 + O(x^5)$$\nDividing by $x^3$ and taking limit $x \\to 0$:\n$$\\lim_{x \\to 0} \\frac{-\\frac{9}{2}x^3 + O(x^5)}{x^3} = -\\frac{9}{2} = -4.5$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_CALC_002",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Limit, continuity and differentiability",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "For the function $f(x) = |x|$ defined on $\\mathbb{R}$, at the point $x = 0$, the function is:",
    "options": {
      "A": "Continuous and differentiable",
      "B": "Continuous but not differentiable",
      "C": "Differentiable but not continuous",
      "D": "Neither continuous nor differentiable"
    },
    "correct_answer": "B",
    "solution": "1. Continuity at $x = 0$:\n$$\\lim_{x \\to 0^+} |x| = 0, \\quad \\lim_{x \\to 0^-} |x| = 0, \\quad f(0) = 0$$\nSince the left and right limits both equal $f(0)$, $f(x)$ is continuous at $x = 0$.\n2. Differentiability at $x = 0$:\n$$\\text{Right-hand derivative: } \\lim_{h \\to 0^+} \\frac{|0+h| - 0}{h} = \\lim_{h \\to 0^+} \\frac{h}{h} = 1$$\n$$\\text{Left-hand derivative: } \\lim_{h \\to 0^-} \\frac{|0+h| - 0}{h} = \\lim_{h \\to 0^-} \\frac{-h}{h} = -1$$\nSince the right-hand derivative ($+1$) does not equal the left-hand derivative ($-1$), $f(x)$ is not differentiable at $x = 0$.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_CALC_003",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Limit, continuity and differentiability",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The value of the limit $\\lim_{x \\to 0} \\frac{e^{2x} - 1 - 2x - 2x^2}{x^3}$ is equal to ________ (round off to 2 decimal places).",
    "correct_answer": "1.33",
    "numerical_range": {
      "min": 1.3,
      "max": 1.36
    },
    "solution": "Using the Maclaurin series expansion of $e^u = 1 + u + \\frac{u^2}{2!} + \\frac{u^3}{3!} + O(u^4)$ with $u = 2x$:\n$$e^{2x} = 1 + 2x + \\frac{(2x)^2}{2} + \\frac{(2x)^3}{6} + O(x^4) = 1 + 2x + 2x^2 + \\frac{8x^3}{6} + O(x^4)$$\nSubtracting $(1 + 2x + 2x^2)$:\n$$e^{2x} - 1 - 2x - 2x^2 = \\frac{4}{3}x^3 + O(x^4)$$\nDividing by $x^3$ and taking the limit as $x \\to 0$:\n$$\\lim_{x \\to 0} \\frac{\\frac{4}{3}x^3 + O(x^4)}{x^3} = \\frac{4}{3} \\approx 1.33$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_CALC_004",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Partial derivatives",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "If $z = x^y$ for $x > 0$, the value of the mixed second partial derivative $\\frac{\\partial^2 z}{\\partial x \\partial y}$ evaluated at $x = 1$ and $y = 2$ is ________ (answer in integer).",
    "correct_answer": "1",
    "numerical_range": {
      "min": 1,
      "max": 1
    },
    "solution": "First compute the partial derivative with respect to $x$:\n$$\\frac{\\partial z}{\\partial x} = \\frac{\\partial}{\\partial x}(x^y) = y x^{y-1}$$\nNow differentiate with respect to $y$ using the product rule:\n$$\\frac{\\partial^2 z}{\\partial y \\partial x} = \\frac{\\partial}{\\partial y}(y x^{y-1}) = 1 \\cdot x^{y-1} + y \\cdot \\frac{\\partial}{\\partial y}(x^{y-1})$$\nSince $x^{y-1} = e^{(y-1) \\ln x}$, its derivative with respect to $y$ is $x^{y-1} \\ln x$:\n$$\\frac{\\partial^2 z}{\\partial x \\partial y} = x^{y-1} + y x^{y-1} \\ln x$$\nEvaluating at $x = 1, y = 2$:\n$$x^{y-1} = 1^{2-1} = 1$$\n$$\\ln(1) = 0$$\n$$\\frac{\\partial^2 z}{\\partial x \\partial y} = 1 + 2(1)(0) = 1$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_CALC_005",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Partial derivatives",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "Clairaut's theorem (Schwarz's theorem) guarantees the equality of mixed second-order partial derivatives $\\frac{\\partial^2 f}{\\partial x \\partial y} = \\frac{\\partial^2 f}{\\partial y \\partial x}$ at a point $(a, b)$ provided that:",
    "options": {
      "A": "Both mixed partial derivatives are continuous in an open disk containing $(a, b)$",
      "B": "The function $f$ is bounded everywhere",
      "C": "$f(x, y)$ is a polynomial in $x$ and $y$",
      "D": "The gradient of $f$ vanishes at $(a, b)$"
    },
    "correct_answer": "A",
    "solution": "Clairaut's theorem on the equality of mixed partials states that if $f(x, y)$ and its partial derivatives $f_x, f_y, f_{xy}$, and $f_{yx}$ exist and the mixed partials $f_{xy}$ and $f_{yx}$ are continuous throughout an open region containing $(a, b)$, then $f_{xy}(a, b) = f_{yx}(a, b)$.",
    "difficulty": "Moderate",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_CALC_006",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Homogeneous function – Euler's theorem on homogeneous functions",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "If $u(x, y) = \\frac{x^3 + y^3}{x + y}$, the value of $x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y}$ evaluated at $(x=2, y=3)$ is ________ (answer in integer).",
    "correct_answer": "14",
    "numerical_range": {
      "min": 14,
      "max": 14
    },
    "solution": "Determine the degree of homogeneity of $u(x, y)$:\n$$u(tx, ty) = \\frac{t^3 x^3 + t^3 y^3}{tx + ty} = t^2 \\frac{x^3 + y^3}{x + y} = t^2 u(x, y)$$\nSo $u$ is a homogeneous function of degree $n = 2$.\nBy Euler's theorem for homogeneous functions:\n$$x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = n \\cdot u(x, y) = 2 u(x, y)$$\nAt $(x=2, y=3)$:\n$$u(2, 3) = \\frac{2^3 + 3^3}{2 + 3} = \\frac{8 + 27}{5} = \\frac{35}{5} = 7$$\nTherefore:\n$$x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = 2 \\times 7 = 14$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_CALC_007",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Homogeneous function – Euler's theorem on homogeneous functions",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "If $u(x, y) = \\sin^{-1}\\left(\\frac{x^2 + y^2}{x + y}\\right)$, the value of the expression $x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y}$ at any point where $u = \\frac{\\pi}{4}$ is ________ (answer in integer).",
    "correct_answer": "1",
    "numerical_range": {
      "min": 1,
      "max": 1
    },
    "solution": "Let $v = \\sin(u) = \\frac{x^2 + y^2}{x + y}$.\nObserve that $v(tx, ty) = \\frac{t^2(x^2 + y^2)}{t(x + y)} = t v(x, y)$, so $v$ is a homogeneous function of degree $n = 1$.\nBy Euler's theorem applied to $v$:\n$$x \\frac{\\partial v}{\\partial x} + y \\frac{\\partial v}{\\partial y} = 1 \\cdot v$$\nSince $v = \\sin(u)$, we have $\\frac{\\partial v}{\\partial x} = \\cos(u) \\frac{\\partial u}{\\partial x}$ and $\\frac{\\partial v}{\\partial y} = \\cos(u) \\frac{\\partial u}{\\partial y}$:\n$$\\cos(u) \\left(x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y}\\right) = \\sin(u)$$\nDividing by $\\cos(u)$:\n$$x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = \\tan(u)$$\nFor $u = \\frac{\\pi}{4}$:\n$$x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = \\tan\\left(\\frac{\\pi}{4}\\right) = 1$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_CALC_008",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Homogeneous function – Euler's theorem on homogeneous functions",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "If $f(x, y)$ is a homogeneous function of degree $n$ having continuous second-order partial derivatives, then $x^2 \\frac{\\partial^2 f}{\\partial x^2} + 2xy \\frac{\\partial^2 f}{\\partial x \\partial y} + y^2 \\frac{\\partial^2 f}{\\partial y^2}$ is equal to:",
    "options": {
      "A": "$n f(x, y)$",
      "B": "$n(n-1) f(x, y)$",
      "C": "$n^2 f(x, y)$",
      "D": "$(n+1) f(x, y)$"
    },
    "correct_answer": "B",
    "solution": "By Euler's extension theorem for homogeneous functions of degree $n$:\n$$x \\frac{\\partial f}{\\partial x} + y \\frac{\\partial f}{\\partial y} = n f$$\nDifferentiating partially with respect to $x$ and $y$ and combining yields:\n$$x^2 \\frac{\\partial^2 f}{\\partial x^2} + 2xy \\frac{\\partial^2 f}{\\partial x \\partial y} + y^2 \\frac{\\partial^2 f}{\\partial y^2} = n(n-1) f(x, y)$$\nThus, Option B is correct.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_CALC_009",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Total differentiation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "If $u = x^2 + y^2$, where $x = t^2$ and $y = 2t$, the value of the total derivative $\\frac{du}{dt}$ evaluated at $t = 1$ is ________ (answer in integer).",
    "correct_answer": "12",
    "numerical_range": {
      "min": 12,
      "max": 12
    },
    "solution": "By the chain rule for total differentiation:\n$$\\frac{du}{dt} = \\frac{\\partial u}{\\partial x} \\frac{dx}{dt} + \\frac{\\partial u}{\\partial y} \\frac{dy}{dt}$$\nComputing individual terms:\n$$\\frac{\\partial u}{\\partial x} = 2x, \\quad \\frac{dx}{dt} = 2t$$\n$$\\frac{\\partial u}{\\partial y} = 2y, \\quad \\frac{dy}{dt} = 2$$\nAt $t = 1$, we have $x = 1^2 = 1$ and $y = 2(1) = 2$:\n$$\\frac{du}{dt} = 2(1)(2(1)) + 2(2)(2) = 4 + 8 = 12$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_CALC_010",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Total differentiation",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "If the equation $F(x, y, z) = 0$ defines $z$ implicitly as a function of independent variables $x$ and $y$, then provided $\\frac{\\partial F}{\\partial z} \\ne 0$, the partial derivative $\\frac{\\partial z}{\\partial x}$ is given by:",
    "options": {
      "A": "$-\\frac{\\partial F/\\partial x}{\\partial F/\\partial z}$",
      "B": "$\\frac{\\partial F/\\partial x}{\\partial F/\\partial z}$",
      "C": "$-\\frac{\\partial F/\\partial z}{\\partial F/\\partial x}$",
      "D": "$\\frac{\\partial F/\\partial z}{\\partial F/\\partial x}$"
    },
    "correct_answer": "A",
    "solution": "Taking the total differential of $F(x, y, z) = 0$:\n$$dF = \\frac{\\partial F}{\\partial x} dx + \\frac{\\partial F}{\\partial y} dy + \\frac{\\partial F}{\\partial z} dz = 0$$\nTo find $\\frac{\\partial z}{\\partial x}$, hold $y$ constant ($dy = 0$):\n$$\\frac{\\partial F}{\\partial x} dx + \\frac{\\partial F}{\\partial z} dz = 0 \\implies \\frac{\\partial z}{\\partial x} = -\\frac{\\partial F/\\partial x}{\\partial F/\\partial z}$$\nHence, option A is correct.",
    "difficulty": "Moderate",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_CALC_011",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Maxima and minima of function with several independent variables",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "For the function $f(x, y) = x^2 + y^2 + 6x - 4y + 13$, the critical point is:",
    "options": {
      "A": "Point of local maximum at $(-3, 2)$",
      "B": "Point of local minimum at $(-3, 2)$",
      "C": "Saddle point at $(3, -2)$",
      "D": "Point of local minimum at $(3, -2)$"
    },
    "correct_answer": "B",
    "solution": "Calculate first partial derivatives:\n$$\\frac{\\partial f}{\\partial x} = 2x + 6 = 0 \\implies x = -3$$\n$$\\frac{\\partial f}{\\partial y} = 2y - 4 = 0 \\implies y = 2$$\nThe critical point is $(-3, 2)$.\nSecond partial derivatives:\n$$r = \\frac{\\partial^2 f}{\\partial x^2} = 2 > 0$$\n$$s = \\frac{\\partial^2 f}{\\partial x \\partial y} = 0$$\n$$t = \\frac{\\partial^2 f}{\\partial y^2} = 2$$\nDiscriminant $\\Delta = rt - s^2 = (2)(2) - 0 = 4 > 0$.\nSince $\\Delta > 0$ and $r > 0$, $(-3, 2)$ is a point of local minimum.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_CALC_012",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Maxima and minima of function with several independent variables",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "For the function $f(x, y) = x^3 + y^3 - 3xy$, the local minimum value of $f(x, y)$ is ________ (answer in integer).",
    "correct_answer": "-1",
    "numerical_range": {
      "min": -1,
      "max": -1
    },
    "solution": "Find critical points by setting partial derivatives to zero:\n$$\\frac{\\partial f}{\\partial x} = 3x^2 - 3y = 0 \\implies y = x^2$$\n$$\\frac{\\partial f}{\\partial y} = 3y^2 - 3x = 0 \\implies x = y^2$$\nSubstituting $y = x^2$: $x = (x^2)^2 = x^4 \\implies x(x^3 - 1) = 0$.\nReal solutions: $x = 0 \\implies y = 0$; and $x = 1 \\implies y = 1$.\nSecond derivatives:\n$$r = \\frac{\\partial^2 f}{\\partial x^2} = 6x, \\quad s = \\frac{\\partial^2 f}{\\partial x \\partial y} = -3, \\quad t = \\frac{\\partial^2 f}{\\partial y^2} = 6y$$\n1. At $(0, 0)$: $rt - s^2 = 0 - (-3)^2 = -9 < 0$ (saddle point).\n2. At $(1, 1)$: $r = 6 > 0, t = 6, s = -3$. $\\Delta = rt - s^2 = (6)(6) - 9 = 27 > 0$. Since $\\Delta > 0$ and $r > 0$, $(1, 1)$ is a local minimum.\nThe value of the function at $(1, 1)$ is:\n$$f(1, 1) = 1^3 + 1^3 - 3(1)(1) = 1 + 1 - 3 = -1$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_CALC_013",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Maxima and minima of function with several independent variables",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Let $(a, b)$ be a stationary point of a twice continuously differentiable function $f(x, y)$ with $r = f_{xx}(a,b)$, $s = f_{xy}(a,b)$, and $t = f_{yy}(a,b)$. Which of the following statements is/are TRUE?",
    "options": {
      "A": "If $rt - s^2 > 0$ and $r > 0$, $f(a, b)$ is a local minimum",
      "B": "If $rt - s^2 > 0$ and $r < 0$, $f(a, b)$ is a local maximum",
      "C": "If $rt - s^2 < 0$, $(a, b)$ is a saddle point",
      "D": "If $rt - s^2 = 0$, the second derivative test is inconclusive"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "By the second derivative test for functions of two variables with Hessian determinant $\\Delta = rt - s^2$:\n1. $\\Delta > 0$ and $r > 0 \\implies$ local minimum (A is true).\n2. $\\Delta > 0$ and $r < 0 \\implies$ local maximum (B is true).\n3. $\\Delta < 0 \\implies$ saddle point (C is true).\n4. $\\Delta = 0 \\implies$ inconclusive test, requiring higher order terms or alternative analysis (D is true).",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_CALC_014",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Sequences and series – infinite series, tests for convergence",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "According to D'Alembert's ratio test for a series of positive terms $\\sum a_n$, if $\\lim_{n \\to \\infty} \\frac{a_{n+1}}{a_n} = L$, the series:",
    "options": {
      "A": "Converges if $L < 1$ and diverges if $L > 1$",
      "B": "Converges if $L > 1$ and diverges if $L < 1$",
      "C": "Converges for all $L \\ge 1$",
      "D": "Diverges only when $L = 1$"
    },
    "correct_answer": "A",
    "solution": "D'Alembert's ratio test states that for $\\sum a_n$ with $a_n > 0$ and $L = \\lim_{n \\to \\infty} \\frac{a_{n+1}}{a_n}$:\n- If $L < 1$, the series converges absolutely.\n- If $L > 1$, the series diverges.\n- If $L = 1$, the test is inconclusive.",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_CALC_015",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Sequences and series – infinite series, tests for convergence",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "The $p$-series $\\sum_{n=1}^\\infty \\frac{1}{n^p}$ is convergent if and only if:",
    "options": {
      "A": "$p > 1$",
      "B": "$p \\ge 1$",
      "C": "$p < 1$",
      "D": "$p \\le 1$"
    },
    "correct_answer": "A",
    "solution": "By the integral test on $f(x) = \\frac{1}{x^p}$:\n$$\\int_1^\\infty \\frac{1}{x^p} dx = \\lim_{M \\to \\infty} \\left[\\frac{x^{1-p}}{1-p}\\right]_1^M$$\nThis improper integral converges if and only if $1 - p < 0 \\implies p > 1$. For $p = 1$, it is the harmonic series $\\sum \\frac{1}{n}$ which diverges.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_CALC_016",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Sequences and series – infinite series, tests for convergence",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The radius of convergence $R$ of the power series $\\sum_{n=1}^\\infty \\frac{x^n}{n \\cdot 3^n}$ is equal to ________ (answer in integer).",
    "correct_answer": "3",
    "numerical_range": {
      "min": 3,
      "max": 3
    },
    "solution": "Here the coefficient is $c_n = \\frac{1}{n \\cdot 3^n}$.\nBy the ratio test for radius of convergence:\n$$\\frac{1}{R} = \\lim_{n \\to \\infty} \\left| \\frac{c_{n+1}}{c_n} \\right| = \\lim_{n \\to \\infty} \\frac{1}{(n+1) \\cdot 3^{n+1}} \\cdot \\frac{n \\cdot 3^n}{1}$$\n$$\\frac{1}{R} = \\lim_{n \\to \\infty} \\frac{n}{3(n+1)} = \\frac{1}{3} \\lim_{n \\to \\infty} \\frac{1}{1 + 1/n} = \\frac{1}{3}$$\nTherefore, the radius of convergence is:\n$$R = 3$$",
    "difficulty": "Moderate",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_CALC_017",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Fourier, Taylor and MacLaurin series",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "In the Maclaurin series expansion of $f(x) = e^{3x}$, the coefficient of $x^3$ is equal to ________ (round off to 1 decimal place).",
    "correct_answer": "4.5",
    "numerical_range": {
      "min": 4.4,
      "max": 4.6
    },
    "solution": "The Maclaurin series for $e^u$ is:\n$$e^u = \\sum_{n=0}^\\infty \\frac{u^n}{n!} = 1 + u + \\frac{u^2}{2!} + \\frac{u^3}{3!} + \\dots$$\nSubstituting $u = 3x$:\n$$e^{3x} = 1 + (3x) + \\frac{(3x)^2}{2} + \\frac{(3x)^3}{6} + \\dots$$\nThe term containing $x^3$ is:\n$$\\frac{27x^3}{6} = \\frac{9}{2}x^3 = 4.5 x^3$$\nHence, the coefficient of $x^3$ is $4.5$.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_CALC_018",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Fourier, Taylor and MacLaurin series",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The Taylor series expansion of an infinitely differentiable function $f(x)$ about $x = a$ is given by:",
    "options": {
      "A": "$\\sum_{n=0}^\\infty \\frac{f^{(n)}(a)}{n!}(x - a)^n$",
      "B": "$\\sum_{n=0}^\\infty \\frac{f^{(n)}(a)}{(n+1)!}(x - a)^n$",
      "C": "$\\sum_{n=0}^\\infty f^{(n)}(a)(x - a)^n$",
      "D": "$\\sum_{n=1}^\\infty \\frac{f^{(n)}(0)}{n!}(x - a)^n$"
    },
    "correct_answer": "A",
    "solution": "By definition, the Taylor series of $f(x)$ about the expansion center $x = a$ is:\n$$f(x) = f(a) + f'(a)(x-a) + \\frac{f''(a)}{2!}(x-a)^2 + \\dots = \\sum_{n=0}^\\infty \\frac{f^{(n)}(a)}{n!}(x - a)^n$$\nWhen $a = 0$, this formula reduces to the Maclaurin series.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_CALC_019",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Fourier, Taylor and MacLaurin series",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements is/are TRUE regarding the Fourier series of a periodic function $f(x)$ with period $2L$?",
    "options": {
      "A": "If $f(x)$ is an even function, all sine coefficients $b_n = 0$",
      "B": "If $f(x)$ is an odd function, all cosine coefficients $a_n = 0$ including $a_0 = 0$",
      "C": "At a point of jump discontinuity $x_0$, the Fourier series converges to $\\frac{f(x_0^+) + f(x_0^-)}{2}$",
      "D": "Parseval's identity relates the average of $[f(x)]^2$ over a period to the sum of the squares of the Fourier coefficients"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "Under Dirichlet's conditions for Fourier series on $[-L, L]$:\n1. For even $f(x)$, $f(x)\\sin(n\\pi x/L)$ is odd, so $b_n = \\frac{1}{L}\\int_{-L}^L f(x)\\sin(n\\pi x/L) dx = 0$ (A is true).\n2. For odd $f(x)$, $f(x)\\cos(n\\pi x/L)$ is odd, so $a_n = 0$ for all $n \\ge 0$ (B is true).\n3. By Dirichlet's theorem, at a jump discontinuity $x_0$, the series converges to the midpoint of the jump $\\frac{f(x_0^+) + f(x_0^-)}{2}$ (C is true).\n4. Parseval's theorem states: $\\frac{1}{2L}\\int_{-L}^L [f(x)]^2 dx = \\frac{a_0^2}{4} + \\frac{1}{2}\\sum_{n=1}^\\infty (a_n^2 + b_n^2)$ (D is true).",
    "difficulty": "Hard",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_VC_001",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Vector differentiation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The directional derivative of the scalar field $\\phi(x, y, z) = x^2 y z + 4 x z^2$ at the point $P(1, -2, -1)$ in the direction of the vector $\\vec{a} = 2\\hat{i} - \\hat{j} - 2\\hat{k}$ is ________ (round off to 2 decimal places).",
    "correct_answer": "12.33",
    "numerical_range": {
      "min": 12.2,
      "max": 12.45
    },
    "solution": "1. Compute the gradient $\\nabla \\phi$:\n$$\\nabla \\phi = \\left(2xyz + 4z^2\\right)\\hat{i} + \\left(x^2 z\\right)\\hat{j} + \\left(x^2 y + 8xz\\right)\\hat{k}$$\nAt $P(1, -2, -1)$:\n$$\\frac{\\partial \\phi}{\\partial x} = 2(1)(-2)(-1) + 4(-1)^2 = 4 + 4 = 8$$\n$$\\frac{\\partial \\phi}{\\partial y} = (1)^2(-1) = -1$$\n$$\\frac{\\partial \\phi}{\\partial z} = (1)^2(-2) + 8(1)(-1) = -2 - 8 = -10$$\n$$\\nabla \\phi = 8\\hat{i} - \\hat{j} - 10\\hat{k}$$\n2. Find the unit direction vector $\\hat{a}$:\n$$\\hat{a} = \\frac{2\\hat{i} - \\hat{j} - 2\\hat{k}}{\\sqrt{2^2 + (-1)^2 + (-2)^2}} = \\frac{2\\hat{i} - \\hat{j} - 2\\hat{k}}{3}$$\n3. Directional derivative:\n$$\\nabla \\phi \\cdot \\hat{a} = \\frac{8(2) + (-1)(-1) + (-10)(-2)}{3} = \\frac{16 + 1 + 20}{3} = \\frac{37}{3} \\approx 12.33$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_VC_002",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Vector differentiation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A particle moves along a space curve with position vector $\\vec{r}(t) = (t^3)\\hat{i} + (2t^2)\\hat{j} + (3t)\\hat{k}$. The magnitude of the particle's acceleration vector at time $t = 1$ is ________ (round off to 2 decimal places).",
    "correct_answer": "7.21",
    "numerical_range": {
      "min": 7.15,
      "max": 7.27
    },
    "solution": "Differentiating the position vector with respect to time $t$ to obtain velocity:\n$$\\vec{v}(t) = \\frac{d\\vec{r}}{dt} = (3t^2)\\hat{i} + (4t)\\hat{j} + 3\\hat{k}$$\nDifferentiating velocity to find acceleration:\n$$\\vec{a}(t) = \\frac{d\\vec{v}}{dt} = (6t)\\hat{i} + 4\\hat{j} + 0\\hat{k}$$\nAt $t = 1$:\n$$\\vec{a}(1) = 6\\hat{i} + 4\\hat{j}$$\nThe magnitude of acceleration is:\n$$|\\vec{a}(1)| = \\sqrt{6^2 + 4^2 + 0^2} = \\sqrt{36 + 16} = \\sqrt{52} \\approx 7.21$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_VC_003",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Scalar and vector point functions",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "A vector point function $\\vec{F}$ is called conservative (irrotational) in a simply connected domain if and only if:",
    "options": {
      "A": "$\\nabla \\times \\vec{F} = \\vec{0}$",
      "B": "$\\nabla \\cdot \\vec{F} = 0$",
      "C": "$\\nabla^2 \\vec{F} = \\vec{0}$",
      "D": "$\\vec{F} \\cdot d\\vec{r} = 0$ along any open curve"
    },
    "correct_answer": "A",
    "solution": "A vector field $\\vec{F}$ is conservative if its curl vanishes everywhere ($\\nabla \\times \\vec{F} = \\vec{0}$). This is the necessary and sufficient condition for the existence of a single-valued scalar potential function $\\phi$ such that $\\vec{F} = \\nabla \\phi$, meaning line integrals are path-independent.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_VC_004",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Scalar and vector point functions",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The work done by the conservative force field $\\vec{F} = (2xy + z^3)\\hat{i} + (x^2)\\hat{j} + (3xz^2)\\hat{k}$ in moving an object from point $(0, 0, 0)$ to point $(1, 2, 1)$ is ________ (answer in integer).",
    "correct_answer": "3",
    "numerical_range": {
      "min": 3,
      "max": 3
    },
    "solution": "Find the scalar potential function $\\phi(x, y, z)$ such that $\\vec{F} = \\nabla \\phi$:\n$$\\frac{\\partial \\phi}{\\partial x} = 2xy + z^3 \\implies \\phi = x^2 y + x z^3 + g(y, z)$$\n$$\\frac{\\partial \\phi}{\\partial y} = x^2 + \\frac{\\partial g}{\\partial y} = x^2 \\implies \\frac{\\partial g}{\\partial y} = 0$$\n$$\\frac{\\partial \\phi}{\\partial z} = 3xz^2 + \\frac{\\partial g}{\\partial z} = 3xz^2 \\implies \\frac{\\partial g}{\\partial z} = 0$$\nThus, $\\phi(x, y, z) = x^2 y + x z^3$.\nBy the fundamental theorem of line integrals, the work done is:\n$$W = \\phi(1, 2, 1) - \\phi(0, 0, 0) = [1^2(2) + 1(1)^3] - 0 = 2 + 1 = 3$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_VC_005",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Vector differential operators – del, gradient",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The maximum rate of increase of the scalar field $\\phi(x, y, z) = 2x^2 + 3y^2 + z^2$ at the point $(1, 1, 2)$ is ________ (round off to 2 decimal places).",
    "correct_answer": "8.25",
    "numerical_range": {
      "min": 8.2,
      "max": 8.3
    },
    "solution": "The maximum rate of increase of a scalar field $\\phi$ at any point occurs in the direction of the gradient $\\nabla \\phi$, and its magnitude equals $|\\nabla \\phi|$.\nCompute the gradient:\n$$\\nabla \\phi = \\frac{\\partial \\phi}{\\partial x}\\hat{i} + \\frac{\\partial \\phi}{\\partial y}\\hat{j} + \\frac{\\partial \\phi}{\\partial z}\\hat{k} = (4x)\\hat{i} + (6y)\\hat{j} + (2z)\\hat{k}$$\nAt the point $(1, 1, 2)$:\n$$\\nabla \\phi = 4(1)\\hat{i} + 6(1)\\hat{j} + 2(2)\\hat{k} = 4\\hat{i} + 6\\hat{j} + 4\\hat{k}$$\nMagnitude:\n$$|\\nabla \\phi| = \\sqrt{4^2 + 6^2 + 4^2} = \\sqrt{16 + 36 + 16} = \\sqrt{68} \\approx 8.25$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_VC_006",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Vector differential operators – del, gradient",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "A unit vector normal to the level surface $\\phi(x, y, z) = c$ at a given point $P$ is given by:",
    "options": {
      "A": "$\\frac{\\nabla \\phi}{|\\nabla \\phi|}$",
      "B": "$\\nabla \\times (\\nabla \\phi)$",
      "C": "$\\nabla(\\nabla \\cdot \\phi)$",
      "D": "$\\frac{\\nabla \\cdot \\phi}{|\\nabla \\phi|}$"
    },
    "correct_answer": "A",
    "solution": "The gradient vector $\\nabla \\phi$ is always perpendicular (normal) to the level surface $\\phi(x, y, z) = c$ at every point. Dividing by its Euclidean norm $|\\nabla \\phi|$ yields the unit normal vector $\\hat{n} = \\frac{\\nabla \\phi}{|\\nabla \\phi|}$.",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_VC_007",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Divergence and curl",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The divergence of the vector field $\\vec{F} = (x^2 y)\\hat{i} + (y^2 z)\\hat{j} + (z^2 x)\\hat{k}$ at the point $(1, 2, 3)$ is ________ (answer in integer).",
    "correct_answer": "22",
    "numerical_range": {
      "min": 22,
      "max": 22
    },
    "solution": "The divergence of $\\vec{F} = F_1\\hat{i} + F_2\\hat{j} + F_3\\hat{k}$ is:\n$$\\nabla \\cdot \\vec{F} = \\frac{\\partial F_1}{\\partial x} + \\frac{\\partial F_2}{\\partial y} + \\frac{\\partial F_3}{\\partial z}$$\n$$\\frac{\\partial}{\\partial x}(x^2 y) = 2xy$$\n$$\\frac{\\partial}{\\partial y}(y^2 z) = 2yz$$\n$$\\frac{\\partial}{\\partial z}(z^2 x) = 2zx$$\nAt $(1, 2, 3)$:\n$$\\nabla \\cdot \\vec{F} = 2(1)(2) + 2(2)(3) + 2(3)(1) = 4 + 12 + 6 = 22$$",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_VC_008",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Divergence and curl",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "If the vector field $\\vec{F} = (ay + 2z)\\hat{i} + (3x - bz)\\hat{j} + (cx - y)\\hat{k}$ is irrotational, the value of $(a + b + c)$ is ________ (answer in integer).",
    "correct_answer": "6",
    "numerical_range": {
      "min": 6,
      "max": 6
    },
    "solution": "For $\\vec{F}$ to be irrotational, $\\nabla \\times \\vec{F} = \\vec{0}$:\n$$\\nabla \\times \\vec{F} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ \\frac{\\partial}{\\partial x} & \\frac{\\partial}{\\partial y} & \\frac{\\partial}{\\partial z} \\\\ ay + 2z & 3x - bz & cx - y \\end{vmatrix} = \\vec{0}$$\nComputing components:\n$$\\hat{i}\\left(\\frac{\\partial}{\\partial y}(cx - y) - \\frac{\\partial}{\\partial z}(3x - bz)\\right) = \\hat{i}(-1 - (-b)) = (b - 1)\\hat{i}$$\n$$\\hat{j}\\left(\\frac{\\partial}{\\partial z}(ay + 2z) - \\frac{\\partial}{\\partial x}(cx - y)\\right) = \\hat{j}(2 - c)$$\n$$\\hat{k}\\left(\\frac{\\partial}{\\partial x}(3x - bz) - \\frac{\\partial}{\\partial y}(ay + 2z)\\right) = \\hat{k}(3 - a)$$\nEquating each component to zero:\n$$b - 1 = 0 \\implies b = 1$$\n$$2 - c = 0 \\implies c = 2$$\n$$3 - a = 0 \\implies a = 3$$\nTherefore:\n$$a + b + c = 3 + 1 + 2 = 6$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_VC_009",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Divergence and curl",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following vector differential identities is/are universally TRUE for twice continuously differentiable scalar fields $\\phi$ and vector fields $\\vec{F}$?",
    "options": {
      "A": "$\\nabla \\times (\\nabla \\phi) = \\vec{0}$ (curl of gradient is identically zero)",
      "B": "$\\nabla \\cdot (\\nabla \\times \\vec{F}) = 0$ (divergence of curl is identically zero)",
      "C": "$\\nabla \\times (\\nabla \\times \\vec{F}) = \\nabla(\\nabla \\cdot \\vec{F}) - \\nabla^2 \\vec{F}$",
      "D": "$\\nabla \\cdot (\\phi \\vec{F}) = \\phi (\\nabla \\cdot \\vec{F}) + \\vec{F} \\cdot (\\nabla \\phi)$"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "All four are canonical identities of vector calculus:\n1. $\\nabla \\times (\\nabla \\phi) = \\vec{0}$ because mixed partials commute (A is true).\n2. $\\nabla \\cdot (\\nabla \\times \\vec{F}) = 0$ because divergence of any curl field is zero (B is true).\n3. Vector Laplacian identity: $\\nabla \\times (\\nabla \\times \\vec{F}) = \\nabla(\\nabla \\cdot \\vec{F}) - \\nabla^2 \\vec{F}$ (C is true).\n4. Product rule for divergence: $\\nabla \\cdot (\\phi \\vec{F}) = \\phi (\\nabla \\cdot \\vec{F}) + \\vec{F} \\cdot (\\nabla \\phi)$ (D is true).",
    "difficulty": "Hard",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_VC_010",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Physical interpretations – line, surface and volume integrals",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The value of the line integral $\\int_C \\vec{F} \\cdot d\\vec{r}$, where $\\vec{F} = x^2\\hat{i} + y^2\\hat{j}$ along the straight line segment $C$ from $(0, 0)$ to $(1, 1)$, is ________ (round off to 2 decimal places).",
    "correct_answer": "0.67",
    "numerical_range": {
      "min": 0.64,
      "max": 0.7
    },
    "solution": "Parameterize the straight line segment joining $(0, 0)$ and $(1, 1)$:\n$$x = t, \\quad y = t, \\quad t \\in [0, 1]$$\nThen $dx = dt$ and $dy = dt$.\nSubstitute into the line integral:\n$$\\int_C \\vec{F} \\cdot d\\vec{r} = \\int_0^1 (x^2 dx + y^2 dy) = \\int_0^1 (t^2 dt + t^2 dt) = \\int_0^1 2t^2 dt$$\n$$= 2 \\left[\\frac{t^3}{3}\\right]_0^1 = \\frac{2}{3} \\approx 0.67$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_VC_011",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Physical interpretations – line, surface and volume integrals",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The physical interpretation of the surface integral $\\iint_S \\vec{v} \\cdot \\hat{n} \\, dS$, where $\\vec{v}$ is the fluid velocity vector field and $\\hat{n}$ is the unit outward normal, represents the:",
    "options": {
      "A": "Total volumetric flow rate (flux) of fluid crossing surface $S$",
      "B": "Total kinetic energy of fluid enclosed by $S$",
      "C": "Vorticity of fluid along the boundary of $S$",
      "D": "Static pressure gradient acting across $S$"
    },
    "correct_answer": "A",
    "solution": "The dot product $\\vec{v} \\cdot \\hat{n}$ gives the normal component of fluid velocity across the surface element $dS$. Integrating over $S$ computes the net volumetric discharge rate $\\iint_S \\vec{v} \\cdot \\hat{n} \\, dS$ in $\\text{m}^3/\\text{s}$ passing through surface $S$.",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_VC_012",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Stokes, Gauss and Green's theorems",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "Gauss's Divergence Theorem transforms:",
    "options": {
      "A": "A line integral around a closed curve into a surface integral",
      "B": "A surface integral over a closed surface into a volume integral",
      "C": "A line integral into a volume integral",
      "D": "A volume integral into a line integral"
    },
    "correct_answer": "B",
    "solution": "Gauss's Divergence Theorem states:\n$$\\iint_S \\vec{F} \\cdot \\hat{n} \\, dS = \\iiint_V (\\nabla \\cdot \\vec{F}) \\, dV$$\nIt relates the outward flux of a vector field through a closed boundary surface $S$ to the volume integral of its divergence over the enclosed region $V$.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_VC_013",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Stokes, Gauss and Green's theorems",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Using Gauss's Divergence Theorem, evaluate the outward flux $\\iint_S \\vec{F} \\cdot \\hat{n} \\, dS$ for the vector field $\\vec{F} = 2x\\hat{i} + 3y\\hat{j} + 4z\\hat{k}$ over the closed sphere $S: x^2 + y^2 + z^2 = 1$ ________ (round off to 1 decimal place, take $\\pi = 3.1416$).",
    "correct_answer": "37.7",
    "numerical_range": {
      "min": 37,
      "max": 38.4
    },
    "solution": "By Gauss's Divergence Theorem:\n$$\\iint_S \\vec{F} \\cdot \\hat{n} \\, dS = \\iiint_V (\\nabla \\cdot \\vec{F}) \\, dV$$\nCalculate the divergence of $\\vec{F}$:\n$$\\nabla \\cdot \\vec{F} = \\frac{\\partial}{\\partial x}(2x) + \\frac{\\partial}{\\partial y}(3y) + \\frac{\\partial}{\\partial z}(4z) = 2 + 3 + 4 = 9$$\nTherefore:\n$$\\iint_S \\vec{F} \\cdot \\hat{n} \\, dS = 9 \\iiint_V dV = 9 \\cdot \\text{Volume of sphere}$$\nThe radius of the sphere is $R = 1$, so $V = \\frac{4}{3}\\pi (1)^3 = \\frac{4}{3}\\pi$.\n$$\\text{Flux} = 9 \\times \\frac{4}{3}\\pi = 12\\pi \\approx 12 \\times 3.14159 = 37.7$$",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_VC_014",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Stokes, Gauss and Green's theorems",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "Green's theorem in the plane states that for a positively oriented, piecewise-smooth, simple closed curve $C$ bounding a region $R$:\n$$\\oint_C (M dx + N dy) = \\iint_R \\left(\\frac{\\partial N}{\\partial x} - \\frac{\\partial M}{\\partial y}\\right) dA$$\nEvaluating $\\oint_C (x^2 y \\, dx + x y^2 \\, dy)$ over any circle centered at the origin gives:",
    "options": {
      "A": "0",
      "B": "$\\pi$",
      "C": "$2\\pi$",
      "D": "$4\\pi$"
    },
    "correct_answer": "A",
    "solution": "Identify $M(x, y) = x^2 y$ and $N(x, y) = x y^2$.\nCompute partial derivatives:\n$$\\frac{\\partial N}{\\partial x} = y^2, \\quad \\frac{\\partial M}{\\partial y} = x^2$$\nBy Green's theorem:\n$$\\oint_C (M dx + N dy) = \\iint_R (y^2 - x^2) \\, dA$$\nBy symmetry over any region $R$ that is a disk centered at the origin (or in polar coordinates where $x = r\\cos\\theta, y = r\\sin\\theta$):\n$$\\int_0^{2\\pi} (\\sin^2\\theta - \\cos^2\\theta) d\\theta = \\int_0^{2\\pi} -\\cos(2\\theta) d\\theta = 0$$\nHence, the integral is strictly $0$.",
    "difficulty": "Moderate",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_DE_001",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Linear and non-linear first order Ordinary Differential Equations (ODE)",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "The integrating factor for the linear first-order differential equation $\\frac{dy}{dx} + \\frac{2}{x}y = x^3$ for $x > 0$ is:",
    "options": {
      "A": "$x^2$",
      "B": "$2\\ln(x)$",
      "C": "$e^{2x}$",
      "D": "$\\frac{1}{x^2}$"
    },
    "correct_answer": "A",
    "solution": "This is a first-order linear ODE of standard form $\\frac{dy}{dx} + P(x)y = Q(x)$ where $P(x) = \\frac{2}{x}$.\nThe integrating factor $IF$ is:\n$$IF = e^{\\int P(x) dx} = e^{\\int \\frac{2}{x} dx} = e^{2 \\ln(x)} = e^{\\ln(x^2)} = x^2$$\nThus, option A is correct.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_DE_002",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Linear and non-linear first order Ordinary Differential Equations (ODE)",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Consider the initial value problem $\\frac{dy}{dx} + 2y = 4$ with $y(0) = 1$. As $x \\to \\infty$, the limiting value of $y(x)$ is equal to ________ (answer in integer).",
    "correct_answer": "2",
    "numerical_range": {
      "min": 2,
      "max": 2
    },
    "solution": "This is a linear ODE with integrating factor $IF = e^{\\int 2 dx} = e^{2x}$.\nMultiplying both sides by $e^{2x}$:\n$$\\frac{d}{dx}(y e^{2x}) = 4 e^{2x}$$\nIntegrating both sides:\n$$y e^{2x} = \\int 4 e^{2x} dx = 2 e^{2x} + C \\implies y(x) = 2 + C e^{-2x}$$\nApply the initial condition $y(0) = 1$:\n$$1 = 2 + C \\implies C = -1$$\nSo the exact solution is:\n$$y(x) = 2 - e^{-2x}$$\nTaking the limit as $x \\to \\infty$:\n$$\\lim_{x \\to \\infty} y(x) = 2 - e^{-\\infty} = 2 - 0 = 2$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_DE_003",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Linear and non-linear first order Ordinary Differential Equations (ODE)",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "Bernoulli's non-linear differential equation $\\frac{dy}{dx} + P(x)y = Q(x)y^n$ ($n \\ne 0, 1$) is converted into a linear first-order ODE by the substitution:",
    "options": {
      "A": "$v = y^{1-n}$",
      "B": "$v = y^n$",
      "C": "$v = y^{n-1}$",
      "D": "$v = y^{-n}$"
    },
    "correct_answer": "A",
    "solution": "Dividing Bernoulli's equation by $y^n$:\n$$y^{-n} \\frac{dy}{dx} + P(x) y^{1-n} = Q(x)$$\nLet $v = y^{1-n}$. Then $\\frac{dv}{dx} = (1-n) y^{-n} \\frac{dy}{dx} \\implies y^{-n} \\frac{dy}{dx} = \\frac{1}{1-n} \\frac{dv}{dx}$.\nSubstituting yields the linear ODE:\n$$\\frac{dv}{dx} + (1-n)P(x)v = (1-n)Q(x)$$\nHence, option A is correct.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_DE_004",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Homogeneous differential equations",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "For the homogeneous differential equation $\\frac{dy}{dx} = \\frac{x^2 + y^2}{2xy}$, applying the substitution $y = vx$ converts it into the separable differential equation:",
    "options": {
      "A": "$\\frac{2v}{1 - v^2} dv = \\frac{dx}{x}$",
      "B": "$\\frac{2v}{1 + v^2} dv = \\frac{dx}{x}$",
      "C": "$\\frac{1}{1 - v^2} dv = \\frac{dx}{x}$",
      "D": "$\\frac{v}{1 - v} dv = \\frac{dx}{x}$"
    },
    "correct_answer": "A",
    "solution": "Let $y = vx$. Then $\\frac{dy}{dx} = v + x \\frac{dv}{dx}$.\nSubstitute into the differential equation:\n$$v + x \\frac{dv}{dx} = \\frac{x^2 + (vx)^2}{2x(vx)} = \\frac{1 + v^2}{2v}$$\n$$x \\frac{dv}{dx} = \\frac{1 + v^2}{2v} - v = \\frac{1 + v^2 - 2v^2}{2v} = \\frac{1 - v^2}{2v}$$\nSeparating variables:\n$$\\frac{2v}{1 - v^2} dv = \\frac{dx}{x}$$\nThus, option A is correct.",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_DE_005",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Homogeneous differential equations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "For the Cauchy–Euler homogeneous linear differential equation $x^2 \\frac{d^2 y}{dx^2} - 2x \\frac{dy}{dx} + 2y = 0$ for $x > 0$, the sum of the roots of the auxiliary characteristic equation is ________ (answer in integer).",
    "correct_answer": "3",
    "numerical_range": {
      "min": 3,
      "max": 3
    },
    "solution": "Substitute $x = e^z$ (so $z = \\ln x$). The operators transform as:\n$$x \\frac{d}{dx} = D, \\quad x^2 \\frac{d^2}{dx^2} = D(D-1)$$\nwhere $D = \\frac{d}{dz}$.\nSubstituting into the differential equation:\n$$[D(D-1) - 2D + 2]y = 0$$\n$$(D^2 - 3D + 2)y = 0$$\nThe auxiliary equation is:\n$$m^2 - 3m + 2 = 0 \\implies (m - 1)(m - 2) = 0$$\nThe roots are $m_1 = 1$ and $m_2 = 2$.\nThe sum of the roots is $1 + 2 = 3$.",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_DE_006",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Higher order linear ODEs with constant coefficients",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "The particular integral (PI) of the differential equation $\\frac{d^2 y}{dx^2} + 4y = \\sin(2x)$ is:",
    "options": {
      "A": "$-\\frac{x}{4} \\cos(2x)$",
      "B": "$\\frac{x}{4} \\cos(2x)$",
      "C": "$-\\frac{x}{2} \\cos(2x)$",
      "D": "$\\frac{x}{2} \\cos(2x)$"
    },
    "correct_answer": "A",
    "solution": "Here $f(D) = D^2 + 4$. When evaluating for $\\sin(2x)$, replacing $D^2$ with $-2^2 = -4$ gives $f(-4) = 0$ (case of failure / resonance).\nUsing the derivative rule for case of failure:\n$$PI = \\frac{1}{D^2 + 4} \\sin(2x) = x \\cdot \\frac{1}{\\frac{d}{dD}(D^2 + 4)} \\sin(2x) = x \\cdot \\frac{1}{2D} \\sin(2x)$$\n$$\\frac{1}{D} \\sin(2x) = \\int \\sin(2x) \\, dx = -\\frac{\\cos(2x)}{2}$$\n$$PI = x \\left(-\\frac{\\cos(2x)}{4}\\right) = -\\frac{x}{4}\\cos(2x)$$\nThus, Option A is correct.",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_DE_007",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Higher order linear ODEs with constant coefficients",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Consider the differential equation $\\frac{d^2 y}{dx^2} + 5\\frac{dy}{dx} + 6y = 0$. The product of the two characteristic roots of this equation is ________ (answer in integer).",
    "correct_answer": "6",
    "numerical_range": {
      "min": 6,
      "max": 6
    },
    "solution": "The auxiliary equation is:\n$$m^2 + 5m + 6 = 0$$\nFactoring the quadratic equation:\n$$(m + 2)(m + 3) = 0$$\nThe roots are $m_1 = -2$ and $m_2 = -3$.\nThe product of the roots is:\n$$m_1 \\cdot m_2 = (-2) \\times (-3) = 6$$\n(By Vieta's formulas, for $a m^2 + b m + c = 0$, the product of roots is $c/a = 6/1 = 6$).",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_DE_008",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Higher order linear ODEs with constant coefficients",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "For the damped harmonic oscillator differential equation $\\frac{d^2 y}{dt^2} + 2\\zeta \\omega_n \\frac{dy}{dt} + \\omega_n^2 y = 0$ (where $\\omega_n > 0$), which of the following classifications is/are correct?",
    "options": {
      "A": "If $\\zeta > 1$, the system is overdamped and exhibits no oscillations",
      "B": "If $\\zeta = 1$, the system is critically damped with repeated real characteristic roots",
      "C": "If $0 < \\zeta < 1$, the system is underdamped and exhibits decaying sinusoidal oscillations",
      "D": "If $\\zeta = 0$, the system is undamped with pure imaginary characteristic roots"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "The characteristic equation is $m^2 + 2\\zeta \\omega_n m + \\omega_n^2 = 0$, with discriminant $\\Delta = 4\\omega_n^2(\\zeta^2 - 1)$:\n1. $\\zeta > 1 \\implies \\Delta > 0$: two distinct real negative roots, overdamped non-oscillatory decay (A is true).\n2. $\\zeta = 1 \\implies \\Delta = 0$: repeated real negative root $m = -\\omega_n$, critically damped (B is true).\n3. $0 < \\zeta < 1 \\implies \\Delta < 0$: complex conjugate roots $-\\zeta \\omega_n \\pm i \\omega_n \\sqrt{1-\\zeta^2}$, underdamped oscillatory decay (C is true).\n4. $\\zeta = 0$: roots $\\pm i \\omega_n$, undamped simple harmonic motion (D is true).",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_DE_009",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Laplace transforms and their inverse",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The Laplace transform of $f(t) = t e^{3t}$ is $F(s) = \\frac{1}{(s - a)^b}$. The value of $(a + b)$ is ________ (answer in integer).",
    "correct_answer": "5",
    "numerical_range": {
      "min": 5,
      "max": 5
    },
    "solution": "We know that $\\mathcal{L}\\{t\\} = \\frac{1}{s^2}$.\nBy the first shifting property (frequency shifting theorem):\n$$\\mathcal{L}\\{e^{at} f(t)\\} = F(s - a)$$\nHere with $a = 3$ and $f(t) = t$:\n$$\\mathcal{L}\\{t e^{3t}\\} = \\frac{1}{(s - 3)^2}$$\nComparing with $\\frac{1}{(s - a)^b}$:\n$a = 3$ and $b = 2$.\nHence, $a + b = 3 + 2 = 5$.",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_DE_010",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Laplace transforms and their inverse",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The inverse Laplace transform of $F(s) = \\frac{s}{s^2 + 16}$ is $f(t) = \\cos(\\omega t)$. The value of the angular frequency $\\omega$ is ________ (answer in integer).",
    "correct_answer": "4",
    "numerical_range": {
      "min": 4,
      "max": 4
    },
    "solution": "From the standard table of Laplace transforms:\n$$\\mathcal{L}\\{\\cos(\\omega t)\\} = \\frac{s}{s^2 + \\omega^2}$$\nComparing with $F(s) = \\frac{s}{s^2 + 16}$:\n$$\\omega^2 = 16 \\implies \\omega = 4$$\nTherefore, the value of $\\omega$ is $4$.",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_DE_011",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Laplace transforms and their inverse",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The Laplace transform of the delayed unit step function $u(t - a)$ for $a > 0$ is:",
    "options": {
      "A": "$\\frac{e^{-as}}{s}$",
      "B": "$\\frac{e^{as}}{s}$",
      "C": "$\\frac{1}{s - a}$",
      "D": "$\\frac{e^{-as}}{s^2}$"
    },
    "correct_answer": "A",
    "solution": "By the definition of the Laplace transform:\n$$\\mathcal{L}\\{u(t - a)\\} = \\int_0^\\infty e^{-st} u(t - a) \\, dt = \\int_a^\\infty e^{-st} \\, dt = \\left[\\frac{e^{-st}}{-s}\\right]_a^\\infty = \\frac{e^{-as}}{s}$$\nThus, option A is correct.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_DE_012",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Partial Differential Equations – Laplace, heat and wave equations",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "The two-dimensional steady-state heat conduction equation (Laplace's equation) $\\frac{\\partial^2 u}{\\partial x^2} + \\frac{\\partial^2 u}{\\partial y^2} = 0$ is classified as:",
    "options": {
      "A": "Elliptic partial differential equation",
      "B": "Parabolic partial differential equation",
      "C": "Hyperbolic partial differential equation",
      "D": "Nonlinear dispersive partial differential equation"
    },
    "correct_answer": "A",
    "solution": "A second-order PDE $A u_{xx} + B u_{xy} + C u_{yy} + \\dots = 0$ is classified by the discriminant $\\Delta = B^2 - 4AC$:\nFor Laplace's equation: $A = 1, B = 0, C = 1$.\n$$\\Delta = B^2 - 4AC = 0^2 - 4(1)(1) = -4 < 0$$\nSince $\\Delta < 0$, the equation is strictly elliptic.",
    "difficulty": "Moderate",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_DE_013",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Partial Differential Equations – Laplace, heat and wave equations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "For the one-dimensional wave equation $\\frac{\\partial^2 u}{\\partial t^2} = 9 \\frac{\\partial^2 u}{\\partial x^2}$, the wave propagation speed $c$ in $\\text{m/s}$ is equal to ________ (answer in integer).",
    "correct_answer": "3",
    "numerical_range": {
      "min": 3,
      "max": 3
    },
    "solution": "The canonical form of the one-dimensional wave equation is:\n$$\\frac{\\partial^2 u}{\\partial t^2} = c^2 \\frac{\\partial^2 u}{\\partial x^2}$$\nwhere $c$ is the wave propagation speed.\nComparing coefficients:\n$$c^2 = 9 \\implies c = 3 \\text{ m/s}$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_DE_014",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Partial Differential Equations – Laplace, heat and wave equations",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements is/are TRUE for solutions of the Laplace equation $\\nabla^2 u = 0$ in a bounded domain $D$ with smooth boundary $\\partial D$?",
    "options": {
      "A": "Solutions $u$ are called harmonic functions",
      "B": "By the Maximum Principle, the maximum and minimum values of $u$ must occur on the boundary $\\partial D$",
      "C": "At any point $(x_0, y_0)$, the value $u(x_0, y_0)$ equals the average of $u$ over any circle centered at $(x_0, y_0)$ inside $D$ (Mean Value Property)",
      "D": "If Dirichlet boundary conditions $u = g$ on $\\partial D$ are prescribed, the solution inside $D$ is unique"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "All four properties are fundamental theorems of potential theory:\n1. Solutions to $\\nabla^2 u = 0$ are harmonic functions (A is true).\n2. The Strong Maximum Principle states that a non-constant harmonic function achieves its extrema only on the boundary $\\partial D$ (B is true).\n3. Harmonic functions satisfy Gauss's mean value property (C is true).\n4. By energy methods or maximum principle, the Dirichlet problem for Laplace's equation has a unique solution (D is true).",
    "difficulty": "Hard",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_PS_001",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Mean, median, mode and standard deviation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A continuous random variable $X$ has variance $\\sigma^2 = 25$. The variance of the transformed random variable $Y = 3X - 15$ is ________ (answer in integer).",
    "correct_answer": "225",
    "numerical_range": {
      "min": 225,
      "max": 225
    },
    "solution": "From the fundamental properties of variance:\n$$\\operatorname{Var}(aX + b) = a^2 \\operatorname{Var}(X)$$\nHere $a = 3$, $b = -15$, and $\\operatorname{Var}(X) = 25$:\n$$\\operatorname{Var}(Y) = 3^2 \\times 25 = 9 \\times 25 = 225$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_PS_002",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Mean, median, mode and standard deviation",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "question": "For a moderately skewed frequency distribution, Karl Pearson's empirical relationship is $\\text{Mode} \\approx 3\\text{Median} - 2\\text{Mean}$. If the Mean is $32$ and the Median is $35$, the empirical Mode is ________ (answer in integer).",
    "correct_answer": "41",
    "numerical_range": {
      "min": 41,
      "max": 41
    },
    "solution": "Using Karl Pearson's empirical formula relating measures of central tendency:\n$$\\text{Mode} = 3\\text{Median} - 2\\text{Mean}$$\nSubstitute the given values:\n$$\\text{Mode} = 3(35) - 2(32) = 105 - 64 = 41$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_PS_003",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Mean, median, mode and standard deviation",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements is/are TRUE regarding statistical measures of central tendency and dispersion?",
    "options": {
      "A": "The arithmetic mean is sensitive to extreme values (outliers)",
      "B": "The median is robust against extreme outliers",
      "C": "The standard deviation is independent of change of origin",
      "D": "The coefficient of variation is defined as $\\frac{\\sigma}{\\mu} \\times 100$"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "1. The mean uses all values, so extreme outliers heavily shift it (A is true).\n2. The median depends only on rank order, so extreme outliers do not alter the center rank (B is true).\n3. Adding a constant $c$ to all observations shifts the mean by $c$ but leaves distances from the mean and standard deviation unchanged: $\\sigma(X + c) = \\sigma(X)$ (C is true).\n4. The coefficient of variation is the relative standard deviation expressed as percentage: $CV = \\frac{\\sigma}{\\mu} \\times 100$ (D is true).",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_PS_004",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Random variables",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A continuous random variable $X$ has probability density function $f(x) = k x (2 - x)$ for $0 \\le x \\le 2$, and $f(x) = 0$ elsewhere. The value of the constant $k$ is ________ (round off to 2 decimal places).",
    "correct_answer": "0.75",
    "numerical_range": {
      "min": 0.74,
      "max": 0.76
    },
    "solution": "By the normalization property of probability density functions:\n$$\\int_{-\\infty}^\\infty f(x) \\, dx = 1$$\n$$\\int_0^2 k(2x - x^2) \\, dx = 1$$\nEvaluating the definite integral:\n$$k \\left[ x^2 - \\frac{x^3}{3} \\right]_0^2 = 1$$\n$$k \\left( 4 - \\frac{8}{3} \\right) = k \\left( \\frac{12 - 8}{3} \\right) = k \\left( \\frac{4}{3} \\right) = 1$$\n$$k = \\frac{3}{4} = 0.75$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_PS_005",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Random variables",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "The cumulative distribution function (CDF) $F(x) = P(X \\le x)$ of any real random variable $X$ must satisfy which of the following properties?",
    "options": {
      "A": "$F(x)$ is non-decreasing, right-continuous, with $\\lim_{x \\to -\\infty} F(x) = 0$ and $\\lim_{x \\to \\infty} F(x) = 1$",
      "B": "$F(x)$ is strictly increasing and left-continuous everywhere",
      "C": "$F(x)$ must be symmetric about $x = 0$",
      "D": "$F(x)$ is unbounded as $x \\to \\infty$"
    },
    "correct_answer": "A",
    "solution": "By axiomatic probability theory, every CDF $F(x)$ satisfies:\n1. Non-decreasing: if $x_1 \\le x_2$, then $F(x_1) \\le F(x_2)$.\n2. Right-continuous: $\\lim_{h \\to 0^+} F(x + h) = F(x)$.\n3. Limits: $\\lim_{x \\to -\\infty} F(x) = 0$ and $\\lim_{x \\to \\infty} F(x) = 1$.\nThus, option A is correct.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_PS_006",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Poisson, normal and binomial distributions",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A random variable $X$ follows a Poisson distribution such that $P(X = 1) = 2 P(X = 2)$. The mean $\\lambda$ of the distribution is ________ (answer in integer).",
    "correct_answer": "1",
    "numerical_range": {
      "min": 1,
      "max": 1
    },
    "solution": "For a Poisson distribution with parameter $\\lambda$:\n$$P(X = k) = \\frac{e^{-\\lambda} \\lambda^k}{k!}$$\nGiven $P(X = 1) = 2 P(X = 2)$:\n$$\\frac{e^{-\\lambda} \\lambda^1}{1!} = 2 \\cdot \\frac{e^{-\\lambda} \\lambda^2}{2!}$$\n$$\\lambda = 2 \\cdot \\frac{\\lambda^2}{2} = \\lambda^2$$\nSince $\\lambda > 0$, dividing both sides by $\\lambda$ yields:\n$$\\lambda = 1$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_PS_007",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Poisson, normal and binomial distributions",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A fair coin is tossed $6$ times independently. The probability of obtaining exactly $3$ heads is ________ (round off to 3 decimal places).",
    "correct_answer": "0.313",
    "numerical_range": {
      "min": 0.31,
      "max": 0.315
    },
    "solution": "Let $X$ be the number of heads in $n = 6$ trials with success probability $p = 0.5$.\n$X$ follows a Binomial distribution $B(n=6, p=0.5)$:\n$$P(X = k) = \\binom{n}{k} p^k (1-p)^{n-k}$$\nFor $k = 3$:\n$$P(X = 3) = \\binom{6}{3} (0.5)^3 (0.5)^3 = \\frac{6!}{3!3!} (0.5)^6 = 20 \\times \\frac{1}{64} = \\frac{20}{64} = \\frac{5}{16} = 0.3125$$\nRounding off to 3 decimal places gives $0.313$.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_PS_008",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Poisson, normal and binomial distributions",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "For a standard normal distribution $Z \\sim N(0, 1)$, the skewness and kurtosis are respectively:",
    "options": {
      "A": "$0$ and $3$",
      "B": "$1$ and $3$",
      "C": "$0$ and $0$",
      "D": "$0$ and $1$"
    },
    "correct_answer": "A",
    "solution": "For any normal distribution:\n1. Symmetry implies that the third central moment is zero, so skewness $\\gamma_1 = \\frac{\\mu_3}{\\sigma^3} = 0$.\n2. The fourth central moment is $\\mu_4 = 3\\sigma^4$, so kurtosis $\\beta_2 = \\frac{\\mu_4}{\\sigma^4} = 3$ (and excess kurtosis is $\\beta_2 - 3 = 0$).\nThus, option A is correct.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_PS_009",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Correlation and regression analysis",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "In a bivariate data set, the regression coefficient of $Y$ on $X$ is $b_{yx} = 0.8$ and the regression coefficient of $X$ on $Y$ is $b_{xy} = 0.45$. The Pearson correlation coefficient $r$ between $X$ and $Y$ is ________ (round off to 1 decimal place).",
    "correct_answer": "0.6",
    "numerical_range": {
      "min": 0.58,
      "max": 0.62
    },
    "solution": "The relationship between the regression coefficients and the correlation coefficient is:\n$$r = \\pm \\sqrt{b_{yx} \\cdot b_{xy}}$$\nSince both $b_{yx}$ and $b_{xy}$ are positive, $r$ must also be positive:\n$$r = \\sqrt{0.8 \\times 0.45} = \\sqrt{0.36} = 0.6$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_PS_010",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Correlation and regression analysis",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "If the Pearson correlation coefficient between two random variables $X$ and $Y$ is zero ($r_{xy} = 0$), it implies that:",
    "options": {
      "A": "There is no linear relationship between $X$ and $Y$",
      "B": "$X$ and $Y$ are strictly statistically independent in all cases",
      "C": "$Y$ is a deterministic quadratic function of $X$",
      "D": "The variance of $X$ equals the variance of $Y$"
    },
    "correct_answer": "A",
    "solution": "Pearson's correlation coefficient measures the degree of linear association between two variables. When $r = 0$, there is no linear association. However, $X$ and $Y$ might still have a strong non-linear relationship (such as $Y = X^2$ where $r = 0$ but $Y$ is fully determined by $X$). Thus, $r = 0$ implies no linear relationship.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_PS_011",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Correlation and regression analysis",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements is/are TRUE for the regression lines of $Y$ on $X$ and $X$ on $Y$?",
    "options": {
      "A": "Both regression lines intersect at the point of means $(\\bar{x}, \\bar{y})$",
      "B": "The regression coefficients $b_{yx}$ and $b_{xy}$ must have the same algebraic sign as the correlation coefficient $r$",
      "C": "If $|r| = 1$, the two regression lines are identical (coincident)",
      "D": "If $r = 0$, the two regression lines are mutually perpendicular"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "By classical regression analysis:\n1. The lines are $y - \\bar{y} = b_{yx}(x - \\bar{x})$ and $x - \\bar{x} = b_{xy}(y - \\bar{y})$, both passing through $(\\bar{x}, \\bar{y})$ (A is true).\n2. Since $b_{yx} = r\\frac{\\sigma_y}{\\sigma_x}$ and $b_{xy} = r\\frac{\\sigma_x}{\\sigma_y}$ and standard deviations are positive, $b_{yx}$, $b_{xy}$, and $r$ always share the same sign (B is true).\n3. When $|r| = 1$, all data points lie on a single line, so both regression lines coincide (C is true).\n4. The angle between the two lines satisfies $\\tan\\theta = \\frac{1 - r^2}{|r|}\\left(\\frac{\\sigma_x \\sigma_y}{\\sigma_x^2 + \\sigma_y^2}\\right)$. As $r \\to 0$, $\\theta \\to 90^\\circ$, so the lines become perpendicular ($y = \\bar{y}$ and $x = \\bar{x}$) (D is true).",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_NM_001",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Solutions of linear and non-linear algebraic equations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The order of convergence of the Newton–Raphson method for finding a simple real root of $f(x) = 0$ is:",
    "options": {
      "A": "1 (Linear)",
      "B": "1.618 (Golden ratio)",
      "C": "2 (Quadratic)",
      "D": "3 (Cubic)"
    },
    "correct_answer": "C",
    "solution": "The Newton–Raphson iteration formula is $x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$.\nFor a simple root (multiplicity $m = 1$), Taylor expansion gives the error relation $\\epsilon_{n+1} \\approx \\frac{f''(r)}{2f'(r)} \\epsilon_n^2$.\nHence, the rate (order) of convergence is 2 (quadratic).",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_NM_002",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Solutions of linear and non-linear algebraic equations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Using the Newton–Raphson method to find the root of $f(x) = x^2 - 5 = 0$ with an initial approximation $x_0 = 2$, the value of the next approximation $x_1$ is ________ (round off to 2 decimal places).",
    "correct_answer": "2.25",
    "numerical_range": {
      "min": 2.24,
      "max": 2.26
    },
    "solution": "The Newton–Raphson formula is:\n$$x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$$\nHere $f(x) = x^2 - 5$, so $f'(x) = 2x$.\nFor $x_0 = 2$:\n$$f(2) = 2^2 - 5 = 4 - 5 = -1$$\n$$f'(2) = 2(2) = 4$$\nSubstituting into the iteration formula:\n$$x_1 = 2 - \\frac{-1}{4} = 2 + 0.25 = 2.25$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_NM_003",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Solutions of linear and non-linear algebraic equations",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements is/are TRUE regarding iterative methods for solving non-linear algebraic equations?",
    "options": {
      "A": "The bisection method is always guaranteed to converge if $f(x)$ is continuous and $f(a)f(b) < 0$",
      "B": "The order of convergence of the secant method is approximately $1.618$",
      "C": "The Newton–Raphson method fails if $f'(x_n) = 0$ at any iteration point",
      "D": "The Regula-Falsi (false position) method retains bracketing at every iteration"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "1. The bisection method repeatedly halves a bracket containing an odd number of roots, guaranteeing linear convergence ($L = 0.5$) by the intermediate value theorem (A is true).\n2. The secant method does not evaluate derivatives and has convergence order equal to the golden ratio $\\frac{1+\\sqrt{5}}{2} \\approx 1.618$ (B is true).\n3. Division by $f'(x_n) = 0$ produces an undefined step, meaning the tangent is parallel to the x-axis (C is true).\n4. Regula-Falsi replaces one bracket boundary with the chord x-intercept such that $f(a)f(b) < 0$ is preserved (D is true).",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_NM_004",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Numerical integration – trapezoidal and Simpson's rule",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Evaluating $\\int_0^2 x^3 \\, dx$ using Simpson's $1/3$ rule with a step size $h = 1$ yields ________ (answer in integer).",
    "correct_answer": "4",
    "numerical_range": {
      "min": 4,
      "max": 4
    },
    "solution": "Given interval $[a, b] = [0, 2]$ and $h = 1$.\nThe grid points are $x_0 = 0, x_1 = 1, x_2 = 2$.\nFunction values:\n$$y_0 = f(0) = 0^3 = 0$$\n$$y_1 = f(1) = 1^3 = 1$$\n$$y_2 = f(2) = 2^3 = 8$$\nSimpson's $1/3$ rule formula:\n$$I = \\frac{h}{3} [y_0 + 4y_1 + y_2] = \\frac{1}{3} [0 + 4(1) + 8] = \\frac{12}{3} = 4$$\n(Note: Simpson's $1/3$ rule is exact for polynomials up to degree 3, and the exact integral is $\\left[\\frac{x^4}{4}\\right]_0^2 = 4$).",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_NM_005",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Numerical integration – trapezoidal and Simpson's rule",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Evaluating $\\int_0^1 \\frac{1}{1 + x} \\, dx$ using the Trapezoidal rule with a step size $h = 0.5$ yields ________ (round off to 2 decimal places).",
    "correct_answer": "0.71",
    "numerical_range": {
      "min": 0.7,
      "max": 0.72
    },
    "solution": "The interval is $[0, 1]$ with $h = 0.5$.\nThe nodes are $x_0 = 0, x_1 = 0.5, x_2 = 1.0$.\nCompute the ordinates:\n$$y_0 = f(0) = \\frac{1}{1 + 0} = 1$$\n$$y_1 = f(0.5) = \\frac{1}{1 + 0.5} = \\frac{1}{1.5} = \\frac{2}{3} \\approx 0.6667$$\n$$y_2 = f(1.0) = \\frac{1}{1 + 1} = \\frac{1}{2} = 0.5$$\nBy the Trapezoidal rule:\n$$I = \\frac{h}{2} [y_0 + 2y_1 + y_2] = \\frac{0.5}{2} \\left[ 1 + 2\\left(\\frac{2}{3}\\right) + 0.5 \\right]$$\n$$I = 0.25 \\left[ 1.5 + \\frac{4}{3} \\right] = 0.25 \\left[ \\frac{9 + 8}{6} \\right] = 0.25 \\times \\frac{17}{6} = \\frac{4.25}{6} \\approx 0.7083$$\nRounding off to 2 decimal places gives $0.71$.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_NM_006",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Numerical integration – trapezoidal and Simpson's rule",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "Simpson's $1/3$ rule of numerical integration gives the exact value of $\\int_a^b f(x) \\, dx$ when $f(x)$ is a polynomial of degree at most:",
    "options": {
      "A": "1",
      "B": "2",
      "C": "3",
      "D": "4"
    },
    "correct_answer": "C",
    "solution": "Although Simpson's $1/3$ rule is derived by fitting a quadratic parabola ($2^{\\text{nd}}$ degree polynomial) through three equidistant points, the symmetry of the truncation error term $E = -\\frac{(b-a)h^4}{180} f^{(4)}(\\xi)$ causes the third-order derivative term to vanish. Therefore, it is exact for all polynomials up to degree $3$ (cubics).",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_NM_007",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Numerical solutions of ODEs",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Given the initial value problem $\\frac{dy}{dx} = x + y$ with $y(0) = 1$. Using Euler's forward method with a step size $h = 0.1$, the value of $y(0.2)$ is ________ (round off to 2 decimal places).",
    "correct_answer": "1.22",
    "numerical_range": {
      "min": 1.21,
      "max": 1.23
    },
    "solution": "Euler's forward formula is $y_{n+1} = y_n + h f(x_n, y_n)$ with $f(x, y) = x + y$.\nGiven $x_0 = 0, y_0 = 1, h = 0.1$:\n1. First step ($x_1 = 0.1$):\n$$y_1 = y_0 + h (x_0 + y_0) = 1 + 0.1(0 + 1) = 1 + 0.1 = 1.1$$\n2. Second step ($x_2 = 0.2$):\n$$y_2 = y_1 + h (x_1 + y_1) = 1.1 + 0.1(0.1 + 1.1) = 1.1 + 0.1(1.2) = 1.1 + 0.12 = 1.22$$\nThus, $y(0.2) = 1.22$.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_NM_008",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Numerical solutions of ODEs",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "In the classical fourth-order Runge–Kutta (RK4) method for solving first-order ODEs with step size $h$, the local truncation error per step is of order:",
    "options": {
      "A": "$O(h)$",
      "B": "$O(h^3)$",
      "C": "$O(h^4)$",
      "D": "$O(h^5)$"
    },
    "correct_answer": "D",
    "solution": "In the Runge–Kutta 4th order method, the Taylor series expansion matches up to $h^4$. Therefore, the local truncation error (error committed in a single step) is $O(h^5)$. The global truncation error (accumulated error over $N = (b-a)/h$ steps) is $O(h^4)$.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_NM_009",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Numerical solutions of ODEs",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements is/are TRUE regarding Runge–Kutta methods for solving $\\frac{dy}{dx} = f(x, y)$?",
    "options": {
      "A": "Runge–Kutta methods are single-step methods that do not require prior historical steps",
      "B": "The second-order Runge–Kutta method (RK2) is equivalent to Heun's (Modified Euler) method",
      "C": "The classical RK4 method requires four function evaluations per time step",
      "D": "The standard first-order Runge–Kutta method (RK1) is identical to Euler's forward method"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "1. Unlike multistep methods (e.g. Adams–Bashforth), Runge–Kutta methods compute $y_{n+1}$ using only $(x_n, y_n)$, so they are self-starting single-step methods (A is true).\n2. RK2 with weights $k_1 = h f(x_n, y_n)$ and $k_2 = h f(x_n + h, y_n + k_1)$ and $y_{n+1} = y_n + \\frac{1}{2}(k_1 + k_2)$ is precisely Heun's method (B is true).\n3. Classical RK4 computes four slopes $k_1, k_2, k_3, k_4$, requiring 4 evaluations of $f(x, y)$ per step (C is true).\n4. RK1 evaluates $k_1 = h f(x_n, y_n)$ with $y_{n+1} = y_n + k_1$, which is Euler's forward method (D is true).",
    "difficulty": "Hard",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_083",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Eigen values and Eigen vectors",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "For the matrix $A = \\begin{pmatrix} 2 & 1 \\\\ 1 & 2 \\end{pmatrix}$, calculate the trace of the matrix $A^3$.",
    "solution": "The characteristic equation of $A$ is:\n$$\\det(A - \\lambda I) = (2 - \\lambda)^2 - 1 = \\lambda^2 - 4\\lambda + 3 = 0$$\n$$(\\lambda - 3)(\\lambda - 1) = 0 \\implies \\lambda_1 = 3, \\quad \\lambda_2 = 1$$\nThe eigenvalues of $A^3$ are $\\lambda_1^3$ and $\\lambda_2^3$:\n$$\\lambda_1^3 = 3^3 = 27$$\n$$\\lambda_2^3 = 1^3 = 1$$\nThe trace of $A^3$ is the sum of its eigenvalues:\n$$\\text{Trace}(A^3) = 27 + 1 = 28$$",
    "difficulty": "Hard",
    "correct_answer": 28,
    "answer": 28,
    "numerical_range": {
      "min": 27.5,
      "max": 28.5
    }
  },
  {
    "id": "QB_EM_084",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Cayley–Hamilton theorem",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "According to the Cayley-Hamilton theorem, every square matrix satisfies its own:",
    "solution": "The Cayley-Hamilton theorem states that every square matrix $A \\in \\mathbb{R}^{n \\times n}$ satisfies its own characteristic equation $P(\\lambda) = \\det(A - \\lambda I) = 0$, that is, $P(A) = O$.",
    "difficulty": "Easy",
    "options": {
      "A": "Adjugate matrix equation",
      "B": "Characteristic polynomial equation",
      "C": "Row-reduced echelon form",
      "D": "Singular value decomposition"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_EM_085",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Matrices and determinants",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "Consider a $3 \\times 3$ real matrix $A$ with $\\det(A) = 5$. Calculate the determinant of the matrix $2 A^{-1}$.",
    "solution": "For an $n \\times n$ matrix $A$:\n$$\\det(k A^{-1}) = k^n \\det(A^{-1}) = \\frac{k^n}{\\det(A)}$$\nHere $n = 3$, $k = 2$, and $\\det(A) = 5$:\n$$\\det(2 A^{-1}) = \\frac{2^3}{\\det(A)} = \\frac{8}{5} = 1.6$$",
    "difficulty": "Moderate",
    "correct_answer": 1.6,
    "answer": 1.6,
    "numerical_range": {
      "min": 1.55,
      "max": 1.65
    }
  },
  {
    "id": "QB_EM_086",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Solutions of linear equations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Erwin Kreyszig - Advanced Engineering Mathematics",
    "question": "For the system of linear equations:\n$$\\begin{aligned} x + y + z &= 6 \\\\ x + 2y + 3z &= 10 \\\\ x + 2y + k z &= \\mu \\end{aligned}$$\nCalculate the value of $k$ for which the system has infinitely many solutions (given $\\mu = 10$).",
    "solution": "Using row reduction on the augmented matrix $[A | B]$:\n$$\\begin{pmatrix} 1 & 1 & 1 & | & 6 \\\\ 1 & 2 & 3 & | & 10 \\\\ 1 & 2 & k & | & \\mu \\end{pmatrix}$$\nRow operations $R_2 \\to R_2 - R_1$ and $R_3 \\to R_3 - R_2$:\n$$\\begin{pmatrix} 1 & 1 & 1 & | & 6 \\\\ 0 & 1 & 2 & | & 4 \\\\ 0 & 0 & k - 3 & | & \\mu - 10 \\end{pmatrix}$$\nFor infinitely many solutions, the rank of $A$ must equal the rank of $[A|B] < 3$:\n$$k - 3 = 0 \\implies k = 3$$\nand $\\mu - 10 = 0 \\implies \\mu = 10$.",
    "difficulty": "Moderate",
    "correct_answer": 3,
    "answer": 3,
    "numerical_range": {
      "min": 2.95,
      "max": 3.05
    }
  },
  {
    "id": "QB_EM_087",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Linear and orthogonal transformations",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "Which of the following statements are TRUE for any real orthogonal matrix $Q$ ($Q^T Q = I$)?",
    "solution": "- A is true: $\\det(Q^T Q) = [\\det(Q)]^2 = 1 \\implies \\det(Q) = \\pm 1$.\n- B is true: For $Q x = \\lambda x$, $\\|Q x\\| = \\|x\\| \\implies |\\lambda| = 1$.\n- C is true: $Q^T Q = I$ means $q_i^T q_j = \\delta_{ij}$, an orthonormal basis.\n- D is false: Orthogonal matrices need not be symmetric (e.g., standard 2D rotation matrix for $\\theta \\ne 0$).",
    "difficulty": "Hard",
    "options": {
      "A": "The determinant of $Q$ can only be $+1$ or $-1$",
      "B": "The absolute value (modulus) of each of its eigenvalues is equal to $1$",
      "C": "The column vectors of $Q$ form an orthonormal set",
      "D": "The matrix $Q$ is always symmetric ($Q = Q^T$)"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "answer": [
      "A",
      "B",
      "C"
    ]
  },
  {
    "id": "QB_EM_088",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Limit, continuity and differentiability",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "Evaluate the limit:\n$$L = \\lim_{x \\to 0} \\frac{\\sin(3x) - 3x}{x^3}$$",
    "solution": "Using Maclaurin expansion of $\\sin(3x)$:\n$$\\sin(3x) = 3x - \\frac{(3x)^3}{3!} + \\frac{(3x)^5}{5!} - \\dots = 3x - \\frac{27 x^3}{6} + O(x^5) = 3x - 4.5 x^3 + O(x^5)$$\nSubstituting into limit:\n$$L = \\lim_{x \\to 0} \\frac{(3x - 4.5 x^3) - 3x}{x^3} = \\lim_{x \\to 0} \\frac{-4.5 x^3}{x^3} = -4.5$$",
    "difficulty": "Moderate",
    "correct_answer": -4.5,
    "answer": -4.5,
    "numerical_range": {
      "min": -4.6,
      "max": -4.4
    }
  },
  {
    "id": "QB_EM_089",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Fourier, Taylor and MacLaurin series",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Erwin Kreyszig - Advanced Engineering Mathematics",
    "question": "The coefficient of $(x - 2)^3$ in the Taylor series expansion of $f(x) = e^{2x}$ about $x = 2$ is $C e^4$. Calculate the numerical value of $C$.",
    "solution": "Taylor series coefficient for $(x - a)^n$ is $\\frac{f^{(n)}(a)}{n!}$.\nHere $f(x) = e^{2x}$, $a = 2$, $n = 3$.\n$$f'(x) = 2 e^{2x}, \\quad f''(x) = 4 e^{2x}, \\quad f'''(x) = 8 e^{2x}$$\n$$f'''(2) = 8 e^4$$\n$$\\text{Coefficient} = \\frac{8 e^4}{3!} = \\frac{8 e^4}{6} = \\frac{4}{3} e^4 \\approx 1.333 e^4$$\nSo $C = \\frac{4}{3} \\approx 1.333$.",
    "difficulty": "Hard",
    "correct_answer": 1.333,
    "answer": 1.333,
    "numerical_range": {
      "min": 1.3,
      "max": 1.35
    }
  },
  {
    "id": "QB_EM_090",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Homogeneous function – Euler's theorem on homogeneous functions",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "If $u = \\sin^{-1}\\left( \\frac{x^3 + y^3}{x + y} \\right)$, calculate the value of $x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y}$ when $u = \\frac{\\pi}{6}$.",
    "solution": "Let $z = \\sin(u) = \\frac{x^3 + y^3}{x + y}$.\n$z$ is a homogeneous function of degree $n = 3 - 1 = 2$.\nBy Euler's theorem for homogeneous functions:\n$$x \\frac{\\partial z}{\\partial x} + y \\frac{\\partial z}{\\partial y} = n z = 2 z$$\nSince $z = \\sin(u)$:\n$$\\frac{\\partial z}{\\partial x} = \\cos(u) \\frac{\\partial u}{\\partial x}, \\quad \\frac{\\partial z}{\\partial y} = \\cos(u) \\frac{\\partial u}{\\partial y}$$\n$$\\cos(u) \\left( x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} \\right) = 2 \\sin(u)$$\n$$x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = 2 \\tan(u)$$\nFor $u = \\frac{\\pi}{6}$ ($30^\\circ$):\n$$2 \\tan(30^\\circ) = 2 \\times \\frac{1}{\\sqrt{3}} = \\frac{2}{1.732} \\approx 1.1547$$",
    "difficulty": "Moderate",
    "correct_answer": 1.155,
    "answer": 1.155,
    "numerical_range": {
      "min": 1.12,
      "max": 1.18
    }
  },
  {
    "id": "QB_EM_091",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Maxima and minima of function with several independent variables",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "Find the local minimum value of the function $f(x, y) = x^2 + 2y^2 - 4x - 4y + 10$.",
    "solution": "Completing the squares:\n$$f(x, y) = (x^2 - 4x + 4) + 2(y^2 - 2y + 1) + 10 - 4 - 2$$\n$$f(x, y) = (x - 2)^2 + 2(y - 1)^2 + 4$$\nSince $(x - 2)^2 \\ge 0$ and $2(y - 1)^2 \\ge 0$, the minimum value is $4$, occurring at $(x, y) = (2, 1)$.",
    "difficulty": "Moderate",
    "correct_answer": 4,
    "answer": 4,
    "numerical_range": {
      "min": 3.95,
      "max": 4.05
    }
  },
  {
    "id": "QB_EM_092",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Scalar and vector point functions",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "Calculate the directional derivative of $\\phi(x, y, z) = 2xy + z^2$ at the point $P(1, 2, 3)$ in the direction of the vector $\\vec{v} = 3\\hat{i} + 4\\hat{j}$.",
    "solution": "Gradient $\\nabla \\phi = \\frac{\\partial \\phi}{\\partial x}\\hat{i} + \\frac{\\partial \\phi}{\\partial y}\\hat{j} + \\frac{\\partial \\phi}{\\partial z}\\hat{k}$:\n$$\\nabla \\phi = (2y)\\hat{i} + (2x)\\hat{j} + (2z)\\hat{k}$$\nAt $P(1, 2, 3)$:\n$$\\nabla \\phi = 2(2)\\hat{i} + 2(1)\\hat{j} + 2(3)\\hat{k} = 4\\hat{i} + 2\\hat{j} + 6\\hat{k}$$\nUnit vector in direction of $\\vec{v}$:\n$$\\hat{u} = \\frac{3\\hat{i} + 4\\hat{j}}{\\sqrt{3^2 + 4^2}} = \\frac{3}{5}\\hat{i} + \\frac{4}{5}\\hat{j}$$\nDirectional derivative:\n$$D_{\\hat{u}} = \\nabla \\phi \\cdot \\hat{u} = \\left(4 \\times \\frac{3}{5}\\right) + \\left(2 \\times \\frac{4}{5}\\right) + (6 \\times 0) = \\frac{12 + 8}{5} = \\frac{20}{5} = 4.0$$",
    "difficulty": "Moderate",
    "correct_answer": 4,
    "answer": 4,
    "numerical_range": {
      "min": 3.95,
      "max": 4.05
    }
  },
  {
    "id": "QB_EM_093",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Divergence and curl",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "A vector field $\\vec{F}$ is solenoidal if and only if:",
    "solution": "A vector field is solenoidal (divergence-free) if $\\nabla \\cdot \\vec{F} = 0$. If $\\nabla \\times \\vec{F} = 0$, the vector field is irrotational (conservative).",
    "difficulty": "Moderate",
    "options": {
      "A": "$\\nabla \\times \\vec{F} = 0$",
      "B": "$\\nabla \\cdot \\vec{F} = 0$",
      "C": "$\\nabla (\\nabla \\cdot \\vec{F}) = 0$",
      "D": "$\\nabla^2 \\vec{F} = 0$"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_EM_094",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Physical interpretations – line, surface and volume integrals",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Erwin Kreyszig - Advanced Engineering Mathematics",
    "question": "Using Gauss Divergence Theorem, evaluate the outward surface integral $\\iint_S \\vec{F} \\cdot \\hat{n}\\, dS$, where $\\vec{F} = 2x\\hat{i} + 3y\\hat{j} + 4z\\hat{k}$ and $S$ is the surface of a sphere of radius $R = 1$ centered at origin. (Take $\\pi = 3.1416$)",
    "solution": "By Gauss Divergence Theorem:\n$$\\iint_S \\vec{F} \\cdot \\hat{n}\\, dS = \\iiint_V (\\nabla \\cdot \\vec{F})\\, dV$$\n$$\\nabla \\cdot \\vec{F} = \\frac{\\partial(2x)}{\\partial x} + \\frac{\\partial(3y)}{\\partial y} + \\frac{\\partial(4z)}{\\partial z} = 2 + 3 + 4 = 9$$\nVolume of unit sphere $V = \\frac{4}{3} \\pi R^3 = \\frac{4}{3} \\pi (1)^3 = \\frac{4\\pi}{3}$:\n$$\\iint_S \\vec{F} \\cdot \\hat{n}\\, dS = 9 \\times \\frac{4\\pi}{3} = 12\\pi = 12 \\times 3.14159 \\approx 37.70$$",
    "difficulty": "Hard",
    "correct_answer": 37.7,
    "answer": 37.7,
    "numerical_range": {
      "min": 37.5,
      "max": 37.9
    }
  },
  {
    "id": "QB_EM_095",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Sequences and series – infinite series, tests for convergence",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "The p-series $\\sum_{n=1}^\\infty \\frac{1}{n^p}$ converges if and only if:",
    "solution": "By the integral test for p-series, $\\sum_{n=1}^\\infty \\frac{1}{n^p}$ converges strictly when $p > 1$. For $p = 1$, it is the harmonic series which diverges to infinity.",
    "difficulty": "Easy",
    "options": {
      "A": "$p > 1$",
      "B": "$p \\ge 1$",
      "C": "$p < 1$",
      "D": "$p \\le 0$"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_EM_096",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Eigen values and Eigen vectors",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "For a real skew-symmetric matrix $A$ ($A^T = -A$), which of the following statements must be TRUE?",
    "solution": "- A is true: $a_{ii} = -a_{ii} \\implies a_{ii} = 0$.\n- B is true: For skew-symmetric real matrices, eigenvalues are of the form $i \\beta$ (purely imaginary or 0).\n- C is true: $\\det(A) = \\det(A^T) = \\det(-A) = (-1)^n \\det(A)$. For odd $n$, $\\det(A) = -\\det(A) \\implies \\det(A) = 0$.\n- D is false: Any odd-order skew-symmetric matrix has determinant zero and is singular (non-invertible).",
    "difficulty": "Hard",
    "options": {
      "A": "All diagonal elements of $A$ are zero",
      "B": "All eigenvalues of $A$ are purely imaginary or zero",
      "C": "The determinant of $A$ is zero if $A$ is of odd order",
      "D": "The matrix $A$ is always invertible"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "answer": [
      "A",
      "B",
      "C"
    ]
  },
  {
    "id": "QB_EM_097",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Partial derivatives",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "If $z = e^{xy}$, calculate the value of $\\frac{\\partial^2 z}{\\partial x \\partial y}$ evaluated at $x = 1, y = 1$. (Give answer as a multiple of $e$, i.e. $\\text{Value} / e$)",
    "solution": "$$\\frac{\\partial z}{\\partial y} = x e^{xy}$$\n$$\\frac{\\partial^2 z}{\\partial x \\partial y} = \\frac{\\partial}{\\partial x}(x e^{xy}) = e^{xy} + x(y e^{xy}) = (1 + xy) e^{xy}$$\nAt $x = 1, y = 1$:\n$$\\frac{\\partial^2 z}{\\partial x \\partial y} = (1 + 1) e^{1} = 2 e$$\nValue divided by $e$ is $2.0$.",
    "difficulty": "Moderate",
    "correct_answer": 2,
    "answer": 2,
    "numerical_range": {
      "min": 1.95,
      "max": 2.05
    }
  },
  {
    "id": "QB_EM_098",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Divergence and curl",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "For the vector field $\\vec{F} = (4y)\\hat{i} + (x)\\hat{j} + (2z)\\hat{k}$, calculate the magnitude of the curl $|\\nabla \\times \\vec{F}|$.",
    "solution": "The curl of $\\vec{F}$ is given by:\n$$\\nabla \\times \\vec{F} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ \\frac{\\partial}{\\partial x} & \\frac{\\partial}{\\partial y} & \\frac{\\partial}{\\partial z} \\\\ 4y & x & 2z \\end{vmatrix}$$\nComponents:\n$$\\hat{i}: \\frac{\\partial(2z)}{\\partial y} - \\frac{\\partial(x)}{\\partial z} = 0 - 0 = 0$$\n$$\\hat{j}: -\\left(\\frac{\\partial(2z)}{\\partial x} - \\frac{\\partial(4y)}{\\partial z}\\right) = 0 - 0 = 0$$\n$$\\hat{k}: \\frac{\\partial(x)}{\\partial x} - \\frac{\\partial(4y)}{\\partial y} = 1 - 4 = -3$$\n$$\\nabla \\times \\vec{F} = -3\\hat{k}$$\nMagnitude:\n$$|\\nabla \\times \\vec{F}| = |-3| = 3.0$$",
    "difficulty": "Moderate",
    "correct_answer": 3,
    "answer": 3,
    "numerical_range": {
      "min": 2.95,
      "max": 3.05
    }
  },
  {
    "id": "QB_EM_099",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Eigen values and Eigen vectors",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "If the eigenvalues of a $3 \\times 3$ matrix $A$ are $1, -2,$ and $4$, calculate the determinant of $A$.",
    "solution": "The determinant of a square matrix is the product of its eigenvalues:\n$$\\det(A) = \\lambda_1 \\times \\lambda_2 \\times \\lambda_3 = 1 \\times (-2) \\times 4 = -8.0$$",
    "difficulty": "Moderate",
    "correct_answer": -8,
    "answer": -8,
    "numerical_range": {
      "min": -8.1,
      "max": -7.9
    }
  },
  {
    "id": "QB_EM_100",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Total differentiation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "A right circular cone has radius $r = 10\\text{ cm}$ and height $h = 20\\text{ cm}$. If radius increases by $1\\%$ and height decreases by $1\\%$, calculate the approximate percentage change in its volume.",
    "solution": "Volume of a cone $V = \\frac{1}{3} \\pi r^2 h$.\nTaking natural logarithm:\n$$\\ln V = \\ln\\left(\\frac{\\pi}{3}\\right) + 2 \\ln r + \\ln h$$\nDifferentiating totally:\n$$\\frac{dV}{V} = 2 \\frac{dr}{r} + \\frac{dh}{h}$$\nGiven $\\frac{dr}{r} = +1\\% = +0.01$ and $\\frac{dh}{h} = -1\\% = -0.01$:\n$$\\frac{dV}{V} = 2(+1\\%) + (-1\\%) = +2\\% - 1\\% = +1.0\\%$$",
    "difficulty": "Moderate",
    "correct_answer": 1,
    "answer": 1,
    "numerical_range": {
      "min": 0.95,
      "max": 1.05
    }
  },
  {
    "id": "QB_EM_101",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Matrices and determinants",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "Calculate the rank of the matrix:\n$$A = \\begin{pmatrix} 1 & 2 & 3 \\\\ 2 & 4 & 6 \\\\ 3 & 6 & 9 \\end{pmatrix}$$",
    "solution": "Notice that row 2 is $2 \\times R_1$ and row 3 is $3 \\times R_1$. Performing row operations $R_2 \\to R_2 - 2 R_1$ and $R_3 \\to R_3 - 3 R_1$ yields:\n$$\\begin{pmatrix} 1 & 2 & 3 \\\\ 0 & 0 & 0 \\\\ 0 & 0 & 0 \\end{pmatrix}$$\nThere is only 1 non-zero row in echelon form, so $\\text{rank}(A) = 1$.",
    "difficulty": "Moderate",
    "correct_answer": 1,
    "answer": 1,
    "numerical_range": {
      "min": 0.95,
      "max": 1.05
    }
  },
  {
    "id": "QB_EM_102",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Limit, continuity and differentiability",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "Evaluate the limit:\n$$L = \\lim_{x \\to 0} (1 + 2x)^{1/x}$$",
    "solution": "This is of indeterminate form $1^\\infty$.\n$$\\ln L = \\lim_{x \\to 0} \\frac{\\ln(1 + 2x)}{x}$$\nApplying L'Hopital's rule:\n$$\\ln L = \\lim_{x \\to 0} \\frac{\\frac{2}{1 + 2x}}{1} = 2$$\n$$L = e^2 \\approx 7.389$$",
    "difficulty": "Moderate",
    "correct_answer": 7.389,
    "answer": 7.389,
    "numerical_range": {
      "min": 7.3,
      "max": 7.5
    }
  },
  {
    "id": "QB_EM_103",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Scalar and vector point functions",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "If $\\vec{r} = x\\hat{i} + y\\hat{j} + z\\hat{k}$ and $r = |\\vec{r}|$, calculate the value of $\\nabla \\cdot \\vec{r}$.",
    "solution": "$$\\nabla \\cdot \\vec{r} = \\frac{\\partial x}{\\partial x} + \\frac{\\partial y}{\\partial y} + \\frac{\\partial z}{\\partial z} = 1 + 1 + 1 = 3.0$$",
    "difficulty": "Moderate",
    "correct_answer": 3,
    "answer": 3,
    "numerical_range": {
      "min": 2.95,
      "max": 3.05
    }
  },
  {
    "id": "QB_EM_104",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Physical interpretations – line, surface and volume integrals",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Erwin Kreyszig - Advanced Engineering Mathematics",
    "question": "Using Green's theorem in the plane, evaluate the line integral $\\oint_C (x^2 - y) dx + (x + y^2) dy$ around the counterclockwise circular path $C: x^2 + y^2 = 4$. (Take $\\pi = 3.1416$)",
    "solution": "By Green's theorem:\n$$\\oint_C M dx + N dy = \\iint_R \\left( \\frac{\\partial N}{\\partial x} - \\frac{\\partial M}{\\partial y} \\right) dA$$\nHere $M = x^2 - y$ and $N = x + y^2$:\n$$\\frac{\\partial N}{\\partial x} = 1, \\quad \\frac{\\partial M}{\\partial y} = -1$$\n$$\\frac{\\partial N}{\\partial x} - \\frac{\\partial M}{\\partial y} = 1 - (-1) = 2$$\n$$\\oint_C M dx + N dy = \\iint_R 2\\, dA = 2 \\times \\text{Area}(R)$$\nRegion $R$ is circle of radius $R = 2$, area $\\pi (2)^2 = 4\\pi$:\n$$\\text{Integral} = 2 \\times 4\\pi = 8\\pi = 8 \\times 3.14159 \\approx 25.132$$",
    "difficulty": "Moderate",
    "correct_answer": 25.13,
    "answer": 25.13,
    "numerical_range": {
      "min": 25,
      "max": 25.3
    }
  },
  {
    "id": "QB_EM_105",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Eigen values and Eigen vectors",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "A $2 \\times 2$ matrix has trace $7$ and determinant $10$. Calculate the largest eigenvalue of the matrix.",
    "solution": "The characteristic equation of a $2 \\times 2$ matrix is:\n$$\\lambda^2 - \\text{Tr}(A) \\lambda + \\det(A) = 0$$\n$$\\lambda^2 - 7\\lambda + 10 = 0$$\n$$(\\lambda - 5)(\\lambda - 2) = 0$$\nEigenvalues are $\\lambda_1 = 5$ and $\\lambda_2 = 2$.\nThe largest eigenvalue is $5.0$.",
    "difficulty": "Hard",
    "correct_answer": 5,
    "answer": 5,
    "numerical_range": {
      "min": 4.95,
      "max": 5.05
    }
  },
  {
    "id": "QB_EM_106",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Maxima and minima of function with several independent variables",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "For a function $f(x, y)$ with stationary point $(a, b)$, let $r = f_{xx}, s = f_{xy}, t = f_{yy}$. A saddle point occurs if:",
    "solution": "The discriminant is $D = r t - s^2$:\n- If $D > 0$ and $r > 0$: Local minimum.\n- If $D > 0$ and $r < 0$: Local maximum.\n- If $D < 0$: Saddle point.\n- If $D = 0$: Test is inconclusive.",
    "difficulty": "Easy",
    "options": {
      "A": "$r t - s^2 > 0$ and $r > 0$",
      "B": "$r t - s^2 > 0$ and $r < 0$",
      "C": "$r t - s^2 < 0$",
      "D": "$r t - s^2 = 0$"
    },
    "correct_answer": "C",
    "answer": "C"
  },
  {
    "id": "QB_EM_107",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Divergence and curl",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "For any twice continuously differentiable scalar field $\\phi$, calculate the value of $|\\nabla \\times (\\nabla \\phi)|$.",
    "solution": "The curl of the gradient of any smooth scalar field is identically zero:\n$$\\nabla \\times (\\nabla \\phi) = \\vec{0} \\implies |\\nabla \\times (\\nabla \\phi)| = 0$$",
    "difficulty": "Easy",
    "correct_answer": 0,
    "answer": 0,
    "numerical_range": {
      "min": -0.01,
      "max": 0.01
    }
  },
  {
    "id": "QB_EM_108",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Linear and non-linear first order Ordinary Differential Equations (ODE)",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "Find the integrating factor $I(x)$ for the linear first-order differential equation $\\frac{dy}{dx} + \\frac{2}{x} y = x^3$ (for $x > 0$). Calculate the value of $I(x)$ at $x = 3$.",
    "solution": "The standard linear form is $\\frac{dy}{dx} + P(x) y = Q(x)$ where $P(x) = \\frac{2}{x}$.\nThe integrating factor is:\n$$I(x) = e^{\\int P(x) dx} = e^{\\int \\frac{2}{x} dx} = e^{2 \\ln x} = e^{\\ln(x^2)} = x^2$$\nAt $x = 3$:\n$$I(3) = 3^2 = 9.0$$",
    "difficulty": "Hard",
    "correct_answer": 9,
    "answer": 9,
    "numerical_range": {
      "min": 8.95,
      "max": 9.05
    }
  },
  {
    "id": "QB_EM_109",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Higher order linear ODEs with constant coefficients",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "For the differential equation $\\frac{d^2 y}{dx^2} - 6\\frac{dy}{dx} + 9y = 0$ with initial conditions $y(0) = 1$ and $y'(0) = 5$, calculate the value of $y(1) / e^3$.",
    "solution": "Characteristic equation:\n$$m^2 - 6m + 9 = 0 \\implies (m - 3)^2 = 0 \\implies m = 3, 3$$\nGeneral solution for repeated roots:\n$$y(x) = (C_1 + C_2 x) e^{3x}$$\nAt $x = 0$:\n$$y(0) = C_1 = 1$$\nDerivative:\n$$y'(x) = C_2 e^{3x} + 3(C_1 + C_2 x) e^{3x}$$\n$$y'(0) = C_2 + 3 C_1 = C_2 + 3(1) = 5 \\implies C_2 = 2$$\nThus, $y(x) = (1 + 2x) e^{3x}$.\nAt $x = 1$:\n$$y(1) = (1 + 2(1)) e^3 = 3 e^3$$\n$$y(1)/e^3 = 3.0$$",
    "difficulty": "Hard",
    "correct_answer": 3,
    "answer": 3,
    "numerical_range": {
      "min": 2.95,
      "max": 3.05
    }
  },
  {
    "id": "QB_EM_110",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Laplace transforms and their inverse",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Erwin Kreyszig - Advanced Engineering Mathematics",
    "question": "The Laplace transform of $f(t) = t^2 e^{3t}$ is given by:",
    "solution": "By the first shifting theorem, $\\mathcal{L}\\{e^{at} f(t)\\} = F(s - a)$.\nSince $\\mathcal{L}\\{t^2\\} = \\frac{2!}{s^3} = \\frac{2}{s^3}$, shifting with $a = 3$ yields:\n$$\\mathcal{L}\\{t^2 e^{3t}\\} = \\frac{2}{(s - 3)^3}$$",
    "difficulty": "Moderate",
    "options": {
      "A": "$\\frac{2}{(s - 3)^3}$",
      "B": "$\\frac{1}{(s - 3)^3}$",
      "C": "$\\frac{2}{(s + 3)^3}$",
      "D": "$\\frac{6}{(s - 3)^2}$"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_EM_111",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Partial Differential Equations – Laplace, heat and wave equations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "The one-dimensional heat conduction equation $\\frac{\\partial u}{\\partial t} = \\alpha \\frac{\\partial^2 u}{\\partial x^2}$ is classified as:",
    "solution": "For a second order PDE $A u_{xx} + B u_{xt} + C u_{tt} + \\dots = 0$, the discriminant is $B^2 - 4AC$.\nHere $A = \\alpha, B = 0, C = 0$, so $B^2 - 4AC = 0$, which classifies the heat equation as parabolic. (The wave equation is hyperbolic with $B^2 - 4AC > 0$, and Laplace equation is elliptic with $B^2 - 4AC < 0$).",
    "difficulty": "Moderate",
    "options": {
      "A": "Elliptic partial differential equation",
      "B": "Parabolic partial differential equation",
      "C": "Hyperbolic partial differential equation",
      "D": "Ultra-hyperbolic partial differential equation"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_EM_112",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Random variables",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "A continuous random variable $X$ has probability density function $f(x) = k x (2 - x)$ for $0 \\le x \\le 2$ and $0$ elsewhere. Calculate the value of the constant $k$.",
    "solution": "For a valid probability density function, $\\int_{-\\infty}^\\infty f(x) dx = 1$:\n$$k \\int_0^2 (2x - x^2) dx = 1$$\n$$k \\left[ x^2 - \\frac{x^3}{3} \\right]_0^2 = 1$$\n$$k \\left[ 4 - \\frac{8}{3} \\right] = k \\left( \\frac{4}{3} \\right) = 1$$\n$$k = \\frac{3}{4} = 0.75$$",
    "difficulty": "Moderate",
    "correct_answer": 0.75,
    "answer": 0.75,
    "numerical_range": {
      "min": 0.74,
      "max": 0.76
    }
  },
  {
    "id": "QB_EM_113",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Poisson, normal and binomial distributions",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "If a random variable $X$ follows a Poisson distribution such that $P(X = 1) = P(X = 2)$, calculate the mean $\\lambda$ of the distribution.",
    "solution": "For a Poisson distribution, $P(X = k) = \\frac{e^{-\\lambda} \\lambda^k}{k!}$.\n$$P(X = 1) = \\frac{e^{-\\lambda} \\lambda^1}{1!} = \\lambda e^{-\\lambda}$$\n$$P(X = 2) = \\frac{e^{-\\lambda} \\lambda^2}{2!} = \\frac{\\lambda^2 e^{-\\lambda}}{2}$$\nEquating the two:\n$$\\lambda e^{-\\lambda} = \\frac{\\lambda^2 e^{-\\lambda}}{2}$$\nSince $\\lambda > 0$ and $e^{-\\lambda} \\ne 0$:\n$$1 = \\frac{\\lambda}{2} \\implies \\lambda = 2.0$$",
    "difficulty": "Moderate",
    "correct_answer": 2,
    "answer": 2,
    "numerical_range": {
      "min": 1.95,
      "max": 2.05
    }
  },
  {
    "id": "QB_EM_114",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Poisson, normal and binomial distributions",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "In a binomial distribution with parameters $n = 100$ and $p = 0.20$, calculate the standard deviation $\\sigma$ of the distribution.",
    "solution": "For a binomial distribution $B(n, p)$:\n$$\\text{Variance } \\sigma^2 = n p q$$\nWhere $q = 1 - p = 1 - 0.20 = 0.80$.\n$$\\sigma^2 = 100 \\times 0.20 \\times 0.80 = 16$$\n$$\\sigma = \\sqrt{16} = 4.0$$",
    "difficulty": "Moderate",
    "correct_answer": 4,
    "answer": 4,
    "numerical_range": {
      "min": 3.95,
      "max": 4.05
    }
  },
  {
    "id": "QB_EM_115",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Correlation and regression analysis",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "The two regression lines are given by $3x + 2y = 26$ and $6x + y = 31$. Calculate the correlation coefficient $r$ between $x$ and $y$.",
    "solution": "Let the regression line of $y$ on $x$ be $3x + 2y = 26 \\implies 2y = -3x + 26 \\implies y = -\\frac{3}{2} x + 13$, so $b_{yx} = -1.5$.\nThen the regression line of $x$ on $y$ is $6x + y = 31 \\implies 6x = -y + 31 \\implies x = -\\frac{1}{6} y + \\frac{31}{6}$, so $b_{xy} = -\\frac{1}{6}$.\nChecking product:\n$$b_{yx} \\times b_{xy} = (-1.5) \\times \\left(-\\frac{1}{6}\\right) = \\frac{1.5}{6} = 0.25 \\le 1$$\nThis is a valid assignment. The correlation coefficient is:\n$$r = -\\sqrt{b_{yx} \\times b_{xy}} = -\\sqrt{0.25} = -0.5$$",
    "difficulty": "Moderate",
    "correct_answer": -0.5,
    "answer": -0.5,
    "numerical_range": {
      "min": -0.52,
      "max": -0.48
    }
  },
  {
    "id": "QB_EM_116",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Solutions of linear and non-linear algebraic equations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "Newton-Raphson method is used to find a root of $f(x) = x^2 - 5 = 0$. If the initial guess is $x_0 = 2.0$, calculate the approximation $x_1$ after the first iteration.",
    "solution": "Newton-Raphson formula:\n$$x_1 = x_0 - \\frac{f(x_0)}{f'(x_0)}$$\nHere $f(x) = x^2 - 5$, $f'(x) = 2x$.\nAt $x_0 = 2.0$:\n$$f(2.0) = 2^2 - 5 = -1$$\n$$f'(2.0) = 2(2) = 4$$\n$$x_1 = 2.0 - \\frac{-1}{4} = 2.0 + 0.25 = 2.25$$",
    "difficulty": "Moderate",
    "correct_answer": 2.25,
    "answer": 2.25,
    "numerical_range": {
      "min": 2.24,
      "max": 2.26
    }
  },
  {
    "id": "QB_EM_117",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Solutions of linear and non-linear algebraic equations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "Erwin Kreyszig - Advanced Engineering Mathematics",
    "question": "The order of convergence of the Newton-Raphson method for a simple real root is:",
    "solution": "Newton-Raphson method has quadratic convergence (order $p = 2$) near a simple root ($f'(r) \\ne 0$), meaning the number of correct decimal digits roughly doubles with each iteration.",
    "difficulty": "Easy",
    "options": {
      "A": "1 (Linear)",
      "B": "2 (Quadratic)",
      "C": "1.618 (Super-linear)",
      "D": "3 (Cubic)"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_EM_118",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Numerical integration – trapezoidal and Simpson's rule",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "Evaluate $\\int_0^2 x^3 dx$ using Simpson's $1/3$ rule with a step size of $h = 1.0$.",
    "solution": "Given $h = 1.0$, intervals: $x_0 = 0, x_1 = 1, x_2 = 2$.\nFunction values $y = x^3$:\n$$y_0 = 0^3 = 0$$\n$$y_1 = 1^3 = 1$$\n$$y_2 = 2^3 = 8$$\nSimpson's $1/3$ rule:\n$$I = \\frac{h}{3} [y_0 + 4y_1 + y_2] = \\frac{1}{3} [0 + 4(1) + 8] = \\frac{12}{3} = 4.0$$\n(Note: Simpson's rule integrates polynomials of degree up to 3 exactly).",
    "difficulty": "Moderate",
    "correct_answer": 4,
    "answer": 4,
    "numerical_range": {
      "min": 3.95,
      "max": 4.05
    }
  },
  {
    "id": "QB_EM_119",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Numerical integration – trapezoidal and Simpson's rule",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "Evaluate $\\int_0^2 x^2 dx$ using the Trapezoidal rule with $2$ equal sub-intervals ($h = 1.0$).",
    "solution": "Points: $x_0 = 0, x_1 = 1, x_2 = 2$.\nFunction values $y = x^2$:\n$$y_0 = 0^2 = 0$$\n$$y_1 = 1^2 = 1$$\n$$y_2 = 2^2 = 4$$\nTrapezoidal rule:\n$$I = \\frac{h}{2} [y_0 + 2y_1 + y_2] = \\frac{1}{2} [0 + 2(1) + 4] = \\frac{6}{2} = 3.0$$",
    "difficulty": "Moderate",
    "correct_answer": 3,
    "answer": 3,
    "numerical_range": {
      "min": 2.95,
      "max": 3.05
    }
  },
  {
    "id": "QB_EM_120",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Numerical solutions of ODEs",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Erwin Kreyszig - Advanced Engineering Mathematics",
    "question": "Using Euler's method with a step size of $h = 0.1$, find the value of $y(0.2)$ for the initial value problem $\\frac{dy}{dx} = x + y$, with $y(0) = 1$.",
    "solution": "Step 1: at $x_0 = 0, y_0 = 1$:\n$$f(x_0, y_0) = 0 + 1 = 1$$\n$$y_1 = y_0 + h f(x_0, y_0) = 1 + (0.1)(1) = 1.1$$\nat $x_1 = 0.1$.\n\nStep 2: at $x_1 = 0.1, y_1 = 1.1$:\n$$f(x_1, y_1) = 0.1 + 1.1 = 1.2$$\n$$y_2 = y_1 + h f(x_1, y_1) = 1.1 + (0.1)(1.2) = 1.1 + 0.12 = 1.22$$",
    "difficulty": "Moderate",
    "correct_answer": 1.22,
    "answer": 1.22,
    "numerical_range": {
      "min": 1.21,
      "max": 1.23
    }
  },
  {
    "id": "QB_EM_121",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Homogeneous differential equations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "The differential equation $\\frac{dy}{dx} = \\frac{x^2 + y^2}{2xy}$ can be transformed into a separable ODE by substituting:",
    "solution": "The numerator $x^2 + y^2$ and denominator $2xy$ are both homogeneous functions of degree 2. Hence, substituting $y = v x$ (where $\\frac{dy}{dx} = v + x \\frac{dv}{dx}$) reduces the ODE to variables separable in $v$ and $x$.",
    "difficulty": "Moderate",
    "options": {
      "A": "$y = v x$",
      "B": "$y = v + x$",
      "C": "$y = v x^2$",
      "D": "$y = \\frac{v}{x}$"
    },
    "correct_answer": "A",
    "answer": "A"
  },
  {
    "id": "QB_EM_122",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Mean, median, mode and standard deviation",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "For a moderately skewed frequency distribution, the mean is $45$ and the median is $42$. Using Karl Pearson's empirical formula, calculate the mode of the distribution.",
    "solution": "Karl Pearson's empirical relationship is:\n$$\\text{Mode} = 3(\\text{Median}) - 2(\\text{Mean})$$\n$$\\text{Mode} = 3(42) - 2(45) = 126 - 90 = 36.0$$",
    "difficulty": "Moderate",
    "correct_answer": 36,
    "answer": 36,
    "numerical_range": {
      "min": 35.5,
      "max": 36.5
    }
  },
  {
    "id": "QB_EM_123",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Random variables",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "For any two independent random variables $X$ and $Y$, which of the following mathematical properties are ALWAYS satisfied?",
    "solution": "- A is true: Independence implies product expectation factorizes.\n- B is true: $\\text{Var}(X + Y) = \\text{Var}(X) + \\text{Var}(Y) + 2\\text{Cov}(X, Y) = \\text{Var}(X) + \\text{Var}(Y)$.\n- C is true: Covariance is identically zero for independent variables.\n- D is false: $\\text{Var}(X - Y) = \\text{Var}(X) + \\text{Var}(Y) - 2\\text{Cov}(X, Y) = \\text{Var}(X) + \\text{Var}(Y)$, variances add.",
    "difficulty": "Hard",
    "options": {
      "A": "$E(X Y) = E(X) \\cdot E(Y)$",
      "B": "$\\text{Var}(X + Y) = \\text{Var}(X) + \\text{Var}(Y)$",
      "C": "$\\text{Cov}(X, Y) = 0$",
      "D": "$\\text{Var}(X - Y) = \\text{Var}(X) - \\text{Var}(Y)$"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "answer": [
      "A",
      "B",
      "C"
    ]
  },
  {
    "id": "QB_EM_124",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Solutions of linear and non-linear algebraic equations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "Erwin Kreyszig - Advanced Engineering Mathematics",
    "question": "In the Bisection method to isolate a real root of $f(x) = 0$ in the initial bracket $[1, 9]$, calculate the minimum number of bisection iterations required to guarantee an absolute error of less than $0.01$.",
    "solution": "The interval length after $n$ iterations is $\\frac{b - a}{2^n}$.\nFor error $\\le 0.01$:\n$$\\frac{9 - 1}{2^n} \\le 0.01 \\implies \\frac{8}{2^n} \\le 0.01 \\implies 2^n \\ge 800$$\nSince $2^9 = 512$ and $2^{10} = 1024$, the minimum number of iterations is $n = 10$.",
    "difficulty": "Moderate",
    "correct_answer": 10,
    "answer": 10,
    "numerical_range": {
      "min": 9.5,
      "max": 10.5
    }
  },
  {
    "id": "QB_EM_125",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Linear and non-linear first order Ordinary Differential Equations (ODE)",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "If $(2xy + 3) dx + (x^2 + 4y) dy = 0$ is an exact differential equation, its general solution is given by $x^2 y + 3x + k y^2 = C$. Calculate the numerical value of the constant $k$.",
    "solution": "Here $M = 2xy + 3$ and $N = x^2 + 4y$.\n$$\\frac{\\partial M}{\\partial y} = 2x = \\frac{\\partial N}{\\partial x}$$\nExact solution:\n$$\\int M dx (\\text{with } y \\text{ constant}) + \\int (N \\text{ terms without } x) dy = C$$\n$$\\int (2xy + 3) dx + \\int 4y dy = C$$\n$$x^2 y + 3x + 2y^2 = C$$\nComparing with $x^2 y + 3x + k y^2 = C$, we have $k = 2.0$.",
    "difficulty": "Hard",
    "correct_answer": 2,
    "answer": 2,
    "numerical_range": {
      "min": 1.95,
      "max": 2.05
    }
  },
  {
    "id": "QB_EM_126",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Poisson, normal and binomial distributions",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "A normal distribution has mean $\\mu = 50$ and standard deviation $\\sigma = 10$. If the standardized normal score $Z = \\frac{X - \\mu}{\\sigma}$ corresponding to a value $X$ is $1.5$, calculate the value of $X$.",
    "solution": "$$Z = \\frac{X - \\mu}{\\sigma} \\implies X = \\mu + Z \\sigma = 50 + (1.5 \\times 10) = 50 + 15 = 65.0$$",
    "difficulty": "Moderate",
    "correct_answer": 65,
    "answer": 65,
    "numerical_range": {
      "min": 64.5,
      "max": 65.5
    }
  },
  {
    "id": "QB_EM_127",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Laplace transforms and their inverse",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "Erwin Kreyszig - Advanced Engineering Mathematics",
    "question": "Calculate the inverse Laplace transform value $\\mathcal{L}^{-1}\\left\\{ \\frac{s}{s^2 + 16} \\right\\}$ evaluated at $t = \\frac{\\pi}{8}$.",
    "solution": "$$\\mathcal{L}^{-1}\\left\\{ \\frac{s}{s^2 + \\omega^2} \\right\\} = \\cos(\\omega t)$$\nHere $\\omega = 4$:\n$$f(t) = \\cos(4t)$$\nAt $t = \\frac{\\pi}{8}$:\n$$f\\left(\\frac{\\pi}{8}\\right) = \\cos\\left(4 \\times \\frac{\\pi}{8}\\right) = \\cos\\left(\\frac{\\pi}{2}\\right) = 0.0$$",
    "difficulty": "Moderate",
    "correct_answer": 0,
    "answer": 0,
    "numerical_range": {
      "min": -0.05,
      "max": 0.05
    }
  },
  {
    "id": "QB_EM_128",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Fourier, Taylor and MacLaurin series",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "In the Fourier series expansion of the function $f(x) = x^2$ on the symmetric interval $[-\\pi, \\pi]$, calculate the constant term $a_0 = \\frac{1}{\\pi} \\int_{-\\pi}^\\pi x^2 dx$. (Express as a multiple of $\\pi^2$, i.e. $a_0 / \\pi^2$).",
    "solution": "$$a_0 = \\frac{1}{\\pi} \\int_{-\\pi}^\\pi x^2 dx = \\frac{2}{\\pi} \\int_0^\\pi x^2 dx = \\frac{2}{\\pi} \\left[ \\frac{x^3}{3} \\right]_0^\\pi = \\frac{2}{\\pi} \\frac{\\pi^3}{3} = \\frac{2}{3} \\pi^2$$\nSo $a_0 / \\pi^2 = \\frac{2}{3} \\approx 0.667$.",
    "difficulty": "Moderate",
    "correct_answer": 0.667,
    "answer": 0.667,
    "numerical_range": {
      "min": 0.65,
      "max": 0.68
    }
  },
  {
    "id": "QB_EM_129",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Numerical integration – trapezoidal and Simpson's rule",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "Simpson's $1/3$ rule of numerical integration requires the total number of sub-intervals $n$ to be:",
    "solution": "Simpson's $1/3$ rule pairs two adjacent sub-intervals per parabolic arc, thus requiring the total number of sub-intervals $n$ to be an even number. (Simpson's $3/8$ rule requires $n$ to be a multiple of 3).",
    "difficulty": "Easy",
    "options": {
      "A": "Any positive integer",
      "B": "Strictly an even number",
      "C": "Strictly an odd number",
      "D": "A multiple of 3"
    },
    "correct_answer": "B",
    "answer": "B"
  },
  {
    "id": "QB_EM_130",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Random variables",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "A fair six-sided die is tossed twice. Calculate the probability that the sum of the numbers obtained is equal to $8$.",
    "solution": "Total possible outcomes $= 6 \\times 6 = 36$.\nFavorable outcomes with sum $= 8$ are:\n$(2, 6), (3, 5), (4, 4), (5, 3), (6, 2)$ (5 outcomes).\nProbability:\n$$P(\\text{Sum} = 8) = \\frac{5}{36} \\approx 0.1389$$",
    "difficulty": "Moderate",
    "correct_answer": 0.1389,
    "answer": 0.1389,
    "numerical_range": {
      "min": 0.13,
      "max": 0.15
    }
  },
  {
    "id": "QB_EM_131",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Higher order linear ODEs with constant coefficients",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "Find the particular integral $y_p$ of the differential equation $\\frac{d^2 y}{dx^2} + 4y = 8$. The value of $y_p$ is:",
    "solution": "$$y_p = \\frac{1}{D^2 + 4} (8 e^{0 \\cdot x}) = \\frac{8}{0^2 + 4} = \\frac{8}{4} = 2.0$$",
    "difficulty": "Moderate",
    "correct_answer": 2,
    "answer": 2,
    "numerical_range": {
      "min": 1.95,
      "max": 2.05
    }
  },
  {
    "id": "QB_EM_132",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Matrices and determinants",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "source": "B.S. Grewal - Higher Engineering Mathematics",
    "question": "If $A$ is a $3 \\times 3$ skew-symmetric matrix, calculate the determinant $\\det(A)$.",
    "solution": "For any skew-symmetric matrix $A^T = -A$:\n$$\\det(A) = \\det(A^T) = \\det(-A) = (-1)^n \\det(A)$$\nFor $n = 3$ (odd order):\n$$\\det(A) = -\\det(A) \\implies 2\\det(A) = 0 \\implies \\det(A) = 0$$",
    "difficulty": "Moderate",
    "correct_answer": 0,
    "answer": 0,
    "numerical_range": {
      "min": -0.01,
      "max": 0.01
    }
  },
  {
    "id": "QB_EM_133",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Matrices and determinants",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Calculate the determinant of the $3 \\times 3$ matrix $A = \\begin{bmatrix} 2 & 1 & 3 \\\\ 0 & 4 & 5 \\\\ 0 & 0 & 6 \\end{bmatrix}$.",
    "numerical_range": {
      "min": 47.9,
      "max": 48.1
    },
    "answer": 48,
    "correct_answer": 48,
    "difficulty": "Moderate",
    "solution": "For an upper triangular matrix, the determinant equals the product of its diagonal elements:\n$$\\det(A) = 2 \\times 4 \\times 6 = 48$$",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_134",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Eigen values and Eigen vectors",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A $3 \\times 3$ matrix $M$ has eigenvalues $\\lambda_1 = 1$, $\\lambda_2 = 3$, and $\\lambda_3 = 5$. Calculate the determinant of the matrix $M^2$.",
    "numerical_range": {
      "min": 224,
      "max": 226
    },
    "answer": 225,
    "correct_answer": 225,
    "difficulty": "Hard",
    "solution": "The determinant of a matrix equals the product of its eigenvalues:\n$$\\det(M) = \\lambda_1 \\times \\lambda_2 \\times \\lambda_3 = 1 \\times 3 \\times 5 = 15$$\nBy properties of determinants:\n$$\\det(M^2) = (\\det(M))^2 = 15^2 = 225$$",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_135",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Cayley–Hamilton theorem",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A $2 \\times 2$ matrix $A$ has trace equal to $5$ and determinant equal to $6$. According to the Cayley-Hamilton theorem, $A^2 - 5A + kI = 0$. What is the value of the scalar constant $k$?",
    "numerical_range": {
      "min": 5.9,
      "max": 6.1
    },
    "answer": 6,
    "correct_answer": 6,
    "difficulty": "Moderate",
    "solution": "The characteristic equation of a $2 \\times 2$ matrix is:\n$$\\lambda^2 - \\text{tr}(A)\\lambda + \\det(A) = 0 \\implies \\lambda^2 - 5\\lambda + 6 = 0$$\nBy the Cayley-Hamilton theorem, every square matrix satisfies its own characteristic equation:\n$$A^2 - 5A + 6I = 0$$\nThus $k = 6$.",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_136",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Linear and orthogonal transformations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "If a real square matrix $Q$ is orthogonal ($Q^T Q = I$), then the determinant of $Q$ must be:",
    "options": {
      "A": "+1 or -1",
      "B": "0",
      "C": "+2 or -2",
      "D": "Any arbitrary real number"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "Since $Q^T Q = I$, taking determinants gives $\\det(Q^T) \\det(Q) = (\\det(Q))^2 = \\det(I) = 1$, which implies $\\det(Q) = \\pm 1$.",
    "source": "Erwin Kreyszig - Advanced Engineering Mathematics"
  },
  {
    "id": "QB_EM_137",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Solutions of linear equations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "A system of $n$ linear equations in $n$ variables $A X = B$ has a UNIQUE solution if and only if:",
    "options": {
      "A": "Rank of $A$ equals $n$ (i.e., $\\det(A) \\neq 0$)",
      "B": "Rank of $A$ is strictly less than $n$",
      "C": "Determinant of $A$ equals 0",
      "D": "Rank of augmented matrix $[A|B]$ is strictly greater than rank of $A$"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "By Rouché-Capelli theorem, a linear system $AX = B$ with $n$ variables has a unique solution if and only if $\\text{rank}(A) = \\text{rank}([A|B]) = n$, which is equivalent to $\\det(A) \\neq 0$.",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_138",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Eigen values and Eigen vectors",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements regarding the eigenvalues and eigenvectors of a real symmetric matrix $A$ are CORRECT?",
    "options": {
      "A": "All eigenvalues of a real symmetric matrix are real numbers.",
      "B": "Eigenvectors corresponding to distinct eigenvalues are mutually orthogonal.",
      "C": "The trace of $A$ equals the sum of its eigenvalues.",
      "D": "The determinant of $A$ equals zero for all real symmetric matrices."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "answer": [
      "A",
      "B",
      "C"
    ],
    "difficulty": "Hard",
    "solution": "Statements A, B, and C are fundamental spectral theorems for real symmetric matrices: eigenvalues are all real, eigenvectors from distinct eigenspaces are orthogonal, and the sum of eigenvalues equals trace. Statement D is false because real symmetric matrices can be non-singular with non-zero determinants.",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_139",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Limit, continuity and differentiability",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "question": "Evaluate the limit: $\\lim_{x \\to 0} \\frac{\\sin(4x)}{\\tan(2x)}$.",
    "numerical_range": {
      "min": 1.99,
      "max": 2.01
    },
    "answer": 2,
    "correct_answer": 2,
    "difficulty": "Easy",
    "solution": "Using standard trigonometric limits:\n$$\\lim_{x \\to 0} \\frac{\\sin(4x)}{\\tan(2x)} = \\lim_{x \\to 0} \\frac{\\frac{\\sin(4x)}{4x} \\cdot 4x}{\\frac{\\tan(2x)}{2x} \\cdot 2x} = \\frac{1 \\cdot 4}{1 \\cdot 2} = 2.0$$",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_140",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Partial derivatives",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Given $f(x, y) = x^3 y^2 + 2x^2 y + 5$. Calculate the mixed second partial derivative $\\frac{\\partial^2 f}{\\partial x \\partial y}$ evaluated at $(x=1, y=2)$.",
    "numerical_range": {
      "min": 15.9,
      "max": 16.1
    },
    "answer": 16,
    "correct_answer": 16,
    "difficulty": "Moderate",
    "solution": "First, differentiate with respect to $y$:\n$$\\frac{\\partial f}{\\partial y} = 2x^3 y + 2x^2$$\nNext, differentiate with respect to $x$:\n$$\\frac{\\partial^2 f}{\\partial x \\partial y} = 6x^2 y + 4x$$\nEvaluating at $x = 1, y = 2$:\n$$\\left. \\frac{\\partial^2 f}{\\partial x \\partial y} \\right|_{(1,2)} = 6(1)^2(2) + 4(1) = 12 + 4 = 16.0$$",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_141",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Homogeneous function – Euler's theorem on homogeneous functions",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "If $u(x, y) = \\frac{x^4 + y^4}{x + y}$, calculate the value of $x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y}$ when $u = 8$.",
    "numerical_range": {
      "min": 23.9,
      "max": 24.1
    },
    "answer": 24,
    "correct_answer": 24,
    "difficulty": "Moderate",
    "solution": "The degree of homogeneity $n$ is:\n$$u(tx, ty) = \\frac{t^4(x^4 + y^4)}{t(x + y)} = t^3 u(x, y) \\implies n = 3$$\nBy Euler's theorem on homogeneous functions:\n$$x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = n u = 3 \\times 8 = 24$$",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_142",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Total differentiation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The power dissipated across an electrical resistor is $P = I^2 R$. In an experiment, current $I$ is measured with an error of $+2\\%$ and resistance $R$ is measured with an error of $+1\\%$. Using total differentiation, calculate the estimated percentage error in calculated power $P$.",
    "numerical_range": {
      "min": 4.9,
      "max": 5.1
    },
    "answer": 5,
    "correct_answer": 5,
    "difficulty": "Moderate",
    "solution": "Taking natural logarithms:\n$$\\ln P = 2 \\ln I + \\ln R$$\nTaking total differentials:\n$$\\frac{dP}{P} = 2 \\frac{dI}{I} + \\frac{dR}{R}$$\nPercentage error:\n$$\\frac{dP}{P} \\times 100 = 2(2\\%) + 1\\% = 4\\% + 1\\% = 5\\%$$",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_143",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Maxima and minima of function with several independent variables",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "For a function $f(x, y)$ with stationary point $(a, b)$, let $r = f_{xx}(a, b)$, $s = f_{xy}(a, b)$, and $t = f_{yy}(a, b)$. The point $(a, b)$ is a SADDLE POINT if:",
    "options": {
      "A": "$r t - s^2 < 0$",
      "B": "$r t - s^2 > 0$ and $r > 0$",
      "C": "$r t - s^2 > 0$ and $r < 0$",
      "D": "$r t - s^2 = 0$"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "By the second derivative test for functions of two variables:\n- If $rt - s^2 > 0$ and $r > 0$, $(a,b)$ is a local minimum.\n- If $rt - s^2 > 0$ and $r < 0$, $(a,b)$ is a local maximum.\n- If $rt - s^2 < 0$, $(a,b)$ is a saddle point.",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_144",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Sequences and series – infinite series, tests for convergence",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following infinite series are CONVERGENT?",
    "options": {
      "A": "$\\sum_{n=1}^\\infty \\frac{1}{n^2}$",
      "B": "$\\sum_{n=1}^\\infty \\left(\\frac{1}{2}\\right)^n$",
      "C": "$\\sum_{n=1}^\\infty \\frac{1}{n}$",
      "D": "$\\sum_{n=1}^\\infty \\frac{1}{n^{1/2}}$"
    },
    "correct_answer": [
      "A",
      "B"
    ],
    "answer": [
      "A",
      "B"
    ],
    "difficulty": "Hard",
    "solution": "- Series A is a $p$-series with $p = 2 > 1$, hence convergent.\n- Series B is a geometric series with common ratio $r = 1/2 < 1$, hence convergent.\n- Series C is the harmonic series ($p = 1$), which is divergent.\n- Series D is a $p$-series with $p = 0.5 \\le 1$, which is divergent.",
    "source": "Erwin Kreyszig - Advanced Engineering Mathematics"
  },
  {
    "id": "QB_EM_145",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Fourier, Taylor and MacLaurin series",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "In the Taylor series expansion of $f(x) = e^{2x}$ about $x = 0$ (Maclaurin series), what is the coefficient of $x^3$ (round off to 3 decimal places)?",
    "numerical_range": {
      "min": 1.32,
      "max": 1.35
    },
    "answer": 1.333,
    "correct_answer": 1.333,
    "difficulty": "Hard",
    "solution": "Maclaurin series of $e^{2x}$ is:\n$$e^{2x} = \\sum_{n=0}^\\infty \\frac{(2x)^n}{n!} = 1 + 2x + \\frac{4x^2}{2!} + \\frac{8x^3}{3!} + \\dots$$\nThe coefficient of $x^3$ is:\n$$\\frac{8}{3!} = \\frac{8}{6} = \\frac{4}{3} \\approx 1.333$$",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_146",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Vector differential operators – del, gradient",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Calculate the directional derivative of the scalar field $\\phi(x, y, z) = x^2 y + y z$ at the point $P(1, 2, 1)$ in the direction of the unit vector $\\hat{u} = \\frac{1}{\\sqrt{3}}(\\hat{i} + \\hat{j} + \\hat{k})$ (round off to 2 decimal places).",
    "numerical_range": {
      "min": 4.5,
      "max": 4.7
    },
    "answer": 4.62,
    "correct_answer": 4.62,
    "difficulty": "Moderate",
    "solution": "Gradient of $\\phi$:\n$$\\nabla \\phi = \\left(2xy\\right)\\hat{i} + \\left(x^2 + z\\right)\\hat{j} + y\\hat{k}$$\nAt point $P(1, 2, 1)$:\n$$\\nabla \\phi = (2 \\times 1 \\times 2)\\hat{i} + (1^2 + 1)\\hat{j} + 2\\hat{k} = 4\\hat{i} + 2\\hat{j} + 2\\hat{k}$$\nDirectional derivative:\n$$D_{\\hat{u}}\\phi = \\nabla \\phi \\cdot \\hat{u} = \\frac{4(1) + 2(1) + 2(1)}{\\sqrt{3}} = \\frac{8}{\\sqrt{3}} \\approx \\frac{8}{1.732} \\approx 4.619 \\approx 4.62$$\nAcceptable range: $4.5 - 4.7$.",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_147",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Divergence and curl",
    "type": "NAT",
    "marks": 1,
    "negative_marks": 0,
    "question": "For the position vector $\\vec{r} = x\\hat{i} + y\\hat{j} + z\\hat{k}$, calculate the divergence $\\nabla \\cdot \\vec{r}$.",
    "numerical_range": {
      "min": 2.99,
      "max": 3.01
    },
    "answer": 3,
    "correct_answer": 3,
    "difficulty": "Moderate",
    "solution": "$$\\nabla \\cdot \\vec{r} = \\frac{\\partial(x)}{\\partial x} + \\frac{\\partial(y)}{\\partial y} + \\frac{\\partial(z)}{\\partial z} = 1 + 1 + 1 = 3$$",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_148",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Stokes, Gauss and Green's theorems",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Using Gauss divergence theorem, calculate the outward flux of the vector field $\\vec{F} = x\\hat{i} + y\\hat{j} + z\\hat{k}$ through the closed surface of a sphere of radius $R = 2$ centered at the origin (take $\\pi = 3.1416$; round off to 1 decimal place).",
    "numerical_range": {
      "min": 99,
      "max": 102
    },
    "answer": 100.5,
    "correct_answer": 100.5,
    "difficulty": "Hard",
    "solution": "By Gauss divergence theorem:\n$$\\iint_S \\vec{F} \\cdot \\hat{n}\\, dS = \\iiint_V (\\nabla \\cdot \\vec{F})\\, dV$$\nHere $\\nabla \\cdot \\vec{F} = 1 + 1 + 1 = 3$.\nVolume of sphere of radius $R = 2$:\n$$V = \\frac{4}{3}\\pi R^3 = \\frac{4}{3}\\pi (8) = \\frac{32}{3}\\pi$$\nOutward flux:\n$$\\text{Flux} = 3 \\times V = 3 \\times \\frac{32}{3}\\pi = 32\\pi = 32 \\times 3.14159 \\approx 100.53$$\nAcceptable range: $99.0 - 102.0$.",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_149",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Stokes, Gauss and Green's theorems",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "If a vector field $\\vec{F}$ is conservative (i.e., $\\vec{F} = \\nabla \\phi$), then the circulation $\\oint_C \\vec{F} \\cdot d\\vec{r}$ along ANY closed path $C$ is:",
    "options": {
      "A": "Always zero",
      "B": "Equal to the enclosed area",
      "C": "Equal to the divergence of $\\vec{F}$",
      "D": "Infinity"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Moderate",
    "solution": "For a conservative vector field, $\\nabla \\times \\vec{F} = 0$. By Stokes' theorem, the line integral around any closed loop is identically zero: $\\oint_C \\vec{F} \\cdot d\\vec{r} = \\iint_S (\\nabla \\times \\vec{F}) \\cdot \\hat{n}\\, dS = 0$.",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_150",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Physical interpretations – line, surface and volume integrals",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following vector identities are mathematically VALID for any sufficiently smooth scalar field $\\phi$ and vector field $\\vec{A}$?",
    "options": {
      "A": "$\\nabla \\times (\\nabla \\phi) = \\vec{0}$ (curl of gradient is always zero)",
      "B": "$\\nabla \\cdot (\\nabla \\times \\vec{A}) = 0$ (divergence of curl is always zero)",
      "C": "$\\nabla \\cdot (\\nabla \\phi) = \\nabla^2 \\phi$ (Laplacian of scalar field)",
      "D": "$\\nabla \\times (\\nabla \\times \\vec{A}) = \\vec{0}$ for all vector fields"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "answer": [
      "A",
      "B",
      "C"
    ],
    "difficulty": "Hard",
    "solution": "Identities A, B, and C are standard vector calculus theorems. Identity D is false because $\\nabla \\times (\\nabla \\times \\vec{A}) = \\nabla(\\nabla \\cdot \\vec{A}) - \\nabla^2 \\vec{A}$, which is generally non-zero.",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_151",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Linear and non-linear first order Ordinary Differential Equations (ODE)",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "For the first-order linear ordinary differential equation $\\frac{dy}{dx} + \\frac{2}{x} y = x^3$ ($x > 0$), the integrating factor $I(x)$ is:",
    "options": {
      "A": "$x^2$",
      "B": "$2x$",
      "C": "$\\ln(x)$",
      "D": "$e^{2x}$"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Moderate",
    "solution": "The integrating factor is:\n$$I(x) = e^{\\int P(x)\\, dx} = e^{\\int \\frac{2}{x}\\, dx} = e^{2 \\ln x} = e^{\\ln(x^2)} = x^2$$",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_152",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Homogeneous differential equations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "To convert Euler-Cauchy's differential equation $x^2 \\frac{d^2 y}{dx^2} + a x \\frac{dy}{dx} + b y = 0$ into a linear differential equation with constant coefficients, the standard substitution used is:",
    "options": {
      "A": "$x = e^z$ or $z = \\ln x$",
      "B": "$y = e^z$",
      "C": "$x = z^2$",
      "D": "$y = x v$"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Moderate",
    "solution": "The independent variable substitution $x = e^z \\iff z = \\ln x$ transforms $x \\frac{dy}{dx} = \\frac{dy}{dz}$ and $x^2 \\frac{d^2 y}{dx^2} = \\frac{d^2 y}{dz^2} - \\frac{dy}{dz}$, yielding an ODE with constant coefficients.",
    "source": "Erwin Kreyszig - Advanced Engineering Mathematics"
  },
  {
    "id": "QB_EM_153",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Higher order linear ODEs with constant coefficients",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Consider the differential equation $\\frac{d^2 y}{dx^2} - 6 \\frac{dy}{dx} + 9 y = 0$ with initial conditions $y(0) = 1$ and $y'(0) = 5$. Calculate the value of $y(1)$ (take $e = 2.718$; round off to 1 decimal place).",
    "numerical_range": {
      "min": 58,
      "max": 62
    },
    "answer": 60.3,
    "correct_answer": 60.3,
    "difficulty": "Hard",
    "solution": "Characteristic equation:\n$$m^2 - 6m + 9 = 0 \\implies (m - 3)^2 = 0 \\implies m = 3, 3$$\nGeneral solution:\n$$y(x) = (c_1 + c_2 x) e^{3x}$$\nApplying $y(0) = 1$:\n$$c_1 = 1$$\nDifferentiating:\n$$y'(x) = c_2 e^{3x} + 3(c_1 + c_2 x) e^{3x}$$\n$$y'(0) = c_2 + 3 c_1 = 5 \\implies c_2 + 3(1) = 5 \\implies c_2 = 2$$\nThus:\n$$y(x) = (1 + 2x) e^{3x}$$\nAt $x = 1$:\n$$y(1) = (1 + 2) e^3 = 3 e^3 = 3 \\times (20.0855) \\approx 60.26$$\nAcceptable range: $58.0 - 62.0$.",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_154",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Laplace transforms and their inverse",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "If $F(s) = \\mathcal{L}\\{e^{-3t} \\cos(4t)\\}$, evaluate $F(1)$ (round off to 3 decimal places).",
    "numerical_range": {
      "min": 0.12,
      "max": 0.13
    },
    "answer": 0.125,
    "correct_answer": 0.125,
    "difficulty": "Hard",
    "solution": "Using the frequency-shifting property of Laplace transforms:\n$$\\mathcal{L}\\{\\cos(4t)\\} = \\frac{s}{s^2 + 4^2} = \\frac{s}{s^2 + 16}$$\n$$\\mathcal{L}\\{e^{-3t} \\cos(4t)\\} = \\frac{s + 3}{(s + 3)^2 + 16}$$\nEvaluating at $s = 1$:\n$$F(1) = \\frac{1 + 3}{(1 + 3)^2 + 16} = \\frac{4}{16 + 16} = \\frac{4}{32} = 0.125$$",
    "source": "Erwin Kreyszig - Advanced Engineering Mathematics"
  },
  {
    "id": "QB_EM_155",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Partial Differential Equations – Laplace, heat and wave equations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The one-dimensional wave equation $\\frac{\\partial^2 u}{\\partial t^2} = c^2 \\frac{\\partial^2 u}{\\partial x^2}$ is classified as which type of partial differential equation?",
    "options": {
      "A": "Hyperbolic",
      "B": "Parabolic",
      "C": "Elliptic",
      "D": "Non-linear"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Moderate",
    "solution": "For $A u_{xx} + B u_{xt} + C u_{tt} = 0$, here $A = c^2$, $B = 0$, $C = -1$. The discriminant is $B^2 - 4AC = 0 - 4(c^2)(-1) = 4c^2 > 0$, which classifies the equation as hyperbolic.",
    "source": "Erwin Kreyszig - Advanced Engineering Mathematics"
  },
  {
    "id": "QB_EM_156",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Laplace transforms and their inverse",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements regarding Laplace transforms are CORRECT?",
    "options": {
      "A": "The Laplace transform is a linear operator: $\\mathcal{L}\\{a f(t) + b g(t)\\} = a \\mathcal{L}\\{f(t)\\} + b \\mathcal{L}\\{g(t)\\}$.",
      "B": "$\\mathcal{L}\\{f'(t)\\} = s F(s) - f(0)$ assuming $f(t)$ is continuous.",
      "C": "According to the Final Value Theorem, $\\lim_{t \\to \\infty} f(t) = \\lim_{s \\to 0} s F(s)$ if all poles of $s F(s)$ lie in the left half of the $s$-plane.",
      "D": "$\\mathcal{L}\\{1\\} = \\frac{1}{s^2}$ for all $s > 0$."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "answer": [
      "A",
      "B",
      "C"
    ],
    "difficulty": "Hard",
    "solution": "Statements A, B, and C are standard operational theorems in Laplace transform theory. Statement D is false because $\\mathcal{L}\\{1\\} = \\frac{1}{s}$ (whereas $\\mathcal{L}\\{t\\} = \\frac{1}{s^2}$).",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_157",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Mean, median, mode and standard deviation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Calculate the sample standard deviation $s$ of the dataset: $\\{4, 8, 6, 5, 7\\}$ (use denominator $n - 1 = 4$; round off to 2 decimal places).",
    "numerical_range": {
      "min": 1.55,
      "max": 1.62
    },
    "answer": 1.58,
    "correct_answer": 1.58,
    "difficulty": "Moderate",
    "solution": "Mean:\n$$\\bar{x} = \\frac{4 + 8 + 6 + 5 + 7}{5} = \\frac{30}{5} = 6.0$$\nDeviations and squares:\n$$(4-6)^2 = 4$$\n$$(8-6)^2 = 4$$\n$$(6-6)^2 = 0$$\n$$(5-6)^2 = 1$$\n$$(7-6)^2 = 1$$\nSum of squared deviations $= 4 + 4 + 0 + 1 + 1 = 10$.\nSample variance:\n$$s^2 = \\frac{10}{5 - 1} = \\frac{10}{4} = 2.5$$\nSample standard deviation:\n$$s = \\sqrt{2.5} \\approx 1.581 \\approx 1.58$$",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_158",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Random variables",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A continuous random variable $X$ has probability density function $f(x) = 2x$ for $0 \\le x \\le 1$ and $f(x) = 0$ otherwise. Calculate the variance $\\text{Var}(X)$ (round off to 3 decimal places).",
    "numerical_range": {
      "min": 0.052,
      "max": 0.058
    },
    "answer": 0.056,
    "correct_answer": 0.056,
    "difficulty": "Moderate",
    "solution": "Expectation $E[X]$:\n$$E[X] = \\int_0^1 x (2x)\\, dx = 2 \\left[ \\frac{x^3}{3} \\right]_0^1 = \\frac{2}{3}$$\nSecond moment $E[X^2]$:\n$$E[X^2] = \\int_0^1 x^2 (2x)\\, dx = 2 \\left[ \\frac{x^4}{4} \\right]_0^1 = \\frac{2}{4} = \\frac{1}{2}$$\nVariance:\n$$\\text{Var}(X) = E[X^2] - (E[X])^2 = \\frac{1}{2} - \\left(\\frac{2}{3}\\right)^2 = \\frac{1}{2} - \\frac{4}{9} = \\frac{9 - 8}{18} = \\frac{1}{18} \\approx 0.0556 \\approx 0.056$$",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_159",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Poisson, normal and binomial distributions",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The number of tractor breakdowns occurring in a farm fleet follows a Poisson distribution with an average rate of $\\lambda = 2$ breakdowns per month. Calculate the probability of observing EXACTLY ZERO breakdowns in a given month (take $e^{-2} = 0.1353$; round off to 3 decimal places).",
    "numerical_range": {
      "min": 0.134,
      "max": 0.137
    },
    "answer": 0.135,
    "correct_answer": 0.135,
    "difficulty": "Moderate",
    "solution": "Poisson probability mass function:\n$$P(X = k) = \\frac{e^{-\\lambda} \\lambda^k}{k!}$$\nFor $k = 0$ and $\\lambda = 2$:\n$$P(X = 0) = \\frac{e^{-2} (2)^0}{0!} = e^{-2} \\approx 0.1353 \\approx 0.135$$",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_160",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Poisson, normal and binomial distributions",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following are TRUE properties of a standard Normal distribution $Z \\sim \\mathcal{N}(0, 1)$?",
    "options": {
      "A": "The probability density function is symmetric about $z = 0$.",
      "B": "Mean, median, and mode are all equal to 0.",
      "C": "The total area under the probability density curve is equal to 1.",
      "D": "The variance of the distribution is 2."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "answer": [
      "A",
      "B",
      "C"
    ],
    "difficulty": "Hard",
    "solution": "For the standard normal distribution $\\mathcal{N}(0, 1)$, the curve is symmetric about mean $\\mu = 0$, so mean $=$ median $=$ mode $= 0$. Total probability area $= 1$. Statement D is false because standard normal variance $\\sigma^2 = 1$, not 2.",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_161",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Correlation and regression analysis",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "In a bivariate data set, the two regression lines are given by $y = 0.4x + 3$ and $x = 0.9y + 2$. Calculate the Karl Pearson correlation coefficient $r$ between $x$ and $y$ (round off to 1 decimal place).",
    "numerical_range": {
      "min": 0.58,
      "max": 0.62
    },
    "answer": 0.6,
    "correct_answer": 0.6,
    "difficulty": "Moderate",
    "solution": "The regression coefficients are $b_{yx} = 0.4$ and $b_{xy} = 0.9$.\nThe correlation coefficient is:\n$$r = \\sqrt{b_{yx} \\times b_{xy}} = \\sqrt{0.4 \\times 0.9} = \\sqrt{0.36} = 0.6$$",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_162",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Correlation and regression analysis",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The Pearson correlation coefficient $r$ between two random variables $X$ and $Y$ always lies strictly in the range:",
    "options": {
      "A": "$-1 \\le r \\le 1$",
      "B": "$0 \\le r \\le 1$",
      "C": "$-\\infty < r < \\infty$",
      "D": "$-0.5 \\le r \\le 0.5$"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "By the Cauchy-Schwarz inequality, the correlation coefficient $r = \\frac{\\text{Cov}(X, Y)}{\\sigma_X \\sigma_Y}$ satisfies $-1 \\le r \\le 1$.",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_163",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Solutions of linear and non-linear algebraic equations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Using the Newton-Raphson method, find the next approximation $x_1$ for the root of $f(x) = x^2 - 5$ starting from initial guess $x_0 = 2.0$.",
    "numerical_range": {
      "min": 2.24,
      "max": 2.26
    },
    "answer": 2.25,
    "correct_answer": 2.25,
    "difficulty": "Moderate",
    "solution": "Here $f(x) = x^2 - 5$ and $f'(x) = 2x$.\nAt $x_0 = 2.0$:\n$$f(2.0) = 4 - 5 = -1$$\n$$f'(2.0) = 2(2.0) = 4$$\nNewton-Raphson formula:\n$$x_1 = x_0 - \\frac{f(x_0)}{f'(x_0)} = 2.0 - \\frac{-1}{4} = 2.0 + 0.25 = 2.25$$",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_164",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Numerical integration – trapezoidal and Simpson's rule",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Evaluate the integral $I = \\int_0^2 x^2\\, dx$ numerically using the Trapezoidal Rule with 2 equal sub-intervals ($h = 1.0$).",
    "numerical_range": {
      "min": 2.99,
      "max": 3.01
    },
    "answer": 3,
    "correct_answer": 3,
    "difficulty": "Moderate",
    "solution": "Step size $h = 1.0$. Grid points: $x_0 = 0, x_1 = 1, x_2 = 2$.\nFunction values:\n$$y_0 = 0^2 = 0$$\n$$y_1 = 1^2 = 1$$\n$$y_2 = 2^2 = 4$$\nTrapezoidal rule:\n$$I = \\frac{h}{2} [y_0 + 2y_1 + y_2] = \\frac{1.0}{2} [0 + 2(1) + 4] = \\frac{1}{2} [6] = 3.0$$",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_165",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Numerical integration – trapezoidal and Simpson's rule",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements regarding Simpson's $1/3$ rule for numerical integration are CORRECT?",
    "options": {
      "A": "The total number of sub-intervals must be an EVEN integer.",
      "B": "The rule approximates the integrand by a quadratic parabola over each pair of intervals.",
      "C": "It gives the EXACT value of the integral for any polynomial up to degree 3 (cubic polynomials).",
      "D": "The truncation error is proportional to the first derivative of the integrand."
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "answer": [
      "A",
      "B",
      "C"
    ],
    "difficulty": "Hard",
    "solution": "Simpson's $1/3$ rule requires an even number of sub-intervals ($n$ even). It fits a second-degree polynomial across successive point triplets and yields exact results for polynomials up to degree 3 because third-order error terms cancel out. Statement D is false: error is proportional to $h^4 f^{(4)}(\\xi)$.",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_166",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Numerical solutions of ODEs",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Using Euler's explicit method with step size $h = 0.1$, solve $\\frac{dy}{dx} = x + y$ with initial condition $y(0) = 1$. Calculate the value of $y(0.1)$.",
    "numerical_range": {
      "min": 1.09,
      "max": 1.11
    },
    "answer": 1.1,
    "correct_answer": 1.1,
    "difficulty": "Moderate",
    "solution": "Euler's update formula:\n$$y_{n+1} = y_n + h f(x_n, y_n)$$\nGiven $x_0 = 0, y_0 = 1, h = 0.1$:\n$$f(x_0, y_0) = 0 + 1 = 1$$\n$$y_1 = 1 + (0.1)(1) = 1.1$$",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_167",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Numerical solutions of ODEs",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The standard fourth-order Runge-Kutta (RK4) method for solving initial value problems has a local truncation error of order:",
    "options": {
      "A": "$\\mathcal{O}(h^5)$",
      "B": "$\\mathcal{O}(h^4)$",
      "C": "$\\mathcal{O}(h^3)$",
      "D": "$\\mathcal{O}(h^2)$"
    },
    "correct_answer": "A",
    "answer": "A",
    "difficulty": "Easy",
    "solution": "For the classical RK4 method, the local truncation error per step is $\\mathcal{O}(h^5)$, which accumulates to a global truncation error of $\\mathcal{O}(h^4)$ over a finite interval.",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  },
  {
    "id": "QB_EM_ADV_001",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Cayley–Hamilton theorem",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Let $A = \\begin{pmatrix} 1 & 2 \\\\ 0 & 2 \\end{pmatrix}$. Using the Cayley-Hamilton theorem, the matrix polynomial $A^4 - 3A^3 + 2A^2 + A + I$ is expressed in the form $c_1 A + c_0 I$, where $c_1$ and $c_0$ are real scalars. The value of $(c_1 + c_0)$ is ________ (answer in integer).",
    "correct_answer": "2",
    "numerical_range": {
      "min": 2,
      "max": 2
    },
    "solution": "The characteristic equation of $A$ is given by:\n$$\\det(A - \\lambda I) = (1 - \\lambda)(2 - \\lambda) - 0 = \\lambda^2 - 3\\lambda + 2 = 0$$\nBy the Cayley-Hamilton theorem, $A$ satisfies its own characteristic equation:\n$$A^2 - 3A + 2I = O \\implies A^2 = 3A - 2I$$\nNow evaluate the polynomial $P(A) = A^4 - 3A^3 + 2A^2 + A + I$:\n$$P(A) = A^2(A^2 - 3A + 2I) + A + I = A^2(O) + A + I = A + I$$\nThus, $c_1 = 1$ and $c_0 = 1$.\nHence, $c_1 + c_0 = 1 + 1 = 2$.",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_002",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Eigen values and Eigen vectors",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A $3 \\times 3$ matrix $M$ has eigenvalues $1, 2, 3$. The trace of the matrix $(M^{-1} + M^2)$ is ________ (round off to two decimal places).",
    "correct_answer": "15.83",
    "numerical_range": {
      "min": 15.8,
      "max": 15.86
    },
    "solution": "If $\\lambda$ is an eigenvalue of $M$, then the corresponding eigenvalue of $(M^{-1} + M^2)$ is $\\frac{1}{\\lambda} + \\lambda^2$.\nFor eigenvalues $\\lambda_1 = 1, \\lambda_2 = 2, \\lambda_3 = 3$:\n$$\\mu_1 = \\frac{1}{1} + 1^2 = 1 + 1 = 2$$\n$$\\mu_2 = \\frac{1}{2} + 2^2 = 0.5 + 4 = 4.5$$\n$$\\mu_3 = \\frac{1}{3} + 3^2 = \\frac{1}{3} + 9 = 9.3333$$\nThe trace of $(M^{-1} + M^2)$ is the sum of its eigenvalues:\n$$\\text{Trace} = 2 + 4.5 + 9.3333 = 15.8333 \\approx 15.83$$",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_003",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Maxima and minima of function with several independent variables",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "For the function $f(x, y) = x^3 + y^3 - 3xy + 4$, the local minimum value of $f(x, y)$ is ________ (answer in integer).",
    "correct_answer": "3",
    "numerical_range": {
      "min": 3,
      "max": 3
    },
    "solution": "To find the stationary points, compute the first partial derivatives and equate to zero:\n$$f_x = 3x^2 - 3y = 0 \\implies y = x^2$$\n$$f_y = 3y^2 - 3x = 0 \\implies 3(x^2)^2 - 3x = 0 \\implies 3x(x^3 - 1) = 0$$\nThus, $x = 0$ or $x = 1$.\n- For $x = 0 \\implies y = 0$, giving point $(0, 0)$.\n- For $x = 1 \\implies y = 1$, giving point $(1, 1)$.\n\nSecond partial derivatives:\n$$r = f_{xx} = 6x, \\quad s = f_{xy} = -3, \\quad t = f_{yy} = 6y$$\nDiscriminant $D = rt - s^2 = (6x)(6y) - (-3)^2 = 36xy - 9$.\n- At $(0,0)$: $D = 0 - 9 = -9 < 0$ (Saddle point).\n- At $(1,1)$: $D = 36(1)(1) - 9 = 27 > 0$ and $r = 6 > 0$ (Local minimum).\n\nThe local minimum value is:\n$$f(1, 1) = 1^3 + 1^3 - 3(1)(1) + 4 = 1 + 1 - 3 + 4 = 3$$",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_004",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Stokes, Gauss and Green's theorems",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Let $\\vec{F} = x^3 \\hat{i} + y^3 \\hat{j} + z^3 \\hat{k}$. The outward flux of $\\vec{F}$ across the surface of the unit sphere $x^2 + y^2 + z^2 = 1$ is $\\frac{a \\pi}{5}$, where $a$ is a constant. The value of $a$ is ________ (answer in integer).",
    "correct_answer": "12",
    "numerical_range": {
      "min": 12,
      "max": 12
    },
    "solution": "By Gauss's Divergence Theorem:\n$$\\iint_S \\vec{F} \\cdot \\hat{n} \\, dS = \\iiint_V (\\nabla \\cdot \\vec{F}) \\, dV$$\nComputing the divergence of $\\vec{F}$:\n$$\\nabla \\cdot \\vec{F} = \\frac{\\partial}{\\partial x}(x^3) + \\frac{\\partial}{\\partial y}(y^3) + \\frac{\\partial}{\\partial z}(z^3) = 3(x^2 + y^2 + z^2)$$\nUsing spherical coordinates where $x^2 + y^2 + z^2 = r^2$ and $dV = r^2 \\sin\\phi \\, dr \\, d\\theta \\, d\\phi$:\n$$\\iiint_V 3r^2 \\, dV = 3 \\int_0^{2\\pi} d\\theta \\int_0^\\pi \\sin\\phi \\, d\\phi \\int_0^1 r^4 \\, dr$$\n$$= 3 \\times (2\\pi) \\times (2) \\times \\left[ \\frac{r^5}{5} \\right]_0^1 = 12\\pi \\times \\frac{1}{5} = \\frac{12\\pi}{5}$$\nComparing with $\\frac{a\\pi}{5}$, we get $a = 12$.",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_005",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Higher order linear ODEs with constant coefficients",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "For the differential equation $\\frac{d^2y}{dx^2} + 4y = \\sin(2x)$ with initial conditions $y(0) = 0$ and $y'(0) = 0$, the value of $y\\left(\\frac{\\pi}{4}\\right)$ is ________ (round off to two decimal places).",
    "correct_answer": "0.13",
    "numerical_range": {
      "min": 0.12,
      "max": 0.14
    },
    "solution": "1. Complementary Function (CF):\nAuxiliary equation: $m^2 + 4 = 0 \\implies m = \\pm 2i$\n$$y_c = C_1 \\cos(2x) + C_2 \\sin(2x)$$\n\n2. Particular Integral (PI):\nSince $\\sin(2x)$ is part of CF, resonance occurs:\n$$y_p = \\frac{1}{D^2 + 4} \\sin(2x) = x \\cdot \\frac{1}{2D} \\sin(2x) = -\\frac{x \\cos(2x)}{4}$$\n\n3. General Solution:\n$$y(x) = C_1 \\cos(2x) + C_2 \\sin(2x) - \\frac{x \\cos(2x)}{4}$$\nApplying $y(0) = 0 \\implies C_1 = 0$.\n$$y'(x) = 2C_2 \\cos(2x) - \\frac{\\cos(2x)}{4} + \\frac{2x \\sin(2x)}{4}$$\nApplying $y'(0) = 0 \\implies 2C_2 - \\frac{1}{4} = 0 \\implies C_2 = \\frac{1}{8} = 0.125$.\n\nThus, $y(x) = \\frac{1}{8} \\sin(2x) - \\frac{x}{4} \\cos(2x)$.\nAt $x = \\frac{\\pi}{4}$:\n$$y\\left(\\frac{\\pi}{4}\\right) = \\frac{1}{8}\\sin\\left(\\frac{\\pi}{2}\\right) - \\frac{\\pi/4}{4} \\cos\\left(\\frac{\\pi}{2}\\right) = \\frac{1}{8}(1) - 0 = 0.125 \\approx 0.13$$",
    "difficulty": "Hard",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_ADV_006",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Poisson, normal and binomial distributions",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A continuous random variable $X$ follows a normal distribution with mean $\\mu = 50$ and variance $\\sigma^2 = 25$. Given that the cumulative standard normal distribution function $\\Phi(1.645) = 0.95$, the value of $k$ such that $P(X > k) = 0.05$ is ________ (round off to two decimal places).",
    "correct_answer": "58.23",
    "numerical_range": {
      "min": 58.2,
      "max": 58.25
    },
    "solution": "Given $X \\sim \\mathcal{N}(\\mu = 50, \\sigma = \\sqrt{25} = 5)$.\nWe are given $P(X > k) = 0.05 \\implies P(X \\le k) = 0.95$.\nStandardizing $X$:\n$$P\\left( Z \\le \\frac{k - 50}{5} \\right) = 0.95$$\nFrom the standard normal table, $\\Phi(1.645) = 0.95$.\nTherefore:\n$$\\frac{k - 50}{5} = 1.645 \\implies k = 50 + 5(1.645) = 50 + 8.225 = 58.225 \\approx 58.23$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_007",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Numerical integration – trapezoidal and Simpson's rule",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The integral $\\int_{0}^{6} \\frac{1}{1 + x^2} \\, dx$ is evaluated using Simpson's $3/8$ rule with $n = 6$ subintervals (step size $h = 1$). The calculated value of the integral is ________ (round off to two decimal places).",
    "correct_answer": "1.36",
    "numerical_range": {
      "min": 1.34,
      "max": 1.38
    },
    "solution": "Simpson's $3/8$ rule for $n = 6$ subintervals of step $h = 1$:\n$$I = \\frac{3h}{8} \\left[ y_0 + y_6 + 3(y_1 + y_2 + y_4 + y_5) + 2(y_3) \\right]$$\nEvaluating $y = f(x) = \\frac{1}{1 + x^2}$ at grid points:\n- $y_0 = f(0) = 1.0000$\n- $y_1 = f(1) = 0.5000$\n- $y_2 = f(2) = 0.2000$\n- $y_3 = f(3) = 0.1000$\n- $y_4 = f(4) = 0.0588$\n- $y_5 = f(5) = 0.0385$\n- $y_6 = f(6) = 0.0270$\n\nSum terms:\n- $y_0 + y_6 = 1.0000 + 0.0270 = 1.0270$\n- $3(y_1 + y_2 + y_4 + y_5) = 3(0.5000 + 0.2000 + 0.0588 + 0.0385) = 3(0.7973) = 2.3919$\n- $2(y_3) = 2(0.1000) = 0.2000$\n\nTotal sum inside brackets $= 1.0270 + 2.3919 + 0.2000 = 3.6189$.\n$$I = \\frac{3(1)}{8} \\times 3.6189 = 0.375 \\times 3.6189 = 1.3571 \\approx 1.36$$",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_008",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Solutions of linear equations",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "For a system of $m$ linear equations in $n$ variables represented as $A X = B$, where $A$ is the coefficient matrix and $[A|B]$ is the augmented matrix, which of the following statements is/are CORRECT?",
    "options": {
      "A": "If $\\operatorname{rank}(A) \\neq \\operatorname{rank}([A|B])$, the system has no solution (inconsistent)",
      "B": "If $\\operatorname{rank}(A) = \\operatorname{rank}([A|B]) = n$, the system has a unique solution",
      "C": "If $\\operatorname{rank}(A) = \\operatorname{rank}([A|B]) = r < n$, the system has infinitely many solutions with $(n - r)$ linearly independent solutions",
      "D": "For a homogeneous system $A X = 0$, a non-trivial solution exists if and only if $\\operatorname{rank}(A) < n$"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "According to the Rouché–Capelli theorem for linear systems $A X = B$:\n1. A system is consistent if and only if $\\operatorname{rank}(A) = \\operatorname{rank}([A|B])$. If ranks differ, it is inconsistent (Option A is true).\n2. If $\\operatorname{rank}(A) = \\operatorname{rank}([A|B]) = n$ (number of variables), exactly one unique solution exists (Option B is true).\n3. If $\\operatorname{rank}(A) = \\operatorname{rank}([A|B]) = r < n$, there are infinitely many solutions with $n - r$ free parameters (Option C is true).\n4. For homogeneous systems $A X = 0$, non-trivial (non-zero) solutions exist if and only if $\\operatorname{rank}(A) < n$, corresponding to $\\det(A) = 0$ for square systems (Option D is true).",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_009",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Homogeneous function – Euler's theorem on homogeneous functions",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Let $u(x, y) = \\tan^{-1}\\left( \\frac{x^3 + y^3}{x - y} \\right)$ for $x \\neq y$. The value of $x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y}$ when $u = \\frac{\\pi}{4}$ is ________ (answer in integer).",
    "correct_answer": "1",
    "numerical_range": {
      "min": 1,
      "max": 1
    },
    "solution": "Let $z = \\tan(u) = \\frac{x^3 + y^3}{x - y}$.\nThe function $z(x, y)$ is a homogeneous function of degree $n = 3 - 1 = 2$.\nBy Euler's Theorem on homogeneous functions:\n$$x \\frac{\\partial z}{\\partial x} + y \\frac{\\partial z}{\\partial y} = n z = 2 z$$\nSince $z = \\tan(u)$:\n$$\\frac{\\partial z}{\\partial x} = \\sec^2(u) \\frac{\\partial u}{\\partial x}, \\quad \\frac{\\partial z}{\\partial y} = \\sec^2(u) \\frac{\\partial u}{\\partial y}$$\nSubstituting:\n$$\\sec^2(u) \\left( x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} \\right) = 2 \\tan(u)$$\n$$x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = \\frac{2 \\tan(u)}{\\sec^2(u)} = 2 \\sin(u) \\cos(u) = \\sin(2u)$$\nWhen $u = \\frac{\\pi}{4}$:\n$$x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = \\sin\\left( 2 \\times \\frac{\\pi}{4} \\right) = \\sin\\left( \\frac{\\pi}{2} \\right) = 1$$",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_010",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Laplace transforms and their inverse",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The Laplace transform of $f(t) = t e^{-2t} \\sin(3t)$ is evaluated at $s = 2$. The value of $1000 \\times F(2)$ is ________ (round off to two decimal places).",
    "correct_answer": "38.40",
    "numerical_range": {
      "min": 37.5,
      "max": 39.5
    },
    "solution": "1. Standard Laplace transform:\n$$\\mathcal{L}\\{\\sin(3t)\\} = \\frac{3}{s^2 + 9}$$\n\n2. Multiplication by $t$:\n$$\\mathcal{L}\\{t \\sin(3t)\\} = -\\frac{d}{ds}\\left( \\frac{3}{s^2 + 9} \\right) = \\frac{6s}{(s^2 + 9)^2}$$\n\n3. First shifting theorem (multiplication by $e^{-2t}$):\n$$F(s) = \\mathcal{L}\\{t e^{-2t} \\sin(3t)\\} = \\frac{6(s+2)}{((s+2)^2 + 9)^2}$$\n\n4. Evaluating at $s = 2$:\n$$s + 2 = 4$$\n$$(s+2)^2 + 9 = 4^2 + 9 = 25$$\n$$F(2) = \\frac{6(4)}{(25)^2} = \\frac{24}{625} = 0.0384$$\n$$1000 \\times F(2) = 1000 \\times 0.0384 = 38.40$$",
    "difficulty": "Moderate",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_ADV_011",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Solutions of linear and non-linear algebraic equations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The root of the equation $f(x) = x^3 - 2x - 5 = 0$ is computed using the Newton-Raphson method starting with an initial guess $x_0 = 2$. The value of $x_2$ after two iterations is ________ (round off to three decimal places).",
    "correct_answer": "2.095",
    "numerical_range": {
      "min": 2.09,
      "max": 2.1
    },
    "solution": "Derivative: $f'(x) = 3x^2 - 2$.\nNewton-Raphson iteration formula:\n$$x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$$\n\nIteration 1 ($x_0 = 2$):\n$$f(2) = 2^3 - 2(2) - 5 = 8 - 4 - 5 = -1$$\n$$f'(2) = 3(2^2) - 2 = 12 - 2 = 10$$\n$$x_1 = 2 - \\frac{-1}{10} = 2.100$$\n\nIteration 2 ($x_1 = 2.1$):\n$$f(2.1) = (2.1)^3 - 2(2.1) - 5 = 9.261 - 4.2 - 5 = 0.061$$\n$$f'(2.1) = 3(2.1)^2 - 2 = 3(4.41) - 2 = 13.23 - 2 = 11.23$$\n$$x_2 = 2.1 - \\frac{0.061}{11.23} = 2.1 - 0.005432 = 2.094568 \\approx 2.095$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_012",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Matrices and determinants",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Consider the $3 \\times 3$ upper triangular matrix:\n$$A = \\begin{pmatrix} 1 & 2 & 3 \\\\ 0 & 4 & 5 \\\\ 0 & 0 & 6 \\end{pmatrix}$$\nThe value of $\\det(A^2 - 3A)$ is ________ (answer in integer).",
    "correct_answer": "-144",
    "numerical_range": {
      "min": -144,
      "max": -144
    },
    "solution": "**Method 1: Eigenvalue Mapping Principle**\nThe eigenvalues of an upper triangular matrix are simply its diagonal entries:\n$$\\lambda_1 = 1, \\quad \\lambda_2 = 4, \\quad \\lambda_3 = 6$$\nFor any polynomial matrix function $f(A) = A^2 - 3A$, the eigenvalues of $f(A)$ are given by $\\mu_i = f(\\lambda_i) = \\lambda_i^2 - 3\\lambda_i$:\n- $\\mu_1 = 1^2 - 3(1) = 1 - 3 = -2$\n- $\\mu_2 = 4^2 - 3(4) = 16 - 12 = 4$\n- $\\mu_3 = 6^2 - 3(6) = 36 - 18 = 18$\n\nThe determinant of $f(A)$ is the product of its eigenvalues:\n$$\\det(A^2 - 3A) = \\mu_1 \\cdot \\mu_2 \\cdot \\mu_3 = (-2) \\times 4 \\times 18 = -144$$\n\n**Method 2: Factoring the Matrix Polynomial**\n$$\\det(A^2 - 3A) = \\det(A(A - 3I)) = \\det(A) \\cdot \\det(A - 3I)$$\n$$\\det(A) = 1 \\times 4 \\times 6 = 24$$\n$$\\det(A - 3I) = (1 - 3)(4 - 3)(6 - 3) = (-2)(1)(3) = -6$$\n$$\\det(A^2 - 3A) = 24 \\times (-6) = -144$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_013",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Matrices and determinants",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Let $A$ and $B$ be two $n \\times n$ real matrices. Which of the following statements is/are always TRUE?",
    "options": {
      "A": "$\\operatorname{rank}(A + B) \\le \\operatorname{rank}(A) + \\operatorname{rank}(B)$",
      "B": "$\\operatorname{rank}(AB) \\le \\min(\\operatorname{rank}(A), \\operatorname{rank}(B))$",
      "C": "$\\operatorname{trace}(AB) = \\operatorname{trace}(BA)$",
      "D": "If $A$ is invertible, then $\\det(A + B) = \\det(A) + \\det(B)$"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "1. **Subadditivity of Rank (Option A)**: The column space of $A + B$ is contained in the sum of the column spaces of $A$ and $B$, so $\\operatorname{rank}(A + B) \\le \\operatorname{rank}(A) + \\operatorname{rank}(B)$ (True).\n2. **Rank of Matrix Product (Option B)**: For any matrices $A$ and $B$, $\\operatorname{rank}(AB) \\le \\min(\\operatorname{rank}(A), \\operatorname{rank}(B))$ (True).\n3. **Trace Cyclicity (Option C)**: $\\operatorname{trace}(AB) = \\sum_i (AB)_{ii} = \\sum_{i,j} A_{ij} B_{ji} = \\sum_j (BA)_{jj} = \\operatorname{trace}(BA)$ (True).\n4. **Determinant Non-additivity (Option D)**: Determinant is not additive: $\\det(A + B) \\neq \\det(A) + \\det(B)$ in general (e.g., $A = I, B = I \\implies \\det(2I) = 2^n \\neq 1 + 1 = 2$ for $n \\ge 2$) (False).",
    "difficulty": "Hard",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_ADV_014",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Matrices and determinants",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "If $A$ is an involutory matrix such that $A^2 = I$, where $I$ is the identity matrix, then the matrix $P = \\frac{1}{2}(I + A)$ is always:",
    "options": {
      "A": "Nilpotent",
      "B": "Idempotent",
      "C": "Skew-symmetric",
      "D": "Orthogonal"
    },
    "correct_answer": "B",
    "solution": "Compute $P^2$:\n$$P^2 = \\left[ \\frac{1}{2}(I + A) \\right]^2 = \\frac{1}{4}(I^2 + IA + AI + A^2)$$\nSince $I^2 = I$, $IA = AI = A$, and $A^2 = I$:\n$$P^2 = \\frac{1}{4}(I + 2A + I) = \\frac{1}{4}(2I + 2A) = \\frac{1}{2}(I + A) = P$$\nSince $P^2 = P$, the matrix $P$ is idempotent.",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_015",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Linear and orthogonal transformations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A linear transformation $T: \\mathbb{R}^2 \\to \\mathbb{R}^2$ rotates vectors counter-clockwise by $\\theta = 45^\\circ$ and subsequently scales them by a factor of $\\sqrt{2}$. The standard matrix of the transformation is $[T] = \\begin{pmatrix} a & b \\\\ c & d \\end{pmatrix}$. The value of $a^2 + b^2 + c^2 + d^2$ is ________ (answer in integer).",
    "correct_answer": "4",
    "numerical_range": {
      "min": 4,
      "max": 4
    },
    "solution": "**Method 1: Direct Coordinate Matrix**\nThe standard rotation matrix for counter-clockwise rotation by $45^\\circ$ is:\n$$R = \\begin{pmatrix} \\cos(45^\\circ) & -\\sin(45^\\circ) \\\\ \\sin(45^\\circ) & \\cos(45^\\circ) \\end{pmatrix} = \\begin{pmatrix} 1/\\sqrt{2} & -1/\\sqrt{2} \\\\ 1/\\sqrt{2} & 1/\\sqrt{2} \\end{pmatrix}$$\nScaling by $\\sqrt{2}$ gives:\n$$[T] = \\sqrt{2} R = \\begin{pmatrix} 1 & -1 \\\\ 1 & 1 \\end{pmatrix}$$\nHere $a = 1, b = -1, c = 1, d = 1$.\n$$a^2 + b^2 + c^2 + d^2 = 1^2 + (-1)^2 + 1^2 + 1^2 = 1 + 1 + 1 + 1 = 4$$\n\n**Method 2: Frobenius Norm Shortcut**\n$$\\|[T]\\|_F^2 = \\operatorname{trace}([T]^T [T]) = \\operatorname{trace}((\\sqrt{2}R)^T (\\sqrt{2}R)) = 2 \\operatorname{trace}(R^T R) = 2 \\operatorname{trace}(I_2) = 2 \\times 2 = 4$$",
    "difficulty": "Moderate",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_ADV_016",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Linear and orthogonal transformations",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following matrices is/are orthogonal?",
    "options": {
      "A": "$\\begin{pmatrix} \\cos\\theta & -\\sin\\theta \\\\ \\sin\\theta & \\cos\\theta \\end{pmatrix}$",
      "B": "$\\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix}$",
      "C": "$\\frac{1}{3}\\begin{pmatrix} 1 & 2 & 2 \\\\ 2 & 1 & -2 \\\\ -2 & 2 & -1 \\end{pmatrix}$",
      "D": "$\\begin{pmatrix} 1 & 1 \\\\ 0 & 1 \\end{pmatrix}$"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "A real square matrix $Q$ is orthogonal if $Q^T Q = I$ (its rows/columns form an orthonormal basis):\n1. **Option A**: $R^T R = \\begin{pmatrix} \\cos^2\\theta + \\sin^2\\theta & 0 \\\\ 0 & \\sin^2\\theta + \\cos^2\\theta \\end{pmatrix} = I$ (Orthogonal).\n2. **Option B**: $B^T = B$ and $B^2 = \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix} \\begin{pmatrix} 0 & 1 \\\\ 1 & 0 \\end{pmatrix} = \\begin{pmatrix} 1 & 0 \\\\ 0 & 1 \\end{pmatrix} = I$ (Orthogonal).\n3. **Option C**: Let $M = \\frac{1}{3} \\begin{pmatrix} 1 & 2 & 2 \\\\ 2 & 1 & -2 \\\\ -2 & 2 & -1 \\end{pmatrix}$. Norm of each row is $\\frac{\\sqrt{1+4+4}}{3} = 1$, and inner products between distinct rows are all $(2+2-4)/9 = 0$ (Orthogonal).\n4. **Option D**: First row has norm $\\sqrt{1^2 + 1^2} = \\sqrt{2} \\neq 1$, so it is not orthogonal.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_017",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Linear and orthogonal transformations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "Let $Q$ be an $n \\times n$ real orthogonal matrix. For any two real vectors $x, y \\in \\mathbb{R}^n$, the standard inner product $\\langle Qx, Qy \\rangle$ equals:",
    "options": {
      "A": "$\\langle x, y \\rangle$",
      "B": "$-\\langle x, y \\rangle$",
      "C": "$\\det(Q) \\langle x, y \\rangle$",
      "D": "$0$"
    },
    "correct_answer": "A",
    "solution": "By definition of the matrix inner product:\n$$\\langle Qx, Qy \\rangle = (Qx)^T (Qy) = x^T (Q^T Q) y$$\nSince $Q$ is orthogonal, $Q^T Q = I$:\n$$\\langle Qx, Qy \\rangle = x^T I y = x^T y = \\langle x, y \\rangle$$\nThus orthogonal transformations preserve inner products, vector lengths, and angles.",
    "difficulty": "Easy",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_ADV_018",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Cayley–Hamilton theorem",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Let $A = \\begin{pmatrix} 1 & 4 \\\\ 2 & 3 \\end{pmatrix}$. According to the Cayley–Hamilton theorem, the matrix $A^3 - 4A^2 - 5A + 7I$ can be reduced to $k I$. The value of $k$ is ________ (answer in integer).",
    "correct_answer": "7",
    "numerical_range": {
      "min": 7,
      "max": 7
    },
    "solution": "**Method 1: Cayley–Hamilton Annihilation**\nThe characteristic equation of $A$ is:\n$$\\det(A - \\lambda I) = \\begin{vmatrix} 1 - \\lambda & 4 \\\\ 2 & 3 - \\lambda \\end{vmatrix} = (1 - \\lambda)(3 - \\lambda) - 8 = \\lambda^2 - 4\\lambda - 5 = 0$$\nBy the Cayley–Hamilton theorem, $A$ satisfies its own characteristic equation:\n$$A^2 - 4A - 5I = O$$\nMultiplying through by $A$:\n$$A^3 - 4A^2 - 5A = O$$\nTherefore:\n$$A^3 - 4A^2 - 5A + 7I = O + 7I = 7I$$\nThus $k = 7$.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_019",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Cayley–Hamilton theorem",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "A $3 \\times 3$ invertible matrix $A$ has the characteristic equation $\\lambda^3 - 6\\lambda^2 + 11\\lambda - 6 = 0$. The inverse matrix $A^{-1}$ is expressed as:",
    "options": {
      "A": "$\\frac{1}{6}(A^2 - 6A + 11I)$",
      "B": "$\\frac{1}{6}(-A^2 + 6A - 11I)$",
      "C": "$\\frac{1}{11}(A^2 - 6A + 6I)$",
      "D": "$6(A^2 - 6A + 11I)$"
    },
    "correct_answer": "A",
    "solution": "By the Cayley–Hamilton theorem:\n$$A^3 - 6A^2 + 11A - 6I = O$$\nIsolating the identity matrix:\n$$6I = A^3 - 6A^2 + 11A$$\nMultiplying both sides by $A^{-1}$:\n$$6A^{-1} = A^2 - 6A + 11I \\implies A^{-1} = \\frac{1}{6}(A^2 - 6A + 11I)$$",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_020",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Eigen values and Eigen vectors",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Consider the real symmetric tridiagonal matrix:\n$$A = \\begin{pmatrix} 2 & 1 & 0 \\\\ 1 & 2 & 1 \\\\ 0 & 1 & 2 \\end{pmatrix}$$\nThe maximum eigenvalue $\\lambda_{\\max}$ of $A$ is ________ (round off to two decimal places).",
    "correct_answer": "3.41",
    "numerical_range": {
      "min": 3.39,
      "max": 3.43
    },
    "solution": "**Method 1: Characteristic Equation**\n$$\\det(A - \\lambda I) = \\begin{vmatrix} 2 - \\lambda & 1 & 0 \\\\ 1 & 2 - \\lambda & 1 \\\\ 0 & 1 & 2 - \\lambda \\end{vmatrix} = 0$$\nExpanding along the first row:\n$$(2 - \\lambda)[(2 - \\lambda)^2 - 1] - 1[1(2 - \\lambda) - 0] = 0$$\n$$(2 - \\lambda)[(2 - \\lambda)^2 - 2] = 0$$\nRoots:\n1. $2 - \\lambda = 0 \\implies \\lambda = 2$\n2. $(2 - \\lambda)^2 = 2 \\implies \\lambda = 2 \\pm \\sqrt{2}$\n$$\\lambda_1 = 2 - \\sqrt{2} \\approx 0.59, \\quad \\lambda_2 = 2, \\quad \\lambda_3 = 2 + \\sqrt{2} \\approx 3.4142$$\nThe maximum eigenvalue is $\\lambda_{\\max} = 2 + \\sqrt{2} \\approx 3.41$.\n\n**Method 2: Analytical Tridiagonal Toeplitz Formula**\nFor an $n \\times n$ Toeplitz matrix with diagonal $a=2$ and off-diagonal $b=1$:\n$$\\lambda_k = a + 2b \\cos\\left(\\frac{k\\pi}{n+1}\\right), \\quad k = 1, \\dots, n$$\nFor $n = 3$, the largest eigenvalue occurs at $k = 1$:\n$$\\lambda_1 = 2 + 2(1) \\cos\\left(\\frac{\\pi}{4}\\right) = 2 + 2\\left(\\frac{\\sqrt{2}}{2}\\right) = 2 + \\sqrt{2} \\approx 3.41$$",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_021",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Eigen values and Eigen vectors",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements is/are TRUE for real matrices and their eigen-properties?",
    "options": {
      "A": "Every real symmetric matrix has strictly real eigenvalues",
      "B": "Eigenvectors corresponding to distinct eigenvalues of a real symmetric matrix are mutually orthogonal",
      "C": "A real skew-symmetric matrix has eigenvalues that are either zero or purely imaginary",
      "D": "If an $n \\times n$ matrix has $n$ distinct eigenvalues, it is always diagonalizable"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "1. **Spectral Theorem for Symmetric Matrices (Option A & B)**: Real symmetric matrices have strictly real eigenvalues and an orthonormal basis of eigenvectors. Eigenvectors of distinct eigenvalues satisfy $\\langle v_i, v_j \\rangle = 0$ (True).\n2. **Skew-Symmetric Eigenvalues (Option C)**: If $A^T = -A$, let $Ax = \\lambda x$. Then $\\bar{x}^T A x = \\lambda \\|x\\|^2$ and $(\\bar{x}^T A x)^H = -\\lambda \\|x\\|^2 = \\bar{\\lambda} \\|x\\|^2 \\implies \\bar{\\lambda} = -\\lambda$, so $\\lambda$ is purely imaginary or zero (True).\n3. **Distinct Eigenvalues (Option D)**: If all $n$ eigenvalues are distinct, their corresponding eigenvectors are linearly independent, ensuring an invertible modal matrix $P$ such that $P^{-1} A P = \\Lambda$ (True).",
    "difficulty": "Moderate",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_ADV_022",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Eigen values and Eigen vectors",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "A $3 \\times 3$ matrix $A$ has eigenvalues $\\lambda_1 = 1$, $\\lambda_2 = 2$, and $\\lambda_3 = -3$. The determinant of the matrix $A^T A$ is:",
    "options": {
      "A": "$0$",
      "B": "$-6$",
      "C": "$36$",
      "D": "$14$"
    },
    "correct_answer": "C",
    "solution": "The determinant of a matrix equals the product of its eigenvalues:\n$$\\det(A) = \\lambda_1 \\cdot \\lambda_2 \\cdot \\lambda_3 = (1)(2)(-3) = -6$$\nUsing properties of determinants:\n$$\\det(A^T A) = \\det(A^T) \\cdot \\det(A) = (\\det(A))^2 = (-6)^2 = 36$$",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_023",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Solutions of linear equations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Consider the system of linear equations:\n$$\\begin{aligned} x + 2y + 3z &= 4 \\\\ 2x + 5y + 7z &= 9 \\\\ 3x + 7y + c z &= 10 \\end{aligned}$$\nThe system has NO solution when the parameter $c$ equals ________ (answer in integer).",
    "correct_answer": "10",
    "numerical_range": {
      "min": 10,
      "max": 10
    },
    "solution": "**Method 1: Gaussian Elimination on Augmented Matrix**\nForm the augmented matrix $[A|B]$:\n$$\\begin{pmatrix} 1 & 2 & 3 & | & 4 \\\\ 2 & 5 & 7 & | & 9 \\\\ 3 & 7 & c & | & 10 \\end{pmatrix}$$\nPerform row operations:\n$R_2 \\to R_2 - 2R_1$:\n$$\\begin{pmatrix} 0 & 1 & 1 & | & 1 \\end{pmatrix}$$\n$R_3 \\to R_3 - 3R_1$:\n$$\\begin{pmatrix} 0 & 1 & c - 9 & | & -2 \\end{pmatrix}$$\n$R_3 \\to R_3 - R_2$:\n$$\\begin{pmatrix} 0 & 0 & c - 10 & | & -3 \\end{pmatrix}$$\nFor the system to have NO solution (inconsistent):\n$$\\operatorname{rank}(A) < \\operatorname{rank}([A|B])$$\nThis occurs when the coefficient entry in the last row vanishes while the augmented entry is non-zero:\n$$c - 10 = 0 \\implies c = 10$$\nWhen $c = 10$, $\\operatorname{rank}(A) = 2$ and $\\operatorname{rank}([A|B]) = 3$, so no solution exists.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_024",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Solutions of linear equations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "A homogeneous system of linear equations $A X = 0$ with $m$ equations and $n$ variables where $m < n$ always has:",
    "options": {
      "A": "Only the trivial solution $X = 0$",
      "B": "Infinitely many non-trivial solutions",
      "C": "No solution",
      "D": "A unique non-zero solution"
    },
    "correct_answer": "B",
    "solution": "For any homogeneous linear system $A X = 0$:\n1. The trivial solution $X = 0$ always exists (the system is unconditionally consistent).\n2. The rank of $A$ satisfies $r \\le \\min(m, n) = m < n$.\n3. The nullity (dimension of solution space) is $n - r \\ge n - m > 0$.\nSince there is at least one free variable, there are infinitely many non-trivial solutions.",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_025",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Solutions of linear equations",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "For a linear system $A x = b$ where $A$ is an $m \\times n$ real matrix, which of the following conditions guarantee(s) that at least one solution exists?",
    "options": {
      "A": "$\\operatorname{rank}(A) = \\operatorname{rank}([A|b])$",
      "B": "$b$ lies in the column space of $A$",
      "C": "$\\operatorname{rank}(A) = m$",
      "D": "$\\operatorname{rank}(A) = n$"
    },
    "correct_answer": [
      "A",
      "B",
      "C"
    ],
    "solution": "1. **Rouché–Capelli Theorem (Option A)**: A linear system is consistent if and only if $\\operatorname{rank}(A) = \\operatorname{rank}([A|b])$ (True).\n2. **Column Space Definition (Option B)**: The equation $Ax = b$ expresses $b$ as a linear combination of the columns of $A$. Hence, a solution exists if and only if $b \\in \\operatorname{Col}(A)$ (True).\n3. **Full Row Rank (Option C)**: If $\\operatorname{rank}(A) = m$, the column space spans all of $\\mathbb{R}^m$. Thus $b \\in \\mathbb{R}^m$ is always reachable, guaranteeing a solution for every vector $b$ (True).\n4. **Full Column Rank (Option D)**: $\\operatorname{rank}(A) = n \\le m$ guarantees uniqueness of the solution if one exists, but does not guarantee existence for arbitrary $b$ (False).",
    "difficulty": "Moderate",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_ADV_026",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Limit, continuity and differentiability",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Evaluate the limit:\n$$\\lim_{x \\to 0} \\frac{e^x - 1 - x - \\frac{x^2}{2}}{x^3}$$\nThe value of the limit is ________ (round off to three decimal places).",
    "correct_answer": "0.167",
    "numerical_range": {
      "min": 0.16,
      "max": 0.17
    },
    "solution": "**Method 1: Maclaurin Series Expansion**\nExpanding $e^x$ around $x = 0$:\n$$e^x = 1 + x + \\frac{x^2}{2!} + \\frac{x^3}{3!} + \\frac{x^4}{4!} + \\dots$$\n$$e^x - 1 - x - \\frac{x^2}{2} = \\frac{x^3}{6} + \\frac{x^4}{24} + \\dots$$\nDividing by $x^3$:\n$$\\lim_{x \\to 0} \\left( \\frac{1}{6} + \\frac{x}{24} + \\dots \\right) = \\frac{1}{6} \\approx 0.1667$$\n\n**Method 2: L'Hôpital's Rule (3 Successive Applications)**\n$$\\lim_{x \\to 0} \\frac{e^x - 1 - x - x^2/2}{x^3} = \\lim_{x \\to 0} \\frac{e^x - 1 - x}{3x^2} = \\lim_{x \\to 0} \\frac{e^x - 1}{6x} = \\lim_{x \\to 0} \\frac{e^x}{6} = \\frac{1}{6} \\approx 0.167$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_027",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Limit, continuity and differentiability",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "Consider the function $f(x) = |x| \\sin(x)$ defined for all $x \\in \\mathbb{R}$. At $x = 0$, the function is:",
    "options": {
      "A": "Continuous and differentiable with $f'(0) = 0$",
      "B": "Continuous but not differentiable",
      "C": "Neither continuous nor differentiable",
      "D": "Continuous and differentiable with $f'(0) = 1$"
    },
    "correct_answer": "A",
    "solution": "Evaluate the derivative at $x = 0$ from first principles:\n$$f'(0) = \\lim_{h \\to 0} \\frac{f(h) - f(0)}{h} = \\lim_{h \\to 0} \\frac{|h| \\sin(h)}{h}$$\n- Right-hand limit ($h \\to 0^+$): $\\lim_{h \\to 0^+} \\frac{h \\sin(h)}{h} = \\lim_{h \\to 0^+} \\sin(h) = 0$\n- Left-hand limit ($h \\to 0^-$): $\\lim_{h \\to 0^-} \\frac{-h \\sin(h)}{h} = \\lim_{h \\to 0^-} -\\sin(h) = 0$\nSince the left and right limits are equal to $0$, $f'(0) = 0$. Hence $f(x)$ is continuous and differentiable at $x = 0$.",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_028",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Limit, continuity and differentiability",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following properties hold(s) for every complex function $f(z) = u(x, y) + i v(x, y)$ that is analytic in an open domain $D$?",
    "options": {
      "A": "The Cauchy–Riemann equations $\\frac{\\partial u}{\\partial x} = \\frac{\\partial v}{\\partial y}$ and $\\frac{\\partial u}{\\partial y} = -\\frac{\\partial v}{\\partial x}$ hold throughout $D$",
      "B": "Both real and imaginary parts $u(x, y)$ and $v(x, y)$ are harmonic: $\\nabla^2 u = 0$ and $\\nabla^2 v = 0$",
      "C": "The family of curves $u(x, y) = c_1$ and $v(x, y) = c_2$ intersect orthogonally at every point where $f'(z) \\neq 0$",
      "D": "$f(z)$ possesses derivatives of all orders throughout $D$"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "For an analytic function $f(z) = u + iv$:\n1. **Cauchy–Riemann Equations (Option A)**: Differentiability with respect to $z$ requires $u_x = v_y$ and $u_y = -v_x$ (True).\n2. **Harmonicity (Option B)**: Differentiating C-R equations gives $u_{xx} + u_{yy} = v_{yx} - v_{xy} = 0$, so both $u$ and $v$ satisfy Laplace's equation (True).\n3. **Orthogonality of Level Curves (Option C)**: $\\nabla u \\cdot \\nabla v = u_x v_x + u_y v_y = (v_y)(-u_y) + u_y(u_x) = 0$, so gradients are orthogonal, meaning level contours intersect orthogonally (True).\n4. **Infinite Differentiability (Option D)**: Complex analyticity in an open domain implies existence of derivatives of all orders (True).",
    "difficulty": "Hard",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_ADV_029",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Partial derivatives",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "If $z = f(x, y)$ where $x = r \\cos\\theta$ and $y = r \\sin\\theta$, given:\n$$\\left( \\frac{\\partial z}{\\partial x} \\right)^2 + \\left( \\frac{\\partial z}{\\partial y} \\right)^2 = k \\left[ \\left( \\frac{\\partial z}{\\partial r} \\right)^2 + \\frac{1}{r^2} \\left( \\frac{\\partial z}{\\partial \\theta} \\right)^2 \\right]$$\nThe value of $k$ is ________ (answer in integer).",
    "correct_answer": "1",
    "numerical_range": {
      "min": 1,
      "max": 1
    },
    "solution": "By the multivariable chain rule:\n$$\\frac{\\partial z}{\\partial r} = \\frac{\\partial z}{\\partial x} \\cos\\theta + \\frac{\\partial z}{\\partial y} \\sin\\theta$$\n$$\\frac{\\partial z}{\\partial \\theta} = -r \\frac{\\partial z}{\\partial x} \\sin\\theta + r \\frac{\\partial z}{\\partial y} \\cos\\theta \\implies \\frac{1}{r} \\frac{\\partial z}{\\partial \\theta} = -\\frac{\\partial z}{\\partial x} \\sin\\theta + \\frac{\\partial z}{\\partial y} \\cos\\theta$$\nSquaring both expressions and adding:\n$$\\left( \\frac{\\partial z}{\\partial r} \\right)^2 + \\frac{1}{r^2} \\left( \\frac{\\partial z}{\\partial \\theta} \\right)^2 = \\left( \\frac{\\partial z}{\\partial x} \\right)^2 (\\cos^2\\theta + \\sin^2\\theta) + \\left( \\frac{\\partial z}{\\partial y} \\right)^2 (\\sin^2\\theta + \\cos^2\\theta) + 0$$\n$$= \\left( \\frac{\\partial z}{\\partial x} \\right)^2 + \\left( \\frac{\\partial z}{\\partial y} \\right)^2$$\nComparing with the given equation yields $k = 1$.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_030",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Partial derivatives",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "If $u(x, y) = \\ln(x^2 + y^2)$, the value of $\\frac{\\partial^2 u}{\\partial x^2} + \\frac{\\partial^2 u}{\\partial y^2}$ for all $(x, y) \\neq (0, 0)$ is:",
    "options": {
      "A": "$0$",
      "B": "$\\frac{2}{x^2 + y^2}$",
      "C": "$\\frac{4}{(x^2 + y^2)^2}$",
      "D": "$-\\frac{2}{x^2 + y^2}$"
    },
    "correct_answer": "A",
    "solution": "Differentiating with respect to $x$:\n$$\\frac{\\partial u}{\\partial x} = \\frac{2x}{x^2 + y^2}$$\n$$\\frac{\\partial^2 u}{\\partial x^2} = \\frac{2(x^2 + y^2) - 2x(2x)}{(x^2 + y^2)^2} = \\frac{2y^2 - 2x^2}{(x^2 + y^2)^2}$$\nBy symmetry with respect to $y$:\n$$\\frac{\\partial^2 u}{\\partial y^2} = \\frac{2x^2 - 2y^2}{(x^2 + y^2)^2}$$\nAdding the two second partial derivatives:\n$$\\frac{\\partial^2 u}{\\partial x^2} + \\frac{\\partial^2 u}{\\partial y^2} = \\frac{(2y^2 - 2x^2) + (2x^2 - 2y^2)}{(x^2 + y^2)^2} = 0$$\nThus $u(x, y)$ is harmonic in $\\mathbb{R}^2 \\setminus \\{(0, 0)\\}$.",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_031",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Homogeneous function – Euler's theorem on homogeneous functions",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "If $u(x, y) = \\sin^{-1}\\left( \\frac{x + 2y}{\\sqrt{x} + \\sqrt{y}} \\right)$, the value of the differential expression:\n$$x^2 \\frac{\\partial^2 u}{\\partial x^2} + 2xy \\frac{\\partial^2 u}{\\partial x \\partial y} + y^2 \\frac{\\partial^2 u}{\\partial y^2}$$\nwhen $u = \\frac{\\pi}{6}$ is ________ (round off to three decimal places).",
    "correct_answer": "-0.096",
    "numerical_range": {
      "min": -0.105,
      "max": -0.088
    },
    "solution": "Let $z = \\sin(u) = \\frac{x + 2y}{\\sqrt{x} + \\sqrt{y}}$.\nThe degree of homogeneity of $z$ is $n = 1 - \\frac{1}{2} = \\frac{1}{2}$.\nBy Euler's theorem for homogeneous functions:\n$$x u_x + y u_y = n \\frac{F(u)}{F'(u)} = \\frac{1}{2} \\frac{\\sin u}{\\cos u} = \\frac{1}{2} \\tan u = g(u)$$\nUsing the second-order Euler differential identity:\n$$x^2 u_{xx} + 2xy u_{xy} + y^2 u_{yy} = g(u)[g'(u) - 1]$$\nHere $g(u) = \\frac{1}{2}\\tan u$, so $g'(u) = \\frac{1}{2}\\sec^2 u$.\n$$g(u)[g'(u) - 1] = \\frac{1}{2}\\tan u \\left[ \\frac{1}{2}\\sec^2 u - 1 \\right]$$\nAt $u = \\frac{\\pi}{6}$:\n$$\\tan(\\pi/6) = \\frac{1}{\\sqrt{3}}, \\quad \\sec^2(\\pi/6) = \\frac{4}{3}$$\n$$g(\\pi/6) = \\frac{1}{2\\sqrt{3}}$$\n$$g'(\\pi/6) - 1 = \\frac{1}{2}\\left(\\frac{4}{3}\\right) - 1 = \\frac{2}{3} - 1 = -\\frac{1}{3}$$\n$$x^2 u_{xx} + 2xy u_{xy} + y^2 u_{yy} = \\frac{1}{2\\sqrt{3}} \\left( -\\frac{1}{3} \\right) = -\\frac{1}{6\\sqrt{3}} \\approx -0.0962$$",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_032",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Homogeneous function – Euler's theorem on homogeneous functions",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The degree of homogeneity $n$ of the rational function $u(x, y) = \\frac{x^4 + y^4}{x^2 y + x y^2}$ is:",
    "options": {
      "A": "$1$",
      "B": "$2$",
      "C": "$3$",
      "D": "$4$"
    },
    "correct_answer": "A",
    "solution": "Substitute $x \\to tx$ and $y \\to ty$:\n$$u(tx, ty) = \\frac{(tx)^4 + (ty)^4}{(tx)^2(ty) + (tx)(ty)^2} = \\frac{t^4(x^4 + y^4)}{t^3(x^2 y + x y^2)} = t^{4-3} u(x, y) = t^1 u(x, y)$$\nHence the degree of homogeneity is $n = 1$.",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_033",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Total differentiation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The radius $r$ of a right circular cylinder increases at $0.2\\text{ cm/s}$ and its height $h$ decreases at $0.1\\text{ cm/s}$. At the instant when $r = 5\\text{ cm}$ and $h = 10\\text{ cm}$, the rate of change of volume $\\frac{dV}{dt}$ in $\\text{cm}^3/\\text{s}$ is $k \\pi$. The value of $k$ is ________ (round off to one decimal place).",
    "correct_answer": "17.5",
    "numerical_range": {
      "min": 17.4,
      "max": 17.6
    },
    "solution": "The volume of a cylinder is $V = \\pi r^2 h$.\nUsing the total derivative with respect to time $t$:\n$$\\frac{dV}{dt} = \\frac{\\partial V}{\\partial r} \\frac{dr}{dt} + \\frac{\\partial V}{\\partial h} \\frac{dh}{dt} = 2\\pi r h \\frac{dr}{dt} + \\pi r^2 \\frac{dh}{dt}$$\nGiven: $r = 5$, $h = 10$, $\\frac{dr}{dt} = 0.2$, and $\\frac{dh}{dt} = -0.1$:\n$$\\frac{dV}{dt} = 2\\pi(5)(10)(0.2) + \\pi(5^2)(-0.1) = \\pi [20 - 2.5] = 17.5 \\pi$$\nTherefore, $k = 17.5$.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_034",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Total differentiation",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "If an implicit equation $f(x, y) = 0$ defines $y$ as a differentiable function of $x$, then the total derivative $\\frac{dy}{dx}$ is given by:",
    "options": {
      "A": "$-\\frac{\\partial f / \\partial x}{\\partial f / \\partial y}$",
      "B": "$\\frac{\\partial f / \\partial x}{\\partial f / \\partial y}$",
      "C": "$-\\frac{\\partial f / \\partial y}{\\partial f / \\partial x}$",
      "D": "$\\frac{\\partial f / \\partial y}{\\partial f / \\partial x}$"
    },
    "correct_answer": "A",
    "solution": "Taking the total differential of $f(x, y) = 0$:\n$$df = \\frac{\\partial f}{\\partial x} dx + \\frac{\\partial f}{\\partial y} dy = 0$$\nSolving for $\\frac{dy}{dx}$:\n$$\\frac{\\partial f}{\\partial y} dy = -\\frac{\\partial f}{\\partial x} dx \\implies \\frac{dy}{dx} = -\\frac{\\partial f / \\partial x}{\\partial f / \\partial y}$$",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_035",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Maxima and minima of function with several independent variables",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "For the multivariable function $f(x, y) = x^3 + y^3 - 3xy$, the non-zero critical point is $(a, b)$. The local minimum value attained by $f(x, y)$ at this point is ________ (answer in integer).",
    "correct_answer": "-1",
    "numerical_range": {
      "min": -1,
      "max": -1
    },
    "solution": "**Step 1: Determine stationary points**\n$$\\frac{\\partial f}{\\partial x} = 3x^2 - 3y = 0 \\implies y = x^2$$\n$$\\frac{\\partial f}{\\partial y} = 3y^2 - 3x = 0 \\implies x = y^2$$\nSubstituting $y = x^2$ into the second equation: $x = (x^2)^2 = x^4 \\implies x(x^3 - 1) = 0$.\nReal roots are $x = 0$ (giving $(0,0)$) and $x = 1$ (giving non-zero critical point $(1,1)$).\n\n**Step 2: Second derivative test at $(1, 1)$**\n$$r = f_{xx} = 6x = 6 > 0$$\n$$s = f_{xy} = -3$$\n$$t = f_{yy} = 6y = 6$$\n$$D = rt - s^2 = (6)(6) - (-3)^2 = 36 - 9 = 27 > 0$$\nSince $D > 0$ and $r > 0$, $(1, 1)$ is a point of local minimum.\n\n**Step 3: Minimum value**\n$$f(1, 1) = 1^3 + 1^3 - 3(1)(1) = 1 + 1 - 3 = -1$$",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_036",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Maxima and minima of function with several independent variables",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Let $(x_0, y_0)$ be a stationary point of a twice continuously differentiable function $f(x, y)$, where $\\nabla f(x_0, y_0) = 0$. Let $r = f_{xx}$, $s = f_{xy}$, $t = f_{yy}$ at $(x_0, y_0)$, and $D = rt - s^2$. Which of the following statements is/are CORRECT?",
    "options": {
      "A": "If $D > 0$ and $r > 0$, then $f$ has a local minimum at $(x_0, y_0)$",
      "B": "If $D > 0$ and $r < 0$, then $f$ has a local maximum at $(x_0, y_0)$",
      "C": "If $D < 0$, then $f$ has a saddle point at $(x_0, y_0)$",
      "D": "If $D = 0$, the second derivative test is inconclusive"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "The discriminant $D = rt - s^2 = \\det(\\mathcal{H})$ is the determinant of the Hessian matrix $\\mathcal{H}$:\n1. If $D > 0$, both eigenvalues of $\\mathcal{H}$ share the same sign as $r$. If $r > 0$, $\\mathcal{H}$ is positive definite (local minimum, Option A is true). If $r < 0$, $\\mathcal{H}$ is negative definite (local maximum, Option B is true).\n2. If $D < 0$, the eigenvalues have opposite signs, making $\\mathcal{H}$ indefinite (saddle point, Option C is true).\n3. If $D = 0$, at least one eigenvalue is zero, making $\\mathcal{H}$ semi-definite or degenerate, so higher-order terms must be examined (inconclusive, Option D is true).",
    "difficulty": "Moderate",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_ADV_037",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Sequences and series – infinite series, tests for convergence",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The infinite series $\\sum_{n=1}^{\\infty} \\frac{1}{n^p}$ converges if and only if:",
    "options": {
      "A": "$p > 1$",
      "B": "$p \\ge 1$",
      "C": "$p < 1$",
      "D": "$p \\le 1$"
    },
    "correct_answer": "A",
    "solution": "By the integral test for convergence (the $p$-series test):\n$$\\int_1^\\infty \\frac{1}{x^p} \\, dx = \\lim_{M \\to \\infty} \\left[ \\frac{x^{1-p}}{1 - p} \\right]_1^M$$\nThis improper integral converges if and only if $1 - p < 0 \\iff p > 1$. When $p \\le 1$, the integral and the corresponding series diverge.",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_038",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Sequences and series – infinite series, tests for convergence",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The radius of convergence $R$ of the power series $\\sum_{n=1}^{\\infty} \\frac{(2n)!}{(n!)^2} x^n$ is ________ (round off to two decimal places).",
    "correct_answer": "0.25",
    "numerical_range": {
      "min": 0.24,
      "max": 0.26
    },
    "solution": "**Method 1: D'Alembert's Ratio Test**\nLet $a_n = \\frac{(2n)!}{(n!)^2}$. The ratio of consecutive coefficients is:\n$$\\frac{a_{n+1}}{a_n} = \\frac{(2n+2)!}{((n+1)!)^2} \\cdot \\frac{(n!)^2}{(2n)!} = \\frac{(2n+2)(2n+1)}{(n+1)^2} = \\frac{2(2n+1)}{n+1}$$\nTaking the limit as $n \\to \\infty$:\n$$L = \\lim_{n \\to \\infty} \\frac{4n + 2}{n + 1} = 4$$\nThe radius of convergence $R$ is the reciprocal of $L$:\n$$R = \\frac{1}{L} = \\frac{1}{4} = 0.25$$\n\n**Method 2: Stirling's Approximation Shortcut**\nUsing $n! \\sim \\sqrt{2\\pi n} (n/e)^n$:\n$$a_n = \\binom{2n}{n} \\sim \\frac{4^n}{\\sqrt{\\pi n}} \\implies \\lim_{n \\to \\infty} (a_n)^{1/n} = 4 \\implies R = \\frac{1}{4} = 0.25$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_039",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Fourier, Taylor and MacLaurin series",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "In the Fourier series expansion of the periodic function $f(x) = x^2$ on the interval $[-\\pi, \\pi]$ with period $2\\pi$:\n$$f(x) = \\frac{a_0}{2} + \\sum_{n=1}^{\\infty} a_n \\cos(nx) + \\sum_{n=1}^{\\infty} b_n \\sin(nx)$$\nThe value of the Fourier coefficient $a_1$ is ________ (answer in integer).",
    "correct_answer": "-4",
    "numerical_range": {
      "min": -4,
      "max": -4
    },
    "solution": "Since $f(x) = x^2$ is an even function on $[-\\pi, \\pi]$, all sine coefficients $b_n = 0$.\nThe cosine coefficients are given by:\n$$a_n = \\frac{2}{\\pi} \\int_0^\\pi x^2 \\cos(nx) \\, dx$$\nIntegrating by parts twice:\n$$\\int x^2 \\cos(nx) \\, dx = \\frac{x^2 \\sin(nx)}{n} + \\frac{2x \\cos(nx)}{n^2} - \\frac{2 \\sin(nx)}{n^3}$$\nEvaluating between limits $0$ and $\\pi$:\n$$a_n = \\frac{2}{\\pi} \\left[ \\frac{2\\pi \\cos(n\\pi)}{n^2} \\right] = \\frac{4 (-1)^n}{n^2}$$\nFor $n = 1$:\n$$a_1 = \\frac{4 (-1)^1}{1^2} = -4$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_040",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Fourier, Taylor and MacLaurin series",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Let $f(x)$ be a piecewise continuous periodic function of period $2L$ defined on $[-L, L]$. Which of the following statements regarding its Fourier series is/are TRUE?",
    "options": {
      "A": "If $f(x)$ is an even function, then all sine coefficients $b_n = 0$",
      "B": "If $f(x)$ is an odd function, then all cosine coefficients $a_n = 0$ including $a_0 = 0$",
      "C": "At a point of jump discontinuity $x_0$, the Fourier series converges to $\\frac{f(x_0^+) + f(x_0^-)}{2}$",
      "D": "Parseval's identity relates the total average signal power to the sum of squares of its Fourier coefficients"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "1. **Even Functions (Option A)**: The product of an even function and $\\sin(n\\pi x/L)$ is odd; integrating over $[-L, L]$ yields $b_n = 0$ (True).\n2. **Odd Functions (Option B)**: The product of an odd function and $\\cos(n\\pi x/L)$ is odd; integrating yields $a_n = 0$ for all $n \\ge 0$ (True).\n3. **Dirichlet Conditions (Option C)**: At any point of finite jump discontinuity, the Fourier series converges to the arithmetic mean of the left- and right-hand limits (True).\n4. **Parseval's Theorem (Option D)**: $\\frac{1}{L} \\int_{-L}^L [f(x)]^2 \\, dx = \\frac{a_0^2}{2} + \\sum_{n=1}^\\infty (a_n^2 + b_n^2)$ establishes energy conservation between space and frequency domains (True).",
    "difficulty": "Moderate",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_ADV_041",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Vector differentiation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A particle moves in 3D space with position vector $\\mathbf{r}(t) = t^2 \\hat{i} + (2t - 1) \\hat{j} + t^3 \\hat{k}$. The magnitude of the acceleration vector $|\\mathbf{a}(t)|$ at time $t = 1$ is ________ (round off to two decimal places).",
    "correct_answer": "6.32",
    "numerical_range": {
      "min": 6.28,
      "max": 6.36
    },
    "solution": "Given the position vector:\n$$\\mathbf{r}(t) = t^2 \\hat{i} + (2t - 1) \\hat{j} + t^3 \\hat{k}$$\nVelocity is the first derivative:\n$$\\mathbf{v}(t) = \\frac{d\\mathbf{r}}{dt} = 2t \\hat{i} + 2 \\hat{j} + 3t^2 \\hat{k}$$\nAcceleration is the second derivative:\n$$\\mathbf{a}(t) = \\frac{d\\mathbf{v}}{dt} = 2 \\hat{i} + 0 \\hat{j} + 6t \\hat{k}$$\nAt $t = 1$:\n$$\\mathbf{a}(1) = 2 \\hat{i} + 6 \\hat{k}$$\nMagnitude of acceleration:\n$$|\\mathbf{a}(1)| = \\sqrt{2^2 + 0^2 + 6^2} = \\sqrt{4 + 36} = \\sqrt{40} = 2\\sqrt{10} \\approx 6.3246 \\approx 6.32$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_042",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Vector differentiation",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "If $\\mathbf{u}(t)$ and $\\mathbf{v}(t)$ are differentiable vector functions, then $\\frac{d}{dt}(\\mathbf{u} \\times \\mathbf{v})$ is:",
    "options": {
      "A": "$\\mathbf{u} \\times \\frac{d\\mathbf{v}}{dt} + \\frac{d\\mathbf{u}}{dt} \\times \\mathbf{v}$",
      "B": "$\\frac{d\\mathbf{u}}{dt} \\times \\frac{d\\mathbf{v}}{dt}$",
      "C": "$\\mathbf{u} \\times \\frac{d\\mathbf{v}}{dt} - \\frac{d\\mathbf{u}}{dt} \\times \\mathbf{v}$",
      "D": "$\\frac{d\\mathbf{u}}{dt} \\times \\mathbf{v} - \\mathbf{u} \\times \\frac{d\\mathbf{v}}{dt}$"
    },
    "correct_answer": "A",
    "solution": "By the product rule for vector cross products:\n$$\\frac{d}{dt}(\\mathbf{u} \\times \\mathbf{v}) = \\frac{d\\mathbf{u}}{dt} \\times \\mathbf{v} + \\mathbf{u} \\times \\frac{d\\mathbf{v}}{dt}$$\nBecause vector addition is commutative, this is identical to $\\mathbf{u} \\times \\frac{d\\mathbf{v}}{dt} + \\frac{d\\mathbf{u}}{dt} \\times \\mathbf{v}$. Note that the relative order within each cross product term is preserved.",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_043",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Scalar and vector point functions",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "For a position vector $\\mathbf{r} = x\\hat{i} + y\\hat{j} + z\\hat{k}$ with magnitude $r = |\\mathbf{r}| = \\sqrt{x^2 + y^2 + z^2}$, which of the following vector identities is/are CORRECT?",
    "options": {
      "A": "$\\nabla r = \\frac{\\mathbf{r}}{r}$",
      "B": "$\\nabla \\cdot \\mathbf{r} = 3$",
      "C": "$\\nabla \\times \\mathbf{r} = \\mathbf{0}$",
      "D": "$\\nabla(r^n) = n r^{n-2} \\mathbf{r}$"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "1. **Gradient of Magnitude (Option A)**: $\\frac{\\partial r}{\\partial x} = \\frac{x}{r}$, so $\\nabla r = \\frac{x\\hat{i} + y\\hat{j} + z\\hat{k}}{r} = \\frac{\\mathbf{r}}{r}$ (True).\n2. **Divergence of Position Vector (Option B)**: $\\nabla \\cdot \\mathbf{r} = \\frac{\\partial x}{\\partial x} + \\frac{\\partial y}{\\partial y} + \\frac{\\partial z}{\\partial z} = 1 + 1 + 1 = 3$ (True).\n3. **Curl of Position Vector (Option C)**: $\\nabla \\times \\mathbf{r} = \\begin{vmatrix} \\hat{i} & \\hat{j} & \\hat{k} \\\\ \\partial/\\partial x & \\partial/\\partial y & \\partial/\\partial z \\\\ x & y & z \\end{vmatrix} = \\mathbf{0}$ (True).\n4. **Power Law Gradient (Option D)**: $\\nabla(r^n) = n r^{n-1} \\nabla r = n r^{n-1} \\left( \\frac{\\mathbf{r}}{r} \\right) = n r^{n-2} \\mathbf{r}$ (True).",
    "difficulty": "Moderate",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_ADV_044",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Scalar and vector point functions",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The directional derivative of a scalar field $\\phi(x, y, z)$ at a point $P$ attains its maximum value along:",
    "options": {
      "A": "The tangent to the level surface $\\phi = c$",
      "B": "The direction of the gradient vector $\\nabla \\phi$",
      "C": "Any direction perpendicular to $\\nabla \\phi$",
      "D": "The direction opposite to $\\nabla \\phi$"
    },
    "correct_answer": "B",
    "solution": "The directional derivative along any unit vector $\\hat{u}$ is given by:\n$$D_{\\hat{u}} \\phi = \\nabla \\phi \\cdot \\hat{u} = |\\nabla \\phi| \\cos\\theta$$\nSince $-1 \\le \\cos\\theta \\le 1$, this quantity is strictly maximized when $\\cos\\theta = 1$ (i.e., $\\theta = 0$), meaning $\\hat{u}$ points in the exact direction of $\\nabla \\phi$, with maximum value equal to $|\\nabla \\phi|$.",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_045",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Vector differential operators – del, gradient",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The directional derivative of $\\phi(x, y, z) = x^2 y z + 4 x z^2$ at the point $P(1, -2, -1)$ in the direction of the vector $\\mathbf{a} = 2\\hat{i} - \\hat{j} - 2\\hat{k}$ is ________ (round off to two decimal places).",
    "correct_answer": "12.33",
    "numerical_range": {
      "min": 12.25,
      "max": 12.4
    },
    "solution": "Compute the gradient of $\\phi$:\n$$\\nabla \\phi = \\left( 2xyz + 4z^2 \\right)\\hat{i} + \\left( x^2 z \\right)\\hat{j} + \\left( x^2 y + 8xz \\right)\\hat{k}$$\nEvaluate at $P(1, -2, -1)$:\n$$\\frac{\\partial \\phi}{\\partial x} = 2(1)(-2)(-1) + 4(-1)^2 = 4 + 4 = 8$$\n$$\\frac{\\partial \\phi}{\\partial y} = (1)^2 (-1) = -1$$\n$$\\frac{\\partial \\phi}{\\partial z} = (1)^2 (-2) + 8(1)(-1) = -2 - 8 = -10$$\n$$\\nabla \\phi(1, -2, -1) = 8\\hat{i} - \\hat{j} - 10\\hat{k}$$\nThe unit vector along $\\mathbf{a} = 2\\hat{i} - \\hat{j} - 2\\hat{k}$ is:\n$$\\hat{a} = \\frac{2\\hat{i} - \\hat{j} - 2\\hat{k}}{\\sqrt{2^2 + (-1)^2 + (-2)^2}} = \\frac{2\\hat{i} - \\hat{j} - 2\\hat{k}}{3}$$\nDirectional derivative:\n$$D_{\\hat{a}} \\phi = \\nabla \\phi \\cdot \\hat{a} = \\frac{8(2) + (-1)(-1) + (-10)(-2)}{3} = \\frac{16 + 1 + 20}{3} = \\frac{37}{3} \\approx 12.33$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_046",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Vector differential operators – del, gradient",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The unit outward normal vector to the level surface $x^2 + y^2 - z = 1$ at the point $(1, 1, 1)$ is:",
    "options": {
      "A": "$\\frac{2\\hat{i} + 2\\hat{j} - \\hat{k}}{3}$",
      "B": "$\\frac{\\hat{i} + \\hat{j} - \\hat{k}}{\\sqrt{3}}$",
      "C": "$\\frac{2\\hat{i} + 2\\hat{j} + \\hat{k}}{3}$",
      "D": "$\\frac{2\\hat{i} - 2\\hat{j} - \\hat{k}}{3}$"
    },
    "correct_answer": "A",
    "solution": "Let the surface be defined as $F(x, y, z) = x^2 + y^2 - z - 1 = 0$.\nThe normal vector is given by the gradient:\n$$\\nabla F = 2x \\hat{i} + 2y \\hat{j} - \\hat{k}$$\nAt the point $(1, 1, 1)$:\n$$\\nabla F = 2(1)\\hat{i} + 2(1)\\hat{j} - \\hat{k} = 2\\hat{i} + 2\\hat{j} - \\hat{k}$$\nMagnitude of the normal vector:\n$$|\\nabla F| = \\sqrt{2^2 + 2^2 + (-1)^2} = \\sqrt{4 + 4 + 1} = \\sqrt{9} = 3$$\nUnit normal vector:\n$$\\hat{n} = \\frac{\\nabla F}{|\\nabla F|} = \\frac{2\\hat{i} + 2\\hat{j} - \\hat{k}}{3}$$",
    "difficulty": "Easy",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_ADV_047",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Divergence and curl",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The vector field $\\mathbf{F} = (x + 3y)\\hat{i} + (y - 2z)\\hat{j} + (x + az)\\hat{k}$ is solenoidal. The value of constant $a$ is ________ (answer in integer).",
    "correct_answer": "-2",
    "numerical_range": {
      "min": -2,
      "max": -2
    },
    "solution": "A vector field $\\mathbf{F}$ is solenoidal if its divergence is identically zero:\n$$\\nabla \\cdot \\mathbf{F} = 0$$\nCompute the divergence:\n$$\\nabla \\cdot \\mathbf{F} = \\frac{\\partial}{\\partial x}(x + 3y) + \\frac{\\partial}{\\partial y}(y - 2z) + \\frac{\\partial}{\\partial z}(x + az) = 1 + 1 + a = 2 + a$$\nSetting $\\nabla \\cdot \\mathbf{F} = 0$:\n$$2 + a = 0 \\implies a = -2$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_048",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Divergence and curl",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following vector identities is/are mathematically VALID for any sufficiently smooth scalar field $\\phi$ and vector fields $\\mathbf{A}, \\mathbf{B}$?",
    "options": {
      "A": "$\\nabla \\times (\\nabla \\phi) = \\mathbf{0}$",
      "B": "$\\nabla \\cdot (\\nabla \\times \\mathbf{A}) = 0$",
      "C": "$\\nabla \\times (\\nabla \\times \\mathbf{A}) = \\nabla(\\nabla \\cdot \\mathbf{A}) - \\nabla^2 \\mathbf{A}$",
      "D": "$\\nabla \\cdot (\\mathbf{A} \\times \\mathbf{B}) = \\mathbf{B} \\cdot (\\nabla \\times \\mathbf{A}) - \\mathbf{A} \\cdot (\\nabla \\times \\mathbf{B})$"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "1. **Curl of Gradient (Option A)**: For any $C^2$ scalar field $\\phi$, $\\nabla \\times (\\nabla \\phi) = \\mathbf{0}$ due to the equality of mixed partial derivatives (True).\n2. **Divergence of Curl (Option B)**: The divergence of any curl field is identically zero: $\\nabla \\cdot (\\nabla \\times \\mathbf{A}) = 0$ (True).\n3. **Vector Laplacian Identity (Option C)**: $\\nabla \\times (\\nabla \\times \\mathbf{A}) = \\nabla(\\nabla \\cdot \\mathbf{A}) - \\nabla^2 \\mathbf{A}$ is a cornerstone identity in wave and electromagnetics theory (True).\n4. **Divergence of Cross Product (Option D)**: Product expansion gives $\\nabla \\cdot (\\mathbf{A} \\times \\mathbf{B}) = \\mathbf{B} \\cdot (\\nabla \\times \\mathbf{A}) - \\mathbf{A} \\cdot (\\nabla \\times \\mathbf{B})$ (True).",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_049",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Physical interpretations – line, surface and volume integrals",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The work done by the force field $\\mathbf{F} = (2x - y + z)\\hat{i} + (x + y - z^2)\\hat{j} + (3x - 2y + 4z)\\hat{k}$ in moving a particle along the straight line path from $(0, 0, 0)$ to $(1, 1, 1)$ is ________ (round off to two decimal places).",
    "correct_answer": "4.17",
    "numerical_range": {
      "min": 4.14,
      "max": 4.2
    },
    "solution": "**Method 1: Parametric Line Integration**\nParameterize the line segment from $(0,0,0)$ to $(1,1,1)$:\n$$x(t) = t, \\quad y(t) = t, \\quad z(t) = t, \\quad 0 \\le t \\le 1$$\nDifferentials: $dx = dt, \\, dy = dt, \\, dz = dt$.\nSubstitute into $\\mathbf{F} \\cdot d\\mathbf{r}$:\n$$\\mathbf{F} \\cdot d\\mathbf{r} = (2t - t + t)\\,dt + (t + t - t^2)\\,dt + (3t - 2t + 4t)\\,dt$$\n$$= 2t\\,dt + (2t - t^2)\\,dt + 5t\\,dt = (9t - t^2)\\,dt$$\nIntegrate over $t \\in [0, 1]$:\n$$W = \\int_0^1 (9t - t^2) \\, dt = \\left[ \\frac{9t^2}{2} - \\frac{t^3}{3} \\right]_0^1 = \\frac{9}{2} - \\frac{1}{3} = \\frac{27 - 2}{6} = \\frac{25}{6} \\approx 4.1667 \\approx 4.17$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_050",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Physical interpretations – line, surface and volume integrals",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "A force field $\\mathbf{F}$ is conservative in a simply connected domain $D$ if and only if:",
    "options": {
      "A": "$\\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = 0$ around every simple closed curve $C$ in $D$",
      "B": "$\\nabla \\cdot \\mathbf{F} = 0$ throughout $D$",
      "C": "$\\mathbf{F} \\cdot \\mathbf{r} = 0$ for all position vectors $\\mathbf{r}$",
      "D": "The work done depends strictly on the path taken between two points"
    },
    "correct_answer": "A",
    "solution": "A force field is conservative if and only if the work done between any two points is independent of the path connecting them. This is mathematically equivalent to the circulation around any simple closed curve being zero: $\\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = 0$.",
    "difficulty": "Easy",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_ADV_051",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Stokes, Gauss and Green's theorems",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The outward flux of the vector field $\\mathbf{F} = 4x \\hat{i} - 2y^2 \\hat{j} + z^2 \\hat{k}$ over the closed surface bounding the cylinder $x^2 + y^2 \\le 4$ between $z = 0$ and $z = 3$ is $k \\pi$. The value of $k$ is ________ (answer in integer).",
    "correct_answer": "84",
    "numerical_range": {
      "min": 84,
      "max": 84
    },
    "solution": "**Method 1: Gauss's Divergence Theorem**\n$$\\iint_S \\mathbf{F} \\cdot \\hat{n} \\, dS = \\iiint_V (\\nabla \\cdot \\mathbf{F}) \\, dV$$\nCompute the divergence:\n$$\\nabla \\cdot \\mathbf{F} = \\frac{\\partial}{\\partial x}(4x) + \\frac{\\partial}{\\partial y}(-2y^2) + \\frac{\\partial}{\\partial z}(z^2) = 4 - 4y + 2z$$\nTransform to cylindrical coordinates $(r, \\theta, z)$:\n$$x = r \\cos\\theta, \\quad y = r \\sin\\theta, \\quad z = z$$\nwhere $0 \\le r \\le 2$, $0 \\le \\theta \\le 2\\pi$, and $0 \\le z \\le 3$, with $dV = r \\, dr \\, d\\theta \\, dz$.\nNotice that $\\int_0^{2\\pi} y \\, d\\theta = \\int_0^{2\\pi} r \\sin\\theta \\, d\\theta = 0$ by symmetry.\nTherefore:\n$$\\iiint_V (4 + 2z) \\, dV = \\left( \\int_0^{2\\pi} d\\theta \\right) \\left( \\int_0^2 r \\, dr \\right) \\left( \\int_0^3 (4 + 2z) \\, dz \\right)$$\n$$= (2\\pi) \\cdot \\left[ \\frac{r^2}{2} \\right]_0^2 \\cdot \\left[ 4z + z^2 \\right]_0^3$$\n$$= (2\\pi) \\cdot (2) \\cdot (12 + 9) = 4\\pi \\times 21 = 84\\pi$$\nHence $k = 84$.",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_052",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Stokes, Gauss and Green's theorems",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following integral theorems correctly express(es) fundamental relationships in vector calculus?",
    "options": {
      "A": "Green's theorem in the plane: $\\oint_C (M\\,dx + N\\,dy) = \\iint_R \\left( \\frac{\\partial N}{\\partial x} - \\frac{\\partial M}{\\partial y} \\right) dx\\,dy$",
      "B": "Stokes' theorem: $\\oint_C \\mathbf{F} \\cdot d\\mathbf{r} = \\iint_S (\\nabla \\times \\mathbf{F}) \\cdot \\hat{n} \\, dS$",
      "C": "Gauss's divergence theorem: $\\iint_S \\mathbf{F} \\cdot \\hat{n} \\, dS = \\iiint_V (\\nabla \\cdot \\mathbf{F}) \\, dV$",
      "D": "For an irrotational vector field $\\mathbf{F} = \\nabla \\phi$ across a closed surface $S$, $\\iint_S (\\nabla \\times \\mathbf{F}) \\cdot \\hat{n} \\, dS = 0$"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "All four options are fundamental theorems of vector analysis:\n1. **Option A**: Green's Theorem relates a line integral around a simple closed plane curve $C$ to a double integral over the bounded planar region $R$ (True).\n2. **Option B**: Stokes' Theorem equates the circulation of $\\mathbf{F}$ along boundary curve $C$ to the surface flux of its curl (True).\n3. **Option C**: Gauss's Divergence Theorem relates outward surface flux to the volume integral of divergence (True).\n4. **Option D**: Since $\\nabla \\times (\\nabla \\phi) = \\mathbf{0}$, the integrand is identically zero, so the surface integral vanishes (True).",
    "difficulty": "Moderate",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_ADV_053",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Linear and non-linear first order Ordinary Differential Equations (ODE)",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Solve the initial value problem:\n$$\\frac{dy}{dx} + 2x y = 2x, \\quad y(0) = 4$$\nThe value of $y(1)$ is ________ (round off to three decimal places).",
    "correct_answer": "2.104",
    "numerical_range": {
      "min": 2.09,
      "max": 2.12
    },
    "solution": "**Method 1: Integrating Factor Method**\nThe equation is linear in standard form $\\frac{dy}{dx} + P(x) y = Q(x)$ with $P(x) = 2x$ and $Q(x) = 2x$.\n$$\\text{I.F.} = e^{\\int 2x \\, dx} = e^{x^2}$$\nMultiplying through by the integrating factor:\n$$\\frac{d}{dx} \\left( y e^{x^2} \\right) = 2x e^{x^2}$$\nIntegrating both sides:\n$$y e^{x^2} = \\int 2x e^{x^2} \\, dx = e^{x^2} + C \\implies y(x) = 1 + C e^{-x^2}$$\nApplying the initial condition $y(0) = 4$:\n$$1 + C e^0 = 4 \\implies C = 3$$\nThus $y(x) = 1 + 3 e^{-x^2}$. At $x = 1$:\n$$y(1) = 1 + 3 e^{-1} = 1 + \\frac{3}{2.71828} \\approx 1 + 1.1036 = 2.1036 \\approx 2.104$$\n\n**Method 2: Separation of Variables**\n$$\\frac{dy}{dx} = 2x(1 - y) \\implies \\frac{dy}{1 - y} = 2x \\, dx \\implies -\\ln|1 - y| = x^2 + K$$\n$$1 - y = A e^{-x^2} \\implies y = 1 - A e^{-x^2}$$\nWith $y(0) = 4 \\implies A = -3 \\implies y(x) = 1 + 3e^{-x^2}$. Both methods yield $2.104$.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_054",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Linear and non-linear first order Ordinary Differential Equations (ODE)",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The integrating factor for the first-order linear differential equation $\\frac{dy}{dx} + y \\cot(x) = 2 \\cos(x)$ on the interval $(0, \\pi)$ is:",
    "options": {
      "A": "$\\sin(x)$",
      "B": "$\\cos(x)$",
      "C": "$\\ln|\\sin(x)|$",
      "D": "$\\csc(x)$"
    },
    "correct_answer": "A",
    "solution": "Here $P(x) = \\cot(x)$. The integrating factor is:\n$$\\text{I.F.} = e^{\\int P(x) \\, dx} = e^{\\int \\cot(x) \\, dx} = e^{\\ln|\\sin(x)|} = \\sin(x)$$\nfor $x \\in (0, \\pi)$.",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_055",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Linear and non-linear first order Ordinary Differential Equations (ODE)",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "For the first-order differential equation $M(x, y)\\,dx + N(x, y)\\,dy = 0$, which of the following statements is/are TRUE?",
    "options": {
      "A": "The equation is exact if and only if $\\frac{\\partial M}{\\partial y} = \\frac{\\partial N}{\\partial x}$",
      "B": "If $\\frac{1}{N}\\left(\\frac{\\partial M}{\\partial y} - \\frac{\\partial N}{\\partial x}\\right) = f(x)$ is a function of $x$ alone, then $e^{\\int f(x)\\,dx}$ is an integrating factor",
      "C": "If $\\frac{1}{M}\\left(\\frac{\\partial N}{\\partial x} - \\frac{\\partial M}{\\partial y}\\right) = g(y)$ is a function of $y$ alone, then $e^{\\int g(y)\\,dy}$ is an integrating factor",
      "D": "An exact differential equation can always be solved by finding a potential function $\\phi(x, y)$ such that $d\\phi = M\\,dx + N\\,dy = 0$"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "1. **Exactness Criterion (Option A)**: In a simply connected domain, $M\\,dx + N\\,dy = 0$ is exact if and only if the cross partials match: $\\frac{\\partial M}{\\partial y} = \\frac{\\partial N}{\\partial x}$ (True).\n2. **Integrating Factor in $x$ (Option B)**: When $\\frac{1}{N}(M_y - N_x) = f(x)$, multiplying by $\\mu(x) = e^{\\int f(x)\\,dx}$ yields an exact differential equation (True).\n3. **Integrating Factor in $y$ (Option C)**: When $\\frac{1}{M}(N_x - M_y) = g(y)$, multiplying by $\\mu(y) = e^{\\int g(y)\\,dy}$ yields an exact equation (True).\n4. **Potential Function (Option D)**: Exactness implies the existence of $\\phi(x, y)$ such that $\\nabla \\phi = \\langle M, N \\rangle$, with general solution $\\phi(x, y) = C$ (True).",
    "difficulty": "Moderate",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_ADV_056",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Homogeneous differential equations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The substitution $y = v x$ transforms the homogeneous differential equation:\n$$\\frac{dy}{dx} = \\frac{x^2 + y^2}{2xy}$$\ninto the separable differential equation $\\frac{2v}{1 - v^2} \\, dv = \\frac{dx}{x}$. Given the initial condition $y(1) = 0$, the value of $y^2$ when $x = 2$ is ________ (answer in integer).",
    "correct_answer": "2",
    "numerical_range": {
      "min": 2,
      "max": 2
    },
    "solution": "Substitute $y = vx \\implies \\frac{dy}{dx} = v + x \\frac{dv}{dx}$:\n$$v + x \\frac{dv}{dx} = \\frac{x^2 + v^2 x^2}{2x(vx)} = \\frac{1 + v^2}{2v}$$\n$$x \\frac{dv}{dx} = \\frac{1 + v^2}{2v} - v = \\frac{1 - v^2}{2v}$$\nSeparating variables:\n$$\\frac{2v}{1 - v^2} \\, dv = \\frac{dx}{x}$$\nIntegrating both sides:\n$$-\\ln|1 - v^2| = \\ln|x| + C_1 \\implies \\ln|(1 - v^2)x| = C \\implies (1 - v^2)x = C$$\nBack-substituting $v = y/x$:\n$$\\left( 1 - \\frac{y^2}{x^2} \\right) x = C \\implies \\frac{x^2 - y^2}{x} = C \\implies x^2 - y^2 = C x$$\nApplying the initial condition $y(1) = 0$:\n$$1^2 - 0^2 = C(1) \\implies C = 1$$\nThus the particular solution is $x^2 - y^2 = x \\implies y^2 = x^2 - x$.\nAt $x = 2$:\n$$y^2 = 2^2 - 2 = 4 - 2 = 2$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_057",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Homogeneous differential equations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "A first-order differential equation $\\frac{dy}{dx} = f(x, y)$ is classified as homogeneous if the function $f(x, y)$ can be expressed solely as a function of:",
    "options": {
      "A": "$\\frac{y}{x}$",
      "B": "$x + y$",
      "C": "$x \\cdot y$",
      "D": "$x - y$"
    },
    "correct_answer": "A",
    "solution": "A function $f(x, y)$ is homogeneous of degree zero if $f(tx, ty) = t^0 f(x, y) = f(x, y)$. Setting $t = 1/x$, this becomes $f(1, y/x) = g(y/x)$. Hence, the right-hand side depends solely on the ratio $y/x$.",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_058",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Higher order linear ODEs with constant coefficients",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "For the initial value problem:\n$$\\frac{d^2 y}{dx^2} - 4\\frac{dy}{dx} + 4y = 0, \\quad y(0) = 1, \\quad y'(0) = 4$$\nThe value of $y(1)$ is ________ (round off to two decimal places).",
    "correct_answer": "22.17",
    "numerical_range": {
      "min": 22,
      "max": 22.3
    },
    "solution": "The auxiliary equation is:\n$$m^2 - 4m + 4 = 0 \\implies (m - 2)^2 = 0 \\implies m = 2, \\, 2 \\quad \\text{(repeated real roots)}$$\nThe complementary solution is:\n$$y(x) = (C_1 + C_2 x) e^{2x}$$\nApplying the initial condition $y(0) = 1$:\n$$(C_1 + 0) e^0 = 1 \\implies C_1 = 1$$\nTaking the first derivative:\n$$y'(x) = C_2 e^{2x} + 2(C_1 + C_2 x) e^{2x} = (2C_1 + C_2 + 2C_2 x) e^{2x}$$\nApplying $y'(0) = 4$:\n$$2(1) + C_2 = 4 \\implies C_2 = 2$$\nThus the particular solution is:\n$$y(x) = (1 + 2x) e^{2x}$$\nAt $x = 1$:\n$$y(1) = (1 + 2) e^{2(1)} = 3 e^2 \\approx 3 \\times 7.389056 = 22.167 \\approx 22.17$$",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_059",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Higher order linear ODEs with constant coefficients",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The particular integral $y_p$ of the ordinary differential equation $\\frac{d^2y}{dx^2} + 9y = e^{2x}$ is:",
    "options": {
      "A": "$\\frac{1}{13} e^{2x}$",
      "B": "$\\frac{1}{5} e^{2x}$",
      "C": "$\\frac{1}{9} e^{2x}$",
      "D": "$\\frac{1}{4} e^{2x}$"
    },
    "correct_answer": "A",
    "solution": "Using the inverse differential operator method:\n$$y_p = \\frac{1}{D^2 + 9} e^{2x}$$\nSince $D^2 + 9$ evaluated at $D = 2$ is $2^2 + 9 = 13 \\neq 0$:\n$$y_p = \\frac{1}{2^2 + 9} e^{2x} = \\frac{1}{13} e^{2x}$$",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_060",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Higher order linear ODEs with constant coefficients",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Consider the second-order homogeneous linear differential equation $y'' + P(x) y' + Q(x) y = 0$ with two solutions $y_1(x)$ and $y_2(x)$ on an interval $I$. Which of the following statements is/are TRUE?",
    "options": {
      "A": "The Wronskian of the two solutions is defined as $W(y_1, y_2) = y_1 y_2' - y_1' y_2$",
      "B": "$y_1$ and $y_2$ form a fundamental basis of solutions if and only if $W(y_1, y_2) \\neq 0$ everywhere on $I$",
      "C": "Abel's identity states that $W(x) = W(x_0) \\exp\\left( -\\int_{x_0}^x P(t)\\,dt \\right)$",
      "D": "If $W(x_0) = 0$ at any single point $x_0 \\in I$, then $W(x) = 0$ for all $x \\in I$"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "1. **Wronskian Determinant (Option A)**: $W = \\begin{vmatrix} y_1 & y_2 \\\\ y_1' & y_2' \\end{vmatrix} = y_1 y_2' - y_1' y_2$ (True).\n2. **Linear Independence Criterion (Option B)**: Two solutions are linearly independent on $I$ if and only if their Wronskian is non-zero everywhere on $I$ (True).\n3. **Abel's Identity (Option C)**: Differentiating $W' = y_1 y_2'' - y_1'' y_2 = -P(x) W$ yields the exponential relation $W(x) = W(x_0) e^{-\\int_{x_0}^x P(t)\\,dt}$ (True).\n4. **All-or-Nothing Property (Option D)**: Because the exponential function never vanishes, $W(x)$ is either identically zero or nowhere zero on $I$ (True).",
    "difficulty": "Moderate",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_ADV_061",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Laplace transforms and their inverse",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The Laplace transform of $f(t) = e^{3t} \\cos(4t)$ is denoted by $F(s)$. The value of $F(5)$ is ________ (round off to two decimal places).",
    "correct_answer": "0.1",
    "numerical_range": {
      "min": 0.095,
      "max": 0.105
    },
    "solution": "**Method 1: First Shifting Property**\nThe standard Laplace transform of $\\cos(\\omega t)$ is:\n$$\\mathcal{L}\\{\\cos(4t)\\} = \\frac{s}{s^2 + 16}$$\nUsing the first frequency shifting theorem $\\mathcal{L}\\{e^{at} g(t)\\} = G(s - a)$ with $a = 3$:\n$$F(s) = \\mathcal{L}\\{e^{3t} \\cos(4t)\\} = \\frac{s - 3}{(s - 3)^2 + 16}$$\nEvaluating at $s = 5$:\n$$F(5) = \\frac{5 - 3}{(5 - 3)^2 + 16} = \\frac{2}{2^2 + 16} = \\frac{2}{4 + 16} = \\frac{2}{20} = 0.10$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_062",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Laplace transforms and their inverse",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The inverse Laplace transform $\\mathcal{L}^{-1}\\left\\{ \\frac{1}{s(s + 1)} \\right\\}$ is:",
    "options": {
      "A": "$1 - e^{-t}$",
      "B": "$1 + e^{-t}$",
      "C": "$e^{-t} - 1$",
      "D": "$t e^{-t}$"
    },
    "correct_answer": "A",
    "solution": "Decomposing into partial fractions:\n$$\\frac{1}{s(s+1)} = \\frac{1}{s} - \\frac{1}{s+1}$$\nTaking inverse Laplace transforms term by term:\n$$\\mathcal{L}^{-1}\\left\\{ \\frac{1}{s} \\right\\} - \\mathcal{L}^{-1}\\left\\{ \\frac{1}{s+1} \\right\\} = 1 - e^{-t}$$",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_063",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Laplace transforms and their inverse",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following Laplace transform operational properties is/are CORRECT for sufficiently smooth functions $f(t)$ and $g(t)$?",
    "options": {
      "A": "$\\mathcal{L}\\{f'(t)\\} = s F(s) - f(0)$",
      "B": "$\\mathcal{L}\\{f''(t)\\} = s^2 F(s) - s f(0) - f'(0)$",
      "C": "$\\mathcal{L}\\{t f(t)\\} = -\\frac{d}{ds} F(s)$",
      "D": "$\\mathcal{L}\\{(f * g)(t)\\} = F(s) \\cdot G(s)$"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "All four statements are foundational theorems in Laplace operational calculus:\n1. **First Derivative Rule (Option A)**: $\\int_0^\\infty e^{-st} f'(t)\\,dt = [e^{-st} f(t)]_0^\\infty + s\\int_0^\\infty e^{-st} f(t)\\,dt = sF(s) - f(0)$ (True).\n2. **Second Derivative Rule (Option B)**: Applying the derivative rule twice gives $s[sF(s) - f(0)] - f'(0) = s^2 F(s) - sf(0) - f'(0)$ (True).\n3. **Multiplication by $t$ (Option C)**: $\\frac{d}{ds} F(s) = \\int_0^\\infty (-t) e^{-st} f(t)\\,dt = -\\mathcal{L}\\{t f(t)\\}$ (True).\n4. **Convolution Theorem (Option D)**: The Laplace transform of the convolution $(f * g)(t) = \\int_0^t f(\\tau) g(t - \\tau)\\,d\\tau$ is the algebraic product $F(s) \\cdot G(s)$ (True).",
    "difficulty": "Moderate",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_ADV_064",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Partial Differential Equations – Laplace, heat and wave equations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The one-dimensional heat conduction equation in a homogeneous rod of length $L = \\pi$ with thermal diffusivity $\\alpha = 1$ is:\n$$\\frac{\\partial u}{\\partial t} = \\frac{\\partial^2 u}{\\partial x^2}, \\quad 0 < x < \\pi, \\quad t > 0$$\nsubject to boundary conditions $u(0, t) = u(\\pi, t) = 0$ and initial condition $u(x, 0) = 4 \\sin(2x)$. The temperature $u\\left(\\frac{\\pi}{4}, 0.25\\right)$ is ________ (round off to two decimal places).",
    "correct_answer": "1.47",
    "numerical_range": {
      "min": 1.45,
      "max": 1.49
    },
    "solution": "**Method 1: Separation of Variables**\nThe general Fourier series solution for homogeneous Dirichlet boundary conditions on $[0, \\pi]$ is:\n$$u(x, t) = \\sum_{n=1}^\\infty B_n \\sin(nx) e^{-n^2 \\alpha t}$$\nWith initial condition $u(x, 0) = 4 \\sin(2x)$, all coefficients $B_n = 0$ except for $n = 2$, where $B_2 = 4$.\nGiven $\\alpha = 1$:\n$$u(x, t) = 4 \\sin(2x) e^{-2^2 (1) t} = 4 \\sin(2x) e^{-4t}$$\nEvaluating at $x = \\frac{\\pi}{4}$ and $t = 0.25$:\n$$\\sin\\left(2 \\cdot \\frac{\\pi}{4}\\right) = \\sin\\left(\\frac{\\pi}{2}\\right) = 1$$\n$$e^{-4(0.25)} = e^{-1} \\approx \\frac{1}{2.71828} \\approx 0.36788$$\n$$u\\left(\\frac{\\pi}{4}, 0.25\\right) = 4(1) e^{-1} = 4 \\times 0.36788 \\approx 1.4715 \\approx 1.47$$",
    "difficulty": "Hard",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_ADV_065",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Partial Differential Equations – Laplace, heat and wave equations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The two-dimensional wave equation $\\frac{\\partial^2 u}{\\partial t^2} = c^2 \\left( \\frac{\\partial^2 u}{\\partial x^2} + \\frac{\\partial^2 u}{\\partial y^2} \\right)$ is mathematically classified as:",
    "options": {
      "A": "Hyperbolic",
      "B": "Parabolic",
      "C": "Elliptic",
      "D": "Ultra-hyperbolic"
    },
    "correct_answer": "A",
    "solution": "In standard second-order partial differential equation classification:\n- Wave equation (second-order in time and space with opposite signs): Hyperbolic\n- Heat/diffusion equation (first-order in time, second-order in space): Parabolic\n- Laplace/Poisson equation (elliptic operator without time): Elliptic",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_066",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Partial Differential Equations – Laplace, heat and wave equations",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements is/are TRUE for Laplace's equation $\\nabla^2 u = \\frac{\\partial^2 u}{\\partial x^2} + \\frac{\\partial^2 u}{\\partial y^2} = 0$ in a bounded planar domain $D$ with boundary $C$?",
    "options": {
      "A": "Solutions to Laplace's equation are called harmonic functions",
      "B": "A non-constant harmonic function cannot attain its maximum or minimum at an interior point of $D$",
      "C": "The solution to the Dirichlet problem (prescribed values of $u$ on boundary $C$) is unique",
      "D": "At any point $(x_0, y_0)$, the value $u(x_0, y_0)$ equals the average value of $u$ along any circle centered at $(x_0, y_0)$ lying entirely in $D$"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "All four statements are foundational properties of harmonic functions:\n1. **Harmonic Definition (Option A)**: Any $C^2$ function satisfying $\\nabla^2 u = 0$ is harmonic (True).\n2. **Maximum/Minimum Principle (Option B)**: The extrema of harmonic functions in a bounded domain must lie on the boundary $\\partial D$ (True).\n3. **Uniqueness (Option C)**: If $u_1, u_2$ satisfy the same boundary values, $w = u_1 - u_2$ satisfies $\\nabla^2 w = 0$ with $w = 0$ on $C$. By energy method $\\iint_D |\\nabla w|^2\\,dA = 0$, $w \\equiv 0$, establishing uniqueness (True).\n4. **Mean Value Property (Option D)**: Gauss's mean value theorem proves that the center point value equals the perimeter circular average (True).",
    "difficulty": "Moderate",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_ADV_067",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Mean, median, mode and standard deviation",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A dataset consists of $5$ observations: $3, 7, 8, 12, 15$. The sample variance $s^2$ (computed using divisor $n - 1$) is ________ (round off to one decimal place).",
    "correct_answer": "21.5",
    "numerical_range": {
      "min": 21.4,
      "max": 21.6
    },
    "solution": "Compute the sample mean:\n$$\\bar{x} = \\frac{3 + 7 + 8 + 12 + 15}{5} = \\frac{45}{5} = 9$$\nCompute the deviations from the mean and their squares:\n- $(3 - 9)^2 = (-6)^2 = 36$\n- $(7 - 9)^2 = (-2)^2 = 4$\n- $(8 - 9)^2 = (-1)^2 = 1$\n- $(12 - 9)^2 = 3^2 = 9$\n- $(15 - 9)^2 = 6^2 = 36$\nSum of squared deviations:\n$$\\sum_{i=1}^5 (x_i - \\bar{x})^2 = 36 + 4 + 1 + 9 + 36 = 86$$\nSample variance with $n - 1 = 4$ degrees of freedom:\n$$s^2 = \\frac{86}{4} = 21.5$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_068",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Mean, median, mode and standard deviation",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "For a moderately skewed unimodal frequency distribution, Karl Pearson's empirical relationship between mean, median, and mode is given by:",
    "options": {
      "A": "$\\text{Mode} \\approx 3\\,\\text{Median} - 2\\,\\text{Mean}$",
      "B": "$\\text{Mode} \\approx 2\\,\\text{Median} - 3\\,\\text{Mean}$",
      "C": "$\\text{Mode} \\approx 3\\,\\text{Mean} - 2\\,\\text{Median}$",
      "D": "$\\text{Mode} \\approx \\text{Mean} - 3\\,\\text{Median}$"
    },
    "correct_answer": "A",
    "solution": "Karl Pearson's classical empirical rule relates central tendency metrics as:\n$$\\text{Mean} - \\text{Mode} \\approx 3(\\text{Mean} - \\text{Median})$$\nRearranging to express Mode:\n$$\\text{Mode} \\approx \\text{Mean} - 3\\,\\text{Mean} + 3\\,\\text{Median} = 3\\,\\text{Median} - 2\\,\\text{Mean}$$",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_069",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Random variables",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A continuous random variable $X$ has probability density function (PDF):\n$$f(x) = \\begin{cases} c(1 - x^2), & 0 \\le x \\le 1 \\\\ 0, & \\text{otherwise} \\end{cases}$$\nThe expected value $E[X]$ is ________ (round off to three decimal places).",
    "correct_answer": "0.375",
    "numerical_range": {
      "min": 0.37,
      "max": 0.38
    },
    "solution": "**Step 1: Normalization to find $c$**\n$$\\int_0^1 c(1 - x^2) \\, dx = 1 \\implies c \\left[ x - \\frac{x^3}{3} \\right]_0^1 = c\\left(1 - \\frac{1}{3}\\right) = \\frac{2}{3}c = 1 \\implies c = \\frac{3}{2}$$\n\n**Step 2: Compute expectation $E[X]$**\n$$E[X] = \\int_{-\\infty}^\\infty x f(x) \\, dx = \\frac{3}{2} \\int_0^1 x(1 - x^2) \\, dx = \\frac{3}{2} \\int_0^1 (x - x^3) \\, dx$$\n$$= \\frac{3}{2} \\left[ \\frac{x^2}{2} - \\frac{x^4}{4} \\right]_0^1 = \\frac{3}{2} \\left( \\frac{1}{2} - \\frac{1}{4} \\right) = \\frac{3}{2} \\left( \\frac{1}{4} \\right) = \\frac{3}{8} = 0.375$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_070",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Random variables",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "If $X$ is a random variable with variance $\\operatorname{Var}(X) = 4$, then the variance $\\operatorname{Var}(3 - 2X)$ is:",
    "options": {
      "A": "$16$",
      "B": "$-8$",
      "C": "$12$",
      "D": "$19$"
    },
    "correct_answer": "A",
    "solution": "By the scaling property of variance for any constants $a$ and $b$:\n$$\\operatorname{Var}(a + bX) = b^2 \\operatorname{Var}(X)$$\nHere $a = 3$ and $b = -2$:\n$$\\operatorname{Var}(3 - 2X) = (-2)^2 \\operatorname{Var}(X) = 4 \\times 4 = 16$$",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_071",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Random variables",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Let $X$ and $Y$ be two independent random variables with finite expectations and variances. Which of the following statements is/are ALWAYS TRUE?",
    "options": {
      "A": "$E[X + Y] = E[X] + E[Y]$",
      "B": "$E[XY] = E[X] E[Y]$",
      "C": "$\\operatorname{Var}(X + Y) = \\operatorname{Var}(X) + \\operatorname{Var}(Y)$",
      "D": "The covariance $\\operatorname{Cov}(X, Y) = 0$"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "1. **Linearity of Expectation (Option A)**: Holds unconditionally for any random variables (True).\n2. **Product Expectation under Independence (Option B)**: For independent variables, joint PDF factorizes: $E[XY] = \\iint xy f_X(x) f_Y(y)\\,dx\\,dy = E[X]E[Y]$ (True).\n3. **Variance of Sum (Option C)**: $\\operatorname{Var}(X + Y) = \\operatorname{Var}(X) + \\operatorname{Var}(Y) + 2\\operatorname{Cov}(X, Y)$. Under independence, $\\operatorname{Cov}(X, Y) = 0$, so variances add directly (True).\n4. **Covariance Zero (Option D)**: $\\operatorname{Cov}(X, Y) = E[XY] - E[X]E[Y] = 0$ (True).",
    "difficulty": "Moderate",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_ADV_072",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Poisson, normal and binomial distributions",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "In a seed quality testing trial, the number of defective seeds per unit volume follows a Poisson distribution with mean parameter $\\lambda = 2$. The probability that a randomly drawn sample contains at least $2$ defective seeds is ________ (round off to three decimal places).",
    "correct_answer": "0.594",
    "numerical_range": {
      "min": 0.585,
      "max": 0.605
    },
    "solution": "For a Poisson distribution with mean $\\lambda = 2$:\n$$P(X = k) = \\frac{e^{-\\lambda} \\lambda^k}{k!} = \\frac{e^{-2} 2^k}{k!}$$\nWe seek $P(X \\ge 2) = 1 - [P(X = 0) + P(X = 1)]$.\n$$P(X = 0) = \\frac{e^{-2} 2^0}{0!} = e^{-2}$$\n$$P(X = 1) = \\frac{e^{-2} 2^1}{1!} = 2 e^{-2}$$\nSum of probabilities for $X = 0$ and $X = 1$:\n$$P(X = 0) + P(X = 1) = 3 e^{-2}$$\nGiven $e^{-2} \\approx 0.135335$:\n$$3 e^{-2} \\approx 3 \\times 0.135335 = 0.406006$$\n$$P(X \\ge 2) = 1 - 0.406006 = 0.593994 \\approx 0.594$$",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_073",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Poisson, normal and binomial distributions",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "For a Binomial distribution $B(n, p)$, the mean is $6$ and the variance is $4$. The number of trials $n$ is:",
    "options": {
      "A": "$18$",
      "B": "$12$",
      "C": "$24$",
      "D": "$9$"
    },
    "correct_answer": "A",
    "solution": "For a binomial distribution:\n$$\\mu = n p = 6$$\n$$\\sigma^2 = n p q = 4, \\quad \\text{where } q = 1 - p$$\nDividing variance by mean:\n$$\\frac{n p q}{n p} = q = \\frac{4}{6} = \\frac{2}{3}$$\n$$p = 1 - q = 1 - \\frac{2}{3} = \\frac{1}{3}$$\n$$n = \\frac{6}{p} = \\frac{6}{1/3} = 18$$",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_074",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Poisson, normal and binomial distributions",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements regarding the normal distribution $\\mathcal{N}(\\mu, \\sigma^2)$ is/are TRUE?",
    "options": {
      "A": "The probability density curve is symmetric about the line $x = \\mu$",
      "B": "The mean, median, and mode coincide at $x = \\mu$",
      "C": "The points of inflection of the bell-shaped curve occur at $x = \\mu \\pm \\sigma$",
      "D": "Approximately $68.27\\%$ of the total area under the curve lies within the interval $[\\mu - \\sigma, \\mu + \\sigma]$"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "1. **Symmetry (Option A)**: $f(\\mu + x) = f(\\mu - x) = \\frac{1}{\\sigma\\sqrt{2\\pi}} e^{-x^2 / (2\\sigma^2)}$ (True).\n2. **Central Tendency Alignment (Option B)**: By symmetry and unimodality, mean = median = mode = $\\mu$ (True).\n3. **Inflection Points (Option C)**: $f''(x) = 0 \\implies \\frac{(x - \\mu)^2}{\\sigma^2} = 1 \\implies x = \\mu \\pm \\sigma$ (True).\n4. **Empirical Rule (Option D)**: $\\int_{\\mu-\\sigma}^{\\mu+\\sigma} f(x)\\,dx = \\Phi(1) - \\Phi(-1) = 0.8413 - 0.1587 = 0.6826$ (True).",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_075",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Correlation and regression analysis",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The two lines of regression for a bivariate dataset are given by:\n$$3x + 2y = 26 \\quad \\text{and} \\quad 6x + y = 31$$\nThe Karl Pearson correlation coefficient $r$ between $X$ and $Y$ is ________ (round off to two decimal places).",
    "correct_answer": "-0.5",
    "numerical_range": {
      "min": -0.52,
      "max": -0.48
    },
    "solution": "Let us identify which equation corresponds to regression of $y$ on $x$ versus $x$ on $y$:\n**Hypothesis 1:**\n- Let $3x + 2y = 26$ be the regression line of $y$ on $x$:\n  $$2y = -3x + 26 \\implies y = -\\frac{3}{2}x + 13 \\implies b_{yx} = -1.5$$\n- Let $6x + y = 31$ be the regression line of $x$ on $y$:\n  $$6x = -y + 31 \\implies x = -\\frac{1}{6}y + \\frac{31}{6} \\implies b_{xy} = -\\frac{1}{6}$$\n\nCompute $r^2$:\n$$r^2 = b_{yx} \\cdot b_{xy} = \\left(-\\frac{3}{2}\\right) \\left(-\\frac{1}{6}\\right) = \\frac{3}{12} = \\frac{1}{4} = 0.25 \\le 1$$\nSince $r^2 \\le 1$, this assignment is statistically valid.\nBecause both regression coefficients are negative, $r$ must be negative:\n$$r = -\\sqrt{0.25} = -0.50$$\n(Note: Swapping assignments yields $r^2 = 4 > 1$, which violates $|r| \\le 1$).",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_076",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Correlation and regression analysis",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "If the two linear regression coefficients between variables $X$ and $Y$ are $b_{yx} = 0.8$ and $b_{xy} = 0.45$, then the Karl Pearson correlation coefficient $r$ is:",
    "options": {
      "A": "$0.60$",
      "B": "$0.36$",
      "C": "$0.72$",
      "D": "$0.50$"
    },
    "correct_answer": "A",
    "solution": "The correlation coefficient $r$ is the geometric mean of the two regression coefficients with the same sign as the coefficients:\n$$r = \\pm \\sqrt{b_{yx} \\cdot b_{xy}}$$\nSince both $b_{yx} = 0.8 > 0$ and $b_{xy} = 0.45 > 0$ are positive:\n$$r = +\\sqrt{0.8 \\times 0.45} = \\sqrt{0.36} = 0.60$$",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_077",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Solutions of linear and non-linear algebraic equations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The positive root of the algebraic equation $f(x) = x^2 - 7 = 0$ is computed using the Newton–Raphson method starting with an initial guess $x_0 = 3$. The estimate $x_1$ after the first iteration is ________ (round off to three decimal places).",
    "correct_answer": "2.667",
    "numerical_range": {
      "min": 2.66,
      "max": 2.675
    },
    "solution": "The Newton–Raphson iteration formula is:\n$$x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$$\nFor $f(x) = x^2 - 7$, the derivative is $f'(x) = 2x$.\nStarting with $x_0 = 3$:\n$$f(3) = 3^2 - 7 = 9 - 7 = 2$$\n$$f'(3) = 2(3) = 6$$\n$$x_1 = 3 - \\frac{2}{6} = 3 - \\frac{1}{3} = \\frac{8}{3} \\approx 2.6667 \\approx 2.667$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_078",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Solutions of linear and non-linear algebraic equations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The asymptotic order of convergence of the secant method for finding a simple root of a non-linear algebraic equation is approximately:",
    "options": {
      "A": "$1.618$",
      "B": "$2.000$",
      "C": "$1.000$",
      "D": "$3.000$"
    },
    "correct_answer": "A",
    "solution": "The error relationship in the secant method is $|e_{n+1}| \\approx C |e_n|^p$, where $p$ is the positive root of $p^2 - p - 1 = 0$:\n$$p = \\frac{1 + \\sqrt{5}}{2} \\approx 1.618$$\nThis is the golden ratio, making the secant method superlinear (faster than linear bisection, but slightly below quadratic Newton–Raphson).",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_079",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Solutions of linear and non-linear algebraic equations",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "For solving a linear algebraic system $Ax = b$ using iterative techniques, which of the following statements is/are TRUE?",
    "options": {
      "A": "The Gauss–Seidel method updates coordinate values immediately as soon as they are computed within the current iteration",
      "B": "Both Jacobi and Gauss–Seidel iterations are guaranteed to converge for any initial vector if $A$ is strictly diagonally dominant",
      "C": "The Jacobi method computes all new components using only values from the previous iteration step",
      "D": "The asymptotic rate of convergence of the Gauss–Seidel method is generally about twice as fast as the Jacobi method for tridiagonal systems"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "1. **Immediate Coordinate Update (Option A)**: Gauss–Seidel uses newly calculated $x_j^{(k+1)}$ for $j < i$ during step $i$ of iteration $k+1$ (True).\n2. **Diagonal Dominance (Option B)**: By the Gershgorin circle theorem, strict diagonal dominance ($|a_{ii}| > \\sum_{j \\neq i} |a_{ij}|$) guarantees the spectral radius $\\rho(T) < 1$ for both Jacobi and Gauss–Seidel iteration matrices (True).\n3. **Simultaneous Jacobi Step (Option C)**: Jacobi iteration evaluates $x^{(k+1)} = D^{-1}(b - (L + U)x^{(k)})$, using exclusively previous-step values (True).\n4. **Relative Convergence Rate (Option D)**: For consistently ordered matrices (e.g. tridiagonal), $\\rho(T_{GS}) = \\rho(T_J)^2$, so Gauss–Seidel requires roughly half as many iterations (True).",
    "difficulty": "Moderate",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_ADV_080",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Solutions of linear and non-linear algebraic equations",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "The Newton–Raphson iteration formula $x_{n+1} = x_n - \\frac{f(x_n)}{f'(x_n)}$ fails completely whenever:",
    "options": {
      "A": "$f'(x_n) = 0$",
      "B": "$f''(x_n) = 0$",
      "C": "The actual root is negative",
      "D": "The initial guess $x_0$ is greater than the root"
    },
    "correct_answer": "A",
    "solution": "When $f'(x_n) = 0$, the tangent line to the curve at $(x_n, f(x_n))$ is horizontal (parallel to the $x$-axis) and therefore never intersects the $x$-axis. In the formula, this causes division by zero, causing the algorithm to fail.",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_081",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Numerical integration – trapezoidal and Simpson's rule",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Evaluate the definite integral $\\int_0^1 \\frac{1}{1 + x} \\, dx$ using the trapezoidal rule with $n = 2$ equal subintervals (step size $h = 0.5$). The calculated numerical value is ________ (round off to three decimal places).",
    "correct_answer": "0.708",
    "numerical_range": {
      "min": 0.705,
      "max": 0.712
    },
    "solution": "Step size $h = \\frac{1 - 0}{2} = 0.5$.\nThe evaluation nodes and functional values $y = f(x) = \\frac{1}{1 + x}$ are:\n- $x_0 = 0.0 \\implies y_0 = \\frac{1}{1 + 0} = 1.000$\n- $x_1 = 0.5 \\implies y_1 = \\frac{1}{1 + 0.5} = \\frac{2}{3} \\approx 0.6667$\n- $x_2 = 1.0 \\implies y_2 = \\frac{1}{1 + 1} = 0.500$\n\nApplying the composite trapezoidal formula for $n = 2$:\n$$I = \\frac{h}{2} [y_0 + 2y_1 + y_2] = \\frac{0.5}{2} \\left[ 1.0 + 2\\left(\\frac{2}{3}\\right) + 0.5 \\right]$$\n$$= 0.25 \\left[ 1.5 + \\frac{4}{3} \\right] = 0.25 \\left[ \\frac{9 + 8}{6} \\right] = 0.25 \\times \\frac{17}{6} = \\frac{17}{24} \\approx 0.7083 \\approx 0.708$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_082",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Numerical integration – trapezoidal and Simpson's rule",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Evaluate the integral $\\int_0^2 e^{x^2} \\, dx$ using Simpson's $1/3$ rule with $n = 2$ subintervals ($h = 1$). The calculated numerical value is ________ (round off to two decimal places).",
    "correct_answer": "22.16",
    "numerical_range": {
      "min": 22,
      "max": 22.3
    },
    "solution": "**Method 1: Simpson's 1/3 Rule Formula**\nFor $n = 2$ subintervals over $[0, 2]$, step size $h = 1$:\n$$I = \\frac{h}{3} [y_0 + 4y_1 + y_2]$$\nEvaluating the integrand $f(x) = e^{x^2}$ at grid nodes:\n- $y_0 = f(0) = e^0 = 1.0000$\n- $y_1 = f(1) = e^1 \\approx 2.71828$\n- $y_2 = f(2) = e^4 \\approx 54.59815$\n\nSubstitute into the formula:\n$$y_0 + 4y_1 + y_2 = 1.0000 + 4(2.71828) + 54.59815 = 1.0000 + 10.87312 + 54.59815 = 66.47127$$\n$$I = \\frac{1}{3} \\times 66.47127 = 22.1571 \\approx 22.16$$",
    "difficulty": "Hard",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_083",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Numerical integration – trapezoidal and Simpson's rule",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements regarding Newton–Cotes numerical quadrature formulas is/are TRUE?",
    "options": {
      "A": "The Trapezoidal rule integrates polynomials of degree up to $1$ with zero truncation error",
      "B": "Simpson's $1/3$ rule integrates polynomials of degree up to $3$ exactly",
      "C": "Simpson's $3/8$ rule requires the total number of subintervals $n$ to be a multiple of $3$",
      "D": "Simpson's $1/3$ rule requires the total number of subintervals $n$ to be an even number"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "1. **Trapezoidal Precision (Option A)**: Linear interpolation makes the truncation error proportional to $f''(\\xi)$, so it is exact for degree $\\le 1$ (True).\n2. **Simpson's 1/3 Precision (Option B)**: Simpson's 1/3 rule error is proportional to $f^{(4)}(\\xi) h^5$, meaning odd symmetric cancellation makes it exact for cubic polynomials (degree $\\le 3$) (True).\n3. **Simpson's 3/8 Partition (Option C)**: Groups 3 subintervals per application, requiring $n$ to be a multiple of 3 (True).\n4. **Simpson's 1/3 Partition (Option D)**: Pairs 2 subintervals per application, requiring $n$ to be an even integer (True).",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_084",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Numerical solutions of ODEs",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Consider the initial value problem $\\frac{dy}{dx} = x + y^2$ with $y(0) = 1$. Using the modified Euler method (Heun's predictor-corrector method) with step size $h = 0.1$, the value of $y(0.1)$ is ________ (round off to three decimal places).",
    "correct_answer": "1.116",
    "numerical_range": {
      "min": 1.11,
      "max": 1.122
    },
    "solution": "Given: $x_0 = 0, y_0 = 1, h = 0.1$, and $f(x, y) = x + y^2$.\n\n**Predictor Step (Forward Euler):**\n$$k_1 = f(x_0, y_0) = 0 + 1^2 = 1.0$$\n$$y_1^{(p)} = y_0 + h k_1 = 1 + (0.1)(1.0) = 1.10$$\n\n**Corrector Step (Average Slope):**\n$$x_1 = x_0 + h = 0.1$$\n$$k_2 = f(x_1, y_1^{(p)}) = 0.1 + (1.10)^2 = 0.1 + 1.21 = 1.31$$\nAverage slope:\n$$\\bar{k} = \\frac{k_1 + k_2}{2} = \\frac{1.0 + 1.31}{2} = \\frac{2.31}{2} = 1.155$$\n$$y_1 = y_0 + h \\bar{k} = 1 + (0.1)(1.155) = 1 + 0.1155 = 1.1155 \\approx 1.116$$",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_085",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Numerical solutions of ODEs",
    "type": "MCQ",
    "marks": 1,
    "negative_marks": 0.33,
    "question": "In the classical fourth-order Runge–Kutta (RK4) method for solving $\\frac{dy}{dx} = f(x, y)$ with step size $h$, the formula for the third intermediate slope $k_3$ is:",
    "options": {
      "A": "$h f\\left(x_n + \\frac{h}{2}, y_n + \\frac{k_2}{2}\\right)$",
      "B": "$h f\\left(x_n + \\frac{h}{2}, y_n + \\frac{k_1}{2}\\right)$",
      "C": "$h f(x_n + h, y_n + k_2)$",
      "D": "$h f\\left(x_n + h, y_n + \\frac{k_2}{2}\\right)$"
    },
    "correct_answer": "A",
    "solution": "In the classical RK4 scheme:\n$$k_1 = h f(x_n, y_n)$$\n$$k_2 = h f\\left(x_n + \\frac{h}{2}, y_n + \\frac{k_1}{2}\\right)$$\n$$k_3 = h f\\left(x_n + \\frac{h}{2}, y_n + \\frac{k_2}{2}\\right)$$\n$$k_4 = h f(x_n + h, y_n + k_3)$$\n$$y_{n+1} = y_n + \\frac{1}{6}(k_1 + 2k_2 + 2k_3 + k_4)$$",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_ADV_086",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Numerical solutions of ODEs",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "Which of the following statements regarding numerical methods for initial value problems $y' = f(x, y)$ is/are TRUE?",
    "options": {
      "A": "The forward Euler method is an explicit single-step method with local truncation error $\\mathcal{O}(h^2)$ and global truncation error $\\mathcal{O}(h)$",
      "B": "The backward Euler method is an implicit single-step method and is unconditionally A-stable for linear test equations $y' = \\lambda y$ with $\\operatorname{Re}(\\lambda) < 0$",
      "C": "Multistep methods like Adams–Bashforth require starter values from single-step methods like Runge–Kutta",
      "D": "Runge–Kutta methods are self-starting and do not require prior historical steps beyond $(x_n, y_n)$"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "1. **Euler Truncation Error (Option A)**: Taylor expansion shows local error is $\\frac{h^2}{2} y''(\\xi) = \\mathcal{O}(h^2)$, which accumulates over $N = (b-a)/h$ steps to a global error of $\\mathcal{O}(h)$ (True).\n2. **A-Stability of Backward Euler (Option B)**: The amplification factor $R(z) = \\frac{1}{1 - z}$ satisfies $|R(z)| < 1$ for all $\\operatorname{Re}(z) < 0$, making it unconditionally A-stable (True).\n3. **Multistep Starters (Option C)**: An $s$-step method requires $s$ previous points ($y_n, y_{n-1}, \\dots, y_{n-s+1}$), which cannot be provided solely by initial condition $y_0$ and thus require Runge–Kutta starters (True).\n4. **Self-starting Single-Step Nature (Option D)**: All Runge–Kutta methods compute intermediate slopes strictly inside $(x_n, x_{n+1})$, needing only $(x_n, y_n)$ (True).",
    "difficulty": "Moderate",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_GATE_001",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Eigen values and Eigen vectors",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "Match the Matrix Types in Group-I with their corresponding Eigenvalue Characteristics in Group-II:\n\n$$\\begin{array}{|ll|ll|}\\hline \\textbf{Group-I (Matrix)} & & \\textbf{Group-II (Eigenvalues)} & \\\\ \\hline \\text{P. Real Symmetric Matrix} & & \\text{1. Modulus } |\\lambda| = 1 \\\\ \\text{Q. Real Skew-Symmetric Matrix} & & \\text{2. Strictly real} \\\\ \\text{R. Real Orthogonal Matrix} & & \\text{3. Purely imaginary or zero} \\\\ \\text{S. Idempotent Matrix } (A^2 = A) & & \\text{4. Only 0 or 1} \\\\ \\hline \\end{array}$$\n\nChoose the CORRECT matching combination:",
    "options": {
      "A": "P-2, Q-3, R-1, S-4",
      "B": "P-3, Q-2, R-4, S-1",
      "C": "P-2, Q-1, R-3, S-4",
      "D": "P-4, Q-3, R-1, S-2"
    },
    "correct_answer": "A",
    "solution": "Analysis of Eigenvalue Properties:\n- **P. Real Symmetric Matrix**: All eigenvalues are strictly **real** (P-2).\n- **Q. Real Skew-Symmetric Matrix**: Eigenvalues are either **purely imaginary or zero** (Q-3).\n- **R. Real Orthogonal Matrix**: Modulus $|\\lambda| = 1$ (R-1).\n- **S. Idempotent Matrix**: $\\lambda^2 = \\lambda \\implies \\lambda \\in \\{0, 1\\}$ (S-4).\n\nCorrect matching: **P-2, Q-3, R-1, S-4**.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_GATE_002",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Vector Calculus",
    "subtopic": "Stokes, Gauss and Green's theorems",
    "type": "MCQ",
    "marks": 2,
    "negative_marks": 0.67,
    "question": "Match the Vector Theorems in Group-I with their Mathematical Representations in Group-II:\n\n$$\\begin{array}{|ll|ll|}\\hline \\textbf{Group-I (Theorem)} & & \\textbf{Group-II (Expression)} & \\\\ \\hline \\text{P. Green's Theorem in a plane} & & \\text{1. } \\iint_S (\\nabla \\times \\vec{F}) \\cdot \\hat{n}\\, dS = \\oint_C \\vec{F} \\cdot d\\vec{r} \\\\ \\text{Q. Gauss Divergence Theorem} & & \\text{2. } \\iiint_V (\\nabla \\cdot \\vec{F})\\, dV = \\iint_S \\vec{F} \\cdot \\hat{n}\\, dS \\\\ \\text{R. Stokes' Theorem} & & \\text{3. } \\oint_C (M\\, dx + N\\, dy) = \\iint_R \\left(\\frac{\\partial N}{\\partial x} - \\frac{\\partial M}{\\partial y}\\right) dx\\, dy \\\\ \\hline \\end{array}$$\n\nSelect the CORRECT matching combination:",
    "options": {
      "A": "P-3, Q-2, R-1",
      "B": "P-1, Q-2, R-3",
      "C": "P-2, Q-3, R-1",
      "D": "P-3, Q-1, R-2"
    },
    "correct_answer": "A",
    "solution": "Standard Integral Theorems:\n- **P. Green's Theorem**: Relates line integral around $C$ to double integral over planar region $R$ (3).\n- **Q. Gauss Divergence Theorem**: Relates volume integral of divergence to flux through closed surface $S$ (2).\n- **R. Stokes' Theorem**: Relates surface integral of curl over $S$ to circulation around boundary $C$ (1).\n\nCorrect match: **P-3, Q-2, R-1**.",
    "difficulty": "Easy",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_GATE_003",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Maxima and minima of function with several independent variables",
    "type": "MSQ",
    "marks": 2,
    "negative_marks": 0,
    "question": "For a two-variable scalar function $f(x, y)$ with continuous second-order partial derivatives, let $(a, b)$ be a stationary point ($f_x = 0, f_y = 0$). Define $D = f_{xx} f_{yy} - (f_{xy})^2$. Which of the following statements is/are CORRECT?",
    "options": {
      "A": "If $D > 0$ and $f_{xx} > 0$, then $f(x, y)$ has a local minimum at $(a, b)$",
      "B": "If $D > 0$ and $f_{xx} < 0$, then $f(x, y)$ has a local maximum at $(a, b)$",
      "C": "If $D < 0$, then $(a, b)$ is a saddle point of $f(x, y)$",
      "D": "If $D = 0$, the second derivative test is inconclusive"
    },
    "correct_answer": [
      "A",
      "B",
      "C",
      "D"
    ],
    "solution": "Multivariable Second Derivative Test:\n- $D > 0, f_{xx} > 0 \\implies$ Local Minimum (A is true).\n- $D > 0, f_{xx} < 0 \\implies$ Local Maximum (B is true).\n- $D < 0 \\implies$ Saddle point (C is true).\n- $D = 0 \\implies$ Test inconclusive (D is true).\n\nAll four options are correct.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_GATE_004",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Differential Equations",
    "subtopic": "Laplace transforms and their inverse",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The inverse Laplace transform of $F(s) = \\frac{s + 7}{s^2 + 6s + 13}$ is evaluated at $t = 0$. The value of $f(0)$ is ________ (in integer).",
    "correct_answer": 1,
    "numerical_range": {
      "min": 1,
      "max": 1
    },
    "solution": "By Initial Value Theorem of Laplace Transforms:\n$$f(0) = \\lim_{s \\to \\infty} [s \\cdot F(s)] = \\lim_{s \\to \\infty} \\left[ \\frac{s(s + 7)}{s^2 + 6s + 13} \\right] = \\lim_{s \\to \\infty} \\frac{s^2 + 7s}{s^2 + 6s + 13} = 1$$\nHence, $f(0) = 1$.",
    "difficulty": "Easy",
    "source": "Advanced Engineering Mathematics (Erwin Kreyszig)"
  },
  {
    "id": "QB_EM_GATE_005",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Probability and Statistics",
    "subtopic": "Poisson, normal and binomial distributions",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "A random variable $X$ follows a Poisson distribution such that $P(X = 2) = \\frac{2}{3} P(X = 1)$. The mean of $X$ is ________ (round off to 2 decimal places).",
    "correct_answer": 1.33,
    "numerical_range": {
      "min": 1.3,
      "max": 1.36
    },
    "solution": "For a Poisson distribution with parameter $\\lambda$:\n$$P(X = k) = \\frac{e^{-\\lambda} \\lambda^k}{k!}$$\nGiven $P(X = 2) = \\frac{2}{3} P(X = 1)$:\n$$\\frac{e^{-\\lambda} \\lambda^2}{2!} = \\frac{2}{3} \\frac{e^{-\\lambda} \\lambda^1}{1!} \\implies \\frac{\\lambda^2}{2} = \\frac{2\\lambda}{3} \\implies \\lambda = \\frac{4}{3} \\approx 1.333$$\nRounding to 2 decimal places: **1.33**.",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_GATE_006",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Linear Algebra",
    "subtopic": "Matrices and determinants",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "Let $A$ be a $3 \\times 3$ real matrix with $\\det(A) = 4$. The value of $\\det(2 A^{-1} \\operatorname{adj}(A))$ is ________ (in integer).",
    "correct_answer": 32,
    "numerical_range": {
      "min": 32,
      "max": 32
    },
    "solution": "Recall $A \\cdot \\operatorname{adj}(A) = \\det(A) \\cdot I \\implies \\operatorname{adj}(A) = 4 A^{-1}$.\nThus $2 A^{-1} \\operatorname{adj}(A) = 2 A^{-1} (4 A^{-1}) = 8 (A^{-1})^2$.\nFor a $3 \\times 3$ matrix:\n$$\\det(8 (A^{-1})^2) = 8^3 [\\det(A^{-1})]^2 = 512 \\times \\left(\\frac{1}{4}\\right)^2 = \\frac{512}{16} = 32$$\nHence, the determinant is **32**.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_GATE_007",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Calculus",
    "subtopic": "Homogeneous function – Euler's theorem on homogeneous functions",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "If $u(x, y) = \\frac{x^3 + y^3}{\\sqrt{x} + \\sqrt{y}}$, the value of $x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y}$ evaluated at $x = 4, y = 4$ is ________ (round off to 1 decimal place).",
    "correct_answer": 80,
    "numerical_range": {
      "min": 79,
      "max": 81
    },
    "solution": "By Euler's Theorem on Homogeneous Functions:\nDegree of homogeneity $n = 3 - 0.5 = 2.5$.\n$$x \\frac{\\partial u}{\\partial x} + y \\frac{\\partial u}{\\partial y} = n \\cdot u(x, y) = 2.5 \\times \\frac{4^3 + 4^3}{\\sqrt{4} + \\sqrt{4}} = 2.5 \\times \\frac{128}{4} = 2.5 \\times 32 = 80.0$$\nHence, the answer is **80.0**.",
    "difficulty": "Moderate",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  },
  {
    "id": "QB_EM_GATE_008",
    "section": "Section 1: Engineering Mathematics",
    "topic": "Numerical Methods",
    "subtopic": "Solutions of linear and non-linear algebraic equations",
    "type": "NAT",
    "marks": 2,
    "negative_marks": 0,
    "question": "The Newton-Raphson method is applied to solve $f(x) = x^3 - 2x - 5 = 0$ with $x_0 = 2.0$. The value of $x_1$ after the first iteration is ________ (round off to 3 decimal places).",
    "correct_answer": 2.1,
    "numerical_range": {
      "min": 2.09,
      "max": 2.11
    },
    "solution": "Newton-Raphson Iteration:\n$$x_1 = x_0 - \\frac{f(x_0)}{f'(x_0)} = 2.0 - \\frac{2^3 - 2(2) - 5}{3(2^2) - 2} = 2.0 - \\frac{-1}{10} = 2.100$$\nRounding to 3 decimal places: **2.100**.",
    "difficulty": "Easy",
    "source": "Higher Engineering Mathematics (B.S. Grewal)"
  }
];
