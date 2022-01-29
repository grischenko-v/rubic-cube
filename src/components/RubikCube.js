import {useRef} from 'react';
import {useFrame} from '@react-three/fiber';
import {BoxGroup} from './BoxGroup';

const ROTATION_SPEED_DIVIDER = 100;

export const RubikCube = (props) => {
    const rotatedGroup = useRef();

    const getUpdatedPointData = (child, arr) => {
        const x = Math.round(child.children[0].position.x);
        const y = Math.round(child.children[0].position.y);
        const z = Math.round(child.children[0].position.z);

        const oldPoint = props.rotationSide.find(point => point.x === x && point.y === y && point.z === z);

        child.children[0].applyMatrix4(rotatedGroup.current.matrixWorld);
        child.children[1].applyMatrix4(rotatedGroup.current.matrixWorld);

        arr.push({
            name: oldPoint.name,
            x: Math.round(child.children[0].position.x),
            y: Math.round(child.children[0].position.y),
            z: Math.round(child.children[0].position.z),
            rotX: child.children[0].rotation.x,
            rotY: child.children[0].rotation.y,
            rotZ: child.children[0].rotation.z,
        });
    }

    const updateCurrentCubeState = () => {
        const updatedPoints = []
        rotatedGroup.current.rotation[props.rotationAxisLetter] = props.rotationDirection === 'right' ?
            Math.PI / 2 : -Math.PI / 2;

        rotatedGroup.current.children.map(child => getUpdatedPointData(child, updatedPoints))

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
            rotatedGroup.current.rotation[props.rotationAxisLetter] <= Math.PI / 2) {
            rotatedGroup.current.rotation[props.rotationAxisLetter] += Math.PI / ROTATION_SPEED_DIVIDER;
        }
        if (props.rotationDirection === 'left' &&
            rotatedGroup.current.rotation[props.rotationAxisLetter] >= -Math.PI / 2) {
            rotatedGroup.current.rotation[props.rotationAxisLetter] -= Math.PI / ROTATION_SPEED_DIVIDER;
        }
        if (Math.abs(rotatedGroup.current.rotation[props.rotationAxisLetter]) > Math.PI / 2) {
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