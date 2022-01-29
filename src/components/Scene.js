import React from 'react';
import {Canvas} from '@react-three/fiber';
import {OrbitControls, Plane} from '@react-three/drei';

export function Scene(props) {
    return <Canvas colorManagement
                   shadowMap
                   linear
                   shadows
                   camera={{ position: [3, 4, 5], fov: 60 }}>
        <fog attach="fog" args={["white", 0, 100]} />
        <ambientLight intensity={0.5} />
        <directionalLight
            intensity={0.8}
            position={[-3, 5, 6]}
            castShadow={true}/>
        <group>
            {props.children}
            <Plane
                receiveShadow
                rotation={[-Math.PI / 2, 0, 0]}
                position={[0, -2, 0]}
                args={[1000, 1000]}>
                <meshStandardMaterial attach="material" color="white"/>
            </Plane>
        </group>
        <OrbitControls enablePan={false} enableZoom={false}/>
    </Canvas>
}