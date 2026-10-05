"use client";

import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { type BufferAttribute, Vector2 } from "three";
import { Scene } from "@/components/three/scene";
import { useThemeColor } from "@/components/three/use-theme-color";

const columns = 140;
const rows = 70;
const width = 9;
const depth = 4.5;

/**
 * A field of points rolling like a slow sea, with a ripple that follows
 * the pointer. The heights are recalculated every frame on the CPU, which
 * at ten thousand points is well within budget on any device.
 */
function Field() {
  const position = useRef<BufferAttribute>(null);
  const pointer = useRef(new Vector2(0, 0));
  const color = useThemeColor("--primary");

  const base = useMemo(() => {
    const points = new Float32Array(columns * rows * 3);

    for (let row = 0; row < rows; row++) {
      for (let column = 0; column < columns; column++) {
        const index = (row * columns + column) * 3;
        points[index] = (column / (columns - 1) - 0.5) * width;
        points[index + 2] = (row / (rows - 1) - 0.5) * depth;
      }
    }

    return points;
  }, []);

  useFrame(({ clock, pointer: screenPointer }) => {
    const attribute = position.current;

    if (!attribute) {
      return;
    }

    // Ease the ripple towards the pointer so it glides rather than jumps.
    pointer.current.lerp(screenPointer, 0.06);
    const time = clock.elapsedTime * 0.6;
    const rippleX = pointer.current.x * (width / 2);
    const rippleZ = -pointer.current.y * (depth / 2);
    const array = attribute.array as Float32Array;

    for (let index = 0; index < array.length; index += 3) {
      const x = base[index];
      const z = base[index + 2];
      const distance = Math.hypot(x - rippleX, z - rippleZ);
      const ripple = Math.exp(-distance * 1.4) * Math.sin(distance * 6 - time * 4) * 0.18;
      array[index + 1] = Math.sin(x * 0.9 + time) * 0.18 + Math.cos(z * 1.6 + time * 0.8) * 0.14 + ripple;
    }

    attribute.needsUpdate = true;
  });

  return (
    <points rotation={[0.42, 0, 0]} position={[0, -0.55, 0]}>
      <bufferGeometry>
        <bufferAttribute ref={position} attach="attributes-position" args={[base.slice(), 3]} />
      </bufferGeometry>
      <pointsMaterial color={color} size={0.022} sizeAttenuation transparent opacity={0.85} depthWrite={false} />
    </points>
  );
}

/**
 * The particle wave behind the hero. Pointer events are read from the
 * whole page, so it reacts while the visitor moves over the hero text.
 */
export default function Wave({ className }: { className?: string }) {
  return (
    <Scene className={className} camera={[0, 0.5, 3.4]} eventSource="document">
      <Field />
    </Scene>
  );
}
