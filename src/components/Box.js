import React, {useMemo} from 'react';
import * as THREE from 'three';

const colors = {
    blue: 'blue',
    white: 'white',
    red: 'red',
    green: 'green',
    yellow: 'yellow',
    orange: 'orange',
}

export const Box = (props) => {
    const geometry = useMemo(() => new THREE.BoxGeometry( 1, 1, 1 ), []);
    const edges = useMemo(() => new THREE.EdgesGeometry( geometry ), []);
    return (
        <group dispose={null}>
            <mesh {...props} castShadow={true} receiveShadow={true}>
                <boxGeometry args={[1, 1, 1]}/>
                <meshStandardMaterial attachArray="material" color={colors.blue}/>
                <meshStandardMaterial attachArray="material" color={colors.white}/>
                <meshStandardMaterial attachArray="material" color={colors.red}/>
                <meshStandardMaterial attachArray="material" color={colors.green}/>
                <meshStandardMaterial attachArray="material" color={colors.yellow}/>
                <meshStandardMaterial attachArray="material" color={colors.orange}/>
            </mesh>
            <lineSegments {...props} renderOrder={10} geometry={edges}>
                <lineBasicMaterial color="black" linewidth={1}/>
            </lineSegments>
        </group>
    )
}