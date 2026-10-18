'use client';

import { useMemo, useSyncExternalStore } from 'react';
import GradientASCII from './GradientASCII';

const RAMP_VARS = ['--ascii-1', '--ascii-2', '--ascii-3', '--ascii-4'];

// Static snapshot: token values only change in <html> style, which reloads the page
const subscribe = () => () => {};

const getRampKey = () =>
  RAMP_VARS.map((name) => getComputedStyle(document.documentElement).getPropertyValue(name).trim()).join(
    ','
  );

/**
 * Fixed ASCII light backdrop behind the whole page.
 * Reads the light ramp from design tokens (--ascii-*) so the shader
 * stays in sync with the theme — see docs/ARCHITECTURE.md.
 */
export default function AsciiBackdrop() {
  const rampKey = useSyncExternalStore(subscribe, getRampKey, () => '');
  const colors = useMemo(() => rampKey.split(','), [rampKey]);

  if (colors.some((color) => !color)) return null;

  return (
    <GradientASCII
      colors={colors}
      shape="horizon"
      characters=" =+xX0S8#@"
      cellSize={16}
      density={0.85}
      glyphOpacity={0.75}
      glow={0.25}
      gradientOpacity={0.95}
      scale={1.35}
      flow={0.25}
      speed={0.5}
      grain={0.06}
      flicker={0.12}
      intro={true}
    />
  );
}
