# Homepage Redesign Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Give the homepage a consistent visual rhythm by standardising vertical spacing to `py-24` across all sections, fixing incorrect `<main>` tags, reducing the oversized hero logo, and adding visual weight to the footer.

**Architecture:** Seven self-contained component edits — no new files, no new abstractions. Each component owns its own vertical padding (`py-24`) so the rhythm is automatic regardless of order. The ManuscriptAnnouncement banner wraps its content in a max-width div so it aligns with the rest of the page. The CTA box drops its own `max-w-5xl` so it spans the full Container width.

**Tech Stack:** Astro 5, Tailwind CSS 3, no test framework — verification is `npm run build` + visual inspection.

**Spec:** `docs/superpowers/specs/2026-04-08-homepage-redesign-design.md`

---

### Task 1: Fix ManuscriptAnnouncement — semantic tag and layout

**Files:**
- Modify: `src/components/manuscriptannouncement.astro`

- [ ] **Step 1: Open the file and understand current markup**

Current outer element: `<main class="grid lg:grid-cols-6 bg-blue-50 p-8">` with a single child `<div class="col-span-5 pr-4">`. The `<main>` tag is semantically wrong (there should be only one per page). The 6-column grid with a 5-col child is unnecessary. The `p-8` padding doesn't align with the Container's `px-5`.

- [ ] **Step 2: Replace the markup**

Replace the entire file with:

```astro
---
/**
 * ManuscriptAnnouncement
 * Banner announcing the current round of the MPI Best Manuscript Award.
 * Contains hardcoded content — update the text here when a new award cycle begins.
 */
---

<div class="bg-blue-50">
  <div class="max-w-screen-xl mx-auto px-5 py-8">
    <h2 class="text-3xl lg:text-3xl font-bold lg:tracking-tight">
      MPI Best Manuscript Award
    </h2>
    <p class="text-lg mt-2 text-slate-600">
        We are excited to announce the next round of the Metaproteomics Initiative's Best Manuscript Award, which will be presented at the 7th International Metaproteomics Symposium, taking place June 22-25, 2026 in Dessau-Rösslau, Germany. 
    </p>
    <p class="text-lg mt-2 text-slate-600">
        The Best Manuscript Award was established to give early career researchers (ECRs) the opportunity to gain visibility in the metaproteomics community and to highlight their important contributions to the field of metaproteomics.
    </p>
    <p class="text-lg mt-2 text-slate-600">
      We encourage all ECRs to participate with a manuscript submitted to a peer-reviewed journal or available on a preprint server between November 1, 2024 and March 1, 2026.  The winner will be given the opportunity to present their work in a dedicated plenary session.  
    </p>
    <p class="text-lg mt-2 text-slate-600">
      <span class="font-bold">Application deadline: March 01, 2026</span>
    </p>
    <p class="text-lg mt-2 text-slate-600">
      <a class="underline font-bold" href="https://metaproteomics.org/news/2025-10-15-best-manuscript-announcement">Click here for more information.</a>
    </p>
  </div>
</div>
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

Expected: build completes with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/manuscriptannouncement.astro
git commit -m "fix: replace main tag with div in ManuscriptAnnouncement, align padding with container"
```

---

### Task 2: Fix Hero — semantic tag, spacing, logo size

**Files:**
- Modify: `src/components/hero.astro`

- [ ] **Step 1: Open the file and understand current markup**

Current outer element: `<main class="grid lg:grid-cols-2 place-items-center pt-16 pb-8 md:pt-12 md:pb-24">`. The logo image has `class="max-w-[500px]"`. Both issues to fix: tag, arbitrary padding, and logo size.

- [ ] **Step 2: Replace the markup**

Replace the entire file with:

```astro
---
/**
 * Hero
 * The homepage hero section featuring the MPI logo, headline, and call-to-action buttons.
 * Usage: Renders as the main banner on the homepage with member signup and contact CTAs.
 */
import { Image } from "astro:assets";
import heroImage from "assets/mpilogo.png";
import Link from "@components/ui/link.astro";
import { Icon } from "astro-icon/components";
---

<section
  class="grid lg:grid-cols-2 place-items-center py-24">
  <div class="py-6 lg:order-1 hidden lg:block">
    <Image
      src={heroImage}
      alt="MPI logo"
      widths={[400, 800, 1200]}
      sizes="(max-width: 1024px) 50vw, 600px"
      loading="eager"
      class="max-w-[340px]"
    />
  </div>
  <div>
    <h1
      class="text-5xl lg:text-6xl xl:text-7xl font-bold lg:tracking-tight xl:tracking-tighter">
      Welcome to the Metaproteomics Initiative!
    </h1>
    <p class="text-lg mt-4 text-slate-600 max-w-xl">
      We promote dissemination of metaproteomics fundamentals, advancements, and applications through collaborative networking in microbiome research.
    </p>
    <div class="mt-6 flex flex-col sm:flex-row gap-3">
      <Link
        href="https://forms.gle/zAqJDPZNvf7vSoNi9"
        target="_blank"
        class="flex gap-1 items-center justify-center"
        rel="noopener">
        <Icon class="text-white w-5 h-5" name="bx:bxs-user-plus" />

        Become a member
      </Link>
      <Link
        size="lg"
        variant="outline"
        rel="noopener"
        href="mailto:info@metaproteomics.org"
        class="flex gap-1 items-center justify-center"
        target="_blank">
        <Icon class="text-black w-4 h-4" name="bx:bx-mail-send" />
        Contact us
      </Link>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

Expected: build completes with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/hero.astro
git commit -m "fix: replace main tag with section in Hero, standardise padding to py-24, reduce logo to max-w-[340px]"
```

---

### Task 3: Fix Intro — semantic tag and spacing

**Files:**
- Modify: `src/components/intro.astro`

- [ ] **Step 1: Open the file and understand current markup**

Current outer element: `<main class="grid lg:grid-cols-2 place-items-top pt-16 pb-8 md:pt-12 md:pb-24">`. Fix: tag and arbitrary padding.

- [ ] **Step 2: Replace the markup**

Replace the entire file with:

```astro
---
/**
 * Intro
 * Renders the "What is metaproteomics?" section with descriptive text and a group photo.
 * Usage: Appears on the homepage to explain metaproteomics and the initiative community.
 */
import { Image } from "astro:assets";
import groupPicture from "assets/group.jpg";
---

<section
  class="grid lg:grid-cols-2 place-items-top py-24">
  <div class="mt-16 md:mt-0">
    <h2 class="text-4xl lg:text-5xl font-bold lg:tracking-tight">
      What is metaproteomics?
    </h2>
    <p class="text-lg mt-4 text-slate-600">
      Metaproteomics - an expansion of proteomics-methodologies to study the protein 
      inventory of microbial communities – provides a valuable tool linking the taxonomic 
      profile of a microbial community to its dynamic function. Introduced twenty years 
      ago, metaproteomics is today used for various applications in biomedicine, biotechnology, 
      and environmental science. For instance, metaproteomics approaches are now used for the
      identification of pathogenic microbial biomarkers and the study of poorly characterized
      microbiomes like the plant root-associated and aquatic microbiomes. Reflecting the broad
      and increasing field of applications, the portfolio of metaproteomics workflows has
      substantially diversified over the years and now offers a broad range of building blocks 
      of different wet-lab, data acquisition, and data processing procedures, meeting the demands 
      of its growing community.
    </p>
    <h2 class="text-4xl mt-8 lg:text-5xl font-bold lg:tracking-tight">
      A vibrant community
    </h2>
    <p class="text-lg mt-4 text-slate-600">
      We promote dissemination of metaproteomics fundamentals, advancements, and
      applications through collaborative networking in microbiome research. We
      aim to be the central information hub and open meeting place where
      newcomers and experts interact to communicate, standardize and accelerate
      experimental and bioinformatic methodologies in this field. This will be
      achieved initially through this website, presentations, online
      communication channel, collaborative projects, and symposia. More
      information can be found in our commentary article in
      <a
        href="https://microbiomejournal.biomedcentral.com/articles/10.1186/s40168-021-01176-w"
        class="font-medium hover:underline">Microbiome</a
      >.
    </p>
    <p class="text-lg mt-4 text-slate-600">
      Our Initiative is also recognized by international, well-renowned
      scientific organizations: since February 2021 by
      <a href="https://eupa.org/" class="font-medium hover:underline">EuPA</a>,
      and since June 2023 by
      <a href="https://hupo.org/" class="font-medium hover:underline">HUPO</a> under
      the <a href="https://hupo.org/B/D-HPP" class="font-medium hover:underline"
        >B/D-HPP pillar</a
      >. Do you want to stay up to date about the metaproteomics field and the
      Initiative? Become a member by filling in
      <a
        href="https://forms.gle/zAqJDPZNvf7vSoNi9"
        class="font-medium hover:underline">this form</a
      >. If you can't fill in the Google form because of certain restrictions,
      please contact us via
      <a
        href="mailto:info@metaproteomics.org"
        class="font-medium hover:underline">info@metaproteomics.org</a
      >.
    </p>
  </div>
  <div class="pt-16 pl-2 sm:order-1 hidden sm:block">
    <Image
      src={groupPicture}
      alt="Group picture"
      widths={[200, 400, 600]}
      sizes="(max-width: 600px) 100vw, 600px"
      loading="eager"
    />
  </div>
</section>
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

Expected: build completes with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/intro.astro
git commit -m "fix: replace main tag with section in Intro, standardise padding to py-24"
```

---

### Task 4: Fix News — semantic tags and spacing

**Files:**
- Modify: `src/components/news.astro`

- [ ] **Step 1: Open the file and understand current markup**

Two problems: the outer element is `<main class="grid lg:grid-cols-2 ... pt-16 pb-8 md:pt-12 md:pb-12">`, and inside there's a nested `<main class="mt-16">` wrapping the news list. Both need fixing.

- [ ] **Step 2: Replace the markup**

Replace the entire file with:

```astro
---
/**
 * News
 * Displays the 5 latest published news posts with an embedded Twitter/X timeline.
 * Usage: Appears on the homepage to highlight recent announcements and social media activity.
 */
import { Icon } from "astro-icon/components";

import { getCollection } from "astro:content";

// Filter blog entries with 'draft: false' & date before current date
let publishedBlogEntries = await getCollection("news", ({ data }) => {
  return !data.draft && data.publishDate < new Date();
});

// Sort content entries by publication date and get the first few entries
publishedBlogEntries = publishedBlogEntries
  .sort(function (a, b) {
    return b.data.publishDate.valueOf() - a.data.publishDate.valueOf();
  })
  .slice(0, 5);
---

<section
  class="grid lg:grid-cols-2 place-items-center py-24">
  <div class="mt-16 md:mt-0">
    <h2 class="text-4xl lg:text-5xl font-bold lg:tracking-tight">
      The latest news
    </h2>
    <div class="mt-16">
      <ul class="grid gap-4 max-w-4xl mx-auto">
        {
          publishedBlogEntries.map((blogPostEntry, index) => (
            <a
              href={`/news/${blogPostEntry.slug}`}
              class="flex gap-4 items-start">
              <div class="mt-1 bg-black rounded-full  p-2 w-8 h-8 shrink-0">
                <Icon class="text-white" name="bx:bxs-news" />
              </div>
              <div>
                <h3 class="font-semibold text-lg">
                  {blogPostEntry.data.title}
                </h3>{" "}
                <p class="text-slate-500 mb-2 leading-relaxed">
                  {blogPostEntry.data.publishDate.toDateString()}
                </p>
              </div>
            </a>
          ))
        }
      </ul>
    </div>
  </div>

  <div class="py-6 sm:order-1 hidden sm:block">
    <a
      class="twitter-timeline"
      data-width="500"
      data-height="500"
      data-dnt="true"
      href="https://twitter.com/MetaP_Init?ref_src=twsrc%5Etfw"
      >Tweets by MetaP_Init</a
    >
    <script async src="https://platform.twitter.com/widgets.js" charset="utf-8"
    ></script>
  </div>
</section>
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

Expected: build completes with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/news.astro
git commit -m "fix: replace main tags with section/div in News, standardise padding to py-24"
```

---

### Task 5: Fix Logos — spacing

**Files:**
- Modify: `src/components/logos.astro`

- [ ] **Step 1: Open the file and understand current markup**

Current outer element: `<div class="mt-12">`. No bottom padding. Replace with `py-24`.

- [ ] **Step 2: Replace the markup**

Replace the entire file with:

```astro
---
/**
 * Logos
 * Renders the "Supported by" section with EuPA, HUPO, and Elixir organization logos.
 * Usage: Displays on the homepage to highlight organizational partnerships and endorsements.
 */
import { Icon } from "astro-icon/components";
---

<div class="py-24">
  <h2 class="text-center text-slate-500">Supported by</h2>
  <div class="flex gap-8 md:gap-20 items-center justify-center mt-10 flex-wrap">
    <img src="/images/eupalogo.png" alt="EuPA logo" class="h-[150px]">
    <img src="/images/hupologo.jpg" alt="hupo logo" class="h-[150px]">
    <img src="/images/elixirlogo.png" alt="Elixir logo" class="h-[150px]">
  </div>
</div>
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

Expected: build completes with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/logos.astro
git commit -m "fix: standardise Logos section padding to py-24"
```

---

### Task 6: Fix CTA — section wrapper and full-width alignment

**Files:**
- Modify: `src/components/cta.astro`

- [ ] **Step 1: Open the file and understand current markup**

Current markup: a single `<div class="bg-black p-8 md:px-20 md:py-20 mt-20 mx-auto max-w-5xl rounded-lg ...">`. The `mt-20` is the only spacing mechanism. `mx-auto max-w-5xl` (1024px) makes it narrower than the Container's 1280px. Fix: wrap in `<section class="py-24">`, remove `mt-20 mx-auto max-w-5xl` from the inner box.

- [ ] **Step 2: Replace the markup**

Replace the entire file with:

```astro
---
/**
 * CTA
 * A call-to-action section rendered as a dark box with headline text and a button link.
 * Usage: Placed on the homepage to encourage visitor signup with the membership form.
 */
import Link from "./ui/link.astro";
---

<section class="py-24">
  <div
    class="bg-black p-8 md:px-20 md:py-20 rounded-lg flex flex-col items-center text-center">
    <h2 class="text-white text-4xl md:text-6xl tracking-tight">
      Join the Metaproteomics&nbsp;Initiative
    </h2>
    <p class="text-slate-400 mt-4 text-lg md:text-xl">
      Join the Metaproteomics Initiative for free and stay up to date.
    </p>
    <div class="flex mt-5">
      <Link href="https://forms.gle/zAqJDPZNvf7vSoNi9" variant="inverted">Become a member</Link>
    </div>
  </div>
</section>
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

Expected: build completes with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/cta.astro
git commit -m "fix: wrap CTA in py-24 section, remove max-w-5xl to align with container width"
```

---

### Task 7: Fix Footer — spacing and top border

**Files:**
- Modify: `src/components/footer.astro`

- [ ] **Step 1: Open the file and understand current markup**

Current: `<footer class="my-20">` with two centered text lines. `my-20` gives equal top and bottom margin but no visual anchor. Replace with `py-10` and add `border-t border-slate-200`.

- [ ] **Step 2: Replace the markup**

Replace the entire file with:

```astro
---
/**
 * Footer
 * Site-wide footer with copyright notice and attribution link.
 * Rendered at the bottom of every page via Layout.astro.
 */
---

<footer class="py-10 border-t border-slate-200">
  <p class="text-center text-sm text-slate-500">
    Copyright © {new Date().getFullYear()} Metaproteomics Initiative. All rights reserved.
  </p>
  <!--
    Can we ask you a favor 🙏
    Please keep this backlink on your website if possible.
    or Purchase a commercial license from https://web3templates.com
  -->
  <p class="text-center text-xs text-slate-500 mt-1">
    Made by <a
      href="https://web3templates.com"
      target="_blank"
      rel="noopener"
      class="hover:underline">
      Web3Templates
    </a>
  </p>
</footer>
```

- [ ] **Step 3: Build and verify**

```bash
npm run build
```

Expected: build completes with no errors.

- [ ] **Step 4: Commit**

```bash
git add src/components/footer.astro
git commit -m "fix: replace my-20 with py-10 and add top border to Footer"
```

---

### Task 8: Visual verification

**Files:** none — verification only

- [ ] **Step 1: Start the dev server**

```bash
npm run dev
```

Open `http://localhost:4321` in a browser.

- [ ] **Step 2: Check the announcement banner**

Confirm: blue banner spans full width, text aligns with the navbar and content below (same left edge).

- [ ] **Step 3: Check the hero**

Confirm: logo is visibly smaller and balanced with the headline text. No excessive whitespace above or below.

- [ ] **Step 4: Check section rhythm**

Scroll through the full page. Confirm: the gap between each section (Intro, News, Logos, CTA) feels equal. No section should feel compressed or overly spaced compared to its neighbours.

- [ ] **Step 5: Check the CTA width**

Confirm: the dark CTA box now spans the same width as the content sections above and below it.

- [ ] **Step 6: Check the footer**

Confirm: a subtle grey line appears above the footer text, and the footer has comfortable padding above and below the text.

- [ ] **Step 7: Check on mobile (resize to ~375px width)**

Confirm: all sections still look balanced at mobile width. The logo is hidden on mobile (that's existing behaviour — keep it).
