import { test, describe } from 'node:test';
import assert from 'node:assert/strict';
import { analyzeTestResultForensics } from '../src/utils/forensicAnalyzer.js';

describe('Forensic Diagnostic & Loss Breakdown Subsystem', () => {

  test('correctly calculates lost marks and detects NAT unit scale errors', () => {
    const mockResult = {
      questions: [
        { id: 'q1', type: 'MCQ', marks: 1, answer: 'A' }, // Correct
        { id: 'q2', type: 'MCQ', marks: 2, answer: 'B' }, // Wrong (-0.67 penalty)
        { id: 'q3', type: 'NAT', marks: 2, answer: '3.6' }, // User entered 3600 (scale factor 1000)
        { id: 'q4', type: 'NAT', marks: 1, answer: '15.0' }, // Unattempted
      ],
      userAnswers: [
        { state: 'ANSWERED', answer: 'A' },
        { state: 'ANSWERED', answer: 'C' },
        { state: 'ANSWERED', answer: '3600' },
        { state: 'NOT_VISITED', answer: '' }
      ]
    };

    const forensics = analyzeTestResultForensics(mockResult);

    assert.equal(forensics.negativeDeductionMarks, 0.67);
    assert.equal(forensics.unattemptedLostMarks, 1);
    assert.equal(forensics.natUnitScaleErrors, 1);
    assert.equal(forensics.breakdown.length, 3); // 3 lost/unattempted questions
  });

});
