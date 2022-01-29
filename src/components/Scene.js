import React from 'react';
import {Canvas, useThree} from '@react-three/fiber';
import {OrbitControls} from '@react-three/drei';

export function Scene(props) {
    return <Canvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <color attach="background" args={["grey"]} />
        {props.children}
        <OrbitControls enablePan={true} enableZoom={true} enableRotate={true} />
    </Canvas>
}