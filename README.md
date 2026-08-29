# Pedi-Dose

```
██████╗ ███████╗██████╗ ██╗██████╗  ██████╗  ██████╗███████╗
██╔══██╗██╔════╝██╔══██╗██║██╔══██╗██╔═══██╗██╔════╝██╔════╝
██████╔╝█████╗  ██║  ██║██║██║  ██║██║   ██║███████╗█████╗
██╔═══╝ ██╔══╝  ██║  ██║██║██║  ██║██║   ██║╚════██║██╔══╝
██║     ███████╗██████╔╝██║██████╔╝╚██████╔╝██████╔╝███████╗
╚═╝╚══════╝╚═════╝ ╚═╝╚═════╝  ╚═════╝ ╚═════╝╚══════╝
```

---

## ◆ PULSE

The dose is needed at the bedside, not after the calculation. Pedi-Dose
is a PWA that computes pediatric liquid doses the moment the weight is
in - ml first, mg per dose beside it - with administration guidance
for every drug, a manual mode for the non-standard mg/kg/dose, and a
library of 11 common pediatric drugs at their real concentrations.
Installable, offline-capable, dark-mode-following: it works in the
ward, in the pharmacy, and in the pocket.

| Real-time ▣ | Dual-unit ▣ | Offline ▣ | 11 drugs ▣ |
|---|---|---|---|

*The calculator - weight in, both units out - is sealed.*

> Built with React 19 + TypeScript 6, strict to the last `any` -
> zero type assertions, zero unchecked access, zero lies.
>
> **suradet-ps**, artifact keeper

---

## ◆ IGNITION

One runtime, four commands.

```
⟫ git clone https://github.com/suradet-ps/pedi-dose.git
⟫ cd pedi-dose
⟫ bun install
⟫ bun run dev
```

Open [http://localhost:5173](http://localhost:5173).

```
⟫ bun run build       # type-check, then Vite build
⟫ bun run typecheck   # tsc --noEmit, strict
⟫ bun run lint        # ESLint, type-aware
⟫ bun run format      # Prettier
```

<details>
<summary>Prerequisites</summary>

- [Bun](https://bun.sh/) v1.1+

Deployment: Vercel auto-deploys every push to `main` (`vercel.json`
carries the SPA rewrite and PWA service-worker headers).

</details>

---

## ◆ ANATOMY

One form, two results, a drug library typed to the last unit.

- **Calculates** - results update as you type: no submit button, no
  stale number on screen. The dose range appears in ml with mg/dose
  beside it.
- **Overrides** - manual dose mode takes a custom mg/kg/dose and
  re-derives both units - the standard range steps aside without
  disappearing.
- **Validates** - weight plausibility is checked with warnings before
  a dose is offered; the impossible is flagged, not computed.
- **Remembers** - the last-used drug persists in `localStorage`; the
  form opens where the last patient left it.
- **Types** - `DoseResult` is a discriminated union
  (`AutoDoseResult | ManualDoseResult`) with no optional mode fields;
  the 11-drug table is `as const satisfies readonly Drug[]` - a drug
  cannot drift out of type.
- **Works anywhere** - a Workbox PWA: installable, functional offline
  after first visit, keyboard-navigable, screen-reader-friendly, and
  dark-mode-native.

---

## ◆ RITUALS

**The core ceremony** - the bedside dose:

1. Enter the weight. The range appears before the next breath of the
   keyboard - no submit, no waiting.
2. Select the drug from 11 pre-loaded entries; the concentration and
   administration guidance answer beside it.
3. When the standard range is wrong for this patient, switch to manual
   mg/kg/dose - both units re-derive.
4. Verify against the chart, then administer. The disclaimer is part
   of the ritual: the tool assists, the clinician decides.

**The ceremony of the unit** - ml is the primary number because the
syringe reads ml; mg per dose is the secondary because the formulary
writes it. Both are shown, neither is hidden.

**The ceremony of the offline page** - the ward wifi dies and the
calculator does not notice. After one visit, every drug, every
concentration, and every calculation lives on the device.

---

## ◆ ECHOES

**Where this artifact is heading**

```
calc     ▸ real-time dual-unit results, no submit ──────────────────── ▸ sealed
override ▸ manual mg/kg/dose mode ──────────────────────────────────── ▸ sealed
guard    ▸ weight plausibility warnings, vitest suite ──────────────── ▸ sealed
offline  ▸ Workbox PWA, installable ────────────────────────────────── ▸ sealed
types    ▸ strict, zero any, discriminated unions ──────────────────── ▸ sealed
```

**Raising the artifact** - drug data lives in `src/data/drugData.ts`;
the design system in `DESIGN.md`; commits follow conventional commits.
Gates: `bun run typecheck`, `bun run lint`, `bun run format`, and the
Vitest suite. Open an issue first to discuss a change.

**Status** - CI runs checks, unit tests, and `bun audit` on every push.
[Watch the gates](.github/workflows).

> This software is a clinical decision-support tool for licensed
> healthcare professionals. It does not replace independent clinical
> judgment.

---

```
  ─────────────────────────────────────────
   The syringe reads ml.
   So does Pedi-Dose.
  ─────────────────────────────────────────
```

Distributed under the [MIT License](LICENSE).