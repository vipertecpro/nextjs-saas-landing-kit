"use client";

import { OrbitControls, PointMaterial, Points, QuadraticBezierLine } from "@react-three/drei";
import { useFrame } from "@react-three/fiber";
import { useMemo, useRef } from "react";
import { type Group, type Mesh, QuadraticBezierCurve3, Vector3 } from "three";
import { Scene } from "@/components/three/scene";
import { useThemeColor } from "@/components/three/use-theme-color";
import { useReducedMotion } from "@/lib/use-reduced-motion";

/** Cities the arcs fly between, as [latitude, longitude]. */
const cities: [number, number][] = [
  [40.7, -74],
  [51.5, -0.1],
  [52.5, 13.4],
  [19.1, 72.9],
  [1.35, 103.8],
  [35.7, 139.7],
  [-33.9, 151.2],
  [37.8, -122.4],
  [-23.5, -46.6],
  [25.2, 55.3],
  [43.7, -79.4],
  [48.9, 2.35],
];

const routes: [number, number][] = [
  [0, 1],
  [1, 3],
  [3, 4],
  [4, 5],
  [5, 7],
  [7, 0],
  [0, 8],
  [1, 9],
  [9, 4],
  [6, 4],
  [10, 2],
  [11, 3],
];

function toVector(latitude: number, longitude: number, radius = 1): Vector3 {
  const phi = ((90 - latitude) * Math.PI) / 180;
  const theta = ((longitude + 180) * Math.PI) / 180;

  return new Vector3(-radius * Math.sin(phi) * Math.cos(theta), radius * Math.cos(phi), radius * Math.sin(phi) * Math.sin(theta));
}

/** Points spread evenly over a sphere (a Fibonacci lattice). */
function spherePoints(count: number): Float32Array {
  const positions = new Float32Array(count * 3);
  const golden = Math.PI * (3 - Math.sqrt(5));

  for (let index = 0; index < count; index++) {
    const y = 1 - (index / (count - 1)) * 2;
    const ring = Math.sqrt(1 - y * y);
    positions.set([Math.cos(golden * index) * ring, y, Math.sin(golden * index) * ring], index * 3);
  }

  return positions;
}

function Arc({ from, to, color, offset }: { from: Vector3; to: Vector3; color: string; offset: number }) {
  const traveller = useRef<Mesh>(null);
  // The arc's peak rises higher the further apart the cities are.
  const { mid, curve } = useMemo(() => {
    const peak = from
      .clone()
      .add(to)
      .normalize()
      .multiplyScalar(1 + from.distanceTo(to) * 0.45);

    return { mid: peak, curve: new QuadraticBezierCurve3(from, peak, to) };
  }, [from, to]);

  useFrame(({ clock }) => {
    traveller.current?.position.copy(curve.getPoint((clock.elapsedTime * 0.25 + offset) % 1));
  });

  return (
    <>
      <QuadraticBezierLine start={from} end={to} mid={mid} color={color} lineWidth={1} transparent opacity={0.45} />
      <mesh ref={traveller}>
        <sphereGeometry args={[0.014, 12, 12]} />
        <meshBasicMaterial color={color} />
      </mesh>
    </>
  );
}

function Planet({ spin }: { spin: number }) {
  const group = useRef<Group>(null);
  const primary = useThemeColor("--primary");
  const accent = useThemeColor("--accent-2");
  const positions = useMemo(() => spherePoints(2200), []);
  const arcs = useMemo(() => routes.map(([from, to]) => [toVector(...cities[from]), toVector(...cities[to])] as const), []);

  useFrame((_, delta) => {
    if (group.current) {
      group.current.rotation.y += delta * spin;
    }
  });

  return (
    <group ref={group} rotation={[0.35, 0, 0]}>
      <Points positions={positions} stride={3}>
        <PointMaterial transparent color={primary} size={0.012} sizeAttenuation depthWrite={false} opacity={0.75} />
      </Points>
      <mesh>
        <sphereGeometry args={[0.985, 48, 48]} />
        <meshBasicMaterial color={primary} transparent opacity={0.07} />
      </mesh>
      {arcs.map(([from, to], index) => (
        <Arc key={index} from={from} to={to} color={accent} offset={index / arcs.length} />
      ))}
      {cities.map((city, index) => (
        <mesh key={index} position={toVector(...city, 1.005)}>
          <sphereGeometry args={[0.012, 10, 10]} />
          <meshBasicMaterial color={accent} />
        </mesh>
      ))}
    </group>
  );
}

/**
 * A dotted globe with arcs between cities and data travelling along them,
 * in the theme's colours. With `interactive`, visitors can drag to spin it.
 */
export default function Globe({ className, interactive = false }: { className?: string; interactive?: boolean }) {
  const reduceMotion = useReducedMotion();

  return (
    <Scene className={className} interactive={interactive} camera={[0, 0, interactive ? 2.9 : 2.6]}>
      <Planet spin={interactive ? 0 : 0.06} />
      {interactive && <OrbitControls enableZoom={false} enablePan={false} autoRotate={!reduceMotion} autoRotateSpeed={0.6} rotateSpeed={0.5} />}
    </Scene>
  );
}
