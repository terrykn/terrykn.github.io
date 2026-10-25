import type { ReactNode } from "react";

import { ShaderFlow } from "@/components/shaders/shader-flow";

/**
 * Site-wide page backdrop from the example-template: WebGL flow shader behind
 * the top of the page, mobile-attenuated, baking a radial fade into --background.
 */
export function PageBackdrop(): ReactNode {
  return (
    <div
      aria-hidden="true"
      className="pointer-events-none absolute inset-x-0 top-0 -z-10 h-225 overflow-hidden"
    >
      <div className="absolute inset-0 opacity-30 md:opacity-60">
        <ShaderFlow
          brightness={3}
          iterations={10}
          flowSpeed={[0, 0.1]}
        />
      </div>
    </div>
  );
}
