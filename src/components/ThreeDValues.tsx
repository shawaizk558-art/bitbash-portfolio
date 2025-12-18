import React, { useRef, useState } from "react";
import { Canvas, useFrame } from "@react-three/fiber";
import { Float, PerspectiveCamera, Environment, ContactShadows, MeshDistortMaterial } from "@react-three/drei";
import * as THREE from "three";

// Shared material for consistency
const purpleMaterial = new THREE.MeshStandardMaterial({
    color: "#8b5cf6", // Violet-500
    roughness: 0.2,
    metalness: 0.8,
});

const OpenShape = (props: any) => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state, delta) => {
        if (groupRef.current) {
            // Rotate the whole group
            groupRef.current.rotation.y += delta * 0.5;

            // Animate opening/closing based on time
            const openAmount = (Math.sin(state.clock.elapsedTime) + 1) / 2; // 0 to 1
            const angle = openAmount * (Math.PI / 2.5); // Open up to ~70 degrees

            // Open the sides
            groupRef.current.children.forEach((child, index) => {
                if (index >= 1 && index <= 4) { // Sides
                    // We need to access the specific children. 
                    // Since we can't easily rely on index in a loop without refs, 
                    // let's just animate them in the render or use specific refs if needed.
                    // For simplicity in this structure, we'll just let them be static or 
                    // use a simpler animation logic if we can't easily target them.
                    // Actually, let's just animate the rotation prop directly in the JSX.
                }
            });
        }
    });

    // Helper for animated side
    const Side = ({ position, rotationAxis, direction }: any) => {
        const meshRef = useRef<THREE.Group>(null);
        useFrame((state) => {
            if (meshRef.current) {
                const openAmount = (Math.sin(state.clock.elapsedTime) + 1) / 2;
                const angle = openAmount * (Math.PI / 2.5);

                if (rotationAxis === 'x') meshRef.current.rotation.x = direction * angle;
                if (rotationAxis === 'z') meshRef.current.rotation.z = direction * angle;
            }
        });

        return (
            <group ref={meshRef} position={position}>
                {/* The panel needs to pivot from the edge, so offset the mesh */}
                <mesh position={[0, 0.5, 0]} material={purpleMaterial}>
                    <boxGeometry args={[1, 1, 0.1]} />
                </mesh>
            </group>
        );
    };

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={1}>
            <group ref={groupRef} {...props}>
                {/* Core Sphere */}
                <mesh material={purpleMaterial}>
                    <sphereGeometry args={[0.4, 32, 32]} />
                    <meshStandardMaterial color="#a78bfa" emissive="#8b5cf6" emissiveIntensity={2} />
                </mesh>

                {/* Base (Static) */}
                <mesh position={[0, -0.55, 0]} rotation={[Math.PI / 2, 0, 0]} material={purpleMaterial}>
                    <boxGeometry args={[1, 1, 0.1]} />
                </mesh>

                {/* Sides - Pivoting from the bottom edge of the "box" which is at y=-0.5 */}
                {/* We need to position the pivot points at the edges of the base */}

                {/* Front */}
                <Side position={[0, -0.5, 0.5]} rotationAxis="x" direction={1} />
                {/* Back */}
                <Side position={[0, -0.5, -0.5]} rotationAxis="x" direction={-1} />
                {/* Left */}
                <Side position={[-0.5, -0.5, 0]} rotationAxis="z" direction={1} />
                {/* Right */}
                <Side position={[0.5, -0.5, 0]} rotationAxis="z" direction={-1} />

                {/* Top (Lid) - Attached to Back? Let's just do 4 sides for "Open" like a flower */}
            </group>
        </Float>
    );
};

const DrivenShape = (props: any) => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state, delta) => {
        if (groupRef.current) {
            // Pulse effect could be handled by scaling children or moving them
            // Let's just rotate the whole group slowly
            groupRef.current.rotation.z += delta * 0.1;
            groupRef.current.rotation.y += delta * 0.1;
        }
    });

    // Helper for expanding ring
    const PulseRing = ({ delay, scaleMax }: any) => {
        const ringRef = useRef<THREE.Mesh>(null);
        useFrame((state) => {
            if (ringRef.current) {
                const t = (state.clock.elapsedTime + delay) % 2; // 2 second cycle
                const scale = 1 + t * scaleMax;
                const opacity = 1 - t / 2;

                ringRef.current.scale.set(scale, scale, scale);
                if (Array.isArray(ringRef.current.material)) {
                    // handle array
                } else {
                    (ringRef.current.material as THREE.MeshStandardMaterial).opacity = opacity;
                }
            }
        });
        return (
            <mesh ref={ringRef} rotation={[Math.PI / 2, 0, 0]}>
                <torusGeometry args={[0.4, 0.02, 16, 32]} />
                <meshStandardMaterial color="#8b5cf6" transparent opacity={1} />
            </mesh>
        )
    }

    return (
        <Float speed={2} rotationIntensity={0.2} floatIntensity={0.5}>
            <group ref={groupRef} {...props}>
                {/* The Expanding Pulse - "Impact & Change" */}

                {/* Central Core */}
                <mesh material={purpleMaterial}>
                    <sphereGeometry args={[0.3, 32, 32]} />
                    <meshStandardMaterial color="#a78bfa" emissive="#8b5cf6" emissiveIntensity={2} />
                </mesh>

                {/* Pulsing Rings */}
                <PulseRing delay={0} scaleMax={1.5} />
                <PulseRing delay={0.5} scaleMax={1.5} />
                <PulseRing delay={1.0} scaleMax={1.5} />
                <PulseRing delay={1.5} scaleMax={1.5} />

                {/* Outer Orbiting Particles */}
                <mesh position={[0.8, 0, 0]}>
                    <sphereGeometry args={[0.08, 16, 16]} />
                    <meshStandardMaterial color="#ddd6fe" />
                </mesh>
                <mesh position={[-0.6, 0.6, 0]}>
                    <sphereGeometry args={[0.05, 16, 16]} />
                    <meshStandardMaterial color="#ddd6fe" />
                </mesh>
            </group>
        </Float>
    );
};

const ResponsibleShape = (props: any) => {
    const groupRef = useRef<THREE.Group>(null);
    const needleRef = useRef<THREE.Group>(null);

    useFrame((state, delta) => {
        if (groupRef.current) {
            // Gentle floating
            groupRef.current.rotation.x = Math.PI / 4 + Math.sin(state.clock.elapsedTime * 0.5) * 0.1;
            groupRef.current.rotation.y += delta * 0.1;
        }
        if (needleRef.current) {
            // Needle seeks "North" (or just oscillates slightly to show it's active)
            needleRef.current.rotation.z = Math.sin(state.clock.elapsedTime * 2) * 0.2;
        }
    });

    return (
        <Float speed={1.5} rotationIntensity={0.2} floatIntensity={0.5}>
            <group ref={groupRef} {...props}>
                {/* The Compass - "Moral Compass / Direction" */}
                {/* Symbolizes respecting decisions and staying true */}

                {/* Outer Case */}
                <mesh material={purpleMaterial}>
                    <cylinderGeometry args={[0.6, 0.6, 0.1, 32]} />
                    <meshStandardMaterial color="#6d28d9" roughness={0.2} metalness={0.8} />
                </mesh>
                <mesh position={[0, 0.06, 0]} material={purpleMaterial}>
                    <torusGeometry args={[0.6, 0.05, 16, 32]} />
                    <meshStandardMaterial color="#8b5cf6" roughness={0.1} metalness={1} />
                </mesh>

                {/* Face */}
                <mesh position={[0, 0.051, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    <circleGeometry args={[0.55, 32]} />
                    <meshStandardMaterial color="#f3e8ff" roughness={0.5} metalness={0.1} />
                </mesh>

                {/* Needle */}
                <group ref={needleRef} position={[0, 0.1, 0]} rotation={[-Math.PI / 2, 0, 0]}>
                    {/* North Point */}
                    <mesh position={[0, 0.3, 0]}>
                        <coneGeometry args={[0.08, 0.4, 4]} />
                        <meshStandardMaterial color="#7c3aed" emissive="#7c3aed" emissiveIntensity={0.5} />
                    </mesh>
                    {/* South Point */}
                    <mesh position={[0, -0.3, 0]} rotation={[0, 0, Math.PI]}>
                        <coneGeometry args={[0.08, 0.4, 4]} />
                        <meshStandardMaterial color="#ddd6fe" />
                    </mesh>
                    {/* Center Pin */}
                    <mesh rotation={[Math.PI / 2, 0, 0]}>
                        <cylinderGeometry args={[0.05, 0.05, 0.1]} />
                        <meshStandardMaterial color="#4c1d95" />
                    </mesh>
                </group>

                {/* Glass Cover */}
                <mesh position={[0, 0.15, 0]}>
                    <sphereGeometry args={[0.6, 32, 16, 0, Math.PI * 2, 0, Math.PI / 2]} />
                    <meshStandardMaterial
                        color="#fff"
                        transparent
                        opacity={0.2}
                        roughness={0}
                        metalness={0.9}
                        side={THREE.DoubleSide}
                    />
                </mesh>
            </group>
        </Float>
    );
};

const FlexibleShape = (props: any) => {
    const meshRef = useRef<THREE.Mesh>(null);
    // MeshDistortMaterial handles the animation internally

    return (
        <Float speed={3} rotationIntensity={1} floatIntensity={1}>
            <mesh ref={meshRef} {...props}>
                <sphereGeometry args={[0.8, 64, 64]} />
                <MeshDistortMaterial
                    color="#8b5cf6"
                    attach="material"
                    distort={0.6} // Strength of distortion
                    speed={2} // Speed of distortion
                    roughness={0.2}
                    metalness={0.8}
                />
            </mesh>
        </Float>
    );
};

const TeamShape = (props: any) => {
    const groupRef = useRef<THREE.Group>(null);
    useFrame((state, delta) => {
        if (groupRef.current) {
            groupRef.current.rotation.x += delta * 0.2;
            groupRef.current.rotation.y += delta * 0.2;
        }
    });

    return (
        <Float speed={2} rotationIntensity={0.5} floatIntensity={0.5}>
            <group ref={groupRef} {...props}>
                {/* Ring 1 */}
                <mesh position={[-0.3, 0, 0]} rotation={[0, Math.PI / 4, 0]} material={purpleMaterial}>
                    <torusGeometry args={[0.6, 0.15, 16, 32]} />
                </mesh>
                {/* Ring 2 - Interlinked */}
                <mesh position={[0.3, 0, 0]} rotation={[Math.PI / 2, Math.PI / 4, 0]} material={purpleMaterial}>
                    <torusGeometry args={[0.6, 0.15, 16, 32]} />
                </mesh>
            </group>
        </Float>
    );
};

export const ThreeDScene = ({ type }: { type: string }) => {
    return (
        <div className="w-full h-48">
            <Canvas>
                <PerspectiveCamera makeDefault position={[0, 0, 4]} />
                <ambientLight intensity={0.5} />
                <spotLight position={[10, 10, 10]} angle={0.15} penumbra={1} intensity={1} />
                <pointLight position={[-10, -10, -10]} intensity={0.5} />

                {type === "Open" && <OpenShape />}
                {type === "Driven" && <DrivenShape />}
                {type === "Responsible" && <ResponsibleShape />}
                {type === "Flexible" && <FlexibleShape />}
                {type === "Team" && <TeamShape />}

                <Environment preset="city" />
                <ContactShadows position={[0, -1.5, 0]} opacity={0.4} scale={5} blur={2.5} far={4} />
            </Canvas>
        </div>
    );
};
