"use client";

import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// Glowing golden embers particle system
function Embers() {
  const pointsRef = useRef<THREE.Points>(null);

  const [positions, sways] = useMemo(() => {
    const count = 250;
    const pos = new Float32Array(count * 3);
    const sw = new Float32Array(count);
    for (let i = 0; i < count; i++) {
      pos[i * 3] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 1] = (Math.random() - 0.5) * 10;
      pos[i * 3 + 2] = (Math.random() - 0.5) * 5;
      sw[i] = Math.random() * Math.PI * 2;
    }
    return [pos, sw];
  }, []);

  useFrame((state) => {
    if (!pointsRef.current) return;
    const time = state.clock.getElapsedTime();
    const mouseX = state.pointer.x * 0.4;
    const mouseY = state.pointer.y * 0.4;

    const positionsArray = pointsRef.current.geometry.attributes.position.array as Float32Array;
    const count = positionsArray.length / 3;

    for (let i = 0; i < count; i++) {
      // Floating upwards
      positionsArray[i * 3 + 1] += 0.003 + Math.sin(time + sways[i]) * 0.001;
      
      // Swaying with mouse
      positionsArray[i * 3] += (mouseX - positionsArray[i * 3]) * 0.005 + Math.cos(time + sways[i]) * 0.001;

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

// Falling rose petals (using instanced meshes for 60fps performance)
function FallingPetals() {
  const count = 40;
  const meshRef = useRef<THREE.InstancedMesh>(null);
  const tempObject = useMemo(() => new THREE.Object3D(), []);

  // Custom curved plane geometry representing a delicate rose petal
  const petalGeometry = useMemo(() => {
    const geom = new THREE.PlaneGeometry(0.15, 0.2, 3, 3);
    const pos = geom.attributes.position;
    for (let i = 0; i < pos.count; i++) {
      const x = pos.getX(i);
      const y = pos.getY(i);
      // Curl the edges slightly
      pos.setZ(i, Math.sin(x * 5) * 0.03 + Math.cos(y * 5) * 0.02);
    }
    geom.computeVertexNormals();
    return geom;
  }, []);

  const petalMaterial = useMemo(() => {
    return new THREE.MeshBasicMaterial({
      color: new THREE.Color("#580c10"),
      side: THREE.DoubleSide,
      transparent: true,
      opacity: 0.8,
    });
  }, []);

  const petalsData = useMemo(() => {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push({
        position: new THREE.Vector3(
          (Math.random() - 0.5) * 8,
          Math.random() * 8 - 4,
          (Math.random() - 0.5) * 3
        ),
        rotation: new THREE.Euler(
          Math.random() * Math.PI,
          Math.random() * Math.PI,
          Math.random() * Math.PI
        ),
        speed: 0.01 + Math.random() * 0.015,
        rotationSpeed: new THREE.Vector3(
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02,
          (Math.random() - 0.5) * 0.02
        ),
      });
    }
    return data;
  }, []);

  useFrame((state) => {
    if (!meshRef.current) return;
    const time = state.clock.getElapsedTime();
    const mouseX = state.pointer.x * 0.5;

    petalsData.forEach((petal, i) => {
      // Fall downwards
      petal.position.y -= petal.speed;
      
      // Gentle side drift influenced by mouse
      petal.position.x += Math.sin(time + i) * 0.003 + (mouseX - petal.position.x) * 0.001;

      // Spin in air
      petal.rotation.x += petal.rotationSpeed.x;
      petal.rotation.y += petal.rotationSpeed.y;
      petal.rotation.z += petal.rotationSpeed.z;

      // Wrap petals that fall below screen
      if (petal.position.y < -4) {
        petal.position.y = 4;
        petal.position.x = (Math.random() - 0.5) * 8;
      }

      tempObject.position.copy(petal.position);
      tempObject.rotation.copy(petal.rotation);
      tempObject.updateMatrix();
      meshRef.current?.setMatrixAt(i, tempObject.matrix);
    });

    meshRef.current.instanceMatrix.needsUpdate = true;
  });

  return (
    <instancedMesh
      ref={meshRef}
      args={[petalGeometry, petalMaterial, count]}
      frustumCulled={false}
    />
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
        dpr={[1, 1.5]}
        gl={{ antialias: false, powerPreference: "high-performance" }}
      >
        <ambientLight intensity={0.4} />
        
        {/* Cinematic camera depth transition based on scroll */}
        <CameraController scrollProgress={scrollProgress} />
        
        <Embers />
        <FallingPetals />
      </Canvas>
    </div>
  );
}

function CameraController({ scrollProgress }: { scrollProgress: number }) {
  useFrame((state) => {
    // Zoom camera in/out based on scroll progression to create cinematic parallax depth
    const targetZ = 4 - scrollProgress * 1.5;
    state.camera.position.z += (targetZ - state.camera.position.z) * 0.05;
    
    // Camera lag-drift based on mouse movement (feels like floating handheld camera)
    const targetX = state.pointer.x * 0.25;
    const targetY = state.pointer.y * 0.25;
    state.camera.position.x += (targetX - state.camera.position.x) * 0.05;
    state.camera.position.y += (targetY - state.camera.position.y) * 0.05;
    
    state.camera.lookAt(0, 0, 0);
  });
  return null;
}
