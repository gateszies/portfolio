---
title: "Studio Projects: Component System Foundations"
description: Built the foundational component library and design-token system for a multi-brand Symfony app from scratch, replacing invented tags and one-off styling with a real component model.
tags: [Twig, Symfony, SCSS, Stimulus, Storybook]
thumbnail: /placeholders/project-thumb.svg
hero: /placeholders/project-hero.svg
---

_Note: code below is reconstructed to illustrate the pattern, not copied from the production codebase._

---

### Context

Studio Projects is a web app that helps professional photographers organize gallery images and order print products for their clients at scale.

I joined the engineering team to build a component library for Studio Projects on Symfony's Twig Components, migrating it off a legacy codebase with no real component model.

---

### Problem

**Custom tags instead of real components**

The legacy templates used invented tag names directly in the markup and styled them the same way you'd style a `div`:

```twig
// templates/settingsPanel.html.twig
<panel accountSettings>
  <panelTitle largeHeader>Project Settings</panelTitle>
  <setting name=title>
    <settingLabel smallHeader>Title</settingLabel>
    <value>{{ project.title }}</value>
  </setting>
</panel>
```

```scss
// styles/_settingsPanel.scss
[accountSettings] {
  panelTitle {
    border-bottom: 1px solid $lineColor1;
  }
  setting {
    display: flex;
    flex-flow: column;
  }
}
```

This approach created real accessibility gaps and ongoing maintenance costs:

- `panelTitle` isn't a real heading, so a screen reader has no way to know it's one
- Invented tags have no defined prop contract, so it's difficult to know what a tag like `panelTitle` actually accepts. Getting it wrong fails silently instead of erroring where the mistake was made
- No autocomplete, no safe rename, and no easy way to find every usage across the codebase
- Using `pascalCase` is incorrect syntax for [valid custom elements](https://html.spec.whatwg.org/multipage/custom-elements.html); should use `kebab-case`

**No shared design-token connection**

Styles were one-offs, disconnected from the design system used elsewhere in the product. No source of truth meant that elements were frequently repeated with slightly different values in different files.

```scss
// styles/_settingsPanel.scss
[accountSettings] {
  panelTitle {
    color: #1a1a1a;
    font-size: 15px;
    padding-bottom: 12px;
  }
}

// styles/_accountBrand.scss
[tab="brand"] {
  panelTitle {
    color: #1c1c1c;
    font-size: 16px;
    padding-bottom: 14px;
  }
}
```

Design debt slowly accumulated with small mismatches in styling and Figma prototypes that were out of date with production.

**Triple the upkeep for multi-brand**

The product runs the same interface across several brands, including a generic "unbranded" brand. The legacy approach meant maintaining near-identical copies of each page, one per brand, instead of one component with brand-level configuration:

```twig
// templates/brandA/accountDetails.html.twig
<panel tab=details accountSettings>
  <panelTitle largeHeader>Account Details</panelTitle>
  <setting name=name>...</setting>
</panel>

// templates/brandB/accountDetails.html.twig
<panel tab=details accountSettings>
  <panelTitle largeHeader>Account Details</panelTitle>
  <setting name=name>...</setting>
</panel>

// templates/brandC/accountDetails.html.twig
<panel tab=details accountSettings>
  <panelTitle largeHeader>Account Details</panelTitle>
  <setting name=name>...</setting>
</panel>
```

Elements that functionally served the same purpose were stored in separate files with no single shared source of truth.

---

### Approach

**Define the pattern, not just a component**

The very first PR in the project built a `Button`, but the real work was defining the pattern every component after it would follow: how the file structure would work, how props are named, how variants and colors are handled, and how tokens are structured per brand.

File structure came first: components live in their own folder with a matching Twig file, style file, and props definition, so any future component follows the same layout without guessing.

Props got a consistent naming convention (`color`, `variant`, boolean variables like `rounded`) that every component built afterward could reuse.

Class names were stored in a filtered array at the top, kept separate from the markup itself. The template's job is to render, not to work out which classes apply, so that logic lives in one place above the markup instead of being tangled into conditionals inside the markup.

```twig
// components/Button.html.twig
{% props
    text = '',
    color = 'brand',
    variant = 'primary',
    rounded = false,
    icon = null,
%}

{% set classNames = [
    'Button',
    'Button--' ~ color ~ variant|title,
    rounded ? 'Button--rounded',
]|filter(class => class)|join(' ') %}

<button type="button" class="{{ classNames }}">
  {% if icon %}
    <twig:Core:Icon :name="icon" />
  {% endif %}
  <span class="Button-label">{{ text }}</span>
</button>
```

Tokens were organized in three tiers:

- Primitives → raw values unique to each brand, e.g. `--color-purple-8`
- Semantic tokens → mapped to brand-specific primitive via `[data-brand]`, e.g. `--bgColor-brand-primary`
- Component tokens → private to a single component and resolved from the semantic layer, e.g. `--_button-bgColor`

This meant a square purple button, a slightly rounded green one, and a fully rounded button would come out of the same `<twig:Core:Button>` call. Adding `BrandZ` means writing a third token file, not touching the component at all.

```scss
// tokens/brandA/_brandA.scss
[data-brand="brandA"] {
  --bgColor-brand-primary: var(--color-purple-8);
  --borderRadius: 0;
}

// tokens/brandB/_brandB.scss
[data-brand="brandB"] {
  --bgColor-brand-primary: var(--color-green-8);
  --borderRadius: 4px;
}

// components/_Button.scss
.Button {
  background-color: var(--_button-bgColor);
  border-radius: var(--_button-borderRadius, var(--borderRadius));
}

.Button--brandPrimary {
  --_button-bgColor: var(--bgColor-brand-primary);
}

.Button--neutralSecondary {
  --_button-bgColor: var(--bgColor-neutral-secondary);
}

.Button--rounded {
  --_button-borderRadius: 50%;
}
```

**Extend that pattern to interactivity and state**

Everything up to this point was props and markup. `Dropdown` was the first component that had to manage real state over time. This meant wiring up a Stimulus controller, the standard way this stack pairs JavaScript with server-rendered Twig markup.

`data-controller` attaches the controller and `data-*-target` gives the controller a direct reference to a child element so it doesn't have to search the DOM for it. `data-action` registers an event listener, declared as an attribute right in the markup.

```twig
// components/_Dropdown.html.twig
{% props
  controller = 'core-dropdown',
  actions = {},
%}

{% set actions = {
  'toggle': 'toggle',
  'keydown': 'keydown',
}|merge(actions) %}

{% set rootAttributes = {
  class: 'Dropdown',
  'data-controller': controller,
  'data-action': 'keydown->' ~ controller ~ '#' ~ actions.keydown,
} %}

{% set triggerAttributes = {
  class: 'Dropdown-trigger',
  ('data-' ~ controller ~ '-target'): 'trigger',
  'data-action': controller ~ '#' ~ actions.toggle,
  'aria-haspopup': 'true',
  'aria-expanded': 'false',
} %}

{% set menuAttributes = {
  class: 'Dropdown-menu',
  ('data-' ~ controller ~ '-target'): 'menu',
} %}

<div {{ stimulus_controller(controller) }} {{ attributes.defaults(rootAttributes) }}>
  {% block trigger %}{% endblock %}
  <div {{ attributes.defaults(menuAttributes) }}>
    {% block content %}{% endblock %}
  </div>
</div>
```

The controller itself extends a base dropdown controller and adds what it doesn't provide: accessible keyboard navigation and keeping `aria-expanded`/`tabindex` in sync with whether the menu is actually open.

```js
import Dropdown from "@stimulus-components/dropdown";

export default class extends Dropdown {
  static targets = ["trigger", "menu", "item"];
  isOpen = false;

  toggle() {
    super.toggle();
    this.isOpen = !this.isOpen;
    this.update();
  }

  keydown(event) {
    if (!this.isOpen) return;

    switch (event.key) {
      case "ArrowDown": // ...move focus to next item
      case "ArrowUp": // ...move focus to previous item
      case "Home": // ...move focus to first item
      case "End": // ...move focus to last item
      case "Escape": // ...close and return focus to trigger
      default:
        return;
    }
  }

  update() {
    this.triggerTarget.setAttribute("aria-expanded", this.isOpen);
    this.itemTargets.forEach((item) => {
      item.setAttribute(
        "tabindex",
        item === document.activeElement ? "0" : "-1",
      );
    });
  }
}
```

**Ship Storybook coverage alongside the component**

In the legacy codebase, there was no documentation beyond the code itself. Visually previewing elements meant reading the Twig and CSS, spinning up the local dev environment, or checking whatever happened to be live on dev, stage, or prod at the time.

Storybook documentation shipped alongside components from the first `Button` onward, giving designers and engineers a live reference to compare against Figma prototypes and a simplified view of a component's full API and behavior, all without having to look in the codebase.

```js
import { ICONS } from "./Icon.stories";

export default {
  title: "Core/Dropdown",
  parameters: {
    docs: {
      description: { component: "A dropdown for displaying a list of items." },
    },
  },
  argTypes: {
    icon: {
      control: "select",
      options: ICONS,
    },
  },
};

export const Default = {
  args: {
    items: [
      { label: "Edit", url: "#" },
      { label: "Duplicate", url: "#" },
      { label: "Delete", url: "#" },
    ],
  },
  render: () => ({
    template: twig`
      <twig:Core:Dropdown :items="items">
        <twig:block name="trigger">
          <twig:Core:Button text="Open Menu" />
        </twig:block>
      </twig:Core:Dropdown>
    `,
  }),
};

export const WithoutIcons = {
  args: {
    ...Default.args,
    items: Default.args.items.map(({ icon, ...item }) => item),
  },
  render: Default.render,
};
```

---

### Key Decisions

**Invest disproportionately on the foundation, on purpose**

`Button` and the file structure around it took longer than either seemed to deserve on its own. That was intentional, whatever patterns we set there would ripple out to everything built afterward. The cost of getting it right early was worth paying _once_ instead of paying in small increments over and over on every component that followed.

**Keep components dumb**

A component only needs to know what it's been given and how to display it, never why. A `Card` doesn't need to know why an image is missing, only whether one is. Pushing decisions and business logic up to the caller keeps every component simple enough to reason about on its own.

**Don't reinvent common patterns, only customize where there's a real gap**

`Dropdown` started from an existing base rather than being built from zero, and the only things added were the pieces that the base didn't already handle correctly: real keyboard accessibility and focus management. Customization was spent closing actual gaps, not rebuilding what already worked.

---

### Impact

Studio Projects is now running on real, reusable components instead of one-off markup. Contributors were able to quickly iterate on new features, shipping a Product Detail page (with duplicate, share, payment link, and delete actions) on top of the same `Button`, `Card` and `Dropdown` components built during this project.

**Postscript.** About a year later, the work on this project is a primary reference for the team's frontend conventions doc, advising both humans and agents on which component patterns to follow for any new work.
