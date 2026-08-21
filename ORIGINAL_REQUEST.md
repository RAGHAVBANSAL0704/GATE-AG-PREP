# Original User Request

## Initial Request — 2026-08-20T20:49:25+05:30

Build an offline Progressive Web App (PWA) capability and automated end-to-end testing suite for the GATE AG Prep Web Portal.

Working directory: /Users/raghav/Desktop/GATE AG PREP WEB
Integrity mode: development

## Requirements

### R1. Offline PWA Capability
Enable offline availability for the portal so students can attempt practice questions and review formula sheets without an active internet connection.

### R2. Automated Verification & Test Suite
Implement an automated end-to-end test suite that objectively verifies core student workflows: Practice Mode filtering, CBT Mock Test timing & score calculation, and Formula Sheet rendering.

## Acceptance Criteria

### PWA Readiness
- [ ] Service worker registers successfully and caches application assets for offline usage.
- [ ] Web App Manifest is correctly linked and valid for PWA installation.

### Automated Testing
- [ ] Automated test suite runs via a single CLI command (`npm test`) and exits cleanly with 100% passing tests.
- [ ] Tests verify MCQ, MSQ, and NAT score calculations and result output.
