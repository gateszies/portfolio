---
title: Legacy Codebase Migration
description: Led a full rebuild of a direct-to-consumer print lab's marketing site on Craft 5, replacing one-off templates with a flexible section-based page builder marketing can build with on their own.
tags: [TypeScript, Twig, CraftCMS, SCSS]
thumbnail: /placeholders/project-thumb.svg
hero: /placeholders/project-hero.svg
---

_Note: code below is reconstructed to illustrate the pattern, not copied from the production codebase._

---

### Context

ProDPI is a direct-to-consumer print lab selling custom prints, wall art, cards, and albums. The marketing site is the primary storefront.

I led a full rebuild of the site from scratch on Craft 5: every page template (38 product pages consolidated from six separate templates down to one flexible pattern, 6 category pages, 8 artist features, homepage, about), the navigation, the footer, a flexible section-based page builder, and a full jQuery-to-TypeScript migration. I also managed the content migration from the old CMS to the new one, coordinating migration work across the team through Jira tickets and a Slack-based tracking table.

I worked closely with the marketing manager throughout to make sure the system worked for how they actually build and maintain pages.

---

### Problem

**Marketing couldn't build pages without engineering**

Every non-product page on the site was a one-off. The marketing manager couldn't assemble a new homepage layout or a campaign landing page from existing pieces because there were no existing pieces to assemble. Each page was its own template, and new layouts required engineering time to build from scratch.

**The page builder was a single file that only grew**

The entire page builder was one `switch` statement in one file. Each section type (hero, split layout, editorial scroll, text callout) was its own inline case block with fully duplicated image-handling logic copy-pasted per image:

```twig
// builders/generalBuilder.twig
{% switch block.type.handle %}
  {% case "wideHero" %}
    {% set img1 = block.imageDesktop.one() %}
    {% set optimizedImages1 = img1.imageOptimize %}
    {% set x = 'center' %}
    {% set y = 'center' %}
    {% if img1.hasFocalPoint %}
      {% set x = img1.focalPoint | first * 100 ~ '%' %}
      {% set y = img1.focalPoint | last * 100 ~ '%' %}
    {% endif %}
    <img src="{{ optimizedImages1.src() }}"
         srcset="{{ optimizedImages1.srcset() }}"
         sizes="100vw" class="cover">

  {% case "halfSplitHero" %}
    {% set img1 = block.backgroundImageOne.one() %}
    {# ...the exact same focal point and srcset logic, repeated #}
{% endswitch %}
```

Nothing was shared. The file only grew.

**Styling decisions lived in the content, not in a system**

Colors and layout choices were stored as raw hex values and inline `style` attributes on per-entry fields, not pulled from any design token system:

```twig
<div style="background-color: {{ entry.columnOneBackground.hex }}">
  <div style="color: {{ entry.columnOneColor.hex }}">
    {{ entry.columnOneText }}
  </div>
</div>
```

A global visual change required auditing every page and entry individually. Marketing couldn't do it on their own, and engineering couldn't do it safely without checking every page first.

---

### Approach

**Design a section system, not individual pages**

The first step was documenting every existing page and defining the sections marketing actually needed to build a variety of layouts from a shared set of parts. I worked with the marketing manager to figure out what page types they needed to create (homepage, campaign landing pages, editorial content) and what building blocks would cover those cases without requiring one-off templates.

I designed each section type in Figma, both visually and functionally: how it looks at each breakpoint, what authoring options an editor has (theme, spacing, text alignment, media crop, heading size), and how sections compose together on a page. The goal was a system where the marketing manager builds pages by choosing sections and filling in fields, not by requesting a new template from engineering.

**Build composable sections backed by design tokens**

Each section is its own file instead of a case block in a monolithic switch statement. Shared concerns (images, video, buttons, content blocks) live in reusable components that sections include rather than re-implementing:

```twig
// sections/mediaWithText.twig
{% set heading = section.heading %}
{% set description = section.description %}
{% set mediaOne = section.mediaOne.one() %}
{% set theme = section.theme.value %}
{% set mediaPosition = section.mediaPosition.value %}
{% set headingSize = section.headingSize.value %}

<section class="{{ sectionClasses }}" data-section-theme="{{ theme }}">
  <div class="{{ containerClasses }}">
    <div class="{{ mediaClasses }}">
      {% if mediaOne.kind == 'image' %}
        {% include '_components/image' with {
          asset: mediaOne,
          class: 'cover',
          sizes: '(min-width: 1024px) 50vw, 100vw'
        } only %}
      {% endif %}
    </div>

    {% include "_components/section-content" with {
      heading,
      headingSize,
      description,
      links,
    } only %}
  </div>
</section>
```

Image handling now lives in a single `_components/image` component reused by every section, instead of each one reimplementing the focal-point and srcset logic from scratch. Every include uses the `only` keyword, so a component only ever sees what it's explicitly passed.

Styling moved out of inline hex values and into a design token system with primitive and semantic layers:

```scss
// tokens/_theme.scss
:root {
  --bgColor-neutral-primary: var(--brass-1);
  --bgColor-neutral-secondary: var(--brass-2);
  --bgColor-brand-strong: var(--teal-12);
  --fgColor-neutral-primary: var(--gray-12);
  --fgColor-brand-strong: var(--brass-8);
}
```

Components reference the semantic layer (`--bgColor-brand-strong`), not raw values. A brand-level color change happens in one file.

I also authored coding convention rules for the repo alongside the migration (Twig conventions, CSS conventions, TypeScript conventions, PR conventions), so both human and AI-assisted contributors have a real spec to work from instead of inferring patterns from existing code.

**Manage the content migration**

The data migration covered 38 product pages, 6 category pages, 8 artist features, the homepage, and the about page. All of it was manual. I tracked three migration phases:

- **Base content**: existing copy and images carried over from the old site
- **Editorial content**: new content written specifically for the updated layouts and section types
- **Field restructuring**: mapping old CMS fields to new ones where the data model had changed as a result of improving the system

I wrote and assigned the migration tickets, tracked progress weekly, and coordinated the work across the team through a Slack-based tracking table.

---

### Key Decisions

**Design for authoring, not just rendering**

The sections weren't designed to look good in a one-off mockup. They were designed around the authoring experience: what fields does the marketing manager see in the CMS, what options do those fields expose, and how do different combinations of those options compose into real pages. The Figma file reflects this. Each section shows its variants and authoring options, not just a single "ideal" state.

**Scope every component include with `only`**

A component only ever sees what it's explicitly passed, not the parent template's full context. Its behavior is predictable from the call site alone, and a change upstream can't quietly break something three levels down that happened to be relying on ambient variables.

**Write the conventions alongside the code, not after it**

The coding rules were written during the migration, not as documentation backlog. Once conventions are something you write after the fact, they're the first thing that gets skipped under deadline pressure, and a new contributor joins a codebase where the patterns are implicit instead of stated.

---

### Impact

The marketing site is live at [prodpi.com](https://prodpi.com). The marketing manager builds and maintains pages independently using the section system, choosing from a shared set of section types and filling in fields, instead of filing engineering requests for new templates. Six product page templates are now one. All JavaScript is typed. 50+ pages of content were migrated, tracked, and verified across three phases.

I led this end to end: design direction, component architecture, content migration management, the majority of the implementation, and the documentation that lets the rest of the team work inside it consistently.
