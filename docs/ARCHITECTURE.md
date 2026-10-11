# Next.js App Router Conventions & Project Standards

This guide outlines the conventions, folder structure rules, design patterns, and styling token standards required when working with Next.js (App Router) for this portfolio project.

---

## 1. Core File System & Special Files

In the `app/` directory, directories define route paths, while specific reserved file names handle layout, UI states, and routing logic:

| File Name | Purpose / Behavior | Key Considerations |
| :--- | :--- | :--- |
| `layout.tsx` | Shared layout wrap for sub-routes | Does not re-render on navigation. Root layout must include `<html>` and `<body>` tags. |
| `page.tsx` | Main UI for a specific route path | Renders server-side by default. Defines a publicly accessible route. |
| `loading.tsx` | Instant loading state UI | Automatically wraps the corresponding `page.tsx` in a React `<Suspense>` boundary. |
| `error.tsx` | Error boundary UI for exceptions | **Must** be a Client Component (`'use client'`). Wraps route segments in React Error Boundaries. |
| `not-found.tsx` | 404 page for missing resources | Executed when calling `notFound()` from `next/navigation` or on invalid URLs. |
| `route.ts` | Server-side API endpoint | Defines custom HTTP handlers (`GET`, `POST`, `PUT`, `DELETE`). Cannot exist alongside `page.tsx`. |
| `default.tsx` | Fallback component for route slots | Essential for Parallel and Intercepting routes during hard refreshes/direct navigation. |

---

## 2. Dynamic Parameters & Search Params

`params` and `searchParams` props are delivered as **Promises**. Always await them before accessing properties.

### Example Page Pattern:
```tsx
// app/projects/[slug]/page.tsx
interface ProjectPageProps {
  params: Promise<{ slug: string }>;
  searchParams: Promise<{ [key: string]: string | string[] | undefined }>;
}

export default async function ProjectPage({ params, searchParams }: ProjectPageProps) {
  const { slug } = await params;
  const { tab } = await searchParams;

  return (
    <main className="min-h-screen bg-background text-foreground p-8 space-y-4">
      <h1 className="text-3xl font-bold tracking-tight">Project: {slug}</h1>
      {tab && <p className="text-muted-foreground text-sm">Active tab: {tab}</p>}
    </main>
  );
}
```

---

## 3. Design System & Design Token Standards

To ensure seamless theme switching (e.g., auto-rotating themes, dark/light modes, or high-contrast themes) and consistent layout spacing, **never hardcode raw values** for colors, spacing, typography, z-index, or animations. Always reference standardized Tailwind CSS tokens, CSS custom properties, or design system primitives.

### Token Enforcement Rules:

1. **No Hardcoded Hex/RGB/HSL Colors:**
   * ❌ **Avoid:** `bg-[#0a0a0a]`, `text-[#00F3FF]`, `style={{ color: '#ffffff' }}`
   * ✅ **Use:** `bg-background`, `text-foreground`, `bg-card`, `text-muted-foreground`, `border-border`, `text-primary`, `bg-accent`

2. **No Arbitrary Spacing & Sizes:**
   * ❌ **Avoid:** `p-[17px]`, `m-[23px]`, `w-[342px]`
   * ✅ **Use:** Standard scale tokens like `p-4`, `p-6`, `gap-3`, `max-w-7xl`, `w-full`

3. **No Hardcoded Z-Indexes or Radii:**
   * ❌ **Avoid:** `z-[9999]`, `rounded-[12px]`
   * ✅ **Use:** `z-modal`, `z-popover`, `z-overlay`, `rounded-lg`, `rounded-xl`, `rounded-full`

4. **Dynamic Theme Engine Token Binding:**
   * All dynamic theme layers (e.g., React Bits components, canvas shaders, theme loops) must consume theme colors via CSS variable hooks (e.g., `var(--primary)`, `var(--background)`) rather than hardcoded string values in JS files.

---

## 4. Parallel Routes, Intercepting Routes & `default.tsx`

Use parallel and intercepting routes for UI elements such as modal lightboxes or dynamic project previews that update the URL without losing background state.

* **Parallel Route Slots (`@slot`):** Directories starting with `@` define named slots passed as props to the parent `layout.tsx`.
* **Intercepting Routes (`(.)project/[slug]`):** Intercept client-side transitions to show inline modals or drawers.
* **`default.tsx` Rule:** When users navigate directly or refresh (hard navigation) on an intercepted route, Next.js renders `default.tsx` in place of unmatched slots to prevent runtime mismatches.

```tsx
// app/@modal/default.tsx
// Renders nothing when the parallel slot has no active sub-route match
export default function DefaultModalSlot() {
  return null;
}
```

---

## 5. Metadata & SEO Rules

Static assets and programmatically generated metadata support automated indexing and rich social cards:

* **Static Metadata Files:** Place `favicon.ico`, `icon.png`, or `apple-icon.png` inside `app/`.
* **Social Previews:** Define `opengraph-image.png` or dynamic `opengraph-image.tsx` using Next.js `ImageResponse`.
* **Dynamic Sitemap (`app/sitemap.ts`):** Automatically build `sitemap.xml`.
* **Robots Configuration (`app/robots.ts`):** Automate crawling rules.

### Dynamic Sitemap Template:
```typescript
// app/sitemap.ts
import { MetadataRoute } from 'next';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = 'https://yourdomain.com';
  
  // Fetch dynamic slugs if applicable
  const dynamicProjects = ['project-one', 'project-two'];

  const projectUrls = dynamicProjects.map((slug) => ({
    url: `${baseUrl}/projects/${slug}`,
    lastModified: new Date(),
  }));

  return [
    { url: baseUrl, lastModified: new Date() },
    { url: `${baseUrl}/projects`, lastModified: new Date() },
    ...projectUrls,
  ];
}
```

---

## 6. Directory Naming Conventions

1. **Route Groups `(group)`:** Enclose directory names in parentheses to organize routes without changing the public URL path.
2. **Private Folders `_folder`:** Prefix folders with an underscore to exclude them and all sub-files from public route serving.
3. **Parallel Slots `@slot`:** Prefix folders with `@` to create named layout slots for modals, complex dashboards, or split views.

---

## 7. Component Registries & UI Animations (React Bits & shadcn MCP)

This project integrates external component registries alongside shadcn UI, specifically **React Bits** for creative animations, interactive backgrounds, and visual personality without adopting a heavy, monolithic design system.

### Registry Configuration
Configured in `components.json`:
```json
{
  "registries": {
    "@react-bits": "https://reactbits.dev/r/{name}.json"
  }
}
```

### Discovery & Installation Workflow:
1. **Via shadcn MCP Server:**
   * Browse and search registry items: `search_items_in_registries` or `list_items_in_registries` with registry `@react-bits`.
   * Inspect examples & code: `view_items_in_registries` or `get_item_examples_from_registries`.
   * Generate add commands: `get_add_command_for_items`.
2. **Via Command Line:**
   ```bash
   npx shadcn@latest add @react-bits/<component-name>
   ```

### Core Principles & Code Ownership:
* **Fully Modular & Owned Code:** React Bits is not an external monolithic runtime dependency. Components are installed or copied directly into the project repository, granting complete code ownership, visibility, and freedom to modify.
* **Prop-First Customization:** Components are designed with thoughtful props for animation timing, easing, text, and visual parameters. Configure exposed props first before refactoring internal implementation logic.

### Performance & Animation Standards:
* **"Less Is More" Budget:** Limit animated components to **2–3 per page**. Stacking too many concurrent animations or canvas shaders degrades UX, taxes GPU/CPU resources, and distracts from core content.
* **Mobile & Device Optimization:** Consider disabling heavy canvas/WebGL/shader effects on mobile viewports or replacing them with static fallback placeholders.
* **Accessibility (`prefers-reduced-motion`):** Respect user motion preferences by reducing motion or pausing continuous loops.
* **Lifecycle Cleanup:** Always ensure event listeners (mouse, resize), `requestAnimationFrame` loops, and WebGL contexts properly dispose/clean up on component unmount.

### Implementation Guidelines:
* **Token Consistency:** Replace static HEX/RGB colors embedded in React Bits presets with design tokens (e.g., `hsl(var(--primary))` or CSS variable references `var(--background)`, `var(--foreground)`).
* **Client Boundaries:** Components relying on WebGL, HTML5 Canvas, Framer Motion, GSAP, or window/mouse events must include `'use client'` at the top of the file.
* **Component Organization:** Place installed React Bits components under `@/components/react-bits/` or `@/components/ui/` per project structure.