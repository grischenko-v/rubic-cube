import {useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {BoxGroup} from './BoxGroup';

const ROTATION_SPEED_DIVIDER = 100;
const ANIMATION_ROTATION_DELTA = Math.PI / ROTATION_SPEED_DIVIDER;
const ROTATION_ANGLE = Math.PI / 2;

export const RubikCube = (props) => {
    const rotatedGroup = useRef();

    const getUpdatedPointData = (child) => {
        const x = Math.round(child.children[0].position.x);
        const y = Math.round(child.children[0].position.y);
        const z = Math.round(child.children[0].position.z);

        const oldPoint = props.rotationSide.find(point => point.x === x && point.y === y && point.z === z);

        child.children[0].applyMatrix4(rotatedGroup.current.matrixWorld);
        child.children[1].applyMatrix4(rotatedGroup.current.matrixWorld);

        return {
            name: oldPoint.name,
            x: Math.round(child.children[0].position.x),
            y: Math.round(child.children[0].position.y),
            z: Math.round(child.children[0].position.z),
            rotX: child.children[0].rotation.x,
            rotY: child.children[0].rotation.y,
            rotZ: child.children[0].rotation.z,
        };
    }

    const updateCurrentCubeState = () => {
        rotatedGroup.current.rotation[props.rotationAxisLetter] = props.rotationDirection === 'right' ?
            ROTATION_ANGLE : -ROTATION_ANGLE;

        const updatedPoints = rotatedGroup.current.children.map(child => getUpdatedPointData(child));

        props.setPoints(points => ([
            ...points.filter(point => !updatedPoints.some(item => item.name === point.name)),
            ...updatedPoints,
        ]));
        props.setAnimation(false);  
    }

    const rotateCube = () => {
        if (!props.animation) {
            return;
        }
        if (props.rotationDirection === 'right' &&
            rotatedGroup.current.rotation[props.rotationAxisLetter] <= ROTATION_ANGLE) {
            rotatedGroup.current.rotation[props.rotationAxisLetter] += ANIMATION_ROTATION_DELTA;
        }
        if (props.rotationDirection === 'left' &&
            rotatedGroup.current.rotation[props.rotationAxisLetter] >= -ROTATION_ANGLE) {
            rotatedGroup.current.rotation[props.rotationAxisLetter] -= ANIMATION_ROTATION_DELTA;
        }
        if (Math.abs(rotatedGroup.current.rotation[props.rotationAxisLetter]) > ROTATION_ANGLE) {
            setTimeout(() => {
                updateCurrentCubeState();
                rotatedGroup.current.rotation[props.rotationAxisLetter] = 0;
            }, 0);
        }
    }

    useFrame(() => {
        rotateCube();
    });

    return (<group>
        <BoxGroup group={props.otherGroup}/>
        <BoxGroup ref={rotatedGroup} group={props.rotationSide}/>
    </group>);
}