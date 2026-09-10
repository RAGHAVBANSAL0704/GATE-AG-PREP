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
    "difficulty": "Easy",
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
    "difficulty": "Moderate",
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
    "difficulty": "Moderate",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Moderate",
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
    "difficulty": "Moderate",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Moderate",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Moderate",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Moderate",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Moderate",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Moderate",
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
    "difficulty": "Moderate",
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
    "difficulty": "Moderate",
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
    "difficulty": "Easy",
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
    "difficulty": "Moderate",
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
    "difficulty": "Moderate",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Moderate",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Moderate",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Moderate",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Moderate",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Moderate",
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
    "difficulty": "Moderate",
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
    "difficulty": "Moderate",
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
    "difficulty": "Moderate",
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
    "difficulty": "Hard",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Moderate",
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
    "difficulty": "Moderate",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Moderate",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Moderate",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Moderate",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Moderate",
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
    "difficulty": "Easy",
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
    "difficulty": "Moderate",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Moderate",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Moderate",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Easy",
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
    "difficulty": "Moderate",
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
    "difficulty": "Easy",
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
    "difficulty": "Moderate",
    "solution": "For the classical RK4 method, the local truncation error per step is $\\mathcal{O}(h^5)$, which accumulates to a global truncation error of $\\mathcal{O}(h^4)$ over a finite interval.",
    "source": "B.S. Grewal - Higher Engineering Mathematics"
  }
];
