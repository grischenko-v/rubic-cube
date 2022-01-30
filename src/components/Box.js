import React, {useMemo} from 'react';
import * as THREE from 'three';

const colors = {
    blue: 'blue',
    white: 'white',
    red: 'red',
    green: 'green',
    yellow: 'yellow',
    orange: 'orange',
    black: 'darkgrey',
}

const colorsByPosition = (position) => {
    return [
        position[0] === 1 ? colors.blue : colors.black,
        position[0] === -1 ? colors.white : colors.black,
        position[1] === 1 ? colors.red : colors.black,
        position[1] === -1 ? colors.green : colors.black,
        position[2] === 1 ? colors.yellow : colors.black,
        position[2] === -1 ? colors.orange : colors.black,
    ];
}

export const Box = (props) => {
    const initialPosition = useMemo(() => props.name && props.name.split('_')
        .map(item => Number(item)) || [0, 0, 0], [])
    const colors = useMemo(() => colorsByPosition(initialPosition), []);
    const geometry = useMemo(() => new THREE.BoxGeometry( 1, 1, 1 ), []);
    const edges = useMemo(() => new THREE.EdgesGeometry( geometry ), []);
    return (
        <group dispose={null}>
            {/*<axesHelper args={[10]} />*/}
            <mesh {...props} castShadow={true} receiveShadow={true}>
                <boxGeometry args={[1, 1, 1]}/>
                {colors.map(color => <meshStandardMaterial attachArray="material" color={color}/>)}
            </mesh>
            <lineSegments {...props} renderOrder={10} geometry={edges}>
                <lineBasicMaterial color="black" linewidth={1}/>
            </lineSegments>
        </group>
    )
}