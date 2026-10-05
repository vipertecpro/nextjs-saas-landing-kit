"use client";

import { Html, OrbitControls } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef, useState } from "react";
import { Color, type Mesh } from "three";
import { Scene } from "@/components/three/scene";
import { useThemeColor } from "@/components/three/use-theme-color";
import { useReducedMotion } from "@/lib/use-reduced-motion";

type ChartProps = { rows: string[]; columns: string[]; values: number[][]; unit: string };

const spacing = 0.42;
const maxHeight = 1.6;

function Bar({
  x,
  z,
  height,
  color,
  label,
  delay,
}: {
  x: number;
  z: number;
  height: number;
  color: Color;
  label: string;
  delay: number;
}) {
  const mesh = useRef<Mesh>(null);
  const [hovered, setHovered] = useState(false);
  const started = useRef<number | null>(null);
  const reduceMotion = useReducedMotion();

  // Grows from the floor the first time it is drawn.
  useFrame(({ clock }) => {
    if (!mesh.current) {
      return;
    }

    started.current ??= clock.elapsedTime;
    const progress = reduceMotion ? 1 : Math.min(1, Math.max(0, (clock.elapsedTime - started.current - delay) / 0.9));
    const eased = 1 - (1 - progress) ** 3;
    const current = Math.max(0.001, height * eased);
    mesh.current.scale.y = current;
    mesh.current.position.y = current / 2;
  });

  return (
    <group position={[x, 0, z]}>
      <mesh
        ref={mesh}
        scale={[1, 0.001, 1]}
        onPointerOver={(event) => {
          event.stopPropagation();
          setHovered(true);
        }}
        onPointerOut={() => setHovered(false)}
      >
        <boxGeometry args={[spacing * 0.72, 1, spacing * 0.72]} />
        <meshStandardMaterial color={hovered ? "#ffffff" : color} roughness={0.35} metalness={0.15} />
      </mesh>
      {hovered && (
        <Html position={[0, height + 0.18, 0]} center className="pointer-events-none">
          <span className="rounded-md border bg-popover px-2 py-1 text-xs whitespace-nowrap text-popover-foreground shadow-md">{label}</span>
        </Html>
      )}
    </group>
  );
}

function Bars({ rows, columns, values, unit }: ChartProps) {
  const from = useThemeColor("--accent-1");
  const to = useThemeColor("--accent-2");
  const peak = Math.max(...values.flat());

  const bars = useMemo(() => {
    const low = new Color(from);
    const high = new Color(to);

    return values.flatMap((row, rowIndex) =>
      row.map((value, columnIndex) => ({
        key: `${rowIndex}-${columnIndex}`,
        x: (columnIndex - (columns.length - 1) / 2) * spacing,
        z: (rowIndex - (rows.length - 1) / 2) * spacing,
        height: (value / peak) * maxHeight,
        color: low.clone().lerp(high, value / peak),
        label: `${rows[rowIndex]}, ${columns[columnIndex]}: ${value.toLocaleString("en-US")} ${unit}`,
        delay: (rowIndex + columnIndex) * 0.04,
      })),
    );
  }, [from, to, values, rows, columns, peak, unit]);

  return (
    <group position={[0, -0.7, 0]}>
      {bars.map(({ key, ...bar }) => (
        <Bar key={key} {...bar} />
      ))}
      <mesh rotation={[-Math.PI / 2, 0, 0]} position={[0, -0.001, 0]}>
        <planeGeometry args={[columns.length * spacing + 0.4, rows.length * spacing + 0.4]} />
        <meshStandardMaterial color={from} transparent opacity={0.08} />
      </mesh>
    </group>
  );
}

/**
 * A 3D bar chart visitors can turn by dragging, with a label on hover.
 * The page also carries the same numbers as a table for screen readers.
 */
export default function BarChart3D(props: ChartProps & { className?: string }) {
  const reduceMotion = useReducedMotion();

  return (
    <Scene className={props.className} interactive camera={[3.4, 2.6, 3.4]}>
      <ambientLight intensity={0.7} />
      <directionalLight position={[3, 5, 2]} intensity={1.6} />
      <Bars {...props} />
      <OrbitControls enableZoom={false} enablePan={false} autoRotate={!reduceMotion} autoRotateSpeed={0.5} minPolarAngle={0.5} maxPolarAngle={1.35} />
    </Scene>
  );
}
