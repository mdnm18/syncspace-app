import React, { useRef, useMemo } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Points, PointMaterial } from "@react-three/drei";
import * as THREE from "three";

// This component creates the individual particles
function Particles({ count, darkMode }) {
  const points = useRef();

  // Generate random positions for the particles
  const particlesPosition = useMemo(() => {
    const positions = new Float32Array(count * 3);
    const distance = 2;

    for (let i = 0; i < count; i++) {
      const theta = THREE.MathUtils.randFloatSpread(360);
      const phi = THREE.MathUtils.randFloatSpread(360);

      let x = distance * Math.sin(theta) * Math.cos(phi);
      let y = distance * Math.sin(theta) * Math.sin(phi);
      let z = distance * Math.cos(theta);

      positions.set([x, y, z], i * 3);
    }

    return positions;
  }, [count]);

  // Animation loop that runs on every frame
  useFrame((state) => {
    const { clock } = state;
    // *** CHANGE: Further reduced rotation speed for a calmer effect ***
    points.current.rotation.y = clock.getElapsedTime() * 0.01; // Slower rotation
    points.current.rotation.x = clock.getElapsedTime() * 0.005; // Slower rotation
  });

  return (
    <Points ref={points} positions={particlesPosition} stride={3}>
      <PointMaterial
        transparent
        color={darkMode ? "#a78bfa" : "#818cf8"}
        size={0.015}
        sizeAttenuation={true}
        depthWrite={false}
      />
    </Points>
  );
}

// This is the main component that sets up the 3D scene
const DynamicBackground = ({ darkMode }) => {
  return (
    <div className="fixed inset-0 -z-10">
      <Canvas camera={{ position: [0, 0, 0.5] }}>
        <ambientLight intensity={0.5} />
        <Particles count={5000} darkMode={darkMode} />

        <gridHelper
          // *** CHANGE: Reduced grid density to make it more subtle ***
          args={[50, 50]} // Was [100, 100]
          rotation={[Math.PI / 2, 0, 0]}
          material-color={darkMode ? "#4f46e5" : "#a5b4fc"}
          material-opacity={0.1} // Also reduced opacity slightly
          material-transparent={true}
        />
      </Canvas>
    </div>
  );
};

export default DynamicBackground;
