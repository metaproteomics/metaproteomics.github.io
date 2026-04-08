# Homepage Redesign — Design Spec

**Date:** 2026-04-08  
**Status:** Approved

## Goal

Clean up the homepage visual rhythm. The page feels chaotic because each section was authored with its own arbitrary padding values, several components use semantically incorrect `<main>` tags, the MPI logo is oversized in the hero, and the footer lacks visual weight.

## Constraints

- Text content and copy remain unchanged
- No new sections or structural additions
- No background colours or dividers between sections — whitespace only
- Footer stays minimal (no extra nav links or social icons)

## Design Decisions

### 1. Uniform vertical spacing — `py-24` everywhere

Replace all per-section `pt-X pb-Y md:pt-X md:pb-Y` combinations with a single `py-24` (96px top and bottom) on every section. This single change eliminates the rhythm problem entirely without requiring per-section judgment calls.

The Logos section currently uses only `mt-12` (no bottom padding). It gets `py-24` like the others.

The CTA section uses `mt-20` as an offset instead of section padding. The `mt-20` is removed and the section gets `py-24` via its wrapper.

### 2. Semantic HTML — `<main>` → `<section>` / `<div>`

Four components incorrectly use the `<main>` element as a layout container. There must be only one `<main>` per page. Each is corrected:

| Component | Change |
|---|---|
| `hero.astro` | `<main>` → `<section>` |
| `intro.astro` | `<main>` → `<section>` |
| `news.astro` | outer `<main>` → `<section>`; inner `<main>` (news list) → `<ul>` wrapper `<div>` |
| `manuscriptannouncement.astro` | `<main>` → `<div>` |

### 3. Hero logo — max-width reduced

The MPI logo column is currently unconstrained at `max-w-[500px]`. On large screens this dominates the hero and throws off the balance with the text side. Reduce to `max-w-[340px]`.

### 4. ManuscriptAnnouncement banner — layout simplified

The banner currently uses a 6-column grid with content spanning 5 columns, with `p-8` padding that doesn't align with the Container's `px-5`. Changes:

- Replace `<main class="grid lg:grid-cols-6 ...">` with a plain `<div>`
- Keep `bg-blue-50` background (full-width)
- Align inner content padding to `px-5` to match the Container used by all other sections (or wrap content in a `max-w-screen-xl mx-auto px-5` div)

### 5. Footer — visual weight

The footer currently has `my-20` with two lines of centered text and no visual anchor. Changes:

- Replace `my-20` with `py-10`
- Add `border-t border-slate-200` to create a clear end-of-page signal
- The border spans the full viewport width (not constrained to the Container) — consistent with common footer patterns and the centered text layout

## Component-by-Component Changes

| Component | Before | After |
|---|---|---|
| `manuscriptannouncement.astro` | `<main class="grid lg:grid-cols-6 bg-blue-50 p-8">` | `<div class="bg-blue-50"><div class="max-w-screen-xl mx-auto px-5 py-8">` |
| `hero.astro` | `<main class="grid lg:grid-cols-2 ... pt-16 pb-8 md:pt-12 md:pb-24">` | `<section class="grid lg:grid-cols-2 ... py-24">` |
| `hero.astro` logo | `class="max-w-[500px]"` | `class="max-w-[340px]"` |
| `intro.astro` | `<main class="grid lg:grid-cols-2 ... pt-16 pb-8 md:pt-12 md:pb-24">` | `<section class="grid lg:grid-cols-2 ... py-24">` |
| `news.astro` | `<main class="grid lg:grid-cols-2 ... pt-16 pb-8 md:pt-12 md:pb-12">` | `<section class="grid lg:grid-cols-2 ... py-24">` |
| `news.astro` inner | `<main class="mt-16">` | `<div class="mt-16">` |
| `logos.astro` | `<div class="mt-12">` | `<div class="py-24">` |
| `cta.astro` | no outer wrapper, inner box has `mt-20 mx-auto max-w-5xl` (1024px) | wrap content in `<section class="py-24">`, remove `mt-20 mx-auto max-w-5xl` from inner box so it spans the full Container width (1280px) matching all other sections |
| `footer.astro` | `<footer class="my-20">` | `<footer class="py-10 border-t border-slate-200">` |

## Out of Scope

- Twitter/X embed — kept as-is
- Navigation — no changes
- Content copy — no changes
- Color scheme — no changes
- Other pages — only the homepage components are touched
