"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

const TARGET_FPS = 90;

function seededRandom(seed: number) {
  const value = Math.sin(seed * 12.9898) * 43758.5453;
  return value - Math.floor(value);
}

// Glowing golden embers particle system
function Embers() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, sways] = useMemo(() => {
    const count = 250;
    const pos = new Float32Array(count * 3);
    const sw = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (seededRandom(i + 1) - 0.5) * 10;
      pos[i * 3 + 1] = (seededRandom(i + 251) - 0.5) * 10;
      pos[i * 3 + 2] = (seededRandom(i + 501) - 0.5) * 5;
      sw[i] = seededRandom(i + 751) * Math.PI * 2;
    }
    return [pos, sw];
  }, []);

  useFrame((state, delta) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const frameScale = Math.min(delta * TARGET_FPS, 2);
    const mouseX = state.pointer.x * 0.4;
    const mouseEase = 1 - Math.pow(0.995, frameScale);

    const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const count = positionsArray.length / 3;

    for (let i = 0; i < count; i++) {
      // Floating upwards
      positionsArray[i * 3 + 1] += (0.003 + Math.sin(time + sways[i]) * 0.001) * frameScale;
      
      // Swaying with mouse
      positionsArray[i * 3] += (mouseX - positionsArray[i * 3]) * mouseEase + Math.cos(time + sways[i]) * 0.001 * frameScale;

      // Wrap-around boundary check
      if (positionsArray[i * 3 + 1] > 5) {
        positionsArray[i * 3 + 1] = -5;
        positionsArray[i * 3] = (Math.random() - 0.5) * 10;
      }
    }
    pointsRef.current.geometry.attributes.position.needsUpdate = true;
  });

  return (
    <Points ref={pointsRef} positions={positions} stride={3} frustumCulled={false}>
      <PointMaterial
        transparent
        color="#d4af37"
        size={0.06}
        sizeAttenuation={true}
        depthWrite={false}
        blending={THREE.AdditiveBlending}
        opacity={0.6}
      />
    </Points>
  );
}

interface ScenicCanvasProps {
  scrollProgress: number;
}

export default function ScenicCanvas({ scrollProgress }: ScenicCanvasProps) {
  return (
    <div className="fixed inset-0 -z-10 pointer-events-none w-full h-full bg-black select-none">
      <Canvas
        camera={{ position: [0, 0, 4], fov: 60 }}
        dpr={[1, 1.25]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.4} />
        
        {/* Cinematic camera depth transition based on scroll */}
        <CameraController scrollProgress={scrollProgress} />
        
        <Embers />
      </Canvas>
    </div>
  );
}

function CameraController({ scrollProgress }: { scrollProgress: number }) {
  useFrame((state, delta) => {
    const frameScale = Math.min(delta * TARGET_FPS, 2);
    const cameraEase = 1 - Math.pow(0.95, frameScale);

    // Zoom camera in/out based on scroll progression to create cinematic parallax depth
    const targetZ = 4 - scrollProgress * 1.5;
    state.camera.position.z += (targetZ - state.camera.position.z) * cameraEase;
    
    // Camera lag-drift based on mouse movement (feels like floating handheld camera)
    const targetX = state.pointer.x * 0.25;
    const targetY = state.pointer.y * 0.25;
    state.camera.position.x += (targetX - state.camera.position.x) * cameraEase;
    state.camera.position.y += (targetY - state.camera.position.y) * cameraEase;
    
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}
