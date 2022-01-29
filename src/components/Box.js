import React from 'react';

const colors = {
    blue: 'blue',
    white: 'white',
    red: 'red',
    green: 'green',
    yellow: 'yellow',
    orange: 'orange',
}

export const Box = (props) => {
    return (
        <group dispose={null}>
            <mesh {...props}>
                <boxGeometry args={[1, 1, 1]}/>
                <colorMaterial attachArray="material" color={colors.blue} />
                <colorMaterial attachArray="material" color={colors.white} />
                <colorMaterial attachArray="material" color={colors.red} />
                <colorMaterial attachArray="material" color={colors.green} />
                <colorMaterial attachArray="material" color={colors.yellow} />
                <colorMaterial attachArray="material" color={colors.orange} />
            </mesh>
            <lineSegments {...props} renderOrder={10}>
                <boxGeometry args={[1, 1, 1]}/>
                <lineBasicMaterial color="black" linewidth={100}/>
            </lineSegments>
        </group>
    )
}