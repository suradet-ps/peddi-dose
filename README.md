# Peddi-Dose

> Pediatric dose calculator for healthcare professionals - fast, accurate, mobile-first.

[![License](https://img.shields.io/github/license/suradet-ps/pedi-dose?color=blue&logo=opensourceinitiative&logoColor=ffffff)](https://github.com/suradet-ps/pedi-dose/blob/main/LICENSE)
[![Version](https://img.shields.io/badge/version-1.0.0-blue?logo=git&logoColor=ffffff)](https://github.com/suradet-ps/pedi-dose)
[![TypeScript](https://img.shields.io/badge/TypeScript-%5E6-3178C6?logo=typescript&logoColor=ffffff)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-%5E19-61DAFB?logo=react&logoColor=ffffff)](https://react.dev/)
[![Vite](https://img.shields.io/badge/Vite-%5E8-646CFF?logo=vite&logoColor=ffffff)](https://vite.dev/)
[![Bun](https://img.shields.io/badge/Bun-1.3.14-f9f1e1?logo=bun&logoColor=ffffff)](https://bun.sh/)
[![PRs Welcome](https://img.shields.io/badge/PRs-welcome-brightgreen?logo=github&logoColor=ffffff)](https://github.com/suradet-ps/pedi-dose/pulls)

---

**Peddi-Dose** is a progressive web application (PWA) that helps pharmacists, doctors, and healthcare professionals calculate pediatric liquid medication dosages quickly and accurately. It computes dose ranges in both milliliters (ml) and milligrams per dose (mg/dose) based on patient weight, with administration guidance for every drug.

---

## Features

- **Real-time calculation** - results update instantly as you type or select a drug; no submit button required.
- **Dual-unit display** - primary result in **ml** with **mg/dose** secondary value.
- **Manual dose mode** - override the standard range by specifying a custom mg/kg/dose value.
- **Mobile-first UI** - optimized for on-the-go clinical use, installable as a PWA.
- **Offline capable** - fully functional without a network connection after first visit.
- **Persistent selection** - last-used drug is remembered via `localStorage`.
- **Dark mode** - automatically follows the system `prefers-color-scheme` setting.
- **Accessible** - keyboard navigable, screen-reader friendly, visible focus indicators.
- **10 pre-loaded drugs** - covers common pediatric antibiotics, antipyretics, antihistamines, and more.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Language** | [TypeScript 6](https://www.typescriptlang.org/) (strict mode) |
| **Framework** | [React 19](https://react.dev/) |
| **Build tool** | [Vite 8](https://vite.dev/) + [SWC](https://swc.rs/) |
| **PWA** | [vite-plugin-pwa](https://vite-pwa-org.netlify.app/) (Workbox) |
| **Linting** | [ESLint 10](https://eslint.org/) (flat config, type-aware) |
| **Formatting** | [Prettier](https://prettier.io/) |
| **Package manager** | [Bun](https://bun.sh/) |

---

## Getting Started

### Prerequisites

- [Bun](https://bun.sh/) v1.1+

### Install

```bash
git clone https://github.com/suradet-ps/pedi-dose.git
cd pedi-dose
bun install
```

### Development

```bash
bun run dev
```

Open [http://localhost:5173](http://localhost:5173) in your browser.

### Production Build

```bash
bun run build      # type-checks + Vite build
bun run preview    # preview the production bundle
```

### Quality Checks

```bash
bun run typecheck  # tsc --noEmit (strict)
bun run lint       # ESLint with type-aware rules
bun run format     # Prettier
```

---

## Project Structure

```
pedi-dose/
├── public/                        # Static assets (icons)
├── src/
│   ├── components/                # React components
│   │   ├── Calculator.tsx         # Main calculator form
│   │   ├── ResultCard.tsx         # Dose result display
│   │   ├── ErrorBoundary.tsx      # Class-based error boundary
│   │   ├── Header.tsx             # App header
│   │   └── Footer.tsx             # Attribution footer
│   ├── data/
│   │   └── drugData.ts            # Drug database (immutable typed)
│   ├── hooks/
│   │   ├── useDoseCalculator.ts   # Root hook: orchestrates state
│   │   ├── useDrugSelector.ts     # Drug selection + localStorage
│   │   └── useManualDose.ts       # Manual mode state
│   ├── types/
│   │   ├── drug.ts                # Drug, DrugCategory, DrugTiming
│   │   ├── calculation.ts         # DoseResult (discriminated union)
│   │   ├── components.ts          # Component prop interfaces
│   │   └── index.ts               # Barrel exports
│   ├── utils/
│   │   └── doseMath.ts            # Pure dose calculation functions
│   ├── styles/
│   │   ├── tokens.css             # Design tokens (Tesla-inspired)
│   │   ├── base.css               # CSS reset + globals
│   │   └── app.css                # Component styles
│   ├── App.tsx                    # Root composition
│   ├── main.tsx                   # Entry point
│   └── vite-env.d.ts              # Vite client type declarations
├── DESIGN.md                      # Design system documentation
├── eslint.config.js               # ESLint flat config (type-aware)
├── tsconfig.json                  # Strict TypeScript configuration
├── vite.config.ts                 # Vite + PWA configuration
├── .prettierrc.json               # Prettier configuration
├── vercel.json                    # Vercel deployment configuration
└── package.json                   # Project metadata
```

---

## Available Drugs

| Drug | Concentration | Category |
|------|--------------|----------|
| Amoxycillin | 250 mg / 5 ml | Antibiotic |
| Augmentin (Co-amoxiclav) | 228.5 mg / 5 ml | Antibiotic |
| Bactrim (Co-trimoxazole) | 40 mg / 5 ml | Antibiotic |
| CPM (Chlorpheniramine) | 2 mg / 5 ml | Antihistamine |
| Dicloxacillin | 62.5 mg / 5 ml | Antibiotic |
| Domperidone | 5 mg / 5 ml | Antiemetic |
| Erythromycin | 125 mg / 5 ml | Antibiotic |
| Guafenesine (Guaifenesin) | 100 mg / 5 ml | Mucolytic |
| Ibuprofen | 100 mg / 5 ml | Antipyretic |
| Paracetamol | 120 mg / 5 ml | Antipyretic |

> Drug data is maintained in [`src/data/drugData.ts`](src/data/drugData.ts) and uses `as const satisfies readonly Drug[]` for full type safety.

---

## TypeScript Architecture

This project prioritizes strict type safety:

- **`strict: true`** - all strict checks enabled (noImplicitAny, strictNullChecks, etc.)
- **`noUncheckedIndexedAccess`** - every array/record access is safe by default
- **`exactOptionalPropertyTypes`** - no accidental `undefined` assignments
- **`verbatimModuleSyntax`** - enforces `import type` for type-only imports
- **Discriminated unions** - `DoseResult` is `AutoDoseResult | ManualDoseResult` (no optional `mode` fields)
- **Zero `any`** - no type assertions, no `@ts-ignore`, no non-null assertions
- **Explicit hook return types** - every custom hook declares its own result interface

---

## Deployment

The app is deployed via **Vercel** with automatic deploys on every push to `main`.

[![Deploy with Vercel](https://vercel.com/button)](https://vercel.com/new/clone?repository-url=https%3A%2F%2Fgithub.com%2Fsuradet-ps%2Fpedi-dose)

### Manual Vercel CLI

```bash
bun install -g vercel
bun run build
vercel --prod
```

Configuration lives in `vercel.json` (SPA rewrite + PWA service-worker headers).

---

## Contributing

Contributions are welcome! Please follow these steps:

1. Fork the repository
2. Create a feature branch: `git checkout -b feat/my-feature`
3. Commit your changes using [conventional commits](https://www.conventionalcommits.org/)
4. Push to your branch: `git push origin feat/my-feature`
5. Open a pull request

### Commit Convention

This project follows [Conventional Commits](https://www.conventionalcommits.org/):

```
feat: add new drug calculation mode
fix: correct rounding for low-weight patients
refactor: extract dose formatting utilities
chore(deps): update typescript to v6
```

---

## License

Distributed under the MIT License. See [LICENSE](./LICENSE) for more information.

---

## Disclaimer

**This software is a clinical decision-support tool intended for use by licensed healthcare professionals only.** It does not replace independent clinical judgment. Users must verify all calculated dosages against the patient's medical history, organ function, and official prescribing information. The authors assume no liability for damages arising from the use of this software.
