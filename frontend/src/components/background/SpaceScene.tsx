import { Canvas, useFrame } from "@react-three/fiber";
import {
  Stars,
  useTexture,
  OrbitControls,
  Environment,
} from "@react-three/drei";

import { Suspense, useRef } from "react";
import * as THREE from "three";

/* ---------------- CAMERA DRIFT ---------------- */

function CameraDrift() {
  useFrame(({ camera, clock }) => {
    const t = clock.getElapsedTime();
    camera.position.x = Math.sin(t * 0.05) * 3;
    camera.position.y = Math.cos(t * 0.04) * 2;
    camera.lookAt(0, 0, 0);
  });
  return null;
}

/* ---------------- SUN ---------------- */

function Sun() {
  const texture = useTexture("/textures/sun.jpg");

  return (
    <>
      {/* Core Sun */}
      <mesh>
        <sphereGeometry args={[3, 32, 32]} />
        <meshStandardMaterial
          map={texture}
          emissive={"#ffae00"}
          emissiveIntensity={4}
        />
      </mesh>

      {/* Glow Layer */}
      <mesh>
        <sphereGeometry args={[3.8, 32, 32]} />
        <meshBasicMaterial
          color="#ffae00"
          transparent
          opacity={0.25}
        />
      </mesh>

      {/* Strong Light Source */}
      <pointLight intensity={5} distance={250} color="#ffb347" />
    </>
  );
}


/* ---------------- GENERIC PLANET ---------------- */

function Planet({ texturePath, size, distance, speed }) {
  const texture = useTexture(texturePath);
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * speed;
    ref.current.position.x = Math.sin(t) * distance;
    ref.current.position.z = Math.cos(t) * distance;
    ref.current.rotation.y += 0.002;
  });

  return (
    <mesh ref={ref}>
      <sphereGeometry args={[size, 32, 32]} />
      <meshStandardMaterial map={texture} />
    </mesh>
  );
}

/* ---------------- EARTH SYSTEM ---------------- */

function EarthSystem() {
  const earthMap = useTexture("/textures/earth_day.jpg");
  const moonMap = useTexture("/textures/moon.jpg");

  const earthRef = useRef<THREE.Mesh>(null!);
  const moonRef = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime();

    earthRef.current.position.x = Math.sin(t * 0.4) * 15;
    earthRef.current.position.z = Math.cos(t * 0.4) * 15;
    earthRef.current.rotation.y += 0.003;

    moonRef.current.position.x =
      earthRef.current.position.x + Math.sin(t * 2) * 2.5;
    moonRef.current.position.z =
      earthRef.current.position.z + Math.cos(t * 2) * 2.5;
  });

  return (
    <>
      <mesh ref={earthRef}>
        <sphereGeometry args={[2, 32, 32]} />
        <meshStandardMaterial map={earthMap} />
      </mesh>

      {/* Atmosphere */}
      <mesh>
        <sphereGeometry args={[2.15, 32, 32]} />
        <meshBasicMaterial
          color="#6ea8ff"
          transparent
          opacity={0.15}
          side={THREE.BackSide}
        />
      </mesh>

      <mesh ref={moonRef}>
        <sphereGeometry args={[0.6, 32, 32]} />
        <meshStandardMaterial map={moonMap} />
      </mesh>
    </>
  );
}


/* ---------------- SATELLITE ---------------- */

function Satellite() {
  const ref = useRef<THREE.Mesh>(null!);

  useFrame(({ clock }) => {
    const t = clock.getElapsedTime() * 0.7;
    ref.current.position.x = Math.sin(t) * 18;
    ref.current.position.z = Math.cos(t) * 18;
    ref.current.rotation.y += 0.02;
  });

  return (
    <mesh ref={ref}>
      <boxGeometry args={[1, 0.4, 0.4]} />
      <meshStandardMaterial
        color="#8ea9ff"
        metalness={0.9}
        roughness={0.2}
      />
    </mesh>
  );
}

/* ---------------- MAIN SCENE ---------------- */

export default function SpaceScene() {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas
        camera={{ position: [0, 10, 40], fov: 60 }}
        gl={{ physicallyCorrectLights: true }}
      >
        {/* Deep Space Fog */}
        <fog attach="fog" args={["#050510", 60, 220]} />

        {/* Lighting */}
        <ambientLight intensity={0.05} />
        <directionalLight
          position={[20, 10, 10]}
          intensity={2}
          color="#ffd27a"
        />

        {/* Stars */}
        <Stars radius={300} depth={80} count={4000} factor={6} />

        <Suspense fallback={null}>
          <Environment preset="night" />
          <Sun />
          <Planet
            texturePath="/textures/mars.jpg"
            size={1.2}
            distance={10}
            speed={0.8}
          />
          <Planet
            texturePath="/textures/jupiter.jpg"
            size={3}
            distance={25}
            speed={0.2}
          />
          <EarthSystem />
          <Satellite />
        </Suspense>

        {/* Cinematic Camera */}
        <CameraDrift />

        

        <OrbitControls enableZoom={false} enablePan={false} />
      </Canvas>
    </div>
  );
}
