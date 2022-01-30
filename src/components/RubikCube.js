import {useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {BoxGroup} from './BoxGroup';
import {getRoundPosition} from '../utils';

const ROTATION_SPEED_DIVIDER = 100;
const ANIMATION_ROTATION_DELTA = Math.PI / ROTATION_SPEED_DIVIDER;
const ROTATION_ANGLE = Math.PI / 2;

export const RubikCube = (props) => {
    const rotatedGroup = useRef();

    const getUpdatedPointData = (child) => {
        const {x, y, z} = getRoundPosition(child.children[0].position);
        const oldPoint = props.rotationSide.find(point => point.x === x && point.y === y && point.z === z);

        child.children.forEach(child => child.applyMatrix4(rotatedGroup.current.matrixWorld))

        return {
            name: oldPoint.name,
            ...getRoundPosition(child.children[0].position),
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