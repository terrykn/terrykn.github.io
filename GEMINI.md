<!-- BEGIN:nextjs-agent-rules -->

# This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

Refer to @docs/ARCHITECTURE.md when building out new features for context on the application's architecture following the latest Next.js conventions.

<!-- END:nextjs-agent-rules -->

# Component Registries & React Bits (MCP Integration)

The project leverages the **shadcn MCP Server** and custom registries configured in `components.json`:
- **`@react-bits` Registry**: Configured at `https://reactbits.dev/r/{name}.json` for modular, expressive UI animations without adopting an entire design system.
- **Workflow & Tooling**: Use the `shadcn` MCP tools (`search_items_in_registries`, `view_items_in_registries`, `get_add_command_for_items`, etc.) or CLI (`npx shadcn@latest add @react-bits/<component-name>`) to browse, inspect, and install React Bits components.
- **Code Ownership & Customization**: React Bits components are fully modular code additions (not monolithic npm dependencies). Adjust settings via exposed props first, and feel free to adapt the component source directly when needed.
- **Performance & Restraint ("Less Is More")**:
  - Limit to **2–3 animated components per page** to prevent visual overload and maintain high frame rates.
  - Optimize for mobile: disable or provide static fallbacks for heavy Canvas/WebGL/shader effects on mobile screens or when `prefers-reduced-motion` is active.
- **Styling Requirements**: All React Bits components must conform to the design token rules in `docs/ARCHITECTURE.md` (no hardcoded HEX/RGB values; bind dynamic shader/canvas colors to CSS variables like `var(--primary)` and theme tokens).
