import React from 'react';
import {Box} from './Box';

export const BoxGroup = React.forwardRef((props, ref) => {
    return <group ref={ref}>
        {props.group.map(point => {
            return <Box key={point.name}
                        name={point.name}
                        position={[point.x, point.y, point.z]}
                        rotation={[point.rotX, point.rotY, point.rotZ]}/>;
        })}
    </group>
});